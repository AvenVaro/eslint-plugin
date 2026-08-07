import esmock from 'esmock';
import { ESLint } from 'eslint';
import avenvaro from '../src/index.js';

/** @type {import('./test-helper.d.ts').EslintHelper} */
const eslintHelper = Object.freeze({
  createESLlintEngine: createESLlintEngine,
  runESLintEngineAsync: runESLintEngineAsync,
  executeCodeProcessingAsync: executeCodeProcessingAsync
});

/** @type {import('./test-helper.d.ts').TestHelper} */
const testHelper = Object.freeze({
  eslintHelper: eslintHelper,
  getMockedEditorconfigProviderAsync: getMockedEditorconfigProviderAsync,
  convertCodeArrayToCodeString: convertCodeArrayToCodeString
});

//================================
// Exports
//================================

export default testHelper;

//================================
// Private Functions
//================================

/**
 * @private
 * @async
 *
 * Asynchronously creates a mocked instance of the editorconfig provider.
 * Uses `esmock` to intercept the `editorconfig` dependency and inject a mock `parseSync` function.
 *
 * @param {import('editorconfig').Props} config - The predefined configuration properties to return from the mock.
 *
 * @returns {Promise<import('../infrastructure/editorconfig-provider.d.ts').EditorconfigProvider>} A promise that resolves to the mocked editorconfig provider module.
 *
 * @throws {Error} Thrown if esmock fails to resolve, initialize, or load the mocked module target payload.
 */
async function getMockedEditorconfigProviderAsync(config) {
  const provider = await esmock(
    '../infrastructure/editorconfig-provider.js',
    {
      editorconfig: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        parseSync: (filePath) => config
      }
    }
  );

  if (provider) {
    return provider.default || provider;
  }

  throw new Error('Error mocking editorconfig provider.');
}

/**
 * Assembles a structured multi-line source text file template string from a sequential token line array block.
 * **Warning:** Passing a mutable reference to the `codeArray` parameter will mutate the source array if `insertEOL` evaluates to true.
 *
 * @param {string[]} codeArray - A sequential collection of raw source code content line strings.
 * @param {boolean} [insertEOL=true] - Appends an empty string token at the EOF array index to enforce trailing newline normalization.
 *
 * @returns {string} A concatenated multi-line source execution file payload string.
 */
function convertCodeArrayToCodeString(codeArray, insertEOL = true) {
  if (insertEOL) {
    codeArray.push('');
  }

  return codeArray.join('\n');
}

/**
 * @private
 *
 * Initializes an isolated instance of the ESLint engine in memory.
 *
 * @param {string[]} files - An array of glob patterns defining which source files the configuration block should apply to.
 * @param {import('eslint').Linter.Config['rules']} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {boolean} fix - Flag that enables generation of automatic code fixes at the linter core level.
 *
 * @returns {import('eslint').ESLint} A configured instance of the ESLint class, ready to lint strings in memory.
 */
function createESLlintEngine(files, rules, fix) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: files,
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module'
        },
        plugins: {
          'avenvaro': avenvaro
        },
        rules: rules
      }
    ],
    fix: fix
  });
}

/**
 * @private
 * @async
 *
 * Executes the linting pipeline on the raw source code payload using the provided ESLint engine and absolute or virtual file path constraints.
 *
 * @param {import('eslint').ESLint} eslintEngine - An active, pre-configured instance of the ESLint core processor.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {string} filePath - The destination target path or mock location identifier to bind to the validation loop.
 *
 * @returns {Promise<import('eslint').ESLint.LintResult>} A promise that resolves to the primary evaluation metrics record mapping the processed file.
 */
async function runESLintEngineAsync(eslintEngine, brokenSourceCode, filePath) {
  const results = await eslintEngine.lintText(
    brokenSourceCode,
    {
      filePath: filePath
    }
  );

  return results[0];
}

/**
 * @private
 * @async
 *
 * Orchestrates dual-mode execution passes, running text evaluation routines both with and without core automatic code re-alignment behaviors.
 *
 * @param {string[]} files - An array of glob patterns defining which source files the configuration block should apply to.
 * @param {import('eslint').Linter.Config['rules']} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {string} filePath - The destination target path or mock location identifier to bind to the validation loop.
 *
 * @returns {Promise<import('./test-helper.d.ts').CodeProcessingResult>} A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
 */
async function executeCodeProcessingAsync(files, rules, brokenSourceCode, filePath) {
  const eslintEngineWithFix = createESLlintEngine(files, rules, true);
  const eslintEngineWithoutFix = createESLlintEngine(files, rules, false);

  return {
    withFix: await runESLintEngineAsync(eslintEngineWithFix, brokenSourceCode, filePath),
    withoutFix: await runESLintEngineAsync(eslintEngineWithoutFix, brokenSourceCode, filePath)
  };
}
