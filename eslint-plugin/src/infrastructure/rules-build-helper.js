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
  createEnumType: createEnumType,
  createIntegerType: createIntegerType,
  createNullType: createNullType,
  getPropertyValuesToDisable: getPropertyValuesToDisable
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
function createEnumType(...enumValues) {
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
function createIntegerType(minValue) {
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
function createNullType() {
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
