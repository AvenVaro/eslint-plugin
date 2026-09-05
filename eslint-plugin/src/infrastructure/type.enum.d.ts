/**
 * A runtime lookup dictionary mapping native JavaScript data type categories to their corresponding `typeof` string literals.
 *
 * Provides structural type-safety and auto-completion when assessing variable primitives, references, and executable functions.
 */
export type EType = Readonly<{
  readonly undefined: 'undefined';
  readonly object: 'object';
  readonly number: 'number';
  readonly string: 'string';
  readonly boolean: 'boolean';
  readonly function: 'function';
  readonly symbol: 'symbol';
  readonly bigint: 'bigint';
  readonly integer: 'integer';
  readonly array: 'array';
  readonly null: 'null';
  readonly any: 'any';
}>;

declare const eType: EType;

export default eType;
