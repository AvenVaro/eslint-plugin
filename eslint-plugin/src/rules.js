import indentJS from './rules/js/indent.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('eslint').ESLint.Plugin['rules']} Rules
 */

//================================
// Constants
//================================

/** @type {Rules} */
const rules = Object.freeze({
  'js/indent': indentJS
});

//================================
// Exports
//================================

export default rules;
