import type { RouteGuideAssessment } from "./route-intelligence.ts";
import type { VerificationProgress } from "./source-verification-types.ts";

/** Read POST response events without requiring EventSource or putting trip data in a URL. */
export async function readVerificationStream(
  response: Response,
  onProgress: (progress: VerificationProgress) => void,
): Promise<RouteGuideAssessment> {
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(body?.error || "The source check could not start. Please try again.");
  }
  if (!response.body || !response.headers.get("content-type")?.includes("text/event-stream"))
    throw new Error("The source check returned an incomplete response. Please try again.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result: RouteGuideAssessment | undefined;
  const consume = (block: string) => {
    const lines = block.split("\n");
    const event = lines.find((line) => line.startsWith("event:"))?.slice(6).trim();
    const data = lines.filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim()).join("\n");
    if (!data) return;
    const value = JSON.parse(data);
    if (event === "error") throw new Error(value.error || "The source check was interrupted. Please try again.");
    if (event === "progress" && ["prepare", "departure", "arrival", "compare", "compose"].includes(value.stage)
      && ["running", "complete", "limited"].includes(value.state) && typeof value.message === "string")
      onProgress(value);
    if (event === "result" && value.assessmentId && value.route && Array.isArray(value.findings)) result = value;
  };
  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done }).replace(/\r/g, "");
      if (buffer.length > 2_000_000) throw new Error("The source check response was too large. Please try again.");
      let boundary: number;
      while ((boundary = buffer.indexOf("\n\n")) >= 0) {
        consume(buffer.slice(0, boundary));
        buffer = buffer.slice(boundary + 2);
      }
      if (result) return result;
      if (done) break;
    }
    if (buffer.trim()) consume(buffer);
    if (!result) throw new Error("The connection ended before your guide was ready. Please try again.");
    return result;
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
