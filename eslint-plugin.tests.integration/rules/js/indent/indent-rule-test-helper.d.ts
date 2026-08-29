import { Linter } from 'eslint';
import { JsIndentOptionsTuple } from '@avenvaro/eslint-plugin';

/**
 * Helper for testing the identity rule.
 */
export interface IndentRuleTestHelper {
  /**
   * Constructs a standardized ESLint rules configuration payload block specifically targeting the custom indentation rule.
   *
   * @param indentOptionsTuple - The configuration array passed to the rule options.
   *
   * @returns A compliant rules dictionary mapping the generated configuration payload to the custom namespace selector.
   */
  createIndentRule(indentOptionsTuple: JsIndentOptionsTuple): Linter.Config['rules'];

  /**
   * Asynchronously orchestrates an end-to-end integration test execution by provisioning
   * transient filesystem configurations, parsing evaluation rule variants, and asserting
   * compliance results before triggering automated environmental cleanup.
   *
   * @param testTempRootDir - The root directory where the temporary test folders are created.
   * @param dirName - The specific name of the temporary directory for this test case.
   * @param editorconfig - The raw content or configuration string for the .editorconfig file.
   * @param indentOptionsTuple - The configuration array passed to the rule options.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
   *
   * @returns A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
   */
  expectAsync(
    testTempRootDir: string,
    dirName: string,
    editorconfig: string,
    indentOptionsTuple: JsIndentOptionsTuple,
    brokenSourceCode: string,
    expectedFixedSourceCode: string
  ): Promise<void>;

  /**
   * Asynchronously orchestrates an end-to-end integration test execution by provisioning
   * transient filesystem configurations, parsing evaluation rule variants, and asserting
   * compliance results before triggering automated environmental cleanup.
   *
   * @param testTempRootDir - The root directory where the temporary test folders are created.
   * @param dirName - The specific name of the temporary directory for this test case.
   * @param editorconfig - The raw content or configuration string for the .editorconfig file.
   * @param indentOptionsTuple - The configuration array passed to the rule options.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
   *
   * @returns A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
   */
  expectErrorAsync(
    testTempRootDir: string,
    dirName: string,
    editorconfig: string,
    indentOptionsTuple: JsIndentOptionsTuple,
    brokenSourceCode: string,
    expectedFixedSourceCode: string
  ): Promise<void>;
}

declare const indentTestHelper: IndentRuleTestHelper;

export default indentTestHelper;
