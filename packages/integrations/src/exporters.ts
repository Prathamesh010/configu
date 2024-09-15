const allExporters = new Map<string, typeof Function>();

export class ConfiguExporters {
  static register(name: string, exporter: typeof Function) {
    allExporters.set(name, exporter);
  }

  static getOne(key: string) {
    return allExporters.get(key);
  }
}
