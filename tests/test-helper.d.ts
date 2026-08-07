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
 * Declares the high-level testing ecosystem infrastructure contract.
 */
export interface TestHelper {
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
}

declare const testHelper: TestHelper;

export default testHelper;
