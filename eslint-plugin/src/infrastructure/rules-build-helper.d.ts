import { JSONSchema4 } from 'json-schema';
import { EPropertyValue } from './property-value.enum.js';

/**
 * Specifies the value of the disabled property, which can be either 'unset' or 'off'.
 */
export type DisableProperty = EPropertyValue['off'] | EPropertyValue['unset'];

/**
 * A utility helper interface designed to simplify the construction and type generation
 * of Draft-4 compliant JSON Schema objects within ESLint rule definitions.
 *
 * Provides highly specialized factory methods to abstract repetitive structural schema declarations
 * into predictable, strictly typed API methods.
 */
export interface RulesBuildHelper {
  /**
   * Generates a JSON Schema definition for a string-based enum type.
   *
   * This helper creates a Draft-4 compliant schema object that restricts acceptable values to the provided array of enumeration entries.
   *
   * @param enumValues The list of allowed string values (EPropertyValue).
   *
   * @returns A valid JSON Schema object representing the enum constraint.
   */
  createEnumPropertySchema(...enumValues: EPropertyValue[]): JSONSchema4;

  /**
   * Generates a JSON Schema definition for an integer-based type with a lower bound.
   *
   * This helper creates a Draft-4 compliant schema object that restricts acceptable values to whole numbers greater than or equal to the specified minimum value.
   *
   * @param minValue The minimum allowed integer value.
   *
   * @returns A strictly formatted JSON Schema object representing the integer constraints.
   */
  createIntegerPropertySchema(minValue: number): JSONSchema4;

  /**
   * Generates a JSON Schema definition for a null type constraint.
   *
   * This helper creates a Draft-4 compliant schema object that restricts the acceptable value strictly to null, commonly used to clear or disable configurations.
   *
   * @returns A strictly formatted JSON Schema object representing the null constraint.
   */
  createNullPropertySchema(): JSONSchema4;

  /**
   * Retrieves the list of property values that signify a disabled state.
   *
   * This helper returns a static collection of enumeration entries representing standard configurations used to deactivate specific rule features.
   *
   * @returns An array of disabled configuration values.
   */
  getPropertyValuesToDisable(): EPropertyValue[];

  /**
   * Resolves a configuration value, falling back to a default value if the target is unset.
   *
   * This utility acts as a safety layer to guarantee a non-nullable or fully initialized value is returned when working with optional or unconfigured rule properties.
   *
   * @param value The input configuration value to check.
   * @param defaultValue The fallback value to return if the input is unset.
   *
   * @returns The original value if it is set; otherwise, the default value.
   */
  getValueOrDefault<TValue>(value: TValue | undefined, defaultValue: TValue): TValue;

  /**
   * Evaluates whether a configuration value is unassigned, null, or represents an empty structural block, or value is equals 'off' or 'unset'.
   *
   * @param value The runtime configuration asset or property to check.
   *
   * @returns True if the value represents an empty or unassigned state, otherwise false.
   */
  isUnset(value: any): boolean;
}

declare const rulesBuildHelper: RulesBuildHelper;

export default rulesBuildHelper;
