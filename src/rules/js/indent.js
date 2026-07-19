import stylisticPlugin from '@stylistic/eslint-plugin';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';

const coreIndentRule = stylisticPlugin.rules.indent;

//================================
// Exports
//================================

/** @type {import('./indent').default} */
export default {
  meta: {
    ...coreIndentRule.meta,
    docs: {
      ...coreIndentRule.meta.docs,
      description: 'Native EditorConfig-driven indentation patch by AvenVaro.'
    },
    schema: [
      coreIndentRule.meta.schema[0],
      {
        ...coreIndentRule.meta.schema[1],
        additionalProperties: false,
        properties: {
          ...coreIndentRule.meta.schema[1].properties,
          switchCase: coreIndentRule.meta.schema[1].properties.SwitchCase,
          variableDeclarator: coreIndentRule.meta.schema[1].properties.VariableDeclarator,
          outerIifeBody: coreIndentRule.meta.schema[1].properties.outerIIFEBody,
          memberExpression: coreIndentRule.meta.schema[1].properties.MemberExpression,
          staticBlock: coreIndentRule.meta.schema[1].properties.StaticBlock,
          callExpression: coreIndentRule.meta.schema[1].properties.CallExpression,
          functionDeclaration: coreIndentRule.meta.schema[1].properties.FunctionDeclaration,
          functionExpression: coreIndentRule.meta.schema[1].properties.FunctionExpression,
          arrayExpression: coreIndentRule.meta.schema[1].properties.ArrayExpression,
          objectExpression: coreIndentRule.meta.schema[1].properties.ObjectExpression,
          importDeclaration: coreIndentRule.meta.schema[1].properties.ImportDeclaration,
          flatTernaryExpressions: coreIndentRule.meta.schema[1].properties.flatTernaryExpressions,
          offsetTernaryExpressions: coreIndentRule.meta.schema[1].properties.offsetTernaryExpressions,
          ignoreComments: coreIndentRule.meta.schema[1].properties.ignoreComments,
          useEditorconfig: {
            type: 'boolean',
            description: 'If true, values are resolved from the local .editorconfig file.'
          },
          defaultIndent: {
            description: 'Fallback indentation size when .editorconfig is missing.',
            oneOf: [
              {
                type: 'integer',
                minimum: 0
              },
              {
                enum: [ 'tab' ]
              }
            ]
          }
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
 * Factory method initialized by ESLint to orchestrate AST traversal and inject custom configurations.
 *
 * This hook resolves the local configuration format from `.editorconfig`, computes the runtime
 * indentation token size, maps the camelCase user options, and delegates the node evaluation
 * to the underlying core layout rules listener.
 *
 * @param {import('./indent').JsIndentContext} context - The runtime wrapper interface providing access to the current file scope and options tuple.
 *
 * @returns {import('eslint').Rule.RuleListener} A collection of selector methods mapping AST node types to validation hooks.
 */
function create(context) {
  const modifiedContext = Object.create(context, getCoreIdentProperties(context));
  const listeners = coreIndentRule.create(modifiedContext);

  return listeners;
}

/**
 * Constructs a descriptors dictionary for Object.create to patch the ESLint context options tuple.
 *
 * This method pipes the calculated indent size and mapped PascalCase options required by the core
 * engine into a modified properties blueprint.
 *
 * @param {import('./indent.d.ts').JsIndentContext} context - The active runtime ESLint rule context interface.
 *
 * @returns {PropertyDescriptorMap} A configured property descriptor map containing the modified options array.
 */
function getCoreIdentProperties(context) {
  const jsIndentOptionsTuple = getProcessedJsIndentOptionsTuple(context);

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
 * Resolves the final indentation runtime configuration tuple by harmonizing raw rules parameters with EditorConfig metadata.
 *
 * @param {import('./indent.d.ts').JsIndentContext} context - The active runtime ESLint rule context interface.
 *
 * @returns {import('./indent.d.ts').JsIndentOptionsTuple} A normalized internal pair containing the explicit target size and normalized options block.
 */
function getProcessedJsIndentOptionsTuple(context) {
  const options = getProcessedJsIndentOptions(context.options[1]);
  const config = editorconfigProvider.getConfig(options.useEditorconfig, context.filename);
  const indentStyle = editorconfigProvider.getIndentStyle(config, undefined);

  if (indentStyle === editorconfigProvider.propertyValue.tab) {
    return [ indentStyle, options ];
  }

  const indentSize = editorconfigProvider.getIndentSize(
    config,
    getValueOrDefault(context.options[0], options.defaultIndent)
  );

  return [ indentSize, options ];
}

/**
 * Maps the options block to the configuration structure required by the core @stylistic engine.
 *
 * @param {Required<import('./indent').JsIndentOptions>} option - The complete, processed camelCase options object.
 *
 * @returns {Record<string, any>} A structural options block matching the core @stylistic/indent schema format.
 */
function getCoreIdentOptions(option) {
  return {
    SwitchCase: option.switchCase,
    VariableDeclarator: option.variableDeclarator,
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
    ignoreComments: option.ignoreComments
  };
}

/**
 * Processes and normalizes user-provided indentation options, falling back to full defaults if empty.
 *
 * @param {import('./indent').JsIndentOptions | undefined} options - The raw user-defined options object.
 *
 * @returns {Required<import('./indent').JsIndentOptions>} A complete, normalized indentation options block.
 */
function getProcessedJsIndentOptions(options) {
  if (isUnset(options)) {
    return getDefaultJsIndentOptions();
  }

  return {
    switchCase: getValueOrDefault(options.switchCase, getSwitchCaseDefaultValue),
    variableDeclarator: getProcessedJsVariableDeclaratorIndentOptions(options.variableDeclarator),
    outerIifeBody: getValueOrDefault(options.outerIifeBody, getOuterIifeBodyDefaultValue),
    memberExpression: getValueOrDefault(options.memberExpression, getMemberExpressionDefaultValue),
    staticBlock: getProcessedJsStaticBlockIndentOptions(options.staticBlock),
    callExpression: getProcessedJsCallExpressionIndentOptions(options.callExpression),
    functionDeclaration: getProcessedJsFunctionDeclarationIndentOptions(options.functionDeclaration),
    functionExpression: getProcessedJsFunctionExpressionIndentOptions(options.functionExpression),
    arrayExpression: getValueOrDefault(options.arrayExpression, getDefaultArrayExpressionOption),
    objectExpression: getValueOrDefault(options.objectExpression, getDefaultObjectExpressionOption),
    importDeclaration: getValueOrDefault(options.importDeclaration, getDefaultImportDeclarationOption),
    flatTernaryExpressions: getValueOrDefault(options.flatTernaryExpressions, getDefaultFlatTernaryExpressionsOption),
    offsetTernaryExpressions: getValueOrDefault(options.offsetTernaryExpressions, getDefaultOffsetTernaryExpressionsOption),
    ignoreComments: getValueOrDefault(options.ignoreComments, getDefaultIgnoreCommentsOption),
    useEditorconfig: getValueOrDefault(options.useEditorconfig, getDefaultUseEditorconfigOption),
    defaultIndent: getValueOrDefault(options.defaultIndent, getDefaultDefaultIndentOption)
  };
}

/**
 * Normalizes multi-line variable declarator options into either a flat multiplier or a keyword object.
 *
 * @param {import('./indent').JsVariableDeclaratorIndentOptions | number | undefined} options - The variable declarator sub-option.
 *
 * @returns {number | Required<import('./indent').JsVariableDeclaratorIndentOptions>} The computed multiplier or explicit declaration configuration.
 */
function getProcessedJsVariableDeclaratorIndentOptions(options) {
  if (isUnset(options)) {
    return getVariableDeclaratorDefaultValue();
  }

  if (typeof options === 'number') {
    return options;
  }

  return {
    var: getValueOrDefault(options.var, getVarDefaultValueForJsVariableDeclaratorIndentOptions),
    let: getValueOrDefault(options.let, getLetDefaultValueForJsVariableDeclaratorIndentOptions),
    const: getValueOrDefault(options.const, getConstDefaultValueForJsVariableDeclaratorIndentOptions)
  };
}

/**
 * Processes and sanitizes indentation configuration specifically for class static blocks.
 *
 * @param {import('./indent').JsStaticBlockIndentOptions | undefined} options - The raw static block options payload.
 *
 * @returns {Required<import('./indent').JsStaticBlockIndentOptions>} A normalized static block options block.
 */
function getProcessedJsStaticBlockIndentOptions(options) {
  if (isUnset(options)) {
    return getDefaultJsStaticBlockIndentOptions();
  }

  return {
    body: getValueOrDefault(options.body, getBodyDefaultValueForJsStaticBlockIndentOptions)
  };
}

/**
 * Processes and sanitizes indentation configuration specifically for function call arguments.
 *
 * @param {import('./indent').JsCallExpressionIndentOptions | undefined} options - The raw call expression options payload.
 *
 * @returns {Required<import('./indent').JsCallExpressionIndentOptions>} A normalized call expression options block.
 */
function getProcessedJsCallExpressionIndentOptions(options) {
  if (isUnset(options)) {
    return getDefaultJsCallExpressionIndentOptions();
  }

  return {
    arguments: getValueOrDefault(options.arguments, getArgumentsDefaultValueForJsCallExpressionIndentOptions)
  };
}

/**
 * Processes and sanitizes indentation configuration properties for multi-line function declarations.
 *
 * @param {import('./indent').JsFunctionDeclarationIndentOptions | undefined} options - The raw function declaration options payload.
 *
 * @returns {Required<import('./indent').JsFunctionDeclarationIndentOptions>} A normalized function declaration options block.
 */
function getProcessedJsFunctionDeclarationIndentOptions(options) {
  if (isUnset(options)) {
    return getDefaultJsFunctionDeclarationIndentOptions();
  }

  return {
    parameters: getValueOrDefault(options.parameters, getParametersDefaultValueForJsFunctionDeclarationIndentOptions),
    body: getValueOrDefault(options.body, getBodyDefaultValueForJsFunctionDeclarationIndentOptions)
  };
}

/**
 * Processes and sanitizes indentation configuration properties for multi-line function expressions.
 *
 * @param {import('./indent').JsFunctionExpressionIndentOptions | undefined} options - The raw function expression options payload.
 *
 * @returns {Required<import('./indent').JsFunctionExpressionIndentOptions>} A normalized function expression options block.
 */
function getProcessedJsFunctionExpressionIndentOptions(options) {
  if (isUnset(options)) {
    return getDefaultJsFunctionExpressionIndentOptions();
  }

  return {
    parameters: getValueOrDefault(options.parameters, getParametersDefaultValueForJsFunctionExpressionIndentOptions),
    body: getValueOrDefault(options.body, getBodyDefaultValueForJsFunctionExpressionIndentOptions)
  };
}

/**
 * Resolves a configuration value or falls back to a lazy-evaluated default producer.
 *
 * @template T
 *
 * @param {T | undefined} value - The target configuration property to evaluate.
 * @param {function(): T} getDefaultValue - Factory function producing the fallback default value.
 *
 * @returns {T} The provided value if defined, otherwise the resolved default payload.
 */
function getValueOrDefault(value, getDefaultValue) {
  if (value === undefined) {
    return getDefaultValue();
  }

  return value;
}

/**
 * Evaluates whether a configuration value is unassigned, null, or represents an empty structural block.
 *
 * @param {any} value - The runtime configuration asset or property to check.
 *
 * @returns {boolean} True if the value represents an empty or unassigned state, otherwise false.
 */
function isUnset(value) {
  return value === undefined
    || (typeof value === 'object' && (value === null || Object.keys(value).length === 0))
  ;
}

/**
 * Generates the full default configuration object for the JavaScript indentation rule.
 *
 * @returns {import('./indent').JsIndentOptions} The default indentation options blueprint.
 */
function getDefaultJsIndentOptions() {
  return {
    switchCase: getSwitchCaseDefaultValue(),
    variableDeclarator: getVariableDeclaratorDefaultValue(),
    outerIifeBody: getOuterIifeBodyDefaultValue(),
    memberExpression: getMemberExpressionDefaultValue(),
    staticBlock: getDefaultJsStaticBlockIndentOptions(),
    callExpression: getDefaultJsCallExpressionIndentOptions(),
    functionDeclaration: getDefaultJsFunctionDeclarationIndentOptions(),
    functionExpression: getDefaultJsFunctionExpressionIndentOptions(),
    arrayExpression: getDefaultArrayExpressionOption(),
    objectExpression: getDefaultObjectExpressionOption(),
    importDeclaration: getDefaultImportDeclarationOption(),
    flatTernaryExpressions: getDefaultFlatTernaryExpressionsOption(),
    offsetTernaryExpressions: getDefaultOffsetTernaryExpressionsOption(),
    ignoreComments: getDefaultIgnoreCommentsOption(),
    useEditorconfig: getDefaultUseEditorconfigOption(),
    defaultIndent: getDefaultDefaultIndentOption()
  };
}

/**
 * Returns the default indentation multiplier for case clauses in switch statements.
 *
 * @returns {number} Default value of 1.
 */
function getSwitchCaseDefaultValue() {
  return 1;
}

/**
 * Returns the default indentation multiplier for multi-line variable declarators.
 *
 * @returns {number} Default value of 1.
 */
function getVariableDeclaratorDefaultValue() {
  return 1;
}

/**
 * Returns the default indentation multiplier for the body of Immediately-Invoked Function Expressions.
 *
 * @returns {number} Default value of 1.
 */
function getOuterIifeBodyDefaultValue() {
  return 1;
}

/**
 * Returns the default indentation multiplier for multi-line chained member expressions.
 *
 * @returns {number} Default value of 1.
 */
function getMemberExpressionDefaultValue() {
  return 1;
}

/**
 * Generates the default nested options block for class static initialization blocks.
 *
 * @returns {import('./indent').JsStaticBlockIndentOptions} Default configuration object for static blocks.
 */
function getDefaultJsStaticBlockIndentOptions() {
  return {
    body: getBodyDefaultValueForJsStaticBlockIndentOptions()
  };
}

/**
 * Returns the default indentation multiplier for statements within class static blocks.
 *
 * @returns {number} Default value of 1.
 */
function getBodyDefaultValueForJsStaticBlockIndentOptions() {
  return 1;
}

/**
 * Generates the default nested options block for function call arguments.
 *
 * @returns {import('./indent').JsCallExpressionIndentOptions} Default configuration object for call expressions.
 */
function getDefaultJsCallExpressionIndentOptions() {
  return {
    arguments: getArgumentsDefaultValueForJsCallExpressionIndentOptions()
  };
}

/**
 * Returns the default indentation multiplier or alignment token for function call arguments.
 *
 * @returns {number} Default value of 1.
 */
function getArgumentsDefaultValueForJsCallExpressionIndentOptions() {
  return 1;
}

/**
 * Generates the default nested options block for function declarations.
 *
 * @returns {import('./indent').JsFunctionDeclarationIndentOptions} Default configuration object for function declarations.
 */
function getDefaultJsFunctionDeclarationIndentOptions() {
  return {
    parameters: getParametersDefaultValueForJsFunctionDeclarationIndentOptions(),
    body: getBodyDefaultValueForJsFunctionDeclarationIndentOptions()
  };
}

/**
 * Returns the default indentation multiplier or alignment token for formal declaration parameters.
 *
 * @returns {number} Default value of 1.
 */
function getParametersDefaultValueForJsFunctionDeclarationIndentOptions() {
  return 1;
}

/**
 * Returns the default indentation multiplier for statements within function declaration bodies.
 *
 * @returns {number} Default value of 1.
 */
function getBodyDefaultValueForJsFunctionDeclarationIndentOptions() {
  return 1;
}

/**
 * Generates the default nested options block for function expressions.
 *
 * @returns {import('./indent').JsFunctionExpressionIndentOptions} Default configuration object for function expressions.
 */
function getDefaultJsFunctionExpressionIndentOptions() {
  return {
    parameters: getParametersDefaultValueForJsFunctionExpressionIndentOptions(),
    body: getBodyDefaultValueForJsFunctionExpressionIndentOptions()
  };
}

/**
 * Returns the default indentation multiplier or alignment token for formal expression parameters.
 *
 * @returns {number} Default value of 1.
 */
function getParametersDefaultValueForJsFunctionExpressionIndentOptions() {
  return 1;
}

/**
 * Returns the default indentation multiplier for statements within function expression bodies.
 *
 * @returns {number} Default value of 1.
 */
function getBodyDefaultValueForJsFunctionExpressionIndentOptions() {
  return 1;
}

/**
 * Returns the default indentation multiplier or alignment token for multi-line array elements.
 *
 * @returns {number} Default value of 1.
 */
function getDefaultArrayExpressionOption() {
  return 1;
}

/**
 * Returns the default indentation multiplier or alignment token for multi-line object properties.
 *
 * @returns {number} Default value of 1.
 */
function getDefaultObjectExpressionOption() {
  return 1;
}

/**
 * Returns the default indentation multiplier or alignment token for multi-line import declarations.
 *
 * @returns {number} Default value of 1.
 */
function getDefaultImportDeclarationOption() {
  return 1;
}

/**
 * Returns the default alignment behavior for nested multi-line ternary expressions.
 *
 * @returns {boolean} Default value of false.
 */
function getDefaultFlatTernaryExpressionsOption() {
  return false;
}

/**
 * Returns the default configuration for offsetting multi-line ternary expressions from variables.
 *
 * @returns {boolean} Default value of false.
 */
function getDefaultOffsetTernaryExpressionsOption() {
  return false;
}

/**
 * Returns the default behavior for linting indentation on lines containing comments.
 *
 * @returns {boolean} Default value of false.
 */
function getDefaultIgnoreCommentsOption() {
  return false;
}

/**
 * Returns whether the system should look up local EditorConfig configurations by default.
 *
 * @returns {boolean} Default value of true.
 */
function getDefaultUseEditorconfigOption() {
  return true;
}

/**
 * Returns the default fallback indentation size applied when configuration files are missing.
 *
 * @returns {number} Default value of 2.
 */
function getDefaultDefaultIndentOption() {
  return 2;
}

/**
 * Returns the default indentation multiplier for multi-line variables declared with `var`.
 *
 * @returns {number} Default value of 1.
 */
function getVarDefaultValueForJsVariableDeclaratorIndentOptions() {
  return 1;
}

/**
 * Returns the default indentation multiplier for multi-line variables declared with `let`.
 *
 * @returns {number} Default value of 1.
 */
function getLetDefaultValueForJsVariableDeclaratorIndentOptions() {
  return 1;
}

/**
 * Returns the default indentation multiplier for multi-line variables declared with `const`.
 *
 * @returns {number} Default value of 1.
 */
function getConstDefaultValueForJsVariableDeclaratorIndentOptions() {
  return 1;
}
