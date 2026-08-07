import { Linter } from 'eslint';
import { JsIndentOptions } from '../../../../../../src/rules/js/indent.js';

/**
 * Helper for testing the identity rule.
 */
export interface IndentTestHelper {
  /**
   * Constructs a standardized ESLint rules configuration payload block specifically targeting the custom indentation rule.
   *
   * @param indent - The target indentation step size (number of spaces) or hard tab token filter criteria.
   * @param options - Additional operational metadata parameter adjustments for the target rule logic.
   *
   * @returns A compliant rules dictionary mapping the generated configuration payload to the custom namespace selector.
   */
  createIndentRule(indent: number | 'tab' | undefined, options: JsIndentOptions | undefined): Linter.Config['rules'];
}

declare const indentTestHelper: IndentTestHelper;

export default indentTestHelper;
