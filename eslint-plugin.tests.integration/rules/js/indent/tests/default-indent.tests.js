import * as vitest from 'vitest';
import testHelper from '../../../../test-helper.js';
import indentRuleTestHelper from '../indent-rule-test-helper.js';
import { ePropertyValue } from '@avenvaro/eslint-plugin';

//================================
// Typedefs
//================================

/**
 * @typedef {import('node:fs').MakeDirectoryOptions} MakeDirectoryOptions
 * @typedef {import('node:fs').RmOptions} RmOptions
 * @typedef {import('./test-helper.d.ts').TestHelper} TestHelper
 * @typedef {import('./test-helper.d.ts').FilesystemBlueprint} FilesystemBlueprint
 * @typedef {import('@avenvaro/eslint-plugin').EPropertyValue} EPropertyValue
 * @typedef {import('@avenvaro/eslint-plugin').JsIndentOptionsTuple} JsIndentOptionsTuple
 */

//================================
// Tests
//================================

vitest.describe.concurrent('JavaScript Indent Rule. Default Indent - Physical Integration Tier', describeAsync);

async function describeAsync() {
  const testTempRootDir = await testHelper.createTempRootDirAsync('JS_IndentRule_DefaultIndent');

  vitest.afterAll(async () => await testHelper.removeAsync(testTempRootDir));

  vitest.it.concurrent(
    'defaultIndent is positive and useEditorconfig is true',
    async () => await test_indentRule_defaultIndentIsPositive_async(testTempRootDir, true, 'test_indentRule_defaultIndent_positive_useEditorconfig_true_async')
  );

  vitest.it.concurrent(
    'defaultIndent is positive and useEditorconfig is false',
    async () => test_indentRule_defaultIndentIsPositive_async(testTempRootDir, false, 'test_indentRule_defaultIndent_positive_useEditorconfig_false_async')
  );

  vitest.it.concurrent(
    'defaultIndent is positive and useEditorconfig is undefined',
    async () => await test_indentRule_defaultIndentIsPositive_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_positive_useEditorconfig_undefined_async')
  );

  vitest.it.concurrent(
    'defaultIndent is positive and useEditorconfig is true. Ignore',
    async () => await test_indentRule_defaultIndentIsPositive_ignore_async(testTempRootDir, true, 'test_indentRule_defaultIndent_positive_useEditorconfig_true_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is positive and useEditorconfig is false. Ignore',
    async () => test_indentRule_defaultIndentIsPositive_ignore_async(testTempRootDir, false, 'test_indentRule_defaultIndent_positive_useEditorconfig_false_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is positive and useEditorconfig is undefined. Ignore',
    async () => await test_indentRule_defaultIndentIsPositive_ignore_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_positive_useEditorconfig_undefined_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is negative and useEditorconfig is true',
    async () => await test_indentRule_defaultIndentIsNegative_async(testTempRootDir, true, 'test_indentRule_defaultIndent_negative_useEditorconfig_true_async')
  );

  vitest.it.concurrent(
    'defaultIndent is negative and useEditorconfig is false',
    async () => await test_indentRule_defaultIndentIsNegative_async(testTempRootDir, false, 'test_indentRule_defaultIndent_negative_useEditorconfig_false_async')
  );

  vitest.it.concurrent(
    'defaultIndent is negative and useEditorconfig is undefined',
    async () => await test_indentRule_defaultIndentIsNegative_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_negative_useEditorconfig_undefined_async')
  );

  vitest.it.concurrent(
    'defaultIndent is zero and useEditorconfig is true',
    async () => await test_indentRule_defaultIndentIsZero_async(testTempRootDir, true, 'test_indentRule_defaultIndent_zero_useEditorconfig_true_async')
  );

  vitest.it.concurrent(
    'defaultIndent is zero and useEditorconfig is false',
    async () => test_indentRule_defaultIndentIsZero_async(testTempRootDir, false, 'test_indentRule_defaultIndent_zero_useEditorconfig_false_async')
  );

  vitest.it.concurrent(
    'defaultIndent is zero and useEditorconfig is undefined',
    async () => await test_indentRule_defaultIndentIsZero_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_zero_useEditorconfig_undefined_async')
  );

  vitest.it.concurrent(
    'defaultIndent is zero and useEditorconfig is true. Ignore',
    async () => await test_indentRule_defaultIndentIsZero_ignore_async(testTempRootDir, true, 'test_indentRule_defaultIndent_zero_useEditorconfig_true_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is zero and useEditorconfig is false. Ignore',
    async () => test_indentRule_defaultIndentIsZero_ignore_async(testTempRootDir, false, 'test_indentRule_defaultIndent_zero_useEditorconfig_false_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is zero and useEditorconfig is undefined. Ignore',
    async () => await test_indentRule_defaultIndentIsZero_ignore_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_zero_useEditorconfig_undefined_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is tab and useEditorconfig is true',
    async () => await test_indentRule_defaultIndentIsTab_async(testTempRootDir, true, 'test_indentRule_defaultIndent_tab_useEditorconfig_true_async')
  );

  vitest.it.concurrent(
    'defaultIndent is tab and useEditorconfig is false',
    async () => test_indentRule_defaultIndentIsTab_async(testTempRootDir, false, 'test_indentRule_defaultIndent_tab_useEditorconfig_false_async')
  );

  vitest.it.concurrent(
    'defaultIndent is tab and useEditorconfig is undefined',
    async () => await test_indentRule_defaultIndentIsTab_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_tab_useEditorconfig_undefined_async')
  );

  vitest.it.concurrent(
    'defaultIndent is tab and useEditorconfig is true. Ignore',
    async () => await test_indentRule_defaultIndentIsTab_ignore_async(testTempRootDir, true, 'test_indentRule_defaultIndent_tab_useEditorconfig_true_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is tab and useEditorconfig is false. Ignore',
    async () => test_indentRule_defaultIndentIsTab_ignore_async(testTempRootDir, false, 'test_indentRule_defaultIndent_tab_useEditorconfig_false_ignore_async')
  );

  vitest.it.concurrent(
    'defaultIndent is tab and useEditorconfig is undefined. Ignore',
    async () => await test_indentRule_defaultIndentIsTab_ignore_async(testTempRootDir, undefined, 'test_indentRule_defaultIndent_tab_useEditorconfig_undefined_ignore_async')
  );
}

//================================
// Private Functions
//================================

/**
 * Verifies that the indentation rule integrates correctly when provided with a positive default indentation length.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndentIsPositive_async(testTempRootDir, useEditorconfig, dirName) {
  await test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, 0, 7);
}

/**
 * Verifies that the indentation rule integrates correctly when provided with a positive default indentation length. Ignore.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndentIsPositive_ignore_async(testTempRootDir, useEditorconfig, dirName) {
  await test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, 7, 7);
}

/**
 * Verifies that the indentation rule throws an error when provided with an invalid negative default indentation length.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once the expected range error assertion successfully terminates.
 */
async function test_indentRule_defaultIndentIsNegative_async(testTempRootDir, useEditorconfig, dirName) {
  await vitest
    .expect(test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, 0, -7))
    .rejects
    .toThrow('Value -7 should be >= 0')
  ;
}

/**
 * Verifies that the indentation rule integrates correctly when provided with a zero default indentation length.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndentIsZero_async(testTempRootDir, useEditorconfig, dirName) {
  await test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, 7, 0);
}

/**
 * Verifies that the indentation rule integrates correctly when provided with a zero default indentation length. Ignore fix.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndentIsZero_ignore_async(testTempRootDir, useEditorconfig, dirName) {
  await test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, 0, 0);
}

/**
 * Verifies that the indentation rule integrates correctly when provided with a tab default indentation length.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndentIsTab_async(testTempRootDir, useEditorconfig, dirName) {
  await test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, 0, ePropertyValue.tab);
}

/**
 * Verifies that the indentation rule integrates correctly when provided with a tab default indentation length.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 *
 * @returns {Promise<void>} A promise that resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndentIsTab_ignore_async(testTempRootDir, useEditorconfig, dirName) {
  await test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, ePropertyValue.tab, ePropertyValue.tab);
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {boolean | undefined} useEditorconfig - Flag indicating whether the underlying engine rule should actively bind to local EditorConfig schemas.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {number | EPropertyValue['tab']} indent - The numerical count representing the source indentation size.
 * @param {number | EPropertyValue['tab']} defaultIndent - The numerical count representing the base fallback indentation size.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_defaultIndent_async(testTempRootDir, useEditorconfig, dirName, indent, defaultIndent) {
  /** @type {EPropertyValue['tab'] | EPropertyValue['space']} */
  let type;

  /** @type {number} */
  let dIndent;

  const errorCount = defaultIndent === indent ? 0 : 1;

  if (defaultIndent === ePropertyValue.tab) {
    type = ePropertyValue.tab;
    dIndent = 1;

    if (indent === ePropertyValue.tab) {
      indent = 1;
    }
  }
  else {
    type = ePropertyValue.space;
    dIndent = defaultIndent;

    if (indent === ePropertyValue.tab) {
      indent = 1;
    }
  }

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    `${testHelper.createIndentString(indent, type)}console.log("broken alignment");`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    `${testHelper.createIndentString(dIndent, type)}console.log("broken alignment");`,
    '}'
  ]);

  const editorconfig = testHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${type}`,
    `end_of_line = ${ePropertyValue.lf}`
  ]);

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: useEditorconfig,
        defaultIndent: defaultIndent
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}
