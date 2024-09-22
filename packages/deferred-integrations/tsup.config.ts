import { defineConfig, Options } from 'tsup';
import { readdir, readFile } from 'node:fs/promises';
import { platform } from 'node:os';

const osName = process.env.OS_NAME || platform();

export default defineConfig(async (): Promise<Options> => {
  const files = await readdir('src');
  const pkg = JSON.parse(await readFile('package.json', 'utf-8'));

  const entry = files.filter((file) => file.endsWith('.ts')).map((file) => `src/${file}`);

  console.log('entries', entry);

  const noExternal = Object.keys(pkg.dependencies).filter((dep) => !dep.startsWith('@configu'));

  return {
    entry,
    target: 'esnext',
    noExternal,
    outDir: `dist/latest`,
    outExtension: () => ({
      js: `.${osName}.js`,
    }),
  };
});
