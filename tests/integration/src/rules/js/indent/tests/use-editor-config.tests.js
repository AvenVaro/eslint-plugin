import * as vitest from 'vitest';
import testHelper from '../../../../../../test-helper.js';
import jsRulesTestHelper from '../../js-rules-test-helper.js';
import indentRuleTestHelper from '../indent-rule-test-helper.js';

//================================
// Tests
//================================

vitest.describe('JavaScript Indent Rule. Use Editorconfig', describe);

function describe() {
  vitest.it(
    'Editorconfig is not used.',
    test_indentRule_useEditorconfig_false_async
  );
}

async function test_indentRule_useEditorconfig_false_async() {
  const brokenSourceCode = testHelper.convertCodeArrayToCodeString([
    'const condition = true;',
    'if (condition) {',
    'console.log("broken alignment");',
    '}'
  ]);

  const expectedFixedSourceCode = testHelper.convertCodeArrayToCodeString([
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

  testHelper.expectResult(
    results.withFix,
    {
      errorCount: 0,
      output: expectedFixedSourceCode,
      source: undefined
    }
  );

  testHelper.expectResult(
    results.withoutFix,
    {
      errorCount: 1,
      output: undefined,
      source: brokenSourceCode
    }
  );
}
