export const MAX_VERIFICATION_PDF_BYTES = 2_000_000;
const MAX_PAGES = 20;
const MAX_TEXT = 60_000;
const PARSE_DEADLINE_MS = 6_000;

export type PdfSourceText =
  | { ok: true; text: string; pages: number }
  | { ok: false; reason: string };

// PDF text extraction never needs external images, fonts, CMaps, or WASM.
// An unavailable embedded character map means an unread source, not a fetch.
class NoExternalPdfAssets {
  async fetch() {
    throw new Error("External PDF assets are disabled.");
  }
}

export async function extractOfficialPdfText(
  data: Uint8Array,
  signal?: AbortSignal,
): Promise<PdfSourceText> {
  if (signal?.aborted) throw new DOMException("PDF reading cancelled.", "AbortError");
  if (data.byteLength > MAX_VERIFICATION_PDF_BYTES)
    return { ok: false, reason: "The PDF exceeds the 2 MB source-reading limit." };
  if (!/^%PDF-\d\.\d/.test(new TextDecoder().decode(data.subarray(0, 16))))
    return { ok: false, reason: "The response does not contain a valid PDF signature." };
  let document: Awaited<ReturnType<(typeof import("unpdf"))["getDocumentProxy"]>> | undefined;
  type PdfApi = Awaited<ReturnType<(typeof import("unpdf"))["getResolvedPDFJS"]>>;
  let loadingTask: ReturnType<PdfApi["getDocument"]> | undefined;
  let cancel: () => void = () => {};
  let timer: ReturnType<typeof setTimeout> | undefined;
  const interrupted = new Promise<never>((_, reject) => {
    cancel = () => reject(new DOMException("PDF reading cancelled.", "AbortError"));
    signal?.addEventListener("abort", cancel, { once: true });
    timer = setTimeout(() => reject(new Error("PDF_PARSE_TIMEOUT")), PARSE_DEADLINE_MS);
  });
  const bounded = <T>(operation: Promise<T>) => Promise.race([operation, interrupted]);
  try {
    const { getResolvedPDFJS } = await bounded(import("unpdf"));
    const { getDocument } = await bounded(getResolvedPDFJS());
    // Data-only input avoids document/range URLs; cleared asset URLs plus the
    // denying factory prevent auxiliary network and filesystem reads.
    const options = {
      url: undefined,
      docBaseUrl: undefined,
      disableFontFace: true,
      useSystemFonts: false,
      useWorkerFetch: false,
      isEvalSupported: false,
      useWasm: false,
      isOffscreenCanvasSupported: false,
      isImageDecoderSupported: false,
      disableAutoFetch: true,
      disableRange: true,
      disableStream: true,
      enableXfa: false,
      maxImageSize: 0,
      canvasMaxAreaInBytes: 0,
      cMapUrl: undefined,
      standardFontDataUrl: undefined,
      wasmUrl: undefined,
      iccUrl: undefined,
      BinaryDataFactory: NoExternalPdfAssets,
      stopAtErrors: true,
      verbosity: 0,
    };
    // Keep the loading task itself so password errors and load timeouts can
    // release resources even before a document proxy has been created.
    loadingTask = getDocument({ data: new Uint8Array(data), ...options });
    document = await bounded(loadingTask.promise);
    if (
      !Number.isInteger(document.numPages) ||
      document.numPages < 1 ||
      document.numPages > MAX_PAGES
    ) {
      return { ok: false, reason: `The PDF exceeds the ${MAX_PAGES}-page source-reading limit.` };
    }
    const text: string[] = [];
    let length = 0;
    for (let number = 1; number <= document.numPages; number++) {
      if (signal?.aborted) throw new DOMException("PDF reading cancelled.", "AbortError");
      const page = await bounded(document.getPage(number));
      try {
        const content = await bounded(page.getTextContent({ disableNormalization: false }));
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        // An image-only or effectively unread page could hold material rules;
        // do not present a partially extracted document as fully read.
        if (pageText.length < 20)
          return {
            ok: false,
            reason:
              "The PDF contains a scanned, blank or unreadable page; a manual document check is needed.",
          };
        length += pageText.length + 1;
        if (length > MAX_TEXT)
          return {
            ok: false,
            reason: "The PDF exceeds the 60,000-character source-reading limit.",
          };
        text.push(pageText);
      } finally {
        page.cleanup();
      }
    }
    const combined = text.join("\n");
    if (combined.length < 120)
      return {
        ok: false,
        reason: "The PDF does not expose enough readable guidance for an evidence check.",
      };
    return { ok: true, text: combined, pages: document.numPages };
  } catch (error) {
    if (signal?.aborted) throw new DOMException("PDF reading cancelled.", "AbortError");
    const name = error instanceof Error ? error.name : "";
    const message = error instanceof Error ? error.message : "";
    return {
      ok: false,
      reason:
        name === "PasswordException"
          ? "This PDF is encrypted or password-protected; its contents could not be checked."
          : message === "PDF_PARSE_TIMEOUT"
            ? "The PDF exceeded the bounded document-reading time."
            : "The PDF text could not be read safely; it needs a manual document check.",
    };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", cancel);
    // Destruction itself cannot hold the response open. Parsing on the shared
    // serverless event loop has best-effort time limits, not CPU isolation.
    if (loadingTask) void loadingTask.destroy().catch(() => {});
  }
}
