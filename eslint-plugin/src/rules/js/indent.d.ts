import { Rule } from 'eslint';
import { EPropertyValue } from '../../infrastructure/property-value.enum.js'
import { EType } from '../../infrastructure/type.enum.js'

/**
 * Configuration options for the EditorConfig-integrated JavaScript indentation rule.
 */
export interface JsIndentOptions {
  /** Enforces indentation level for `case` clauses in `switch` statements. */
  switchCase?: number;

  /** Enforces indentation level for variable declarators when spanned across multiple lines. */
  variableDeclarator?: number | JsVariableDeclaratorIndentOptions;

  /** Enforces indentation level for the body of an Immediately-Invoked Function Expression (IIFE). */
  outerIifeBody?: number | EPropertyValue['off'];

  /** Enforces indentation level for multi-line member expressions chained with a dot. */
  memberExpression?: number | EPropertyValue['off'];

  /** Enforces indentation level for properties inside a class static block. */
  staticBlock?: JsStaticBlockIndentOptions;

  /** Enforces indentation level for arguments in a multi-line function call expression. */
  callExpression?: JsCallExpressionIndentOptions;

  /** Enforces indentation level for parameters and body nodes within function declarations. */
  functionDeclaration?: JsFunctionDeclarationIndentOptions;

  /** Enforces indentation level for parameters and body nodes within function expressions. */
  functionExpression?: JsFunctionExpressionIndentOptions;

  /** Enforces indentation level for elements inside multi-line array expressions. */
  arrayExpression?: number | EPropertyValue['first'];

  /** Enforces indentation level for properties inside multi-line object expressions. */
  objectExpression?: number | EPropertyValue['first'];

  /** Enforces indentation level for declarations inside multi-line import statements. */
  importDeclaration?: number | EPropertyValue['first'];

  /** If true, requires nested ternary expressions to be aligned on the same indentation level. */
  flatTernaryExpressions?: boolean;

  /** If true, requires ternary expressions to be indented relative to the parent variable token. */
  offsetTernaryExpressions?: boolean;

  /** If true, completely skips linting indentation checks on lines that contain comments. */
  ignoreComments?: boolean;

  /** If true, the rule parses and enforces values from the local `.editorconfig` file configuration. */
  useEditorconfig?: boolean;

  /** Fallback indentation size used when `.editorconfig` is unavailable or configuration keys are missing. */
  defaultIndent?: number | EPropertyValue['tab'];
}

/**
 * Indentation options for specific variable declaration keywords.
 */
export interface JsVariableDeclaratorIndentOptions {
  /** Indentation level for multi-line variables declared with `var`. */
  var?: number;

  /** Indentation level for multi-line variables declared with `let`. */
  let?: number;

  /** Indentation level for multi-line variables declared with `const`. */
  const?: number;
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
  arguments?: number | EPropertyValue['first'];
}

/**
 * Indentation options for parameters and body of a function declaration.
 */
export interface JsFunctionDeclarationIndentOptions {
  /** Indentation level or `'first'` alignment token for formal function declaration parameters. */
  parameters?: number | EPropertyValue['first'];

  /** Indentation level for statements within the function declaration body block. */
  body?: number;
}

/**
 * Indentation options for parameters and body of a function expression.
 */
export interface JsFunctionExpressionIndentOptions {
  /** Indentation level or `'first'` alignment token for formal function expression parameters. */
  parameters?: number | EPropertyValue['first'];

  /** Indentation level for statements within the function expression body block. */
  body?: number;
}

/**
 * Represents the structure of a single property inside the ESLint schema validation object.
 */
export interface JsonSchemaProperty {
  type: EType['string'] | EType['number'] | EType['boolean'] | EType['object'];
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
      properties: {
        [K in keyof JsIndentOptions]: Record<string, unknown> | JsonSchemaProperty;
      };
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
  indentSize?: number | EPropertyValue['tab'],

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
 * The core module interface for the indentation rule, extending the standard ESLint rule structure.
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

declare const rule: JsIndentRule;

export default rule;
