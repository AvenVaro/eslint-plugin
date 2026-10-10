import stylisticPlugin from '@stylistic/eslint-plugin';
import editorconfigProvider from '../../infrastructure/editorconfig-provider.js';
import ePropertyValue from '../../infrastructure/property-value.enum.js';
import eType from '../../infrastructure/type.enum.js';
import rulesBuildHelper from '../../infrastructure/rules-build-helper.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('../../infrastructure/editorconfig-provider.d.ts').IndentStyle} IndentStyle
 * @typedef {import('./indent.d.ts').IndentComparisonMetrics} IndentComparisonMetrics
 * @typedef {import('./indent.d.ts').JsIndentRule} JsIndentRule
 * @typedef {import('./indent.d.ts').JsIndentContext} JsIndentContext
 * @typedef {import('./indent.d.ts').JsIndentOptions} JsIndentOptions
 * @typedef {import('./indent.d.ts').JsIndentOptionsTuple} JsIndentOptionsTuple
 * @typedef {import('./indent.d.ts').JsStaticBlockIndentOptions} JsStaticBlockIndentOptions
 * @typedef {import('./indent.d.ts').JsCallExpressionIndentOptions} JsCallExpressionIndentOptions
 * @typedef {import('./indent.d.ts').JsFunctionDeclarationIndentOptions} JsFunctionDeclarationIndentOptions
 * @typedef {import('./indent.d.ts').JsFunctionExpressionIndentOptions} JsFunctionExpressionIndentOptions
 * @typedef {import('./indent.d.ts').JsVariableDeclaratorIndentOptions} JsVariableDeclaratorIndentOptions
 * @typedef {import('./indent.d.ts').JsOffsetTernaryExpressionsIndentOptions} JsOffsetTernaryExpressionsIndentOptions
 * @typedef {import('./indent.d.ts').JsIndentRuleDefaultValues} JsIndentRuleDefaultValues
 * @typedef {import('eslint').Rule.RuleListener} RuleListener
 * @typedef {import('eslint').Rule.RuleContext['sourceCode']} SourceCode
 * @typedef {import('eslint').Rule.RuleFixer} RuleFixer
 * @typedef {import('eslint').Rule.RuleFixer['replaceTextRange']} RuleTextEdit
 * @typedef {import('eslint').Rule.Node} RuleNode
 * @typedef {import('eslint').AST.Token} AstToken
 * @typedef {import('json-schema').JSONSchema4} JSONSchema4
 * @typedef {import('estree').ConditionalExpression & import('eslint').Rule.NodeParentExtension} ConditionalExpression
 * @typedef {import('estree').Node} Node
 */

/**
 * A normalized, IDE-friendly representation of the ESLint error report descriptor.
 *
 * This structure flattens the default ESLint `ReportDescriptor` union type to resolve
 * contextual typing limitations in JSDoc, ensuring that properties like `node` and `loc`
 * remain strictly typed and fully discoverable without falling back to `any`.
 *
 * @typedef {Object} CustomReportDescriptor
 *
 * @property {Node | AstToken} [node] - The AST node where the violation occurred, used to calculate error boundaries.
 * @property {import('eslint').AST.SourceLocation} [loc] - The precise location coordinates of the issue, overriding the node's bounds.
 * @property {string} message - The human-readable error message displayed to the user.
 * @property {import('eslint').Rule.ReportFixer} [fix] - An optional callback function providing automated code adjustments.
 */

/**
 * @typedef {Parameters<import('eslint').Rule.RuleContext['report']>[0] & CustomReportDescriptor} Descriptor
 */

//================================
// Constants
//================================

const semicolon = ';';

const coreIndentRule = stylisticPlugin.rules.indent;
const coreIndentRuleOptionsSchema = coreIndentRule.meta.schema[1];

/** @type {Required<JsVariableDeclaratorIndentOptions>} */
const defaultJsVariableDeclaratorIndentOptions = Object.freeze({
  var: 1,
  let: 1,
  const: 1,
  using: 1
});

/** @type {Required<JsStaticBlockIndentOptions>} */
const defaultJsStaticBlockIndentOptions = Object.freeze({
  body: 1
});

/** @type {Required<JsCallExpressionIndentOptions>} */
const defaultJsCallExpressionIndentOptions = Object.freeze({
  arguments: 1
});

