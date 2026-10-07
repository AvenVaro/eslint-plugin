import { Linter } from 'eslint';
import { Props } from 'editorconfig';
import { JsIndentOptionsTuple, IndentSize } from '@avenvaro/eslint-plugin';

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
   * Asynchronously orchestrates an end-to-end integration test execution by provisioning transient filesystem configurations, parsing evaluation rule variants, and asserting
   * compliance results before triggering automated environmental cleanup.
   *
   * @param testTempRootDir - The root directory where the temporary test folders are created.
   * @param dirName - The specific name of the temporary directory for this test case.
   * @param editorconfig - The raw content or configuration string for the .editorconfig file.
   * @param indentOptionsTuple - The configuration array passed to the rule options.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
   * @param errorCount - The optional number of errors for the result.
   *
   * @returns A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
   */
  expectAsync(
    testTempRootDir: string,
    dirName: string,
    editorconfig: string,
    indentOptionsTuple: JsIndentOptionsTuple,
    brokenSourceCode: string,
    expectedFixedSourceCode: string,
    errorCount?: number
  ): Promise<void>;

  /**
   * Evaluates indentation parameters to determine the resulting violation count.
   *
   * This utility acts as a conditional counter validator for rule assertions. If the expected indentation layout matches the actual parsed layout, it returns zero violations. Otherwise,
   * it reports the registered error block count, supporting either a standard single violation or a customized multi-error evaluation scale.
   *
   * @param expectedIndent - The targeted, calculated indentation layout configuration block.
   * @param actualIndent - The live, parsed indentation layout tracked from the code environment.
   * @param errorCount - An optional fallback multiplier specifying the number of violation blocks to charge if mismatch occurs.
   *
   * @returns The evaluated number of indentation error counts (either `0` or the active `errorCount`).
   */
  calculateErrorCount(expectedIndent: IndentSize, actualIndent: IndentSize, errorCount?: number): number;

  /**
   * Normalizes base indentation properties into a structured formatting record.
   *
   * This factory function evaluates the requested indentation identifier to synthesize a standardized `Props` configuration instance. When configured to use tabs, it aligns both
   * the indentation size metric and visual block scale to match the provided tab width value. For explicit space configurations, it enforces space-based constraints paired with
   * the target indentation dimension.
   *
   * @param indent - The raw target indentation size value or style identifier (e.g., a specific number of spaces or a tab flag).
   * @param tabWidth - The fallback visual spacing width allocated per single tab character token.
   *
   * @returns A fully populated, normalized properties configuration record representing the resolved indentation state.
   */
  createIndentSettings(indent: IndentSize, tabWidth?: number): Props;
}

declare const indentTestHelper: IndentRuleTestHelper;

export default indentTestHelper;
