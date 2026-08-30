import testHelper from '../../../test-helper.js';
import rulesTestHelper from '../../rules-test-helper.js';
import jsRulesTestHelper from '../js-rules-test-helper.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('@avenvaro/eslint-plugin').JsIndentOptionsTuple} JsIndentOptionsTuple
 * @typedef {import('./indent-rule-test-helper.d.ts').IndentRuleTestHelper} IndentRuleTestHelper
 * @typedef {import('eslint').Linter.Config['rules']} Rules
 */

//================================
// Constants
//================================

/** @type {IndentRuleTestHelper} */
const indentTestHelper = Object.freeze({
  createIndentRule: createIndentRule,
  expectAsync: expectAsync
});

//================================
// Exports
//================================

export default indentTestHelper;

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Constructs a standardized ESLint rules configuration payload block specifically targeting the custom indentation rule.
 *
 * @param {JsIndentOptionsTuple} indentOptionsTuple - The configuration array passed to the rule options.
 *
 * @returns {Rules} A compliant rules dictionary mapping the generated configuration payload to the custom namespace selector.
 */
function createIndentRule(indentOptionsTuple) {
  return {
    'avenvaro/js/indent': [
      'error',
      indentOptionsTuple[0],
      indentOptionsTuple[1]
    ]
  };
}

/**
 * @private
 * @async
 *
 * Asynchronously orchestrates an end-to-end integration test execution by provisioning
 * transient filesystem configurations, parsing evaluation rule variants, and asserting
 * compliance results before triggering automated environmental cleanup.
 *
 * @param {string} testTempRootDir - The root directory where the temporary test folders are created.
 * @param {string} dirName - The specific name of the temporary directory for this test case.
 * @param {string} editorconfig - The raw content or configuration string for the .editorconfig file.
 * @param {JsIndentOptionsTuple} indentOptionsTuple - The configuration array passed to the rule options.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {string} expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
 * @param {number} [errorCount=1] - The optional number of errors for the result.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function expectAsync(testTempRootDir, dirName, editorconfig, indentOptionsTuple, brokenSourceCode, expectedFixedSourceCode, errorCount = 1) {
  const paths = testHelper.createTempPaths(testTempRootDir, dirName, 'index.js');

  try {
    await testHelper.createTempFilesAsync(paths, editorconfig);

    const results = await jsRulesTestHelper.executeCodeProcessingWithPathsAsync(
      createIndentRule(indentOptionsTuple),
      brokenSourceCode,
      paths
    );

    rulesTestHelper.expectResults(results, expectedFixedSourceCode, brokenSourceCode, errorCount);
  }
  finally {
    await testHelper.removeAsync(paths.testTmpDir);
  }
}
