import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/aws-parameter.ts', 'src/csv-file.ts'],
  target: 'esnext',
  noExternal: ['@aws-sdk/client-ssm', 'csv'],
});