/** @type {Required<JsFunctionDeclarationIndentOptions>} */
const defaultJsFunctionDeclarationIndentOptions = Object.freeze({
  parameters: 1,
  body: 1
});

/** @type {Required<JsFunctionExpressionIndentOptions>} */
const defaultJsFunctionExpressionIndentOptions = Object.freeze({
  parameters: 1,
  body: 1
});

/** @type {Required<JsOffsetTernaryExpressionsIndentOptions>} */
const defaultJsOffsetTernaryExpressionsIndentOptions = Object.freeze({
  callExpression: false,
  awaitExpression: false,
  newExpression: false
});

/** @type {JsIndentOptions} */
const defaultJsIndentOptions = Object.freeze({
  switchCase: 1,
  variableDeclarator: 1,
  assignmentOperator: undefined,
  outerIifeBody: 1,
  memberExpression: 1,
  staticBlock: defaultJsStaticBlockIndentOptions,
  callExpression: defaultJsCallExpressionIndentOptions,
  functionDeclaration: defaultJsFunctionDeclarationIndentOptions,
  functionExpression: defaultJsFunctionExpressionIndentOptions,
  arrayExpression: 1,
  objectExpression: 1,
  importDeclaration: 1,
  flatTernaryExpressions: false,
  offsetTernaryExpressions: false,
  ignoreComments: false,
  offsetTernaryExpressionsOffsetCallExpressions: undefined,
  ignoredNodes: [],
  tabLength: undefined,
  useEditorconfig: true,
  defaultIndent: 2
});

/** @type {JsIndentRuleDefaultValues} */
const jsIndentRuleDefaultValues = Object.freeze({
  defaultJsVariableDeclaratorIndentOptions: defaultJsVariableDeclaratorIndentOptions,
  defaultJsStaticBlockIndentOptions: defaultJsStaticBlockIndentOptions,
  defaultJsCallExpressionIndentOptions: defaultJsCallExpressionIndentOptions,
  defaultJsFunctionDeclarationIndentOptions: defaultJsFunctionDeclarationIndentOptions,
  defaultJsFunctionExpressionIndentOptions: defaultJsFunctionExpressionIndentOptions,
  defaultJsOffsetTernaryExpressionsIndentOptions: defaultJsOffsetTernaryExpressionsIndentOptions,
  defaultJsIndentOptions: defaultJsIndentOptions
});

//================================
// Exports
//================================

export {
  defaultJsVariableDeclaratorIndentOptions,
  defaultJsStaticBlockIndentOptions,
  defaultJsCallExpressionIndentOptions,
  defaultJsFunctionDeclarationIndentOptions,
  defaultJsFunctionExpressionIndentOptions,
  defaultJsOffsetTernaryExpressionsIndentOptions,
  defaultJsIndentOptions,
  jsIndentRuleDefaultValues
};

