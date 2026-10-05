/**
 * Standardized immutable lookup tokens matching the exact string literal values used for proprties.
 */
export type EPropertyValue = Readonly<{
  readonly unset: 'unset';
  readonly tab: 'tab';
  readonly space: 'space';
  readonly lf: 'lf';
  readonly crlf: 'crlf';
  readonly off: 'off';
  readonly first: 'first';
  readonly latin1: 'latin1';
  readonly utf8: 'utf-8';
  readonly utf8bom: 'utf-8-bom';
  readonly utf16be: 'utf-16be';
  readonly utf16le: 'utf-16le';
}>;

declare const ePropertyValue: EPropertyValue;

export default ePropertyValue;
