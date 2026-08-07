import { ESLint, Linter } from 'eslint';
import { Props } from 'editorconfig';
import { EditorconfigProvider } from '../infrastructure/editorconfig-provider.js';

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
 * Declares the core configuration manager contract for setting up parent ESLint engine instances.
 */
export interface EslintHelper {
  /**
   * Initializes a baseline isolated instance of the ESLint engine in memory.
   *
   * @param files - An array of glob patterns defining which source files the configuration block should apply to.
   * @param rules - An object containing the configured rules matching the target Linter scheme.
   * @param fix - Flag that enables generation of automatic code fixes at the linter core level.
   *
   * @returns A configured instance of the ESLint class, ready to lint strings in memory.
   */
  createESLlintEngine(files: string[], rules: Linter.Config['rules'], fix: boolean): ESLint;

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
   * @param filePath - The destination target path or mock location identifier to bind to the validation loop.
   *
   * @returns A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
   */
  executeCodeProcessingAsync(files: string[], rules: Linter.Config['rules'], brokenSourceCode: string, filePath: string): Promise<CodeProcessingResult>;
}

/**
 * Declares the high-level testing ecosystem infrastructure contract.
 */
export interface TestHelper {
  /** Multi-layered engine generation namespace containing factory abstractions for setting up code linters. */
  readonly eslintHelper: EslintHelper;

  /**
   * Asynchronously creates a mocked instance of the editorconfig provider.
   * Intercepts the underlying 'editorconfig' engine core dependency using esmock.
   *
   * @param config - The predefined configuration properties to return from the mock.
   *
   * @returns A promise resolving directly to the mocked editorconfig provider module wrapper.
   *
   * @throws {Error} Thrown if esmock fails to resolve, initialize, or load the module payload.
   */
  getMockedEditorconfigProviderAsync(config: Props): Promise<EditorconfigProvider>;

  /**
   * Assembles a structured multi-line source text file template string from a sequential token line array block.
   *
   * @param codeArray - A sequential collection of raw source code content line strings.
   * @param insertEOL - Appends an empty string token at the EOF array index to enforce trailing newline normalization.
   *
   * @returns A concatenated multi-line source execution file payload string.
   */
  convertCodeArrayToCodeString(codeArray: string[], insertEOL?: boolean): string;

  /**
   * Assertively validates structural equality between properties of an actual ESLint evaluation result and an expected result blueprint.
   *
   * @param actualResult - The live evaluation metric record returned from the active execution pipeline block.
   * @param expectedResult - The baseline expectation blueprint object mapping reference layout values.
   *
   * @returns void
   */
  expectResult(actualResult: ESLint.LintResult, expectedResult: ESLint.LintResult): void;
}

declare const testHelper: TestHelper;

export default testHelper;
