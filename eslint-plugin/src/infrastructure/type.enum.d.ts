/**
 * A runtime lookup dictionary mapping native JavaScript data type categories to their corresponding `typeof` string literals.
 *
 * Provides structural type-safety and auto-completion when assessing variable primitives, references, and executable functions.
 */
export type EType = Readonly<{
  undefined: 'undefined';
  object: 'object';
  number: 'number';
  string: 'string';
  boolean: 'boolean';
  function: 'function';
  symbol: 'symbol';
  bigint: 'bigint';
  integer: 'integer';
}>;

declare const eType: EType;

export default eType;
