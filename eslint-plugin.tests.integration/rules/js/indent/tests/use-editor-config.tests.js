import * as vitest from 'vitest';
import testHelper from '../../../../test-helper.js';
import indentRuleTestHelper from '../indent-rule-test-helper.js';
import { ePropertyValue } from '@avenvaro/eslint-plugin';

//================================
// Tests
//================================

vitest.describe.concurrent('JavaScript Indent Rule. Use Editorconfig - Physical Integration Tier', describeAsync);

async function describeAsync() {
  const testTempRootDir = await testHelper.createTempRootDirAsync('JS_IndentRule_UseEditorConfig');

  vitest.afterAll(async () => await testHelper.removeAsync(testTempRootDir));

  vitest.it.concurrent(
    'useEditorconfig is false.',
    async () => await test_indentRule_useEditorconfig_false_async(testTempRootDir)
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

async function test_indentRule_useEditorconfig_true_async(testTempRootDir) {
  await test_indentRule_useEditorconfig_indentFromConfig_async(testTempRootDir, true, 'test_indentRule_useEditorconfig_true_async');
}

async function test_indentRule_useEditorconfig_false_async(testTempRootDir) {
  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    '          console.log("broken alignment");',
    '}'
  ]);

  await test_indentRule_useEditorconfig_async(testTempRootDir, false, 'test_indentRule_useEditorconfig_false_async', expectedFixedSourceCode);
}

async function test_indentRule_useEditorconfig_undefined_async(testTempRootDir) {
  await test_indentRule_useEditorconfig_indentFromConfig_async(testTempRootDir, undefined, 'test_indentRule_useEditorconfig_undefined_async');
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
 * @param {string} expectedFixedSourceCode - Expected corrected source code.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_useEditorconfig_async(testTempRootDir, useEditorconfig, dirName, expectedFixedSourceCode) {
  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    'console.log("broken alignment");',
    '}'
  ]);

  const editorconfig = testHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${ePropertyValue.space}`,
    'indent_size = 5',
    `end_of_line = ${ePropertyValue.lf}`
  ]);

  await indentRuleTestHelper.tryExpectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      10,
      {
        useEditorconfig: useEditorconfig
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode
  );
}

/**
 * Asynchronously executes an integration test case evaluating rule indentation sizes
 * derived directly from ambient EditorConfig definitions under structural boundaries.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_useEditorconfig_indentFromConfig_async(testTempRootDir, useEditorconfig, dirName) {
  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    '     console.log("broken alignment");',
    '}'
  ]);

  await test_indentRule_useEditorconfig_async(testTempRootDir, useEditorconfig, dirName, expectedFixedSourceCode);
}
