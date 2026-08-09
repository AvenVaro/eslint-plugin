/**
 * Standardized immutable lookup tokens matching the exact string literal values used for proprties.
 */
export type EPropertyValue = Readonly<{
  unset: 'unset';
  tab: 'tab';
  space: 'space';
  lf: 'lf';
  crlf: 'crlf';
  off: 'off';
  first: 'first';
}>;

declare const ePropertyValue: EPropertyValue;

export default ePropertyValue;
