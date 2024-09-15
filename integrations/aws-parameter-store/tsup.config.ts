import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'esnext',
  noExternal: ['@aws-sdk/client-ssm'],
});
