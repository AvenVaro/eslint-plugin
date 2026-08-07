/** @type {import('./indent-rule-test-helper.d.ts').IndentTestHelper} */
const indentTestHelper = Object.freeze({
  createIndentRule: createIndentRule
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
 * @param {number | 'tab' | undefined} indent - The target indentation step size (number of spaces) or hard tab token filter criteria.
 * @param {import('../../../../../src/rules/js/indent.d.ts').JsIndentOptions | undefined} options - Additional operational metadata parameter adjustments for the target rule logic.
 *
 * @returns {import('eslint').Linter.Config['rules']} A compliant rules dictionary mapping the generated configuration payload to the custom namespace selector.
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
