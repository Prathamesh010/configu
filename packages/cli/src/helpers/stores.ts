import { type ConfigStore } from '@configu/ts';
import { ConfiguStores } from '@configu/integrations';

export const constructStore = async (type: string, configuration: any): Promise<ConfigStore> => {
  const StoreCtor = await ConfiguStores.getOne(type);
  if (!StoreCtor) {
    throw new Error(`unknown store type ${type}`);
  }
  return new StoreCtor(configuration);
};
