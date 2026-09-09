import { spawnSync } from 'node:child_process';
const command = process.argv[2];
if (!['build', 'deploy'].includes(command))
  throw new Error('Use build or deploy');
const env = { ...process.env, DEPLOY_TARGET: 'cloudflare' };
const result = spawnSync(
  process.execPath,
  ['node_modules/vinext/dist/cli.js', 'build'],
  { stdio: 'inherit', env },
);
if (result.status !== 0) process.exit(result.status ?? 1);
if (command === 'deploy') {
  const deploy = spawnSync(
    process.execPath,
    [
      'node_modules/wrangler/bin/wrangler.js',
      'deploy',
      '--config',
      'dist/server/wrangler.json',
    ],
    { stdio: 'inherit', env },
  );
  process.exit(deploy.status ?? 1);
}
