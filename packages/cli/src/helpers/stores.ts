import { type ConfigStore } from '@configu/ts';
import { ConfiguStores } from '@configu/integrations';

export const constructStore = (type: string, configuration: any): ConfigStore => {
  const StoreCtor = ConfiguStores.getOne(type);
  if (!StoreCtor) {
    throw new Error(`unknown store type ${type}`);
  }
  return new StoreCtor(configuration);
};
