//================================
// Typedefs
//================================

/**
 * @typedef {import('./token.enum.d.ts').EToken} EToken
 */

//================================
// Constants
//================================

/** @type {EToken} */
const eToken = Object.freeze({
  semicolon: ';',
  comma: ',',
  question: '?',
  colon: ':'
});

//================================
// Exports
//================================

export default eToken;
