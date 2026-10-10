import * as vitest from 'vitest';
import testHelper from '../../../../test-helper.js';
import jsRuleTestHelper from '../../js-rules-test-helper.js';
import indentRuleTestHelper from '../indent-rule-test-helper.js';
import { ePropertyValue } from '@avenvaro/eslint-plugin';
import rulesBuildHelper from '@avenvaro/eslint-plugin/src/infrastructure/rules-build-helper.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('node:fs').MakeDirectoryOptions} MakeDirectoryOptions
 * @typedef {import('node:fs').RmOptions} RmOptions
 * @typedef {import('./test-helper.d.ts').TestHelper} TestHelper
 * @typedef {import('./test-helper.d.ts').FilesystemBlueprint} FilesystemBlueprint
 * @typedef {import('@avenvaro/eslint-plugin').EPropertyValue} EPropertyValue
 * @typedef {import('@avenvaro/eslint-plugin').IndentSize} IndentSize
 */

//================================
// Tests
//================================

vitest.describe.concurrent('JavaScript Indent Rule. Patch conditional delimiter - Physical Integration Tier', describeAsync);

async function describeAsync() {
  const testTempRootDir = await testHelper.createTempRootDirAsync('JS_IndentRule_PatchConditionDelimiter');

  vitest.afterAll(async () => await testHelper.removeAsync(testTempRootDir));

  // ---------- Return

  vitest.it.concurrent(
    'Semicolon indentation. Return. Equal',
    async () => await test_indentRule_Semicolon_Return_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Tab',
    async () => await test_indentRule_Semicolon_Return_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. NotEqual',
    async () => await test_indentRule_Semicolon_Return_async(testTempRootDir, 'test_indentRule_Semicolon_Return_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Return_async(testTempRootDir, 'test_indentRule_Semicolon_Return_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Return_async(testTempRootDir, 'test_indentRule_Semicolon_Return_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Return. Single line

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Equal',
    async () => await test_indentRule_Semicolon_Return_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Tab',
    async () => await test_indentRule_Semicolon_Return_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. NotEqual',
    async () => await test_indentRule_Semicolon_Return_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Return_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Return_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Return. Single line. Alt

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Alt. Equal',
    async () => await test_indentRule_Semicolon_Return_SingleLine_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_Alt_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Alt. Tab',
    async () => await test_indentRule_Semicolon_Return_SingleLine_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Alt. NotEqual',
    async () => await test_indentRule_Semicolon_Return_SingleLine_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_NotEqual_Alt_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Alt. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Return_SingleLine_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_Alt_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Single line. Alt. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Return_SingleLine_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_SingleLine_Alt_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Return. Nested ter

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Equal',
    async () => await test_indentRule_Semicolon_Return_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Tab',
    async () => await test_indentRule_Semicolon_Return_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. NotEqual',
    async () => await test_indentRule_Semicolon_Return_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Return_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Return_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Return. Nested ter. Single line

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Single line. Equal',
    async () => await test_indentRule_Semicolon_Return_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_SingleLine_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Single line. Tab',
    async () => await test_indentRule_Semicolon_Return_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Single line. NotEqual',
    async () => await test_indentRule_Semicolon_Return_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Single line. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Return_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_SingleLine_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Single line. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Return_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_SingleLine_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Return. Nested ter. Alt

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Alt. Equal',
    async () => await test_indentRule_Semicolon_Return_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Alt_Equal_async', 4, 4, 4)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Alt. Tab',
    async () => await test_indentRule_Semicolon_Return_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 4)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Alt. NotEqual',
    async () => await test_indentRule_Semicolon_Return_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Alt_NotEqual_async', ePropertyValue.tab, 4, 4)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Alt. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Return_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Alt_NotEqual_Less_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Return. Nested. Alt. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Return_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Alt_NotEqual_Greater_async', 4, 4, 5)
  );

  // ---------- Return. Func

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Equal',
    async () => await test_indentRule_Coma_Return_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Tab',
    async () => await test_indentRule_Coma_Return_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. NotEqual',
    async () => await test_indentRule_Coma_Return_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. NotEqual. Less',
    async () => await test_indentRule_Coma_Return_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. NotEqual. Greater',
    async () => await test_indentRule_Coma_Return_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Return. Func. Single line

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Single line. Equal',
    async () => await test_indentRule_Coma_Return_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_SingleLine_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Single line. Tab',
    async () => await test_indentRule_Coma_Return_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Single line. NotEqual',
    async () => await test_indentRule_Coma_Return_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Single line. NotEqual. Less',
    async () => await test_indentRule_Coma_Return_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_SingleLine_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Single line. NotEqual. Greater',
    async () => await test_indentRule_Coma_Return_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_SingleLine_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Return. Func. Alt

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Alt. Equal',
    async () => await test_indentRule_Coma_Return_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Alt_Equal_async', 4, 4, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Alt. Tab',
    async () => await test_indentRule_Coma_Return_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Alt. NotEqual',
    async () => await test_indentRule_Coma_Return_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Alt_NotEqual_async', ePropertyValue.tab, 4, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Alt. NotEqual. Less',
    async () => await test_indentRule_Coma_Return_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Alt_NotEqual_Less_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Func. Alt. NotEqual. Greater',
    async () => await test_indentRule_Coma_Return_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Function_Alt_NotEqual_Greater_async', 4, 4, 5)
  );

  // ---------- Return. Nested ter. Func

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Equal',
    async () => await test_indentRule_Coma_Return_Nested_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Tab',
    async () => await test_indentRule_Coma_Return_Nested_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. NotEqual',
    async () => await test_indentRule_Coma_Return_Nested_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. NotEqual. Less',
    async () => await test_indentRule_Coma_Return_Nested_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. NotEqual. Greater',
    async () => await test_indentRule_Coma_Return_Nested_Function_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Return. Nested ter. Func. Single line

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Single line. Equal',
    async () => await test_indentRule_Coma_Return_Nested_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_SingleLine_Equal_async', 4, 4, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Single line. Tab',
    async () => await test_indentRule_Coma_Return_Nested_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Single line. NotEqual',
    async () => await test_indentRule_Coma_Return_Nested_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Single line. NotEqual. Less',
    async () => await test_indentRule_Coma_Return_Nested_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_SingleLine_NotEqual_Less_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Single line. NotEqual. Greater',
    async () => await test_indentRule_Coma_Return_Nested_Function_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_SingleLine_NotEqual_Greater_async', 4, 4, 5)
  );

  // ---------- Return. Nested ter. Func. Alt

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Alt. Equal',
    async () => await test_indentRule_Coma_Return_Nested_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Alt_Equal_async', 4, 4, 5)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Alt. Tab',
    async () => await test_indentRule_Coma_Return_Nested_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 5)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Alt. NotEqual',
    async () => await test_indentRule_Coma_Return_Nested_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Alt_NotEqual_async', ePropertyValue.tab, 4, 5)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Alt. NotEqual. Less',
    async () => await test_indentRule_Coma_Return_Nested_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Alt_NotEqual_Less_async', 4, 4, 4)
  );

  vitest.it.concurrent(
    'Coma indentation. Return. Nested. Func. Alt. NotEqual. Greater',
    async () => await test_indentRule_Coma_Return_Nested_Function_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Return_Nested_Function_Alt_NotEqual_Greater_async', 4, 4, 6)
  );

  // ---------- Variable

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Equal',
    async () => await test_indentRule_Semicolon_Variable_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Tab',
    async () => await test_indentRule_Semicolon_Variable_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Variable. Single line

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Single line. Equal',
    async () => await test_indentRule_Semicolon_Variable_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_SingleLine_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Single line. Tab',
    async () => await test_indentRule_Semicolon_Variable_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Single line. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Single line. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_SingleLine_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Single line. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_SingleLine_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Variable. Alt

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Alt. Equal',
    async () => await test_indentRule_Semicolon_Variable_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Alt_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Alt. Tab',
    async () => await test_indentRule_Semicolon_Variable_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Alt. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Alt_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Alt. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Alt_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Alt. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Alt_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Variable. Nested

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Equal',
    async () => await test_indentRule_Semicolon_Variable_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Tab',
    async () => await test_indentRule_Semicolon_Variable_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Variable. Nested. Single line

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Single line. Equal',
    async () => await test_indentRule_Semicolon_Variable_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_SingleLine_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Single line. Tab',
    async () => await test_indentRule_Semicolon_Variable_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Single line. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Single line. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_SingleLine_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Single line. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_SingleLine_NotEqual_Greater_async', 4, 4, 4)
  );

  // ---------- Variable. Nested. Alt

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Alt. Equal',
    async () => await test_indentRule_Semicolon_Variable_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Alt_Equal_async', 4, 4, 4)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Alt. Tab',
    async () => await test_indentRule_Semicolon_Variable_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 4)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Alt. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Alt_NotEqual_async', ePropertyValue.tab, 4, 4)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Alt. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Alt_NotEqual_Less_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Nested. Alt. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Nested_Alt_NotEqual_Greater_async', 4, 4, 5)
  );

  // ---------- Variable. Declaration

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Equal',
    async () => await test_indentRule_Semicolon_Variable_Declaration_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Equal_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Tab',
    async () => await test_indentRule_Semicolon_Variable_Declaration_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Declaration_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_NotEqual_async', ePropertyValue.tab, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Declaration_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_NotEqual_Less_async', 4, 4, 0)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Declaration_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_NotEqual_Greater_async', 4, 4, 2)
  );

  // ---------- Variable. Declaration. Single line

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Single line. Equal',
    async () => await test_indentRule_Semicolon_Variable_Declaration_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_SingleLine_Equal_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Single line. Tab',
    async () => await test_indentRule_Semicolon_Variable_Declaration_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Single line. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Declaration_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Single line. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Declaration_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_SingleLine_NotEqual_Less_async', 4, 4, 0)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Single line. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Declaration_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_SingleLine_NotEqual_Greater_async', 4, 4, 2)
  );

  // ---------- Variable. Declaration. Alt

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Alt. Equal',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Alt_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Alt. Tab',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Alt. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Alt_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Alt. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Alt_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Alt. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Alt_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Variable. Declaration. Nested

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Equal',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Equal_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Tab',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_NotEqual_async', ePropertyValue.tab, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_NotEqual_Less_async', 4, 4, 0)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_NotEqual_Greater_async', 4, 4, 2)
  );

  // ---------- Variable. Declaration. Nested. Single line

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Single line. Equal',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_Equal_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Single line. Tab',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Single line. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_NotEqual_async', ePropertyValue.tab, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Single line. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_NotEqual_Less_async', 4, 4, 1)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Single line. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_NotEqual_Greater_async', 4, 4, 3)
  );

  // ---------- Variable. Declaration. Nested. Alt

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Alt. Equal',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_Equal_async', 4, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Alt. Tab',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_Tab_async', ePropertyValue.tab, ePropertyValue.tab, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Alt. NotEqual',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_NotEqual_async', ePropertyValue.tab, 4, 3)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Alt. NotEqual. Less',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_NotEqual_Less_async', 4, 4, 2)
  );

  vitest.it.concurrent(
    'Semicolon indentation. Variable. Declaration. Nested. Alt. NotEqual. Greater',
    async () => await test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_async(testTempRootDir, 'test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_NotEqual_Greater_async', 4, 4, 4)
  );
}

