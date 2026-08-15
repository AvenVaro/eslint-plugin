import { ESLint } from 'eslint';

import { default as ePropertyValue, EPropertyValue } from './infrastructure/property-value.enum.js';

import {
  IndentSizeValue,
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions,
  JsOffsetTernaryExpressionsIndentOptions
} from './rules/js/indent.js';

export interface EslintPlugin extends ESLint.Plugin {
  rules: ESLint.Plugin['rules'];
}

declare const plugin: EslintPlugin;

export default plugin;

export {
  ePropertyValue,
  EPropertyValue,
  IndentSizeValue,
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions,
  JsOffsetTernaryExpressionsIndentOptions
};
