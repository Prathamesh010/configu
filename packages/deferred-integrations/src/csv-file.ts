import { type Config } from '@configu/ts';
import { parse, stringify } from 'csv/sync';
import { ConfiguStores, FileConfigStore } from '@configu/integrations';

export type CsvFileConfigStoreConfiguration = { path: string };

export class CsvFileConfigStore extends FileConfigStore {
  constructor({ path }: CsvFileConfigStoreConfiguration) {
    const initialFileState = '';
    super('csv-file', { path, initialFileState });
  }

  parse(fileContent: string): Config[] {
    return parse(fileContent, { columns: true, skip_empty_lines: true });
  }

  stringify(nextConfigs: Config[]): string {
    return stringify(nextConfigs, { header: true });
  }
}

ConfiguStores.register('csv-file', CsvFileConfigStore);
