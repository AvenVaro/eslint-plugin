import ruleset from './ruleset.js';
import ePropertyValue from './infrastructure/property-value.enum.js';

import { jsIndentRuleDefaultValues } from './rules/js/indent.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('./index.d.ts').EslintPlugin} EslintPlugin
 */

//================================
// Constants
//================================

/** @type {EslintPlugin} */
const plugin = Object.freeze({
  rules: ruleset
});

//================================
// Exports
//================================

export default plugin;

export {
  ePropertyValue,
  jsIndentRuleDefaultValues
};
