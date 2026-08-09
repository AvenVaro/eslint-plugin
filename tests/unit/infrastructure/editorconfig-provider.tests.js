import * as vitest from 'vitest';
import esmock from 'esmock';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';
import ePropertyValue from '../../../infrastructure/property-value.enum.js';

//================================
// Typedefs
//================================

/**
 * @typedef {import('editorconfig').Props} Props
 * @typedef {import('../infrastructure/editorconfig-provider.d.ts').EditorconfigProvider} EditorconfigProvider
 */

//================================
// Constants
//================================

/**
 * @readonly
 * @private
 *
 * The expected EditorConfig properties used for matching or validating file configurations.
 *
 * @type {Props}
 */
const expectedConfig = Object.freeze({
  indent_size: 4,
  indent_style: ePropertyValue.space,
  end_of_line: ePropertyValue.lf,
  insert_final_newline: true,
  tab_width: 4,
  trim_trailing_whitespace: true,
  charset: 'utf-8'
});

//================================
// Tests
//================================

vitest.describe.concurrent('EditorConfig Provider - Unit Testing', describe);

function describe() {
  vitest.it.concurrent(
    'loadConfig returns the unchanged configuration from editorconfig',
    test_loadConfig_returnsUnchangedConfig_async
  );

  vitest.it.concurrent(
    'getConfig returns loaded configuration when useEditorconfig is true',
    async () => await test_getConfig_async(true)
  );

  vitest.it.concurrent(
    'getConfig returns an empty configuration when useEditorconfig is false',
    test_getConfig_returnsEmptyConfigIfUseEditorconfigIsFalse
  );

  vitest.it.concurrent(
    'getConfig loads configuration when useEditorconfig is undefined',
    async () => await test_getConfig_async(undefined)
  );

  vitest.it.concurrent(
    'getIndentSize returns default value if config is undefined',
    () => test_getIndentSize_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'getIndentSize returns default value if indent_size is undefined',
    () => test_getIndentSize_returnsDefaultValue({
      indent_size: undefined
    })
  );

  vitest.it.concurrent(
    `getIndentSize returns default value if indent_size is '${ePropertyValue.unset}' string`,
    () => test_getIndentSize_returnsDefaultValue({
      indent_size: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    `getIndentSize returns default value if indent_size is not '${ePropertyValue.tab}' string`,
    () => test_getIndentSize_returnsDefaultValue({
      indent_size: 'invalid'
    })
  );

  vitest.it.concurrent(
    'getIndentSize returns default value if indent_size is a negative number',
    () => test_getIndentSize_returnsDefaultValue({
      indent_size: -1
    })
  );

  vitest.it.concurrent(
    'getIndentSize returns indent_size if indent_size is a positive number',
    () => test_getIndentSize_returnsIndentSize({
      indent_size: 1
    })
  );

  vitest.it.concurrent(
    'getIndentSize returns indent_size if indent_size is a zero',
    () => test_getIndentSize_returnsIndentSize({
      indent_size: 0
    })
  );

  vitest.it.concurrent(
    `getIndentSize returns indent_size if indent_size is '${ePropertyValue.tab}' string`,
    () => test_getIndentSize_returnsIndentSize({
      indent_size: ePropertyValue.tab
    })
  );

  vitest.it.concurrent(
    'getIndentStyle returns default value if config is undefined',
    () => test_getIndentStyle_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'getIndentStyle returns default value if indent_style is undefined',
    () => test_getIndentStyle_returnsDefaultValue({
      indent_style: undefined
    })
  );

  vitest.it.concurrent(
    `getIndentStyle returns default value if indent_style is '${ePropertyValue.unset}' string`,
    () => test_getIndentStyle_returnsDefaultValue({
      indent_style: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    `getIndentStyle returns default value if indent_style is not '${ePropertyValue.tab}' or '${ePropertyValue.space}' string`,
    () => test_getIndentStyle_returnsDefaultValue({
      indent_style: 'invalid'
    })
  );

  vitest.it.concurrent(
    'getIndentStyle returns default value if indent_style is not a string',
    () => test_getIndentStyle_returnsDefaultValue({
      indent_style: -1
    })
  );

  vitest.it.concurrent(
    `getIndentStyle returns indent_style if indent_style is '${ePropertyValue.tab}' string`,
    () => test_getIndentStyle_returnsIndentStyle({
      indent_style: ePropertyValue.tab
    })
  );

  vitest.it.concurrent(
    `getIndentStyle returns indent_style if indent_style is '${ePropertyValue.space}' string`,
    () => test_getIndentStyle_returnsIndentStyle({
      indent_style: ePropertyValue.space
    })
  );

  vitest.it.concurrent(
    'getEndOfLine returns default value if config is undefined',
    () => test_getEndOfLine_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'getEndOfLine returns default value if end_of_line is undefined',
    () => test_getEndOfLine_returnsDefaultValue({
      end_of_line: undefined
    })
  );

  vitest.it.concurrent(
    `getEndOfLine returns default value if end_of_line is '${ePropertyValue.unset}' string`,
    () => test_getEndOfLine_returnsDefaultValue({
      end_of_line: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    `getEndOfLine returns default value if end_of_line is not '${ePropertyValue.lf}' or '${ePropertyValue.crlf}' string`,
    () => test_getEndOfLine_returnsDefaultValue({
      end_of_line: 'invalid'
    })
  );

  vitest.it.concurrent(
    'getEndOfLine returns default value if end_of_line is not a string',
    () => test_getEndOfLine_returnsDefaultValue({
      end_of_line: -1
    })
  );

  vitest.it.concurrent(
    `getEndOfLine returns end_of_line if end_of_line is '${ePropertyValue.lf}' string`,
    () => test_getEndOfLine_returnsEndOfLine({
      end_of_line: ePropertyValue.lf
    })
  );

  vitest.it.concurrent(
    `getEndOfLine returns end_of_line if end_of_line is '${ePropertyValue.crlf}' string`,
    () => test_getEndOfLine_returnsEndOfLine({
      end_of_line: ePropertyValue.crlf
    })
  );

  vitest.it.concurrent(
    'getInsertFinalNewLine returns default value if config is undefined',
    () => test_getInsertFinalNewLine_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'getInsertFinalNewLine returns default value if insert_final_newline is undefined',
    () => test_getInsertFinalNewLine_returnsDefaultValue({
      insert_final_newline: undefined
    })
  );

  vitest.it.concurrent(
    `getInsertFinalNewLine returns default value if insert_final_newline is '${ePropertyValue.unset}' string`,
    () => test_getInsertFinalNewLine_returnsDefaultValue({
      insert_final_newline: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    'getInsertFinalNewLine returns default value if insert_final_newline is not a boolean',
    () => test_getInsertFinalNewLine_returnsDefaultValue({
      insert_final_newline: -1
    })
  );

  vitest.it.concurrent(
    'getInsertFinalNewLine returns insert_final_newline if insert_final_newline is true',
    () => test_getInsertFinalNewLine_returnsInsertFinalNewLine({
      insert_final_newline: true
    })
  );

  vitest.it.concurrent(
    'getInsertFinalNewLine returns insert_final_newline if insert_final_newline is false',
    () => test_getInsertFinalNewLine_returnsInsertFinalNewLine({
      insert_final_newline: false
    })
  );

  vitest.it.concurrent(
    'geTabWidth returns default value if config is undefined',
    () => test_geTabWidth_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'geTabWidth returns default value if tab_width is undefined',
    () => test_geTabWidth_returnsDefaultValue({
      tab_width: undefined
    })
  );

  vitest.it.concurrent(
    `geTabWidth returns default value if tab_width is '${ePropertyValue.unset}' string`,
    () => test_geTabWidth_returnsDefaultValue({
      tab_width: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    'geTabWidth returns default value if tab_width is not a number',
    () => test_geTabWidth_returnsDefaultValue({
      tab_width: 'invalid'
    })
  );

  vitest.it.concurrent(
    'geTabWidth returns default value if tab_width is a negative number',
    () => test_geTabWidth_returnsDefaultValue({
      tab_width: -1
    })
  );

  vitest.it.concurrent(
    'geTabWidth returns tab_width if tab_width is a positive number',
    () => test_geTabWidth_returnsTabWidth({
      tab_width: 1
    })
  );

  vitest.it.concurrent(
    'geTabWidth returns tab_width if tab_width is a zero',
    () => test_geTabWidth_returnsTabWidth({
      tab_width: 0
    })
  );

  vitest.it.concurrent(
    'getTrimTrailingWhitespace returns default value if config is undefined',
    () => test_getTrimTrailingWhitespace_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'getTrimTrailingWhitespace returns default value if trim_trailing_whitespace is undefined',
    () => test_getTrimTrailingWhitespace_returnsDefaultValue({
      trim_trailing_whitespace: undefined
    })
  );

  vitest.it.concurrent(
    `getTrimTrailingWhitespace returns default value if trim_trailing_whitespace is '${ePropertyValue.unset}' string`,
    () => test_getTrimTrailingWhitespace_returnsDefaultValue({
      trim_trailing_whitespace: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    'getTrimTrailingWhitespace returns default value if trim_trailing_whitespace is not a boolean',
    () => test_getTrimTrailingWhitespace_returnsDefaultValue({
      trim_trailing_whitespace: -1
    })
  );

  vitest.it.concurrent(
    'getTrimTrailingWhitespace returns trim_trailing_whitespace if trim_trailing_whitespace is true',
    () => test_getTrimTrailingWhitespace_returnsTrimTrailingWhitespace({
      trim_trailing_whitespace: true
    })
  );

  vitest.it.concurrent(
    'getTrimTrailingWhitespace returns trim_trailing_whitespace if trim_trailing_whitespace is false',
    () => test_getTrimTrailingWhitespace_returnsTrimTrailingWhitespace({
      trim_trailing_whitespace: false
    })
  );

  vitest.it.concurrent(
    'getCharset returns default value if config is undefined',
    () => test_getCharset_returnsDefaultValue(undefined)
  );

  vitest.it.concurrent(
    'getCharset returns default value if charset is undefined',
    () => test_getCharset_returnsDefaultValue({
      charset: undefined
    })
  );

  vitest.it.concurrent(
    `getCharset returns default value if charset is '${ePropertyValue.unset}' string`,
    () => test_getCharset_returnsDefaultValue({
      charset: ePropertyValue.unset
    })
  );

  vitest.it.concurrent(
    'getCharset returns default value if charset is empty string',
    () => test_getCharset_returnsDefaultValue({
      charset: ''
    })
  );

  vitest.it.concurrent(
    'getCharset returns default value if charset is whitespace string',
    () => test_getCharset_returnsDefaultValue({
      charset: ' '
    })
  );

  vitest.it.concurrent(
    'getCharset returns default value if charset is not a string',
    () => test_getCharset_returnsDefaultValue({
      charset: -1
    })
  );

  vitest.it.concurrent(
    'getCharset returns charset if charset is string',
    () => test_getCharset_returnsCharset({
      charset: ePropertyValue.lf
    })
  );
}

async function test_loadConfig_returnsUnchangedConfig_async() {
  const mockedEditorconfigProvider = await getMockedEditorconfigProviderAsync(expectedConfig);
  const actualConfig = mockedEditorconfigProvider.loadConfig('fakePath');

  vitest.expect(actualConfig).toEqual(expectedConfig);
}

function test_getConfig_returnsEmptyConfigIfUseEditorconfigIsFalse() {
  /** @type {Props} */
  const expectedConfig = {};
  const actualConfig = editorconfigProvider.getConfig(false, 'fakePath');

  vitest.expect(actualConfig).toEqual(expectedConfig);
}

async function test_getConfig_async(useEditorconfig) {
  const mockedEditorconfigProvider = await getMockedEditorconfigProviderAsync(expectedConfig);
  const actualConfig = mockedEditorconfigProvider.getConfig(useEditorconfig, 'fakePath');

  vitest.expect(actualConfig).toEqual(expectedConfig);
}

function test_getIndentSize_returnsDefaultValue(config) {
  const expectedValue1 = 40;
  const expectedValue2 = ePropertyValue.tab;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getIndentSize(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getIndentSize(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getIndentSize(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getIndentSize_returnsIndentSize(config) {
  const deaultValue1 = 40;
  const deaultValue2 = ePropertyValue.space;
  const deaultValue3 = undefined;

  const actualValue1 = editorconfigProvider.getIndentSize(config, deaultValue1);
  const actualValue2 = editorconfigProvider.getIndentSize(config, deaultValue2);
  const actualValue3 = editorconfigProvider.getIndentSize(config, deaultValue3);

  vitest.expect(actualValue1).toEqual(config.indent_size);
  vitest.expect(actualValue2).toEqual(config.indent_size);
  vitest.expect(actualValue3).toEqual(config.indent_size);

  vitest.expect(actualValue1).not.toEqual(deaultValue1);
  vitest.expect(actualValue2).not.toEqual(deaultValue2);
  vitest.expect(actualValue3).not.toEqual(deaultValue3);
}

function test_getIndentStyle_returnsDefaultValue(config) {
  const expectedValue1 = ePropertyValue.space;
  const expectedValue2 = ePropertyValue.tab;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getIndentStyle(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getIndentStyle(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getIndentStyle(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getIndentStyle_returnsIndentStyle(config) {
  const deaultValue1 = 'propertyValue.tab';
  const deaultValue2 = 'propertyValue.space';
  const deaultValue3 = undefined;

  const actualValue1 = editorconfigProvider.getIndentStyle(config, deaultValue1);
  const actualValue2 = editorconfigProvider.getIndentStyle(config, deaultValue2);
  const actualValue3 = editorconfigProvider.getIndentStyle(config, deaultValue3);

  vitest.expect(actualValue1).toEqual(config.indent_style);
  vitest.expect(actualValue2).toEqual(config.indent_style);
  vitest.expect(actualValue3).toEqual(config.indent_style);

  vitest.expect(actualValue1).not.toEqual(deaultValue1);
  vitest.expect(actualValue2).not.toEqual(deaultValue2);
  vitest.expect(actualValue3).not.toEqual(deaultValue3);
}

function test_getEndOfLine_returnsDefaultValue(config) {
  const expectedValue1 = ePropertyValue.lf;
  const expectedValue2 = ePropertyValue.crlf;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getEndOfLine(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getEndOfLine(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getEndOfLine(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getEndOfLine_returnsEndOfLine(config) {
  const deaultValue1 = 'propertyValue.lf';
  const deaultValue2 = 'propertyValue.crlf';
  const deaultValue3 = undefined;

  const actualValue1 = editorconfigProvider.getEndOfLine(config, deaultValue1);
  const actualValue2 = editorconfigProvider.getEndOfLine(config, deaultValue2);
  const actualValue3 = editorconfigProvider.getEndOfLine(config, deaultValue3);

  vitest.expect(actualValue1).toEqual(config.end_of_line);
  vitest.expect(actualValue2).toEqual(config.end_of_line);
  vitest.expect(actualValue3).toEqual(config.end_of_line);

  vitest.expect(actualValue1).not.toEqual(deaultValue1);
  vitest.expect(actualValue2).not.toEqual(deaultValue2);
  vitest.expect(actualValue3).not.toEqual(deaultValue3);
}

function test_getInsertFinalNewLine_returnsDefaultValue(config) {
  const expectedValue1 = true;
  const expectedValue2 = false;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getInsertFinalNewLine(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getInsertFinalNewLine(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getInsertFinalNewLine(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getInsertFinalNewLine_returnsInsertFinalNewLine(config) {
  const deaultValue = undefined;
  const actualValue = editorconfigProvider.getInsertFinalNewLine(config, deaultValue);

  vitest.expect(actualValue).toEqual(config.insert_final_newline);

  vitest.expect(actualValue).not.toEqual(deaultValue);
}

function test_geTabWidth_returnsDefaultValue(config) {
  const expectedValue1 = 30;
  const expectedValue2 = undefined;

  const actualValue1 = editorconfigProvider.geTabWidth(config, expectedValue1);
  const actualValue2 = editorconfigProvider.geTabWidth(config, expectedValue2);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
}

function test_geTabWidth_returnsTabWidth(config) {
  const deaultValue1 = 30;
  const deaultValue2 = undefined;

  const actualValue1 = editorconfigProvider.geTabWidth(config, deaultValue1);
  const actualValue2 = editorconfigProvider.geTabWidth(config, deaultValue2);

  vitest.expect(actualValue1).toEqual(config.tab_width);
  vitest.expect(actualValue2).toEqual(config.tab_width);

  vitest.expect(actualValue1).not.toEqual(deaultValue1);
  vitest.expect(actualValue2).not.toEqual(deaultValue2);
}

function test_getTrimTrailingWhitespace_returnsDefaultValue(config) {
  const expectedValue1 = true;
  const expectedValue2 = false;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getTrimTrailingWhitespace(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getTrimTrailingWhitespace(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getTrimTrailingWhitespace(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getTrimTrailingWhitespace_returnsTrimTrailingWhitespace(config) {
  const deaultValue = undefined;
  const actualValue = editorconfigProvider.getTrimTrailingWhitespace(config, deaultValue);

  vitest.expect(actualValue).toEqual(config.trim_trailing_whitespace);

  vitest.expect(actualValue).not.toEqual(deaultValue);
}

function test_getCharset_returnsDefaultValue(config) {
  const expectedValue1 = ePropertyValue.lf;
  const expectedValue2 = ePropertyValue.crlf;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getCharset(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getCharset(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getCharset(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getCharset_returnsCharset(config) {
  const deaultValue1 = '';
  const deaultValue2 = ' ';
  const deaultValue3 = undefined;

  const actualValue1 = editorconfigProvider.getCharset(config, deaultValue1);
  const actualValue2 = editorconfigProvider.getCharset(config, deaultValue2);
  const actualValue3 = editorconfigProvider.getCharset(config, deaultValue3);

  vitest.expect(actualValue1).toEqual(config.charset);
  vitest.expect(actualValue2).toEqual(config.charset);
  vitest.expect(actualValue3).toEqual(config.charset);

  vitest.expect(actualValue1).not.toEqual(deaultValue1);
  vitest.expect(actualValue2).not.toEqual(deaultValue2);
  vitest.expect(actualValue3).not.toEqual(deaultValue3);
}

//================================
// Private Functions
//================================

/**
 * @private
 * @async
 *
 * Asynchronously creates a mocked instance of the editorconfig provider.
 * Uses `esmock` to intercept the `editorconfig` dependency and inject a mock `parseSync` function.
 *
 * @param {Props} config - The predefined configuration properties to return from the mock.
 *
 * @returns {Promise<EditorconfigProvider>} A promise that resolves to the mocked editorconfig provider module.
 *
 * @throws {Error} Thrown if esmock fails to resolve, initialize, or load the mocked module target payload.
 */
async function getMockedEditorconfigProviderAsync(config) {
  const provider = await esmock(
    '../../../infrastructure/editorconfig-provider.js',
    {
      editorconfig: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        parseSync: (filePath) => config
      }
    }
  );

  if (provider) {
    return provider.default || provider;
  }

  throw new Error('Error mocking editorconfig provider.');
}
