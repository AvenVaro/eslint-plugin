import { ESLint } from 'eslint';

import { default as ePropertyValue, EPropertyValue } from './infrastructure/property-value.enum.js';

import {
  DisableProperty,
  Charset,
  EndOfLine,
  IndentSize,
  IndentStyle,
  InsertFinalNewLine,
  TabWidth,
  TrimTrailingWhitespace
} from './infrastructure/editorconfig-provider.js';

import {
  IndentLevel,
  IndentSizeValue,
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions,
  JsOffsetTernaryExpressionsIndentOptions,
  jsIndentRuleDefaultValues,
  JsIndentRuleDefaultValues
} from './rules/js/indent.js';

export interface EslintPlugin extends ESLint.Plugin {
  rules: ESLint.Plugin['rules'];
}

declare const plugin: EslintPlugin;

export default plugin;

export {
  ePropertyValue,
  EPropertyValue,
  DisableProperty,
  Charset,
  EndOfLine,
  IndentSize,
  IndentStyle,
  InsertFinalNewLine,
  TabWidth,
  TrimTrailingWhitespace,
  IndentLevel,
  IndentSizeValue,
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions,
  JsOffsetTernaryExpressionsIndentOptions,
  jsIndentRuleDefaultValues,
  JsIndentRuleDefaultValues
};
