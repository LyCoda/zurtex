import assert from "node:assert/strict";
import test from "node:test";
import { readVerificationStream } from "../lib/verification-stream.ts";

function streamed(parts: string[]) {
  return new Response(new ReadableStream({ start(controller) {
    for (const part of parts) controller.enqueue(new TextEncoder().encode(part));
    controller.close();
  } }), { headers: { "content-type": "text/event-stream" } });
}
const result = { assessmentId: "route-1", route: { origin: "Great Britain" }, findings: [] };

test("stream consumes split events and keepalive comments before returning the actual result", async () => {
  const progress: string[] = [];
  const response = streamed([
    ': keep-alive\r\n\r\nevent: pro',
    'gress\ndata: {"stage":"arrival","state":"running","message":"Reading","completed":0,"total":2}\n',
    `\nevent: result\ndata: ${JSON.stringify(result)}\n\n`,
  ]);
  assert.deepEqual(await readVerificationStream(response, (p) => progress.push(p.stage)), result);
  assert.deepEqual(progress, ["arrival"]);
});

test("a closed stream cannot masquerade as a finished guide", async () => {
  await assert.rejects(readVerificationStream(streamed([": keep-alive\n\n"]), () => {}), /connection ended/);
});

test("server failures expose the recovery message and never yield results", async () => {
  await assert.rejects(readVerificationStream(streamed(['event: error\ndata: {"error":"Please retry"}\n\n']), () => {}), /Please retry/);
  await assert.rejects(readVerificationStream(Response.json({error:"Try again in a minute"}, {status:429}), () => {}), /minute/);
});

test("malformed transport and non-stream responses fail explicitly", async () => {
  await assert.rejects(readVerificationStream(streamed(['event: result\ndata: {bad}\n\n']), () => {}));
  await assert.rejects(readVerificationStream(Response.json(result), () => {}), /incomplete response/);
});
