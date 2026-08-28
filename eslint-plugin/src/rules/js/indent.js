import stylisticPlugin from '@stylistic/eslint-plugin';
import editorconfigProvider from '../../infrastructure/editorconfig-provider.js';
import ePropertyValue from '../../infrastructure/property-value.enum.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('./indent.d.ts').JsIndentOptions} JsIndentOptions
 * @typedef {import('./indent.d.ts').JsStaticBlockIndentOptions} JsStaticBlockIndentOptions
 * @typedef {import('./indent.d.ts').JsCallExpressionIndentOptions} JsCallExpressionIndentOptions
 * @typedef {import('./indent.d.ts').JsFunctionDeclarationIndentOptions} JsFunctionDeclarationIndentOptions
 * @typedef {import('./indent.d.ts').JsFunctionExpressionIndentOptions} JsFunctionExpressionIndentOptions
 * @typedef {import('./indent.d.ts').JsVariableDeclaratorIndentOptions} JsVariableDeclaratorIndentOptions
 */

//================================
// Constants
//================================

const coreIndentRule = stylisticPlugin.rules.indent;

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

/** @type {Required<JsIndentOptions>} */
const defaultJsIndentOptions = Object.freeze({
  switchCase: 1,
  variableDeclarator: 1,
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
  useEditorconfig: true,
  defaultIndent: 2
});

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

  if (indentStyle === ePropertyValue.tab) {
    return [ indentStyle, options ];
  }

  const indentSize = editorconfigProvider.getIndentSize(
    config,
    getValueOrDefault(context.options[0], options.defaultIndent)
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
 * Processes and normalizes user-provided indentation options, falling back to full defaults if empty.
 *
 * @param {JsIndentOptions | undefined} options - The raw user-defined options object.
 *
 * @returns {Required<JsIndentOptions>} A complete, normalized indentation options block.
 */
function getProcessedJsIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsIndentOptions;
  }

  return {
    switchCase: rulesBuildHelper.getValueOrDefault(options.switchCase, defaultJsIndentOptions.switchCase),
    variableDeclarator: getProcessedJsVariableDeclaratorIndentOptions(options.variableDeclarator),
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
    offsetTernaryExpressions: rulesBuildHelper.getValueOrDefault(options.offsetTernaryExpressions, defaultJsIndentOptions.offsetTernaryExpressions),
    ignoreComments: rulesBuildHelper.getValueOrDefault(options.ignoreComments, defaultJsIndentOptions.ignoreComments),
    useEditorconfig: rulesBuildHelper.getValueOrDefault(options.useEditorconfig, defaultJsIndentOptions.useEditorconfig),
    defaultIndent: rulesBuildHelper.getValueOrDefault(options.defaultIndent, defaultJsIndentOptions.defaultIndent)
  };
}

/**
 * Normalizes multi-line variable declarator options into either a flat multiplier or a keyword object.
 *
 * @param {JsVariableDeclaratorIndentOptions | number | undefined} options - The variable declarator sub-option.
 *
 * @returns {number | Required<JsVariableDeclaratorIndentOptions>} The computed multiplier or explicit declaration configuration.
 */
function getProcessedJsVariableDeclaratorIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return getVariableDeclaratorDefaultValue();
  }

  if (typeof options === 'number') {
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
 * Processes and sanitizes indentation configuration specifically for class static blocks.
 *
 * @param {JsStaticBlockIndentOptions | undefined} options - The raw static block options payload.
 *
 * @returns {Required<JsStaticBlockIndentOptions>} A normalized static block options block.
 */
function getProcessedJsStaticBlockIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsStaticBlockIndentOptions;
  }

  return {
    body: rulesBuildHelper.getValueOrDefault(options.body, defaultJsStaticBlockIndentOptions.body)
  };
}

/**
 * Processes and sanitizes indentation configuration specifically for function call arguments.
 *
 * @param {JsCallExpressionIndentOptions | undefined} options - The raw call expression options payload.
 *
 * @returns {Required<JsCallExpressionIndentOptions>} A normalized call expression options block.
 */
function getProcessedJsCallExpressionIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsCallExpressionIndentOptions;
  }

  return {
    arguments: rulesBuildHelper.getValueOrDefault(options.arguments, defaultJsCallExpressionIndentOptions.arguments)
  };
}

/**
 * Processes and sanitizes indentation configuration properties for multi-line function declarations.
 *
 * @param {JsFunctionDeclarationIndentOptions | undefined} options - The raw function declaration options payload.
 *
 * @returns {Required<JsFunctionDeclarationIndentOptions>} A normalized function declaration options block.
 */
function getProcessedJsFunctionDeclarationIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsFunctionDeclarationIndentOptions;
  }

  return {
    parameters: rulesBuildHelper.getValueOrDefault(options.parameters, defaultJsFunctionDeclarationIndentOptions.parameters),
    body: rulesBuildHelper.getValueOrDefault(options.body, defaultJsFunctionDeclarationIndentOptions.body)
  };
}

/**
 * Processes and sanitizes indentation configuration properties for multi-line function expressions.
 *
 * @param {JsFunctionExpressionIndentOptions | undefined} options - The raw function expression options payload.
 *
 * @returns {Required<JsFunctionExpressionIndentOptions>} A normalized function expression options block.
 */
function getProcessedJsFunctionExpressionIndentOptions(options) {
  if (rulesBuildHelper.isUnset(options)) {
    return defaultJsFunctionExpressionIndentOptions;
  }

  return {
    parameters: rulesBuildHelper.getValueOrDefault(options.parameters, defaultJsFunctionExpressionIndentOptions.parameters),
    body: rulesBuildHelper.getValueOrDefault(options.body, defaultJsFunctionExpressionIndentOptions.body)
  };
}

