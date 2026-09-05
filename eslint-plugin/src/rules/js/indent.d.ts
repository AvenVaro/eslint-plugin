import { Rule } from 'eslint';
import { JSONSchema4 } from 'json-schema';
import { EPropertyValue } from '../../infrastructure/property-value.enum.js';
import { EType } from '../../infrastructure/type.enum.js';
import { DisableProperty } from '../../infrastructure/rules-build-helper.js';

/**
 * Defines a configuration value that can either be a numeric indent size or disabled entirely.
 */
export type IndentLevel = number | DisableProperty;

/**
 * Provides indentation size as a fixed number of spaces/tabs or a special formatting mode (e.g., 'first', 'unset' or 'off').
 */
export type IndentSizeValue = IndentLevel | EPropertyValue['first'];

/**
 * Provides indentation size as a fixed number of spaces/tabs or a special formatting mode (e.g., 'first', 'unset' or 'off').
 */
export type IndentValue = IndentLevel | EPropertyValue['tab'];

/**
 * Configuration options for the EditorConfig-integrated JavaScript indentation rule.
 */
export interface JsIndentOptions {
  /** Enforces indentation level for `case` clauses in `switch` statements. */
  switchCase?: number;

  /** Enforces indentation level for variable declarators when spanned across multiple lines. */
  variableDeclarator?: IndentSizeValue | JsVariableDeclaratorIndentOptions;

  /** Specifies the indentation level for the right-hand side of a variable assignment when it breaks onto a new line. Set to 'off' to disable validation for wrapped assignments. */
  assignmentOperator?: IndentLevel;

  /** Enforces indentation level for the body of an Immediately-Invoked Function Expression (IIFE). */
  outerIifeBody?: IndentLevel;

  /** Enforces indentation level for multi-line member expressions chained with a dot. */
  memberExpression?: IndentLevel;

  /** Enforces indentation level for properties inside a class static block. */
  staticBlock?: JsStaticBlockIndentOptions;

  /** Enforces indentation level for arguments in a multi-line function call expression. */
  callExpression?: JsCallExpressionIndentOptions;

  /** Enforces indentation level for parameters and body nodes within function declarations. */
  functionDeclaration?: JsFunctionDeclarationIndentOptions;

  /** Enforces indentation level for parameters and body nodes within function expressions. */
  functionExpression?: JsFunctionExpressionIndentOptions;

  /** Enforces indentation level for elements inside multi-line array expressions. */
  arrayExpression?: IndentSizeValue;

  /** Enforces indentation level for properties inside multi-line object expressions. */
  objectExpression?: IndentSizeValue;

  /** Enforces indentation level for declarations inside multi-line import statements. */
  importDeclaration?: IndentSizeValue;

  /** If true, requires nested ternary expressions to be aligned on the same indentation level. */
  flatTernaryExpressions?: boolean;

  /** If true, requires ternary expressions to be indented relative to the parent variable token. */
  offsetTernaryExpressions?: boolean | JsOffsetTernaryExpressionsIndentOptions;

  /** If true, completely skips linting indentation checks on lines that contain comments. */
  ignoreComments?: boolean;

  /** Controls whether an additional indent level is applied to function arguments within nested ternary expressions when 'offsetTernaryExpressions' is enabled. */
  offsetTernaryExpressionsOffsetCallExpressions?: boolean;

  /** An array of AST selector strings. Code nodes matching these selectors will be completely ignored by the indentation validation rules. */
  ignoredNodes?: string[];

  /** Specifies the equivalent character width of a single tab character (\t). Essential for accurate alignment calculations when tab indentation is used. */
  tabLength?: number;

  /** If true, the rule parses and enforces values from the local `.editorconfig` file configuration. */
  useEditorconfig?: boolean;

  /** Fallback indentation size used when `.editorconfig` is unavailable or configuration keys are missing. */
  defaultIndent?: IndentValue;
}

/**
 * Indentation options for specific variable declaration keywords.
 */
export interface JsVariableDeclaratorIndentOptions {
  /** Indentation level for multi-line variables declared with `var`. */
  var?: IndentSizeValue;

  /** Indentation level for multi-line variables declared with `let`. */
  let?: IndentSizeValue;

  /** Indentation level for multi-line variables declared with `const`. */
  const?: IndentSizeValue;

  /** Indentation level for multi-line variables declared with `using`. */
  using?: IndentSizeValue;
}

/**
 * Indentation options for static class blocks.
 */
export interface JsStaticBlockIndentOptions {
  /** Indentation level for statements inside class `static` initialization blocks. */
  body?: number;
}

/**
 * Indentation options for function call arguments.
 */
export interface JsCallExpressionIndentOptions {
  /** Indentation level or `'first'` alignment token for positional function arguments. */
  arguments?: IndentSizeValue;
}

/**
 * Indentation options for parameters and body of a function declaration.
 */
export interface JsFunctionDeclarationIndentOptions {
  /** Indentation level or `'first'` alignment token for formal function declaration parameters. */
  parameters?: IndentSizeValue;

  /** Indentation level for statements within the function declaration body block. */
  body?: number;

  /** Specifies the indentation level for the function return type when it is placed on a new line below the parameters. */
  returnType?: number;
}

/**
 * Indentation options for parameters and body of a function expression.
 */
export interface JsFunctionExpressionIndentOptions {
  /** Indentation level or `'first'` alignment token for formal function expression parameters. */
  parameters?: IndentSizeValue;

  /** Indentation level for statements within the function expression body block. */
  body?: number;

  /** Specifies the indentation level for the function return type when it is placed on a new line below the parameters. */
  returnType?: number;
}

