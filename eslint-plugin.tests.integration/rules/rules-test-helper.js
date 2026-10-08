import { ESLint } from 'eslint';
import { expect } from 'vitest';
import avenvaro from '@avenvaro/eslint-plugin';
import testHelper from '../test-helper.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('./rules-test-helper.d.ts').RulesTestHelper} RulesTestHelper
 * @typedef {import('./rules-test-helper.d.ts').CodeProcessingResult} CodeProcessingResult
 * @typedef {import('eslint').Linter.Config['rules']} Rules
 * @typedef {import('eslint').ESLint} ESLint
 * @typedef {import('eslint').ESLint.LintResult} LintResult
 * @typedef {import('../test-helper.d.ts').FilesystemBlueprint} FilesystemBlueprint
 * @typedef {import('../test-helper.d.ts').MaskPropsPair} MaskPropsPair
 */

//================================
// Constants
//================================

/** @type {RulesTestHelper} */
const rulesTestHelper = Object.freeze({
  createESLlintEngine: createESLlintEngine,
  runESLintEngineAsync: runESLintEngineAsync,
  executeCodeProcessingAsync: executeCodeProcessingAsync,
  expectResults: expectResults,
  createEditorConfig: createEditorConfig
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
 * @param {Rules} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {boolean} fix - Flag that enables generation of automatic code fixes at the linter core level.
 * @param {string | undefined} rootDirPath - Current working diectory path.
 *
 * @returns {ESLint} A configured instance of the ESLint class, ready to lint strings in memory.
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
 * @param {ESLint} eslintEngine - An active, pre-configured instance of the ESLint core processor.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {string} filePath - The destination target path or mock location identifier to bind to the validation loop.
 *
 * @returns {Promise<LintResult>} A promise that resolves to the primary evaluation metrics record mapping the processed file.
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
 * @param {Rules} rules - An object containing the configured rules matching the target Linter scheme.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {FilesystemBlueprint} paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
 *
 * @returns {Promise<CodeProcessingResult>} A promise that resolves to the comprehensive metric configuration payload mapping both code execution passes.
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
 * @param {CodeProcessingResult} results - The comprehensive metric configuration payload mapping both code execution passes.
 * @param {string} expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {number} [errorCount=1] - The optional number of errors for the result.
 *
 * @returns {void}
 */
function expectResults(results, expectedFixedSourceCode, brokenSourceCode, errorCount = 1) {
  try {
    const source = [ undefined, brokenSourceCode ];

    expect(results.withFix.errorCount).toBe(0);
    expect(results.withFix.output).toBeOneOf([ undefined, expectedFixedSourceCode ]);
    expect(results.withFix.source).toBeOneOf(source);

    expect(results.withoutFix.errorCount).toBe(errorCount);
    expect(results.withoutFix.output).toBeUndefined();
    expect(results.withoutFix.source).toBeOneOf(source);
  }
  catch (e) {
    console.dir(results.withFix);
    console.dir(results.withoutFix);

    throw e;
  }
}

/**
 * @private
 *
 * Synthesizes a root `.editorconfig` file payload from a collection of pattern-property pairs.
 *
 * This function serves as a convenient shorthand wrapper around the primary generation utility, automatically enforcing the topmost `root = true` structural directive at the file boundary.
 *
 * @param {MaskPropsPair[]} maskPropsPairs - An ordered sequence of file pattern targets bound to their respective configuration settings blocks.
 *
 * @returns {string} A normalized, engine-ready `.editorconfig` configuration payload code string.
 */
function createEditorConfig(maskPropsPairs) {
  return testHelper.createEditorConfig(true, maskPropsPairs);
}
