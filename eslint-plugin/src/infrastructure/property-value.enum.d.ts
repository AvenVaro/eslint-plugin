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
}>;

declare const ePropertyValue: EPropertyValue;

export default ePropertyValue;