/** @type {JsIndentRule} */
export default {
  meta: {
    ...coreIndentRule.meta,
    defaultOptions: [
      ePropertyValue.unset,
      {}
    ],
    docs: {
      ...coreIndentRule.meta.docs,
      description: 'Native EditorConfig-driven indentation patch by AvenVaro.'
    },
    schema: [
      createIndentValuePropertySchema(coreIndentRule.meta.schema[0]),
      {
        ...coreIndentRuleOptionsSchema,
        properties: {
          switchCase: coreIndentRuleOptionsSchema.properties.SwitchCase,
          variableDeclarator: {
            ...coreIndentRuleOptionsSchema.properties.VariableDeclarator,
            oneOf: [
              createIndentSizeValuePropertySchema(undefined),
              rulesBuildHelper.createObjectPropertySchema(
                undefined,
                {
                  var: createIndentSizeValuePropertySchema(undefined),
                  let: createIndentSizeValuePropertySchema(undefined),
                  const: createIndentSizeValuePropertySchema(undefined),
                  using: createIndentSizeValuePropertySchema(undefined)
                }
              )
            ]
          },
          assignmentOperator: createIndentLevelPropertySchema(coreIndentRuleOptionsSchema.properties.assignmentOperator),
          outerIifeBody: createIndentLevelPropertySchema(coreIndentRuleOptionsSchema.properties.outerIIFEBody),
          memberExpression: createIndentLevelPropertySchema(coreIndentRuleOptionsSchema.properties.memberExpression),
          staticBlock: coreIndentRuleOptionsSchema.properties.StaticBlock,
          callExpression: rulesBuildHelper.createObjectPropertySchema(
            coreIndentRuleOptionsSchema.properties.CallExpression,
            {
              arguments: createIndentSizeValuePropertySchema(undefined)
            }
          ),
          functionDeclaration: rulesBuildHelper.createObjectPropertySchema(
            coreIndentRuleOptionsSchema.properties.FunctionDeclaration,
            {
              parameters: createIndentSizeValuePropertySchema(undefined),
              body: rulesBuildHelper.createIntegerPropertySchema(0),
              returnType: rulesBuildHelper.createIntegerPropertySchema(0)
            }
          ),
          functionExpression: rulesBuildHelper.createObjectPropertySchema(
            coreIndentRuleOptionsSchema.properties.FunctionExpression,
            {
              parameters: createIndentSizeValuePropertySchema(undefined),
              body: rulesBuildHelper.createIntegerPropertySchema(0),
              returnType: rulesBuildHelper.createIntegerPropertySchema(0)
            }
          ),
          arrayExpression: coreIndentRuleOptionsSchema.properties.ArrayExpression,
          objectExpression: coreIndentRuleOptionsSchema.properties.ObjectExpression,
          importDeclaration: coreIndentRuleOptionsSchema.properties.ImportDeclaration,
          flatTernaryExpressions: coreIndentRuleOptionsSchema.properties.flatTernaryExpressions,
          offsetTernaryExpressions: {
            ...coreIndentRuleOptionsSchema.properties.offsetTernaryExpressions,
            oneOf: [
              rulesBuildHelper.createBooleanPropertySchema(undefined),
              rulesBuildHelper.createObjectPropertySchema(
                undefined,
                {
                  callExpression: rulesBuildHelper.createBooleanPropertySchema(undefined),
                  awaitExpression: rulesBuildHelper.createBooleanPropertySchema(undefined),
                  returnType: rulesBuildHelper.createBooleanPropertySchema(undefined)
                }
              )
            ]
          },
          ignoreComments: coreIndentRuleOptionsSchema.properties.ignoreComments,
          offsetTernaryExpressionsOffsetCallExpressions: coreIndentRuleOptionsSchema.properties.offsetTernaryExpressionsOffsetCallExpressions,
          ignoredNodes: coreIndentRuleOptionsSchema.properties.ignoredNodes,
          tabLength: coreIndentRuleOptionsSchema.properties.tabLength,
          useEditorconfig: rulesBuildHelper.createBooleanPropertySchema({ description: 'If true, values are resolved from the local .editorconfig file.' }),
          defaultIndent: createIndentValuePropertySchema({ description: 'Fallback indentation size when .editorconfig is missing.' })
        }
      }
    ]
  },
  create: create
};

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Factory method initialized by ESLint to orchestrate AST traversal and inject custom configurations.
 *
 * This hook resolves the local configuration format from `.editorconfig`, computes the runtime
 * indentation token size, maps the camelCase user options, and delegates the node evaluation
 * to the underlying core layout rules listener.
 *
 * @param {JsIndentContext} context - The runtime wrapper interface providing access to the current file scope and options tuple.
 *
 * @returns {RuleListener} A collection of selector methods mapping AST node types to validation hooks.
 */
function create(context) {
  const jsIndentOptionsTuple = getProcessedJsIndentOptionsTuple(context);
  const modifiedContext = Object.create(context, getCoreIdentProperties(jsIndentOptionsTuple));
  const listeners = coreIndentRule.create(modifiedContext);

  return {
    ...listeners,
    ConditionalExpression: (node) => conditionalExpression(node, listeners, context, jsIndentOptionsTuple)
  };
}

/**
 * @private
 *
 * Processes a `ConditionalExpression` AST node by forwarding it to the appropriate rule listeners and applying a custom layout fix.
 *
 * This function serves as a wrapper hook during the rule execution. It triggers any registered validation selectors for ternary operators and then executes
 * a workaround to properly handle edge-case indentation issues for trailing delimiters (such as commas or semicolons) placed on subsequent lines.
 *
 * @param {ConditionalExpression} node - The AST node representing the ternary operator with its parent reference.
 * @param {RuleListener} listeners - A collection of selector methods mapping AST node types to validation hooks.
 * @param {JsIndentContext} context - The runtime wrapper interface providing access to the current file scope and options tuple.
 * @param {JsIndentOptionsTuple} jsIndentOptionsTuple - The configuration array passed to the rule options.
 *
 * @returns {void}
 */
