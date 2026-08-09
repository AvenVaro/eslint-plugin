import integrationTestsTestHelper from '../../../../integration-tests-test-helper.js';
import rulesTestHelper from '../../rules-test-helper.js';
import jsRulesTestHelper from '../js-rules-test-helper.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('../../../../../../infrastructure/property-value.enum.d.ts').PropertyValue} PropertyValue
 * @typedef {import('../../../../../../src/rules/js/indent.d.ts').JsIndentOptions} JsIndentOptions
 * @typedef {import('./indent-rule-test-helper.d.ts').IndentTestHelper} IndentTestHelper
 * @typedef {import('eslint').Linter.Config['rules']} Rules
 */

//================================
// Constants
//================================

/** @type {IndentTestHelper} */
const indentTestHelper = Object.freeze({
  createIndentRule: createIndentRule,
  tryExpectAsync: tryExpectAsync
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
 * @param {number | PropertyValue['tab'] | undefined} indent - The target indentation step size (number of spaces) or hard tab token filter criteria.
 * @param {JsIndentOptions | undefined} options - Additional operational metadata parameter adjustments for the target rule logic.
 *
 * @returns {Rules} A compliant rules dictionary mapping the generated configuration payload to the custom namespace selector.
 */
function createIndentRule(indent, options) {
  return {
    'avenvaro/js/indent': [
      'error',
      indent,
      options
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
 * @param {number | PropertyValue['tab'] | undefined} indent - The target indentation step size (number of spaces) or hard tab token filter criteria.
 * @param {JsIndentOptions | undefined} options - Additional operational metadata parameter adjustments for the target rule logic.
 * @param {string} brokenSourceCode - The raw source text payload containing potential layout variations.
 * @param {string} expectedFixedSourceCode - The fixed source text payload containing potential layout variations.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function tryExpectAsync(testTempRootDir, dirName, editorconfig, indent, options, brokenSourceCode, expectedFixedSourceCode) {
  const paths = integrationTestsTestHelper.createTempPaths(testTempRootDir, dirName, 'index.js');

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const results = await jsRulesTestHelper.executeCodeProcessingWithPathsAsync(
      createIndentRule(indent, options),
      brokenSourceCode,
      paths
    );

    rulesTestHelper.expectResults(results, expectedFixedSourceCode, brokenSourceCode);
  }
  finally {
    await integrationTestsTestHelper.removeAsync(paths.testTmpDir);
  }
}
