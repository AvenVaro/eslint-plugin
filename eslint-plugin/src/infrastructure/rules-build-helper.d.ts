import { JSONSchema4 } from 'json-schema';
import { EPropertyValue } from './property-value.enum.js';

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
  createEnumType(...enumValues: EPropertyValue[]): JSONSchema4;

  /**
   * Generates a JSON Schema definition for an integer-based type with a lower bound.
   *
   * This helper creates a Draft-4 compliant schema object that restricts acceptable values to whole numbers greater than or equal to the specified minimum value.
   *
   * @param minValue The minimum allowed integer value.
   *
   * @returns A strictly formatted JSON Schema object representing the integer constraints.
   */
  createIntegerType(minValue: number): JSONSchema4;

  /**
   * Generates a JSON Schema definition for a null type constraint.
   *
   * This helper creates a Draft-4 compliant schema object that restricts the acceptable value strictly to null, commonly used to clear or disable configurations.
   *
   * @returns A strictly formatted JSON Schema object representing the null constraint.
   */
  createNullType(): JSONSchema4;

  /**
   * Retrieves the list of property values that signify a disabled state.
   *
   * This helper returns a static collection of enumeration entries representing standard configurations used to deactivate specific rule features.
   *
   * @returns An array of disabled configuration values.
   */
  getPropertyValuesToDisable(): EPropertyValue[];
}

declare const rulesBuildHelper: RulesBuildHelper;

export default rulesBuildHelper;