function conditionalExpression(node, listeners, context, jsIndentOptionsTuple) {
  listeners.ConditionalExpression?.(node);

  // Workaround for a Stylistic indent bug.
  // The original indent rule does not validate a semicolon placed on a separate line after a VariableDeclaration.
  patchConditionalDelimiter(node, context, jsIndentOptionsTuple);
}

/**
 * @private
 *
 * Validates and fixes the indentation of a trailing delimiter for a multi-line ternary statement.
 *
 * This function coordinates the workaround for the Stylistic indentation issue. It retrieves the separate-line delimiter (if present), computes its expected target alignment column based
 * on the containing block statement, and compares it with the actual layout. If an alignment mismatch is detected, it registers a violation via `context.report` and attaches an automated
 * code fix to correct the indentation.
 *
 * @param {ConditionalExpression} node - The AST node representing the ternary operator with its parent reference.
 * @param {JsIndentContext} context - The runtime wrapper interface providing access to the current file scope and options tuple.
 * @param {JsIndentOptionsTuple} jsIndentOptionsTuple - The configuration array passed to the rule options.
 *
 * @returns {void}
 */
function patchConditionalDelimiter(node, context, jsIndentOptionsTuple) {
  if (node.parent?.type === eType.ConditionalExpression) {
    return;
  }

  const parent = getParentForVariableDeclaration(node.parent);

  if (parent === null) {
    return;
  }

  const sourceCode = context.sourceCode;
  const delimiter = getDelimiterOrNull(node, sourceCode);

  if (delimiter === null) {
    return;
  }

  const expectedColumn = parent.loc.start.column;
  const actualColumn = delimiter.loc.start.column;

  if (actualColumn === expectedColumn) {
    return;
  }

  const metrics = createIndentComparisonMetrics(delimiter, sourceCode, actualColumn, expectedColumn, jsIndentOptionsTuple);
  const indentation = rulesBuildHelper.createIndentString(metrics.expectedValue, metrics.expectedIndentStyle);

  context.report({
    node: delimiter,
    loc: delimiter.loc,
    message: `Expected indentation of ${metrics.expectedValue} ${metrics.expectedName} but found ${metrics.actualValue} ${metrics.actualName}.`,
    fix: (fixer) => patchConditionalDelimiterFix(fixer, actualColumn, delimiter, indentation)
  });
}

/**
 * @private
 *
 * Extracts the raw leading indentation whitespace string preceding a specific token.
 *
 * This utility locates the exact code text line containing the target delimiter via the source code buffer lines index. It then isolates and returns a precise string slice
 * covering everything from the start of that line up to the token's active column offset boundary, preserving the exact arrangement of tab and space characters.
 *
 * @param {AstToken} delimiter - The separate-line delimiter token initiating the target boundaries.
 * @param {SourceCode} sourceCode - The current rule's source code object containing line character records.
 * @param {number} actualColumn - The live column index location indicating the token's leading whitespace width.
 *
 * @returns {string} The exact substring of characters containing the leading indentation footprint.
 */
function getActualIndentation(delimiter, sourceCode, actualColumn) {
  const line = sourceCode.lines[delimiter.loc.start.line - 1];

  return line.slice(0, actualColumn);
}

/**
 * @private
 *
 * Synthesizes a comparative metrics record mapping parsed indentation layouts against expected targets.
 *
 * This factory function inspects the leading whitespace preceding a separate-line delimiter to determine its active indentation style. It automatically normalizes raw numeric column positions
 * into formatted metrics—converting column offsets to relative tab counts when tab-based spacing is detected or expected—and outputs a structured snapshot ready for error message rendering.
 *
 * @param {AstToken} delimiter - The separate-line delimiter token being evaluated.
 * @param {SourceCode} sourceCode - The current rule's source code object used for indentation line lookups.
 * @param {number} actualColumn - The live column index position showing the token's current leading whitespace width.
 * @param {number} expectedColumn - The target column index alignment calculated by the core engine rules.
 * @param {JsIndentOptionsTuple} jsIndentOptionsTuple - The active runtime configuration pair specifying target sizes and options blocks.
 *
 * @returns {IndentComparisonMetrics} A populated metrics snapshot tracking comparative layout styles, values, and unit tags.
 */
