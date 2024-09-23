import { dump as ymlStringify } from 'js-yaml';
import { ConfiguExporters, FormatterFunction } from '../../exporters';

const DEFAULT_API_VERSION = 'v1';
const DEFAULT_KIND = 'ConfigMap';
const jsonToKubernetesConfigMap: FormatterFunction = ({ json, label }) => {
  const jsonConfigMap = {
    apiVersion: DEFAULT_API_VERSION,
    kind: DEFAULT_KIND,
    metadata: {
      creationTimestamp: new Date().toISOString(),
      name: label.toLowerCase(),
    },
    data: json,
  };

  return ymlStringify(jsonConfigMap);
};
ConfiguExporters.register('KubernetesConfigMap', jsonToKubernetesConfigMap);
