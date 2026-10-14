import * as vitest from 'vitest';
import { ePropertyValue } from '@avenvaro/eslint-plugin';
import rulesBuildHelper from '@avenvaro/eslint-plugin/src/infrastructure/rules-build-helper.js';
import eType from '@avenvaro/eslint-plugin/src/infrastructure/type.enum.js';
import eToken from '@avenvaro/eslint-plugin/src/infrastructure/token.enum.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('json-schema').JSONSchema4} JSONSchema4
 * @typedef {import('eslint').AST.Token} AstToken
 * @typedef {import('@avenvaro/eslint-plugin/src/infrastructure/type.enum.d.ts').EType} EType
 * @typedef {import('@avenvaro/eslint-plugin/src/infrastructure/token.enum.d.ts').EToken} EToken
 * @typedef {import('@avenvaro/eslint-plugin/src/infrastructure/property-value.enum.d.ts').EPropertyValue} EPropertyValue
 * @typedef {import('@avenvaro/eslint-plugin/src/infrastructure/editorconfig-provider.d.ts').IndentStyle} IndentStyle
 */

//================================
// Constants
//================================

/** @type {number} */
const propertyValue = 11;

/** @type {JSONSchema4} */
const property = Object.freeze({
  test_property_11: propertyValue
});

/** @type {EPropertyValue[]} */
const enumValues = [
  ePropertyValue.off,
  ePropertyValue.unset
];

//================================
// Tests
//================================

vitest.describe.concurrent('Rules Build Helper - Unit Testing', describe);

