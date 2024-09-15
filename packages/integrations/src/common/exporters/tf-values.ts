import { snakeCase } from 'change-case';
import { ConfiguExporters, FormatterFunction } from '../../exporters';

const jsonToTfvars: FormatterFunction = ({ json }) => {
  return Object.entries(json)
    .map(([key, value]) => {
      let formattedValue: string;
      try {
        JSON.parse(value);
        formattedValue = value;
      } catch (err) {
        formattedValue = `"${value}"`;
      }
      return `${snakeCase(key)} = ${formattedValue}`;
    })
    .join('\n');
};
ConfiguExporters.register('TerraformTfvars', jsonToTfvars);
