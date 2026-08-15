import { ESLint } from 'eslint';

import { default as ePropertyValue, EPropertyValue } from './infrastructure/property-value.enum.js';

import {
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions
} from './rules/js/indent.js';

export interface EslintPlugin extends ESLint.Plugin {
  rules: ESLint.Plugin['rules'];
}

declare const plugin: EslintPlugin;

export default plugin;

export {
  ePropertyValue,
  EPropertyValue,
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions
};