function describe() {
  vitest.it.concurrent(
    'createBooleanPropertySchema returns a valid schema. Property is undefined',
    () => test_PropertySchema(rulesBuildHelper.createBooleanPropertySchema(undefined), undefined, eType.boolean, undefined, undefined, undefined)
  );

  vitest.it.concurrent(
    'createBooleanPropertySchema returns a valid schema. Property is number',
    () => test_PropertySchema(rulesBuildHelper.createBooleanPropertySchema(property), propertyValue, eType.boolean, undefined, undefined, undefined)
  );

  vitest.it.concurrent(
    'createDisablePropertySchema returns a valid schema. Property is undefined',
    () => test_createDisablePropertySchema(undefined, undefined)
  );

  vitest.it.concurrent(
    'createDisablePropertySchema returns a valid schema. Property is number',
    () => test_createDisablePropertySchema(property, propertyValue)
  );

  vitest.it.concurrent(
    'createEnumPropertySchema returns a valid schema',
    () => test_PropertySchema(rulesBuildHelper.createEnumPropertySchema(...enumValues), undefined, eType.string, undefined, undefined, enumValues)
  );

  vitest.it.concurrent(
    'createIntegerPropertySchema returns a valid schema',
    () => test_PropertySchema(rulesBuildHelper.createIntegerPropertySchema(propertyValue), undefined, eType.integer, propertyValue, undefined, undefined)
  );

  vitest.it.concurrent(
    'createNullPropertySchema returns a valid schema',
    () => test_PropertySchema(rulesBuildHelper.createNullPropertySchema(undefined), undefined, eType.null, undefined, undefined, undefined)
  );

  vitest.it.concurrent(
    'getPropertyValuesToDisable returns a valid values',
    test_getPropertyValuesToDisable
  );

  // ---------------- getValueOrDefault ----------------

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is undefined. Default value is undefined',
    () => test_getValueOrDefault(undefined, undefined, undefined)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is null. Default value is undefined',
    () => test_getValueOrDefault(null, undefined, undefined)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is empty object. Default value is undefined',
    () => test_getValueOrDefault({}, undefined, undefined)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is off. Default value is undefined',
    () => test_getValueOrDefault(ePropertyValue.off, undefined, undefined)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is unset. Default value is undefined',
    () => test_getValueOrDefault(ePropertyValue.unset, undefined, undefined)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is undefined. Default value is number',
    () => test_getValueOrDefault(undefined, propertyValue, propertyValue)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is null. Default value is number',
    () => test_getValueOrDefault(null, propertyValue, propertyValue)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is empty object. Default value is number',
    () => test_getValueOrDefault({}, propertyValue, propertyValue)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is off. Default value is number',
    () => test_getValueOrDefault(ePropertyValue.off, propertyValue, propertyValue)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a default value. Value is unset. Default value is number',
    () => test_getValueOrDefault(ePropertyValue.unset, propertyValue, propertyValue)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a value. Value is string. Default value is undefined',
    () => test_getValueOrDefault(ePropertyValue.crlf, undefined, ePropertyValue.crlf)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a value. Value is string. Default value is number',
    () => test_getValueOrDefault(ePropertyValue.crlf, propertyValue, ePropertyValue.crlf)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a value. Value is number. Default value is undefined',
    () => test_getValueOrDefault(propertyValue, undefined, propertyValue)
  );

  vitest.it.concurrent(
    'getValueOrDefault returns a value. Value is nember. Default value is number',
    () => test_getValueOrDefault(propertyValue, propertyValue, propertyValue)
  );

  // ---------------- isUnset ----------------

  vitest.it.concurrent(
    'isUnset returns a true. Value is undefined',
    () => test_isUnset(undefined, true)
  );

  vitest.it.concurrent(
    'isUnset returns a true. Value is null',
    () => test_isUnset(null, true)
  );

  vitest.it.concurrent(
    'isUnset returns a true. Value is empty object',
    () => test_isUnset({}, true)
  );

  vitest.it.concurrent(
    'isUnset returns a true. Value is off',
    () => test_isUnset(ePropertyValue.off, true)
  );

  vitest.it.concurrent(
    'isUnset returns a true. Value is unset',
    () => test_isUnset(ePropertyValue.unset, true)
  );

  vitest.it.concurrent(
    'isUnset returns a false. Value is string',
    () => test_isUnset('ePropertyValue.unset', false)
  );

  vitest.it.concurrent(
    'isUnset returns a false. Value is number',
    () => test_isUnset(propertyValue, false)
  );

  vitest.it.concurrent(
    'isUnset returns a false. Value is boolean',
    () => test_isUnset(false, false)
  );

  // ---------------- createIndentString ----------------

  vitest.it.concurrent(
    'createIndentString returns empty string if indent is zero',
    () => test_createIndentString(0, ePropertyValue.space, '')
  );

  vitest.it.concurrent(
    'createIndentString returns empty string if indent is negative',
    () => test_createIndentString(-1, ePropertyValue.space, '')
  );

  vitest.it.concurrent(
    'createIndentString returns space string if indent is positive and indent style is space',
    () => test_createIndentString(2, ePropertyValue.space, '  ')
  );

  vitest.it.concurrent(
    'createIndentString returns tab string if indent is positive and indent style is tab',
    () => test_createIndentString(2, ePropertyValue.tab, '\t\t')
  );

  vitest.it.concurrent(
    'createIndentString throw TypeError if indent is positive and indent style is not IndentStyle',
    test_createIndentString_expectedTypeError
  );

  // ---------------- tokenIs ----------------

  vitest.it.concurrent(
    'isUnset returns a false if token is null',
    () => test_tokenIs(null, [ eToken.comma, eToken.question ], false)
  );

  vitest.it.concurrent(
    'isUnset returns a false if token does not match the values',
    () => test_tokenIs({ value: eToken.colon }, [ eToken.comma, eToken.question ], false)
  );

  vitest.it.concurrent(
    'isUnset returns a true if token match the values',
    () => test_tokenIs({ value: eToken.question }, [ eToken.comma, eToken.question ], true)
  );
}

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Asserts the structural integrity and expected constraints of a generated JSON Schema object.
 *
 * This test utility encapsulates a suite of Vitest expectations to validate core schema fields. It ensures that the target schema object exists (is neither undefined nor null) and checks its
 * type, minimum numeric limits, defined enums, and any sub-schema combinations length. Additionally, it verifies custom properties used to inject contextual test configurations into the schema.
 *
 * @param {JSONSchema4 | undefined} schema - The generated JSON Schema fragment instance to evaluate.
 * @param {number | undefined} expectedPropertyValue - The targeted value expected on the custom `test_property_11` metadata flag.
 * @param {EType | undefined} expectedType - The schema data type requirement constraint (e.g., 'integer', 'string').
 * @param {number | undefined} expectedMinimum - The numerical minimum bound expected on the validated schema property.
 * @param {number | undefined} expectedOneOfLength - The expected number of polymorphic variants or types defined inside the `oneOf` array array.
 * @param {EPropertyValue[] | undefined} expectedEnumValues - An ordered sequence of string or number constants allowed by the enum constraint.
 *
 * @returns {void}
 */
function test_PropertySchema(schema, expectedPropertyValue, expectedType, expectedMinimum, expectedOneOfLength, expectedEnumValues) {
  vitest.expect(schema).not.toBeUndefined();
  vitest.expect(schema).not.toBeNull();

  vitest.expect(schema.type).toBe(expectedType);
  vitest.expect(schema.minimum).toBe(expectedMinimum);
  vitest.expect(schema.enum).toStrictEqual(expectedEnumValues);

  vitest.expect(schema.oneOf?.length).toBe(expectedOneOfLength);

  vitest.expect(schema.test_property_11).toBe(expectedPropertyValue);
}

/**
 * @private
 *
 * Asserts the structural integrity of a polymorphic schema created to disable a rule property.
 *
 * This test utility evaluates the schema wrapper generated by `createDisablePropertySchema`. It verifies that the composite root correctly structures exactly two alternate sub-schema variants
 * (`oneOf`). It then drills down to validate that the first variant strictly mandates a `null` type, while the second variant enforces a `string` type constrained to valid property disabling enums.
 *
 * @param {JSONSchema4 | undefined} property - The base property schema fragment utilized as a blueprint.
 * @param {number | undefined} expectedPropertyValue - The targeted value expected on the custom `test_property_11` metadata flag.
 *
 * @returns {void}
 */
