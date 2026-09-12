// Local production-build preview. No cloud deployment, model downloads or new credentials.
import { readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const config = JSON.parse(readFileSync('dist/server/wrangler.json', 'utf8'));
delete config.ai;
config.vars.ZURTEX_RESEARCH_RESULTS_ENABLED = 'true';
config.vars.ZURTEX_SITE_URL = `http://localhost:${process.env.PORT || '3002'}`;
for (const name of ['ZURTEX_VERIFICATION_PROVIDER', 'ZURTEX_VERIFICATION_MODEL', 'ZURTEX_MODEL_BASE_URL']) {
  if (process.env[name]) config.vars[name] = process.env[name];
}
const path = resolve('dist/server/wrangler.preview.json');
writeFileSync(path, JSON.stringify(config, null, 2));
const child = spawn(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'dev', '--config', path, '--port', process.env.PORT || '3002', '--local'], {
  stdio: 'inherit', windowsHide: true,
});
child.on('exit', (code) => { process.exitCode = code ?? 1; });
process.on('SIGINT', () => child.kill());
process.on('SIGTERM', () => child.kill());