function createIndentComparisonMetrics(delimiter, sourceCode, actualColumn, expectedColumn, jsIndentOptionsTuple) {
  const actualIndentation = getActualIndentation(delimiter, sourceCode, actualColumn);
  const tabLength = jsIndentOptionsTuple[1].tabLength;
  const tabs = 'tabs';
  const spaces = 'spaces';

  /** @type {IndentComparisonMetrics} */
  const metrics = {};

  if (actualIndentation.includes('\t')) {
    metrics.actualValue = actualColumn / tabLength;
    metrics.actualName = tabs;
  }
  else {
    metrics.actualValue = actualColumn;
    metrics.actualName = spaces;
  }

  if (jsIndentOptionsTuple[0] === ePropertyValue.tab) {
    metrics.expectedIndentStyle = ePropertyValue.tab;
    metrics.expectedValue = expectedColumn / tabLength;
    metrics.expectedName = tabs;
  }
  else {
    metrics.expectedIndentStyle = ePropertyValue.space;
    metrics.expectedValue = expectedColumn;
    metrics.expectedName = spaces;
  }

  return metrics;
}

/**
 * @private
 *
 * Retrieves the trailing semicolon delimiter for a `ConditionalExpression` if it is placed on a separate line.
 *
 * This utility evaluates the token immediately succeeding the ternary's alternate branch expression. It ensures strict boundary separation by verifying that the semicolon token exists, is explicitly
 * positioned on a subsequent line relative to the end of the alternate expression, and matches a valid standalone statement terminator target.
 *
 * @param {ConditionalExpression} node - The AST node representing the ternary operator with its parent reference.
 * @param {SourceCode} sourceCode - The current rule's source code object used for token lookups.
 *
 * @returns {AstToken | null} The separate-line delimiter token, or `null` if the delimiter is inline, missing, or nested.
 */
function getDelimiterOrNull(node, sourceCode) {
  const delimiter = sourceCode.getTokenAfter(node.alternate);

  if (
    delimiter === null
    || delimiter.value !== semicolon
    || delimiter.loc.start.line === node.alternate.loc.end.line // If ";" is not transferred, this is already the standard logic of Stylistic
  ) {
    return null;
  }

  return delimiter;
}

/**
 * @private
 *
 * Traverses up the AST hierarchy to find the nearest wrapping `VariableDeclaration` ancestor node.
 *
 * This utility acts as a recursive parent scope resolver. It sequentially walks up the node chain via active `.parent` references, terminating the loop and returning the matched block
 * only when it encounters a variable declaration statement. If the root boundary is reached without a match, it gracefully returns `null`.
 *
 * @param {RuleNode | null} parent - The starting AST node context to climb up from.
 *
 * @returns {RuleNode | null} The closest ancestral variable declaration node, or `null` if none is found.
 */
function getParentForVariableDeclaration(parent) {
  while (parent !== null && parent.type !== eType.VariableDeclaration) {
    parent = parent.parent;
  }

  return parent;
}

/**
 * @private
 *
 * Generates an AST text edit operation to properly indent a separate-line delimiter.
 *
 * This utility calculates the character index for the absolute beginning of the line containing the delimiter and builds a range spanning from that line-start up to
 * the delimiter token itself. It then returns a text edit instruction that replaces any leading whitespace within this range with the freshly computed expected indentation.
 *
 * @param {RuleFixer} fixer - The ESLint rule fixer object utilized to construct code modifications.
 * @param {number} actualColumn - The live column index location indicating the token's current leading indent whitespace offset depth.
 * @param {AstToken} delimiter - The delimiter token (semicolon or comma) being validated.
 * @param {string} indentation - The target indentation string (e.g., spaces or tabs) to apply before the delimiter.
 *
 * @returns {RuleTextEdit} The structured text edit object (`RuleTextEdit`) instructing ESLint how to modify the line.
 */
