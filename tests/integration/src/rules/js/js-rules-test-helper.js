import rulesTestHelper from '../rules-test-helper.js';

/** @type {import('./js-rules-test-helper.d.ts').JSRulesTestHelper} */
const jsRulesTestHelper = Object.freeze({
  createESLlintEngine: createESLlintEngine,
  runESLintEngineAsync: runESLintEngineAsync,
  executeCodeProcessingAsync: executeCodeProcessingAsync
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
 * @param {import('eslint').Linter.Config['rules']} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {boolean} fix - Flag that enables generation of automatic code fixes at the linter core level.
 *
 * @returns {import('eslint').ESLint} A configured instance of the ESLint class, ready to lint strings in memory.
 */
function createESLlintEngine(rules, fix) {
  return rulesTestHelper.createESLlintEngine(
    [
      '**/*.js'
    ],
    rules,
    fix
  );
}

/**
 * @private
 * @async
 *
 * Executes the linting pipeline on the raw source code payload using a baseline virtual JavaScript module filename placeholder.
 *
 * @param {import('eslint').ESLint} eslintEngine - An active, pre-configured instance of the ESLint core processor.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 *
 * @returns {Promise<import('eslint').ESLint.LintResult>} A promise that resolves to the primary evaluation metrics record mapping the processed file.
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
 * @param {import('eslint').Linter.Config['rules']} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 *
 * @returns {Promise<import('./test-helper.d.ts').CodeProcessingResult>} A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
 */
async function executeCodeProcessingAsync(rules, brokenSourceCode) {
  const eslintEngineWithFix = createESLlintEngine(rules, true);
  const eslintEngineWithoutFix = createESLlintEngine( rules, false);

  return {
    withFix: await runESLintEngineAsync(eslintEngineWithFix, brokenSourceCode),
    withoutFix: await runESLintEngineAsync(eslintEngineWithoutFix, brokenSourceCode)
  };
}
