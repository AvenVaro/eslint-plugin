import ePropertyValue from './infrastructure/property-value.enum.js';

import { default as indentJS, jsIndentRuleDefaultValues } from './rules/js/indent.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('./index.d.ts').EslintPlugin} EslintPlugin
 * @typedef {import('eslint').ESLint.Plugin['rules']} Ruleset
 */

//================================
// Constants
//================================

/** @type {Ruleset} */
const ruleset = Object.freeze({
  'js/indent': indentJS
});

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
