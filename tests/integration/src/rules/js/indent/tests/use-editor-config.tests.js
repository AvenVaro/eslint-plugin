import * as vitest from 'vitest';
import integrationTestsTestHelper from '../../../../../integration-tests-test-helper.js';
import rulesTestHelper from '../../../rules-test-helper.js';
import jsRulesTestHelper from '../../js-rules-test-helper.js';
import indentRuleTestHelper from '../indent-rule-test-helper.js';
import editorconfigProvider from '../../../../../../../infrastructure/editorconfig-provider.js';

//================================
// Tests
//================================

vitest.describe.concurrent('JavaScript Indent Rule. Use Editorconfig', describeAsync);

async function describeAsync() {
  const testTempRootDir = await integrationTestsTestHelper.createTempRootDirAsync('JS_IndentRule_UseEditorConfig');

  vitest.afterAll(async () => await integrationTestsTestHelper.removeAsync(testTempRootDir));

  vitest.it.concurrent(
    'Editorconfig is not used.',
    test_indentRule_useEditorconfig_false_async
  );

  vitest.it.concurrent(
    'useEditorconfig is false.',
    async () => await test_indentRule_useEditorconfig_true_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'useEditorconfig is undefuned.',
    async () => await test_indentRule_useEditorconfig_undefined_async(testTempRootDir)
  );
}

async function test_indentRule_useEditorconfig_false_async() {
  const brokenSourceCode = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    'console.log("broken alignment");',
    '}'
  ]);

  const expectedFixedSourceCode = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    '          console.log("broken alignment");',
    '}'
  ]);

  const results = await jsRulesTestHelper.executeCodeProcessingAsync(
    indentRuleTestHelper.createIndentRule(
      10,
      {
        useEditorconfig: false
      }
    ),
    brokenSourceCode
  );

  rulesTestHelper.expectResults(results, expectedFixedSourceCode, brokenSourceCode);
}

async function test_indentRule_useEditorconfig_true_async(testTempRootDir) {
  await test_indentRule_useEditorconfig_async(testTempRootDir, true, 'test_indentRule_useEditorconfig_true_async');
}

async function test_indentRule_useEditorconfig_undefined_async(testTempRootDir) {
  await test_indentRule_useEditorconfig_async(testTempRootDir, undefined, 'test_indentRule_useEditorconfig_undefined_async');
}

//================================
// Private Functions
//================================

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule
 * enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates
 * dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_useEditorconfig_async(testTempRootDir, useEditorconfig, dirName) {
  const brokenSourceCode = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    'console.log("broken alignment");',
    '}'
  ]);

  const expectedFixedSourceCode = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    '     console.log("broken alignment");',
    '}'
  ]);

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    'indent_size = 5',
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  indentRuleTestHelper.tryExpect(
    testTempRootDir,
    dirName,
    editorconfig,
    10,
    {
      useEditorconfig: useEditorconfig
    },
    brokenSourceCode,
    expectedFixedSourceCode
  );
}
