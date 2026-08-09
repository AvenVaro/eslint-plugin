//================================
// Typedefs
//================================

/**
 * @typedef {import('./type.enum.d.ts').EType} EType
 */

//================================
// Constants
//================================

/** @type {EType} */
const eType = Object.freeze({
  undefined: 'undefined',
  object: 'object',
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  function: 'function',
  symbol: 'symbol',
  bigint: 'bigint'
});

//================================
// Exports
//================================

export default eType;
