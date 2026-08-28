import ruleset from './ruleset.js';
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
  rules: ruleset
});

//================================
// Exports
//================================

export default plugin;

export { ePropertyValue };
