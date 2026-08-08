import { ESLint, Linter } from 'eslint';
import { CodeProcessingResult } from '../rules-test-helper.js';
import { IntegrationTestFilesystemBlueprint } from '../../../integration-tests-test-helper.js';

/**
 * Helper for testing the JavaScript rules.
 */
export interface JSRulesTestHelper {
  /**
   * Initializes an isolated instance of the ESLint engine in memory for JavaScript files (**\/*.js).
   *
   * @param rules - An object containing the configured rules matching the target Linter scheme.
   * @param fix - Flag that enables generation of automatic code fixes at the linter core level.
   * @param rootDirPath - Current working diectory path.
   *
   * @returns A configured instance of the ESLint class, ready to lint strings in memory.
   */
  createESLlintEngine(rules: Linter.Config['rules'], fix: boolean, rootDirPath: string | undefined): ESLint;

  /**
   * Executes the linting pipeline on the raw source code payload using a baseline virtual JavaScript module filename placeholder.
   *
   * @param eslintEngine - An active, pre-configured instance of the ESLint core processor.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   *
   * @returns A promise that resolves to the primary evaluation metrics record mapping the processed file.
   */
  runESLintEngineAsync(eslintEngine: ESLint, brokenSourceCode: string): Promise<ESLint.LintResult>;

  /**
   * Orchestrates dual-mode execution passes on raw source contents using a specialized, pre-configured JavaScript file targeting path.
   *
   * @param rules - An object containing the configured rules matching the target Linter scheme.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   *
   * @returns A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
   */
  executeCodeProcessingAsync(rules: Linter.Config['rules'], brokenSourceCode: string): Promise<CodeProcessingResult>;

  /**
   * Orchestrates dual-mode execution passes on raw source contents targeting a specific file path.
   *
   * @param rules - An object containing the configured rules matching the target Linter scheme.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
   *
   * @returns A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
   */
  executeCodeProcessingWithPathsAsync(rules: Linter.Config['rules'], brokenSourceCode: string, paths: IntegrationTestFilesystemBlueprint): Promise<CodeProcessingResult>;
}

declare const jsRulesTestHelper: JSRulesTestHelper;

export default jsRulesTestHelper;
