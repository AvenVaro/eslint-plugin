import { ESLint } from 'eslint';

declare const plugin: ESLint.Plugin & {
  rules: {
    'js/indent': typeof import('./rules/js/indent.js').default;
  };
};

export default plugin;
