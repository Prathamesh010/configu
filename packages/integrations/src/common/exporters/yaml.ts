import { dump as ymlStringify } from 'js-yaml';
import { ConfiguExporters } from '../../exporters';

ConfiguExporters.register('YAML', ({ json }) => ymlStringify(json));
