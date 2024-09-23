import validator from 'validator';
import { ConfiguExporters, FormatterFunction } from '../../exporters';

// * TOML v1.0.0 spec: https://toml.io/en/v1.0.0
// ! formatter supports flat objects only
const jsonToToml: FormatterFunction = ({ json }) => {
  return Object.entries(json)
    .map(([key, value]) => {
      if (validator.isNumeric(value) || validator.isBoolean(value, { loose: true })) {
        return `${key} = ${value}`;
      }
      return `${key} = "${value}"`;
    })
    .join('\n');
};

ConfiguExporters.register('TOML', jsonToToml);
