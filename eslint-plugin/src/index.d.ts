import { ESLint } from 'eslint';

import { default as ePropertyValue, EPropertyValue } from './infrastructure/property-value.enum.js';
import { DisableProperty } from './infrastructure/rules-build-helper.js';

import {
  IndentLevel,
  IndentSizeValue,
  IndentValue,
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
  IndentLevel,
  IndentSizeValue,
  IndentValue,
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
