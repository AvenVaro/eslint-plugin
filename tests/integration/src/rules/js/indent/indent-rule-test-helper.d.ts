import { Linter } from 'eslint';
import { JsIndentOptions } from '../../../../../../src/rules/js/indent.js';
import { EPropertyValue } from '../../../../../../infrastructure/property-value.enum.js';

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
  createIndentRule(indent: number | EPropertyValue['tab'] | undefined, options: JsIndentOptions | undefined): Linter.Config['rules'];

  /**
   * Asynchronously orchestrates an end-to-end integration test execution by provisioning
   * transient filesystem configurations, parsing evaluation rule variants, and asserting
   * compliance results before triggering automated environmental cleanup.
   *
   * @param testTempRootDir - The root directory where the temporary test folders are created.
   * @param dirName - The specific name of the temporary directory for this test case.
   * @param editorconfig - The raw content or configuration string for the .editorconfig file.
   * @param indent - The target indentation step size (number of spaces) or hard tab token filter criteria.
   * @param options - Additional operational metadata parameter adjustments for the target rule logic.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
   *
   * @returns A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
   */
  tryExpectAsync(
    testTempRootDir: string,
    dirName: string,
    editorconfig: string,
    indent: number | EPropertyValue['tab'] | undefined,
    options: JsIndentOptions | undefined,
    brokenSourceCode: string,
    expectedFixedSourceCode: string
  ): Promise<void>;
}

declare const indentTestHelper: IndentTestHelper;

export default indentTestHelper;
