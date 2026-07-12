import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import avenvaro from './src/rules/eslint-plugin-custom.js';

export default [
  {
    ignores: [
      'LICENSE',
      'NOTICE'
    ]
  },
  js.configs.recommended,
  {
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@stylistic': stylistic,
      'custom': avenvaro
    },
    rules: {
      'custom/ternary-punctuation': 'error',
      '@stylistic/quotes': [
        'error',
        'single'
      ],
      '@stylistic/semi': [
        'error',
        'always'
      ],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/object-curly-spacing': [
        'error',
        'always'
      ],
      '@stylistic/brace-style': [
        'error',
        'stroustrup',
        {
          allowSingleLine: false
        }
      ],
      '@stylistic/array-bracket-spacing': [
        'error',
        'always'
      ],
      '@stylistic/block-spacing': [
        'error',
        'always'
      ],
      '@stylistic/eol-last': [
        'error',
        'always'
      ],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1
        }
      ],
      '@stylistic/function-paren-newline': [
        'error',
        'multiline-arguments'
      ],
      '@stylistic/function-call-argument-newline': [
        'error',
        'consistent'
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          multiline: true,
          consistent: true
        }
      ],
      'curly': [
        'error',
        'all'
      ],
      'func-names': [
        'error',
        'always'
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Program > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
          message: 'Arrow functions are only allowed locally within other functions. At the top level, use named functions.'
        },
        {
          selector: 'Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
          message: 'You can\'t export an arrow function directly. Use a named function.'
        },
        {
          selector: 'ArrowFunctionExpression[body.type="BlockStatement"]',
          message: 'Arrow functions are not allowed to have their bodies enclosed in curly braces {}. Use implicit return. If you need complex logic with a code block, write a full-fledged named function.'
        },
        {
          selector: 'FunctionDeclaration FunctionDeclaration',
          message: 'Declaring local functions within other functions is prohibited. Move it to the top level of the file.'
        },
        {
          selector: 'FunctionDeclaration VariableDeclarator > FunctionExpression',
          message: 'Creating local functional expressions within functions is prohibited. Move the logic to the top level.'
        }
      ],
      'arrow-parens': [
        'error',
        'always'
      ]
    }
  }
];

const a = isNaN(1) ? 1 : 2;

const b = isNaN(1) ? 1
  : 2
;

const c = isNaN(1) ? 1
  : 2
;

const d = isNaN(1) ? 1
  : 2
;

 const e = isNaN(1) ? 1
   : 2
 ;

const f = isNaN(1) ? 1
  : 2
;

const g = isNaN(1)
  ? 1
  : 2
;

const h = isNaN(1)
  ? 1
  : 2
;

const i = isNaN(1)
  ? 1
  : 2
;

 const j = isNaN(1)
   ? 1
   : 2
 ;

const k = isNaN(1)
  ? 1
  : 2
;

const l = isNaN(1)
  ? 1
  : 2
;

function foo() {
  return [ a, b, c, d, e, f, g, h, i, j, k, l ];
}
