import { ESLint } from 'eslint';
import { expect } from 'vitest';
import avenvaro from '../../../../src/index.js';

/** @type {import('./rules-test-helper.d.ts').RulesTestHelper} */
const rulesTestHelper = Object.freeze({
  createESLlintEngine: createESLlintEngine,
  runESLintEngineAsync: runESLintEngineAsync,
  executeCodeProcessingAsync: executeCodeProcessingAsync,
  expectResult: expectResult
});

//================================
// Exports
//================================

export default rulesTestHelper;

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Initializes an isolated instance of the ESLint engine in memory.
 *
 * @param {string[]} files - An array of glob patterns defining which source files the configuration block should apply to.
 * @param {import('eslint').Linter.Config['rules']} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {boolean} fix - Flag that enables generation of automatic code fixes at the linter core level.
 * @param {string | undefined} rootDirPath - Current working diectory path.
 *
 * @returns {import('eslint').ESLint} A configured instance of the ESLint class, ready to lint strings in memory.
 */
function createESLlintEngine(files, rules, fix, rootDirPath) {
  return new ESLint({
    cwd: rootDirPath,
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
 * @param {import('../../integration-tests-test-helper.d.ts').IntegrationTestFilesystemBlueprint} paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
 *
 * @returns {Promise<import('./rules-test-helper.d.ts').CodeProcessingResult>} A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
 */
async function executeCodeProcessingAsync(files, rules, brokenSourceCode, paths) {
  const eslintEngineWithFix = createESLlintEngine(files, rules, true, paths.testTmpDir);
  const eslintEngineWithoutFix = createESLlintEngine(files, rules, false, paths.testTmpDir);

  return {
    withFix: await runESLintEngineAsync(eslintEngineWithFix, brokenSourceCode, paths.mockTargetFile),
    withoutFix: await runESLintEngineAsync(eslintEngineWithoutFix, brokenSourceCode, paths.mockTargetFile)
  };
}

/**
 * @private
 *
 * Assertively validates structural equality between properties of an actual ESLint evaluation result and an expected result blueprint.
 *
 * @param {import('eslint').ESLint.LintResult} actualResult - The live evaluation metric record returned from the active execution pipeline block.
 * @param {import('eslint').ESLint.LintResult} expectedResult - The baseline expectation blueprint object mapping reference layout values.
 *
 * @returns {void}
 */
function expectResult(actualResult, expectedResult) {
  expect(actualResult.errorCount).toBe(expectedResult.errorCount);
  expect(actualResult.output).toBe(expectedResult.output);
  expect(actualResult.source).toBe(expectedResult.source);
}
