import indentJS from './rules/js/indent.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('eslint').ESLint.Plugin['rules']} Ruleset
 */

//================================
// Constants
//================================

/** @type {Ruleset} */
const ruleset = Object.freeze({
  'js/indent': indentJS
});

//================================
// Exports
//================================

export default ruleset;