function test_createDisablePropertySchema(property, expectedPropertyValue) {
  const schema = rulesBuildHelper.createDisablePropertySchema(property);

  test_PropertySchema(schema, expectedPropertyValue, undefined, undefined, 2, undefined);
  test_PropertySchema(schema.oneOf[0], undefined, eType.null, undefined, undefined, undefined);
  test_PropertySchema(schema.oneOf[1], undefined, eType.string, undefined, undefined, enumValues);
}

/**
 * @private
 *
 * Asserts the correctness of the configuration array containing property disabling constants.
 *
 * This test utility evaluates the return value from `getPropertyValuesToDisable`. It ensures that the retrieved collection is securely instantiated (neither undefined nor null) and strictly
 * matches the exact, pre-defined literal enum values required by the rules builder engine to deactivate specific property checks.
 *
 * @returns {void}
 */
function test_getPropertyValuesToDisable() {
  const values = rulesBuildHelper.getPropertyValuesToDisable();

  vitest.expect(values).not.toBeUndefined();
  vitest.expect(values).not.toBeNull();
  vitest.expect(values).toStrictEqual(enumValues);
}

/**
 * @private
 *
 * Asserts the correctness of the dynamic fallback value resolution utility.
 *
 * This parameterized test utility evaluates the behavior of `getValueOrDefault` across different data type inputs. It passes an optional value alongside a designated fallback
 * default value, executes the resolution pipeline, and utilizes Vitest to strictly match the result against the expected benchmark target.
 *
 * @template TValue - The generic data type parameter processed by the resolution hook.
 *
 * @param {TValue | undefined} value - The primary, optional input value being evaluated (can be undefined to trigger fallback).
 * @param {TValue} defaultValue - The designated fallback constant value applied when the primary input is absent or unset.
 * @param {TValue} expectedValue - The strict target outcome expected to pass the Vitest assertion.
 *
 * @returns {void}
 */
function test_getValueOrDefault(value, defaultValue, expectedValue) {
  const actualValue = rulesBuildHelper.getValueOrDefault(value, defaultValue);

  vitest.expect(actualValue).toBe(expectedValue);
}

/**
 * @private
 *
 * Asserts the correctness of the validation utility that checks if a configuration value is unset.
 *
 * This test utility evaluates the behavior of `isUnset` by passing various inputs (such as null, undefined, or initialized values) and uses Vitest to strictly verify whether the engine correctly
 * identifies them as unconfigured or absent states according to the expected boolean blueprint.
 *
 * @param {any} value - The raw input parameter or configuration block state being checked for an unset condition.
 * @param {boolean} expextedResult - The strict targeted boolean outcome expected to pass the Vitest assertion.
 *
 * @returns {void}
 */
function test_isUnset(value, expextedResult) {
  const actualResult = rulesBuildHelper.isUnset(value);

  vitest.expect(actualResult).toBe(expextedResult);
}

/**
 * @private
 *
 * Asserts the correctness of the utility that synthesizes indentation strings.
 *
 * This test utility evaluates the behavior of `createIndentString` by passing a target indentation multiplier and an active style format (e.g., spaces or tabs). It uses Vitest
 * to strictly verify whether the engine correctly constructs the resulting leading whitespace character sequence according to the expected string blueprint.
 *
 * @param {number} indent - The target indentation size multiplier or layout depth value.
 * @param {IndentStyle} indent - The active structural format constraint (e.g., spaces or tabs) determining the whitespace character type.
 * @param {string} expextedResult - The strict targeted string sequence expected to pass the Vitest assertion.
 *
 * @returns {void}
 */
function test_createIndentString(indent, indentStyle, expextedResult) {
  const actualResult = rulesBuildHelper.createIndentString(indent, indentStyle);

  vitest.expect(actualResult).toBe(expextedResult);
}

/**
 * @private
 *
 * Asserts that the indentation string generator rejects invalid style configurations with a descriptive error.
 *
 * This negative test case verifies the runtime argument validation of `createIndentString`. It passes an unsupported configuration property (such as `crlf`) as the indentation style factor
 * and utilizes Vitest to strictly ensure that the execution chain immediately fails and throws an explicit, type-compliant error message.
 *
 * @returns {void}
 */
function test_createIndentString_expectedTypeError() {
  vitest
    .expect(() => test_createIndentString(2, ePropertyValue.crlf, undefined))
    .toThrow(`The 'indentStyle' must be '${ePropertyValue.space}' or '${ePropertyValue.tab}'.`)
  ;
}

/**
 * @private
 *
 * Asserts the correctness of the token literal verification utility.
 *
 * This test utility evaluates the behavior of `tokenIs` under varied conditions, accepting a nullable token instance and a sequence of expected token constants. It leverages a spread operator to forward
 * the criteria down into the evaluation engine, ensuring that Vitest strictly matches the resulting predicate boolean against the expected benchmark target.
 *
 * @param {AstToken | null} token
 * @param {EToken[]} values
 * @param {boolean} expextedResult
 *
 * @returns {void}
 */
function test_tokenIs(token, values, expextedResult) {
  const actualResult = rulesBuildHelper.tokenIs(token, ...values);

  vitest.expect(actualResult).toBe(expextedResult);
}
