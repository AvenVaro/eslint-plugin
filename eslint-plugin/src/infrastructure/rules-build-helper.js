import ePropertyValue from './property-value.enum.js';
import eType from './type.enum.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('./rules-build-helper.d.ts').RulesBuildHelper} RulesBuildHelper
 * @typedef {import('./property-value.enum.d.ts').EPropertyValue} EPropertyValue
 * @typedef {import('json-schema').JSONSchema4} JSONSchema4
 */

//================================
// Constants
//================================

/** @type {RulesBuildHelper} */
const rulesBuildHelper = Object.freeze({
  createEnumPropertySchema: createEnumPropertySchema,
  createIntegerPropertySchema: createIntegerPropertySchema,
  createNullPropertySchema: createNullPropertySchema,
  getPropertyValuesToDisable: getPropertyValuesToDisable,
  getValueOrDefault: getValueOrDefault,
  isUnset: isUnset
});

//================================
// Exports
//================================

export default rulesBuildHelper;

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Generates a JSON Schema definition for a string-based enum type.
 *
 * This helper creates a Draft-4 compliant schema object that restricts acceptable values to the provided array of enumeration entries.
 *
 * @param {EPropertyValue[]} enumValues - The list of allowed string values (EPropertyValue).
 *
 * @returns {JSONSchema4} A valid JSON Schema object representing the enum constraint.
 */
function createEnumPropertySchema(...enumValues) {
  return {
    type: eType.string,
    enum: enumValues
  };
}

/**
 * @private
 *
 * Generates a JSON Schema definition for an integer-based type with a lower bound.
 *
 * This helper creates a Draft-4 compliant schema object that restricts
 * acceptable values to whole numbers greater than or equal to the specified minimum value.
 *
 * @param {number} minValue - The minimum allowed integer value.
 *
 * @returns {JSONSchema4} A valid JSON Schema object representing the integer constraint.
 */
function createIntegerPropertySchema(minValue) {
  return {
    type: eType.integer,
    minimum: minValue
  };
}

/**
 * @private
 *
 * Generates a JSON Schema definition for a null type constraint.
 *
 * This helper creates a Draft-4 compliant schema object that restricts
 * the acceptable value strictly to null, commonly used to clear or disable configurations.
 *
 * @returns {JSONSchema4} A valid JSON Schema object representing the null constraint.
 */
function createNullPropertySchema() {
  return {
    type: eType.null
  };
}

/**
 * @private
 *
 * Retrieves the list of property values that signify a disabled state.
 *
 * This helper returns a static collection of enumeration entries representing standard configurations used to deactivate specific rule features.
 *
 * @returns {EPropertyValue[]} An array of disabled configuration values.
 */
function getPropertyValuesToDisable() {
  return [
    ePropertyValue.off,
    ePropertyValue.unset
  ];
}

/**
 * Resolves a configuration value, falling back to a default value if the target is unset.
 *
 * This utility acts as a safety layer to guarantee a non-nullable or fully initialized
 * value is returned when working with optional or unconfigured rule properties.
 *
 * @template TValue - The type of the configuration value.
 *
 * @param {TValue | undefined} value - The input configuration value to check.
 * @param {TValue} defaultValue - The fallback value to return if the input is unset.
 *
 * @returns {TValue} The original value if it is set; otherwise, the default value.
 */
function getValueOrDefault(value, defaultValue) {
  if (isUnset(value)) {
    return defaultValue;
  }

  return value;
}

/**
 * @private
 *
 * Evaluates whether a configuration value is unassigned, null, or represents an empty structural block, or value is equals 'off' or 'unset'.
 *
 * @param {any} value - The runtime configuration asset or property to check.
 *
 * @returns {boolean} True if the value represents an empty or unassigned state, otherwise false.
 */
function isUnset(value) {
  return value === undefined
    || (typeof value === eType.object && (value === null || Object.keys(value).length === 0))
    || (typeof value === eType.string && (value === ePropertyValue.off || value === ePropertyValue.unset))
  ;
}
