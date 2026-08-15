import rules from './rules/rules.js';
import ePropertyValue from './infrastructure/property-value.enum.js';

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
  rules: rules
});

//================================
// Exports
//================================

export default plugin;

export { ePropertyValue };
