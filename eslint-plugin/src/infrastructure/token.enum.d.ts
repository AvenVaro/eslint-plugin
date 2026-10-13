/**
 * Represents an immutable dictionary mapping core syntactic punctuator tokens to their exact literal values.
 *
 * This contract establishes an explicit, compile-time frozen set of structural symbols
 * (such as statement terminators, element separators, and conditional ternary operator markers)
 * utilized by the parser to guarantee precise character comparisons.
 */
export type EToken = Readonly<{
  readonly semicolon: ';';
  readonly comma: ',';
  readonly question: '?';
  readonly colon: ':';
}>;

declare const eToken: EToken;

export default eToken;
