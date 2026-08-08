/**
 * Standardized immutable lookup tokens matching the exact string literal values used for proprties.
 */
export type PropertyValue = Readonly<{
  unset: 'unset';
  tab: 'tab';
  space: 'space';
  lf: 'lf';
  crlf: 'crlf';
}>;

declare const propertyValue: PropertyValue;

export default propertyValue;
