import { ESLint, Linter } from 'eslint';
import { FilesystemBlueprint } from '../test-helper.js';

/**
 * Linting result.
 */
export interface CodeProcessingResult {
  /** Linting result with automatic error correction. */
  withFix: ESLint.LintResult;

  /** Linting result in read-only mode (without fixes). */
  withoutFix: ESLint.LintResult;
}

/**
 * Helper for testing the rules.
 */
export interface RulesTestHelper {
  /**
   * Initializes a baseline isolated instance of the ESLint engine in memory.
   *
   * @param files - An array of glob patterns defining which source files the configuration block should apply to.
   * @param rules - An object containing the configured rules matching the target Linter scheme.
   * @param fix - Flag that enables generation of automatic code fixes at the linter core level.
   * @param rootDirPath - Current working diectory path.
   *
   * @returns A configured instance of the ESLint class, ready to lint strings in memory.
   */
  createESLlintEngine(files: string[], rules: Linter.Config['rules'], fix: boolean, rootDirPath: string | undefined): ESLint;

  /**
   * Executes the linting pipeline on the raw source code payload using the provided ESLint engine and absolute or virtual file path constraints.
   *
   * @param eslintEngine - An active, pre-configured instance of the ESLint core processor.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param filePath - The destination target path or mock location identifier to bind to the validation loop.
   *
   * @returns A promise that resolves to the primary evaluation metrics record mapping the processed file.
   */
  runESLintEngineAsync(eslintEngine: ESLint, brokenSourceCode: string, filePath: string): Promise<ESLint.LintResult>;

  /**
   * Orchestrates dual-mode execution passes, running text evaluation routines both with and without core automatic code re-alignment behaviors.
   *
   * @param files - An array of glob patterns defining which source files the configuration block should apply to.
   * @param rules - An object containing the configured rules matching the target Linter scheme.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
   *
   * @returns A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
   */
  executeCodeProcessingAsync(files: string[], rules: Linter.Config['rules'], brokenSourceCode: string, paths: FilesystemBlueprint): Promise<CodeProcessingResult>;

  /**
   * Assertively validates structural equality between properties of an actual ESLint evaluation result and an expected result blueprint.
   *
   * @param actualResult - The live evaluation metric record returned from the active execution pipeline block.
   * @param expectedResult - The baseline expectation blueprint object mapping reference layout values.
   * @param skip - Skip the check if there is nothing to fix.
   *
   * @returns void
   */
  expectResult(actualResult: ESLint.LintResult, expectedResult: ESLint.LintResult, skip: boolean): void;

  /**
   * Assertively validates structural equality between properties of an actual ESLint evaluation result and an expected result blueprint.
   *
   * @param results - The comprehensive metric configuration payload mapping both code execution passes.
   * @param expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
   * @param brokenSourceCode - The raw source text payload containing potential layout variations.
   * @param errorCount - The optional number of errors for the result.
   *
   * @returns void
   */
  expectResults(results: CodeProcessingResult, expectedFixedSourceCode: string, brokenSourceCode: string, errorCount?: number): void;
}

declare const rulesTestHelper: RulesTestHelper;

export default rulesTestHelper;
