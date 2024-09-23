import validator from 'validator';
import { ConfiguExpressions } from '../../expressions';

ConfiguExpressions.register('isInit', validator.isInt);
