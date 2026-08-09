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
  first: 'first'
});

//================================
// Exports
//================================

export default ePropertyValue;
