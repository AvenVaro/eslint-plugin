import rulesTestHelper from '../rules-test-helper.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('./js-rules-test-helper.d.ts').JSRulesTestHelper} JSRulesTestHelper
 * @typedef {import('eslint').Linter.Config['rules']} Rules
 * @typedef {import('eslint').ESLint} ESLint
 * @typedef {import('eslint').ESLint.LintResult} LintResult
 * @typedef {import('./rules-test-helper.d.ts').CodeProcessingResult} CodeProcessingResult
 * @typedef {import('../../test-helper.d.ts').FilesystemBlueprint} FilesystemBlueprint
 */

//================================
// Constants
//================================

/** @type {JSRulesTestHelper} */
const jsRulesTestHelper = Object.freeze({
  createESLlintEngine: createESLlintEngine,
  runESLintEngineAsync: runESLintEngineAsync,
  executeCodeProcessingAsync: executeCodeProcessingAsync,
  executeCodeProcessingWithPathsAsync: executeCodeProcessingWithPathsAsync
});

//================================
// Exports
//================================

export default jsRulesTestHelper;

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Initializes an isolated instance of the ESLint engine in memory for JavaScript files.
 *
 * @param {Rules} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {boolean} fix - Flag that enables generation of automatic code fixes at the linter core level.
 * @param {string | undefined} rootDirPath - Current working diectory path.
 *
 * @returns {ESLint} A configured instance of the ESLint class, ready to lint strings in memory.
 */
function createESLlintEngine(rules, fix, rootDirPath) {
  return rulesTestHelper.createESLlintEngine(
    [
      '**/*.js'
    ],
    rules,
    fix,
    rootDirPath
  );
}

/**
 * @private
 * @async
 *
 * Executes the linting pipeline on the raw source code payload using a baseline virtual JavaScript module filename placeholder.
 *
 * @param {ESLint} eslintEngine - An active, pre-configured instance of the ESLint core processor.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 *
 * @returns {Promise<LintResult>} A promise that resolves to the primary evaluation metrics record mapping the processed file.
 */
async function runESLintEngineAsync(eslintEngine, brokenSourceCode) {
  return await rulesTestHelper.runESLintEngineAsync(eslintEngine, brokenSourceCode, 'mock-file.js');
}

/**
 * @private
 * @async
 *
 * Orchestrates dual-mode execution passes on raw source contents using a specialized, pre-configured JavaScript file targeting path.
 *
 * @param {Rules} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 *
 * @returns {Promise<CodeProcessingResult>} A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
 */
async function executeCodeProcessingAsync(rules, brokenSourceCode) {
  const eslintEngineWithFix = createESLlintEngine(rules, true, undefined);
  const eslintEngineWithoutFix = createESLlintEngine( rules, false, undefined);

  return {
    withFix: await runESLintEngineAsync(eslintEngineWithFix, brokenSourceCode),
    withoutFix: await runESLintEngineAsync(eslintEngineWithoutFix, brokenSourceCode)
  };
}

/**
 * @private
 * @async
 *
 * Orchestrates dual-mode execution passes on raw source contents targeting a specific file path.
 *
 * @param {Rules} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {FilesystemBlueprint} paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
 *
 * @returns {Promise<CodeProcessingResult>} A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
 */
async function executeCodeProcessingWithPathsAsync(rules, brokenSourceCode, paths) {
  const eslintEngineWithFix = createESLlintEngine(rules, true, paths.testTmpDir);
  const eslintEngineWithoutFix = createESLlintEngine( rules, false, paths.testTmpDir);

  return {
    withFix: await rulesTestHelper.runESLintEngineAsync(eslintEngineWithFix, brokenSourceCode, paths.mockTargetFile),
    withoutFix: await rulesTestHelper.runESLintEngineAsync(eslintEngineWithoutFix, brokenSourceCode, paths.mockTargetFile)
  };
}
