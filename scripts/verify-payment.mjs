import { spawnSync } from "node:child_process";
// Runs the current real-handler contract tests with isolated Stripe mocks.
// No credentials, network calls or actual payments are used.
const result = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--test", "tests/consultation.test.ts"],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
