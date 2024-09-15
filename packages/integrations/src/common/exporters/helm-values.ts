import { camelCase } from 'change-case';
import _ from 'lodash';
import { dump as ymlStringify } from 'js-yaml';
import { ConfiguExporters, FormatterFunction } from '../../exporters';

// * Helm values naming convention is camel case (https://helm.sh/docs/chart_best_practices/values/)
const jsonToHelmValues: FormatterFunction = ({ json }) => {
  const camelCaseKeys = _.mapKeys(json, (v, k) => camelCase(k));
  return ymlStringify(camelCaseKeys);
};
ConfiguExporters.register('HelmValues', jsonToHelmValues);