function patchConditionalDelimiterFix(fixer, actualColumn, delimiter, indentation) {
  return fixer.replaceTextRange(
    [
      delimiter.range[0] - actualColumn,
      delimiter.range[0]
    ],
    indentation
  );
}

/**
 * @private
 *
 * Constructs a descriptors dictionary for Object.create to patch the ESLint context options tuple.
 *
 * This method pipes the calculated indent size and mapped PascalCase options required by the core engine into a modified properties blueprint.
 *
 * @param {JsIndentOptionsTuple} jsIndentOptionsTuple - The configuration array passed to the rule options.
 *
 * @returns {PropertyDescriptorMap} A configured property descriptor map containing the modified options array.
 */
function getCoreIdentProperties(jsIndentOptionsTuple) {
  return {
    options: {
      value: [
        jsIndentOptionsTuple[0],
        getCoreIdentOptions(jsIndentOptionsTuple[1])
      ],
      writable: false,
      configurable: true,
      enumerable: true
    }
  };
}

/**
 * @private
 *
 * Resolves the final indentation runtime configuration tuple by harmonizing raw rules parameters with EditorConfig metadata.
 *
 * @param {JsIndentContext} context - The active runtime ESLint rule context interface.
 *
 * @returns {JsIndentOptionsTuple} A normalized internal pair containing the explicit target size and normalized options block.
 */
function getProcessedJsIndentOptionsTuple(context) {
  const options = getProcessedJsIndentOptions(context.options[1]);
  const config = editorconfigProvider.getConfig(options.useEditorconfig, context.filename);
  const indentStyle = editorconfigProvider.getIndentStyle(config, undefined);

  if (indentStyle === ePropertyValue.tab) {
    options.tabLength = rulesBuildHelper.getValueOrDefault(options.tabLength, options.defaultIndent);

    return [ indentStyle, options ];
  }

  const indentSize = editorconfigProvider.getIndentSize(
    config,
    rulesBuildHelper.getValueOrDefault(context.options[0], options.defaultIndent)
  );

  return [ indentSize, options ];
}

/**
 * @private
 *
 * Maps the options block to the configuration structure required by the core stylistic engine.
 *
 * @param {JsIndentOptions>} option - The complete, processed camelCase options object.
 *
 * @returns {Record<string, any>} A structural options block matching the core stylistic/indent schema format.
 */
function getCoreIdentOptions(option) {
  return {
    SwitchCase: option.switchCase,
    VariableDeclarator: option.variableDeclarator,
    assignmentOperator: option.assignmentOperator,
    outerIIFEBody: option.outerIifeBody,
    MemberExpression: option.memberExpression,
    FunctionDeclaration: option.functionDeclaration,
    FunctionExpression: option.functionExpression,
    StaticBlock: option.staticBlock,
    CallExpression: option.callExpression,
    ArrayExpression: option.arrayExpression,
    ObjectExpression: option.objectExpression,
    ImportDeclaration: option.importDeclaration,
    flatTernaryExpressions: option.flatTernaryExpressions,
    offsetTernaryExpressions: option.offsetTernaryExpressions,
    ignoreComments: option.ignoreComments,
    offsetTernaryExpressionsOffsetCallExpressions: option.offsetTernaryExpressionsOffsetCallExpressions,
    ignoredNodes: option.ignoredNodes,
    tabLength: option.tabLength
  };
}

/**
 * @private
 *
 * Processes and normalizes user-provided indentation options, falling back to full defaults if empty.
 *
 * @param {JsIndentOptions | undefined} options - The raw user-defined options object.
 *
 * @returns {JsIndentOptions} A complete, normalized indentation options block.
 */
function getProcessedJsIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions;
  }

  return {
    switchCase: rulesBuildHelper.getValueOrDefault(options.switchCase, defaultJsIndentOptions.switchCase),
    variableDeclarator: getProcessedJsVariableDeclaratorIndentOptions(options.variableDeclarator),
    assignmentOperator: rulesBuildHelper.getValueOrDefault(options.assignmentOperator, defaultJsIndentOptions.assignmentOperator),
    outerIifeBody: rulesBuildHelper.getValueOrDefault(options.outerIifeBody, defaultJsIndentOptions.outerIifeBody),
    memberExpression: rulesBuildHelper.getValueOrDefault(options.memberExpression, defaultJsIndentOptions.memberExpression),
    staticBlock: getProcessedJsStaticBlockIndentOptions(options.staticBlock),
    callExpression: getProcessedJsCallExpressionIndentOptions(options.callExpression),
    functionDeclaration: getProcessedJsFunctionDeclarationIndentOptions(options.functionDeclaration),
    functionExpression: getProcessedJsFunctionExpressionIndentOptions(options.functionExpression),
    arrayExpression: rulesBuildHelper.getValueOrDefault(options.arrayExpression, defaultJsIndentOptions.arrayExpression),
    objectExpression: rulesBuildHelper.getValueOrDefault(options.objectExpression, defaultJsIndentOptions.objectExpression),
    importDeclaration: rulesBuildHelper.getValueOrDefault(options.importDeclaration, defaultJsIndentOptions.importDeclaration),
    flatTernaryExpressions: rulesBuildHelper.getValueOrDefault(options.flatTernaryExpressions, defaultJsIndentOptions.flatTernaryExpressions),
    offsetTernaryExpressions: getProcessedJsOffsetTernaryExpressionsIndentOptions(options.offsetTernaryExpressions),
    ignoreComments: rulesBuildHelper.getValueOrDefault(options.ignoreComments, defaultJsIndentOptions.ignoreComments),
    ignoredNodes: rulesBuildHelper.getValueOrDefault(options.ignoredNodes, defaultJsIndentOptions.ignoredNodes),
    tabLength: rulesBuildHelper.getValueOrDefault(options.tabLength, defaultJsIndentOptions.tabLength),
    useEditorconfig: rulesBuildHelper.getValueOrDefault(options.useEditorconfig, defaultJsIndentOptions.useEditorconfig),
    defaultIndent: rulesBuildHelper.getValueOrDefault(options.defaultIndent, defaultJsIndentOptions.defaultIndent)
  };
}

/**
 * @private
 *
 * Normalizes multi-line variable declarator options into either a flat multiplier or a keyword object.
 *
 * @param {JsVariableDeclaratorIndentOptions | number | undefined} options - The variable declarator sub-option.
 *
 * @returns {number | Required<JsVariableDeclaratorIndentOptions>} The computed multiplier or explicit declaration configuration.
 */
function getProcessedJsVariableDeclaratorIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions.variableDeclarator;
  }

  if (typeof options === eType.number) {
    return options;
  }

  return {
    var: rulesBuildHelper.getValueOrDefault(options.var, defaultJsVariableDeclaratorIndentOptions.var),
    let: rulesBuildHelper.getValueOrDefault(options.let, defaultJsVariableDeclaratorIndentOptions.let),
    const: rulesBuildHelper.getValueOrDefault(options.const, defaultJsVariableDeclaratorIndentOptions.const),
    using: rulesBuildHelper.getValueOrDefault(options.const, defaultJsVariableDeclaratorIndentOptions.using)
  };
}

/**
 * @private
 *
 * Normalizes multi-line ternary declarator options into either a flat multiplier or a keyword object.
 *
 * @param {JsOffsetTernaryExpressionsIndentOptions | boolean | undefined} options - The variable declarator sub-option.
 *
 * @returns {boolean | Required<JsOffsetTernaryExpressionsIndentOptions>} The computed multiplier or explicit declaration configuration.
 */
function getProcessedJsOffsetTernaryExpressionsIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions.offsetTernaryExpressions;
  }

  if (typeof options === eType.boolean) {
    return options;
  }

  return {
    callExpression: rulesBuildHelper.getValueOrDefault(options.callExpression, defaultJsOffsetTernaryExpressionsIndentOptions.callExpression),
    awaitExpression: rulesBuildHelper.getValueOrDefault(options.awaitExpression, defaultJsOffsetTernaryExpressionsIndentOptions.awaitExpression),
    newExpression: rulesBuildHelper.getValueOrDefault(options.newExpression, defaultJsOffsetTernaryExpressionsIndentOptions.newExpression)
  };
}

/**
 * @private
 *
 * Processes and sanitizes indentation configuration specifically for class static blocks.
 *
 * @param {JsStaticBlockIndentOptions | undefined} options - The raw static block options payload.
 *
 * @returns {Required<JsStaticBlockIndentOptions>} A normalized static block options block.
 */
function getProcessedJsStaticBlockIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions.staticBlock;
  }

  return {
    body: rulesBuildHelper.getValueOrDefault(options.body, defaultJsStaticBlockIndentOptions.body)
  };
}

/**
 * @private
 *
 * Processes and sanitizes indentation configuration specifically for function call arguments.
 *
 * @param {JsCallExpressionIndentOptions | undefined} options - The raw call expression options payload.
 *
 * @returns {Required<JsCallExpressionIndentOptions>} A normalized call expression options block.
 */
function getProcessedJsCallExpressionIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions.callExpression;
  }

  return {
    arguments: rulesBuildHelper.getValueOrDefault(options.arguments, defaultJsCallExpressionIndentOptions.arguments)
  };
}

/**
 * @private
 *
 * Processes and sanitizes indentation configuration properties for multi-line function declarations.
 *
 * @param {JsFunctionDeclarationIndentOptions | undefined} options - The raw function declaration options payload.
 *
 * @returns {Required<JsFunctionDeclarationIndentOptions>} A normalized function declaration options block.
 */
function getProcessedJsFunctionDeclarationIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions.functionDeclaration;
  }

  return {
    parameters: rulesBuildHelper.getValueOrDefault(options.parameters, defaultJsFunctionDeclarationIndentOptions.parameters),
    body: rulesBuildHelper.getValueOrDefault(options.body, defaultJsFunctionDeclarationIndentOptions.body)
  };
}

/**
 * @private
 *
 * Processes and sanitizes indentation configuration properties for multi-line function expressions.
 *
 * @param {JsFunctionExpressionIndentOptions | undefined} options - The raw function expression options payload.
 *
 * @returns {Required<JsFunctionExpressionIndentOptions>} A normalized function expression options block.
 */
function getProcessedJsFunctionExpressionIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions.functionExpression;
  }

  return {
    parameters: rulesBuildHelper.getValueOrDefault(options.parameters, defaultJsFunctionExpressionIndentOptions.parameters),
    body: rulesBuildHelper.getValueOrDefault(options.body, defaultJsFunctionExpressionIndentOptions.body)
  };
}

/**
 * @private
 *
 * Extends a base property schema to accept valid indentation level configurations.
 *
 * This helper injects a 'oneOf' constraint into the provided schema, allowing the property
 * to accept either a disabled state enum value (like 'off' or 'unset'), null or a non-negative integer.
 *
 * @param {JSONSchema4} property - The base property schema object to extend.
 *
 * @returns {JSONSchema4} A new JSON Schema object with the indentation constraints applied.
 */
function createIndentLevelPropertySchema(property) {
  const disablePropertySchema = rulesBuildHelper.createDisablePropertySchema(property);

  disablePropertySchema.oneOf.push(rulesBuildHelper.createIntegerPropertySchema(0));

  return disablePropertySchema;
}

/**
 * @private
 *
 * Extends a base property schema to accept valid indentation level configurations.
 *
 * This helper injects a 'oneOf' constraint into the provided schema, allowing the property
 * to accept either a disabled state enum value (like 'tab', 'off' or 'unset'), null or a non-negative integer.
 *
 * @param {JSONSchema4} property - The base property schema object to extend.
 *
 * @returns {JSONSchema4} A new JSON Schema object with the indentation constraints applied.
 */
function createIndentValuePropertySchema(property) {
  const indentLevelSchema = createIndentLevelPropertySchema(property);

  indentLevelSchema.oneOf.push(rulesBuildHelper.createEnumPropertySchema(ePropertyValue.tab));

  return indentLevelSchema;
}

/**
 * @private
 *
 * Extends a base property schema to accept valid indentation level configurations.
 *
 * This helper injects a 'oneOf' constraint into the provided schema, allowing the property
 * to accept either a disabled state enum value (like 'first', 'off' or 'unset'), null or a non-negative integer.
 *
 * @param {JSONSchema4} property - The base property schema object to extend.
 *
 * @returns {JSONSchema4} A new JSON Schema object with the indentation constraints applied.
 */
function createIndentSizeValuePropertySchema(property) {
  const indentLevelSchema = createIndentLevelPropertySchema(property);

  indentLevelSchema.oneOf.push(rulesBuildHelper.createEnumPropertySchema(ePropertyValue.first));

  return indentLevelSchema;
}
