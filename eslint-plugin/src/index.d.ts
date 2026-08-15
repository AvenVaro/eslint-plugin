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

declare const plugin: ESLint.Plugin & {
  rules: {
    'js/indent': typeof import('./rules/js/indent.js').default;
  };
};

export default plugin;

export { ePropertyValue, EPropertyValue };

export {
  JsIndentOptions,
  JsIndentOptionsTuple,
  JsVariableDeclaratorIndentOptions,
  JsStaticBlockIndentOptions,
  JsCallExpressionIndentOptions,
  JsFunctionDeclarationIndentOptions,
  JsFunctionExpressionIndentOptions
};
