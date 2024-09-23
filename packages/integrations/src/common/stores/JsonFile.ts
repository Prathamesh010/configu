import { type Config, Convert } from '@configu/ts';
import { FileConfigStore } from './utils/File';
import { ConfiguStores } from '../../stores';

export type JsonFileConfigStoreConfiguration = { path: string };

export class JsonFileConfigStore extends FileConfigStore {
  constructor({ path }: JsonFileConfigStoreConfiguration) {
    const initialFileState = Convert.configStoreContentsToJson([]);
    super('json-file', { path, initialFileState });
  }

  parse(fileContent: string) {
    return Convert.toConfigStoreContents(fileContent);
  }

  stringify(nextConfigs: Config[]) {
    return Convert.configStoreContentsToJson(nextConfigs);
  }
}

ConfiguStores.register('json-file', JsonFileConfigStore);
