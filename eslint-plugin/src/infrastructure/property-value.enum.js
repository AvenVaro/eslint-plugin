//================================
// Typedefs
//================================

/**
 * @typedef {import('./property-value.enum.d.ts').EPropertyValue} EPropertyValue
 */

//================================
// Constants
//================================

/** @type {EPropertyValue} */
const ePropertyValue = Object.freeze({
  unset: 'unset',
  tab: 'tab',
  space: 'space',
  lf: 'lf',
  crlf: 'crlf',
  off: 'off',
  first: 'first',
  latin1: 'latin1',
  utf8: 'utf-8',
  utf8bom: 'utf-8-bom',
  utf16be: 'utf-16be',
  utf16le: 'utf-16le'
});

//================================
// Exports
//================================

export default ePropertyValue;
