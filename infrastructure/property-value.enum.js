//================================
// Typedefs
//================================

/**
 * @typedef {import('./property-value.enum.d.ts').PropertyValue} PropertyValue
 */

//================================
// Constants
//================================

/** @type {PropertyValue} */
const propertyValue = Object.freeze({
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

export default propertyValue;
