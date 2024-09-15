import { ConfiguExporters } from '../../exporters';

ConfiguExporters.register('JSON', ({ json }) => JSON.stringify(json, null, 2));
ConfiguExporters.register('CompactJSON', ({ json }) => JSON.stringify(json));
