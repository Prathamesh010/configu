// TODO: import this type from the future package that will replace "ts"
type ExportCommandReturn = {
  [key: string]: string;
};

type FormatterParameters = {
  json: ExportCommandReturn;
  label: string;
  wrap?: boolean; // * Wraps all values with quotes
};
export type FormatterFunction = (params: FormatterParameters) => string;

const allExporters = new Map<string, FormatterFunction>();

export class ConfiguExporters {
  static register(name: string, exporter: FormatterFunction) {
    allExporters.set(name, exporter);
  }

  static getOne(key: string) {
    return allExporters.get(key);
  }
}
