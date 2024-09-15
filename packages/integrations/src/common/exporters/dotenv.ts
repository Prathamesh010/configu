import { ConfiguExporters, FormatterFunction } from '../../exporters';

const hasWhitespace = (str: string) => {
  return /\s/.test(str);
};
const jsonToDotenv: FormatterFunction = ({ json, wrap }) => {
  return Object.entries(json)
    .map(([key, value]) => {
      if (wrap || hasWhitespace(value)) {
        return `${key}="${value}"`; // * in case value has a whitespace or wrap is true, wrap with quotes around it
      }
      return `${key}=${value}`;
    })
    .join('\n');
};
ConfiguExporters.register('Dotenv', jsonToDotenv);