/**
 * Configuration options to control whether specific expression types
 * receive an extra indentation offset when nested inside ternary operations.
 */
export interface JsOffsetTernaryExpressionsIndentOptions {
  /** Enforces an indentation offset for function and method calls inside ternary expressions. */
  callExpression?: boolean;

  /** Enforces an indentation offset for awaited expressions inside ternary operations. */
  awaitExpression?: boolean;

  /** Enforces an indentation offset for constructor instances ('new' keyword) inside ternary operations. */
  newExpression?: boolean;
}

/**
 * Extended rule metadata interface explicitly mapped to custom JsIndentOptions.
 */
export interface JsIndentRuleMeta extends Omit<Rule.RuleModule['meta'], 'schema'> {
  schema: [
    {
      type: EType['number'];
    },
    {
      type: EType['object'];
      properties: JSONSchema4;
    }
  ];
}

/**
 * The configuration array passed to the rule options.
 */
export type JsIndentOptionsTuple = [
  /**
   * Dynamic indentation size resolved from the .editorconfig file,
   * or 'tab' for hard-tabbed layouts.
   */
  indentSize?: IndentValue,

  /**
   * An object containing user-defined camelCase formatting overrides
   * matching the core AST node selectors.
   */
  userOptions?: JsIndentOptions
];

/**
 * Isolated rule context structure replicating the official ESLint stylistic indent options tuple.
 */
export interface JsIndentContext extends Omit<Rule.RuleContext, 'options'> {
  /**
   * The runtime configuration array passed to the rule options.
   */
  options: JsIndentOptionsTuple;
}

/**
 * The main interface of the module for the indentation rule, extending the standard structure of ESLint and stylistic rules.
 */
export interface JsIndentRule extends Omit<Rule.RuleModule, 'meta' | 'create'> {
  /**
   * The rule metadata object containing schema validation, rule types, and documentation.
   */
  meta: JsIndentRuleMeta;

  /**
   * Factory method initialized by ESLint to traverse the AST nodes and execute indentation validation.
   *
   * @param context The runtime wrapper interface providing access to the current file path, source text, and the options tuple.
   *
   * @returns A collection of selector methods mapping AST node types to validation hooks.
   */
  create(context: JsIndentContext): Rule.RuleListener;
}

export declare const defaultJsVariableDeclaratorIndentOptions: Required<JsVariableDeclaratorIndentOptions> & Readonly<{
  readonly var: 1;
  readonly let: 1;
  readonly const: 1;
  readonly using: 1;
}>;

export declare const defaultJsStaticBlockIndentOptions: Required<JsStaticBlockIndentOptions> & Readonly<{
  readonly body: 1;
}>;

export declare const defaultJsCallExpressionIndentOptions: Required<JsCallExpressionIndentOptions> & Readonly<{
  readonly arguments: 1;
}>;

export declare const defaultJsFunctionDeclarationIndentOptions: Required<JsFunctionDeclarationIndentOptions> & Readonly<{
  readonly parameters: 1;
  readonly body: 1;
}>;

export declare const defaultJsFunctionExpressionIndentOptions: Required<JsFunctionExpressionIndentOptions> & Readonly<{
  readonly parameters: 1;
  readonly body: 1;
}>;

export declare const defaultJsOffsetTernaryExpressionsIndentOptions: Required<JsOffsetTernaryExpressionsIndentOptions> & Readonly<{
  readonly callExpression: false;
  readonly awaitExpression: false;
  readonly newExpression: false;
}>;

export declare const defaultJsIndentOptions: JsIndentOptions & Readonly<{
  readonly switchCase: 1;
  readonly variableDeclarator: 1;
  readonly assignmentOperator: undefined;
  readonly outerIifeBody: 1;
  readonly memberExpression: 1;
  readonly staticBlock: typeof defaultJsStaticBlockIndentOptions;
  readonly callExpression: typeof defaultJsCallExpressionIndentOptions;
  readonly functionDeclaration: typeof defaultJsFunctionDeclarationIndentOptions;
  readonly functionExpression: typeof defaultJsFunctionExpressionIndentOptions;
  readonly arrayExpression: 1;
  readonly objectExpression: 1;
  readonly importDeclaration: 1;
  readonly flatTernaryExpressions: false;
  readonly offsetTernaryExpressions: false;
  readonly ignoreComments: false;
  readonly offsetTernaryExpressionsOffsetCallExpressions: undefined;
  readonly ignoredNodes: readonly [];
  readonly tabLength: undefined;
  readonly useEditorconfig: true;
  readonly defaultIndent: 2;
}>;

export type JsIndentRuleDefaultValues = Readonly<{
  readonly defaultJsVariableDeclaratorIndentOptions: typeof defaultJsVariableDeclaratorIndentOptions;
  readonly defaultJsStaticBlockIndentOptions: typeof defaultJsStaticBlockIndentOptions;
  readonly defaultJsCallExpressionIndentOptions: typeof defaultJsCallExpressionIndentOptions;
  readonly defaultJsFunctionDeclarationIndentOptions: typeof defaultJsFunctionDeclarationIndentOptions;
  readonly defaultJsFunctionExpressionIndentOptions: typeof defaultJsFunctionExpressionIndentOptions;
  readonly defaultJsOffsetTernaryExpressionsIndentOptions: typeof defaultJsOffsetTernaryExpressionsIndentOptions;
  readonly defaultJsIndentOptions: typeof defaultJsIndentOptions;
}>;

export declare const jsIndentRuleDefaultValues: JsIndentRuleDefaultValues;

declare const rule: JsIndentRule;

export default rule;
