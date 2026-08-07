import * as vitest from 'vitest';
import integrationTestsTestHelper from '../../../../../integration-tests-test-helper.js';
import rulesTestHelper from '../../../rules-test-helper.js';
import jsRulesTestHelper from '../../js-rules-test-helper.js';
import indentRuleTestHelper from '../indent-rule-test-helper.js';

//================================
// Tests
//================================

vitest.describe.concurrent('JavaScript Indent Rule. Use Editorconfig', describe);

function describe() {
  vitest.it.concurrent(
    'Editorconfig is not used.',
    test_indentRule_useEditorconfig_false_async
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

  rulesTestHelper.expectResult(
    results.withFix,
    {
      errorCount: 0,
      output: expectedFixedSourceCode,
      source: undefined
    }
  );

  rulesTestHelper.expectResult(
    results.withoutFix,
    {
      errorCount: 1,
      output: undefined,
      source: brokenSourceCode
    }
  );
}