//================================
// Private Functions
//================================

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Return_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)};`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Return_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}return condition ? true : false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition ? true : false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Return_SingleLine_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Return_Nested_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)};`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Return_Nested_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: condition ? true : false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: condition ? true : false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Return_Nested_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 4, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Coma_Return_Function_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)},`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedTripleIndentString},`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Coma_Return_Function_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}condition ? true : false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition ? true : false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Coma_Return_Function_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 4, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Coma_Return_Nested_Function_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);
  const expectedQuintupleleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 5, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: condition`,
    `${expectedQuintupleleIndentString}? true`,
    `${expectedQuintupleleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)},`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: condition`,
    `${expectedQuintupleleIndentString}? true`,
    `${expectedQuintupleleIndentString}: false`,
    `${expectedTripleIndentString},`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Coma_Return_Nested_Function_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 4, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: condition ? true : false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: condition ? true : false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Coma_Return_Nested_Function_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 5, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);
  const expectedQuintupleleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 5, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: condition`,
    `${expectedQuintupleleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}return foo(`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: condition`,
    `${expectedQuintupleleIndentString}? true`,
    `${expectedQuintupleleIndentString}: false,`,
    `${expectedTripleIndentString}condition`,
    `${expectedQuadrupleIndentString}? true`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString});`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}condition = condition ? true : false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition ? true : false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Nested_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedQuadrupleIndentString}? false`,
    `${expectedQuadrupleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedQuadrupleIndentString}? false`,
    `${expectedQuadrupleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Nested_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false ? false : false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false ? false : false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Nested_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 4, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);
  const expectedQuadrupleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 4, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedQuadrupleIndentString}? false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    'function test() {',
    `${expectedIndentString}const condition = true;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedQuadrupleIndentString}? false`,
    `${expectedQuadrupleIndentString}: false;`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Declaration_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 1, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)};`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false`,
    `${expectedIndentString};`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Declaration_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 1, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}const condition = true ? true : false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true ? true : false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Declaration_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Declaration_Nested_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 1, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false`,
    `${expectedTripleIndentString}? false`,
    `${expectedTripleIndentString}: false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)};`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false`,
    `${expectedTripleIndentString}? false`,
    `${expectedTripleIndentString}: false`,
    `${expectedIndentString};`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Declaration_Nested_SingleLine_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 2, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false ? false : false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false ? false : false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}

/**
 * @private
 * @async
 *
 * Asynchronously executes an integration test case targeting the indentation rule enforcement combined with conditional EditorConfig integration behavior.
 * Generates dynamic source payloads, writes transient test configurations, evaluates dual-pass compliance benchmarks, and ensures comprehensive environmental teardown.
 *
 * @param {string} testTempRootDir - The root directory path dedicated to storing ephemeral file assets during test execution loops.
 * @param {string} dirName - The target unique namespace folder allocated specifically for separating this evaluation run.
 * @param {IndentSize} actualIndent - The numerical count representing the source indentation size.
 * @param {IndentSize} expectedIndent - The numerical count representing the base fallback indentation size.
 * @param {number} multiplier - Multiplier for shifting the actual indent.
 *
 * @returns {Promise<void>} A promise that fully resolves once assertions terminate successfully and cleanup actions conclude.
 */
async function test_indentRule_Semicolon_Variable_Declaration_Nested_Alt_async(testTempRootDir, dirName, actualIndent, expectedIndent, multiplier) {
  const errorCount = indentRuleTestHelper.calculateErrorCount(expectedIndent, actualIndent, 3, multiplier);
  const expectedIndentSettings = indentRuleTestHelper.createIndentSettings(expectedIndent);
  const actualIndentSettings = indentRuleTestHelper.createIndentSettings(actualIndent);
  const expectedIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size, expectedIndentSettings.indent_style);
  const expectedDoubleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 2, expectedIndentSettings.indent_style);
  const expectedTripleIndentString = rulesBuildHelper.createIndentString(expectedIndentSettings.indent_size * 3, expectedIndentSettings.indent_style);

  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false`,
    `${expectedTripleIndentString}? false`,
    `${rulesBuildHelper.createIndentString(actualIndentSettings.indent_size * multiplier, actualIndentSettings.indent_style)}: false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
    '',
    'function test() {',
    `${expectedIndentString}const condition = true`,
    `${expectedDoubleIndentString}? true`,
    `${expectedDoubleIndentString}: false`,
    `${expectedTripleIndentString}? false`,
    `${expectedTripleIndentString}: false;`,
    `${expectedIndentString}if (condition) {`,
    `${expectedDoubleIndentString}condition = condition`,
    `${expectedTripleIndentString}? true`,
    `${expectedTripleIndentString}: false`,
    `${expectedDoubleIndentString};`,
    `${expectedDoubleIndentString}return condition;`,
    `${expectedIndentString}}`,
    '}'
  ]);

  const editorconfig = jsRuleTestHelper.createEditorConfig({
    indent_style: expectedIndentSettings.indent_style,
    indent_size: expectedIndentSettings.indent_size,
    end_of_line: ePropertyValue.lf
  });

  await indentRuleTestHelper.expectAsync(
    testTempRootDir,
    dirName,
    editorconfig,
    [
      undefined,
      {
        useEditorconfig: true
      }
    ],
    brokenSourceCode,
    expectedFixedSourceCode,
    errorCount
  );
}
