import * as vitest from 'vitest';
import esmock from 'esmock';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';

//================================
// Constants
//================================

/**
 * @readonly
 * @private
 *
 * The expected EditorConfig properties used for matching or validating file configurations.
 *
 * @type {import('editorconfig').Props}
 */
const expectedConfig = Object.freeze({
  indent_size: 4,
  indent_style: editorconfigProvider.propertyValue.space,
  end_of_line: editorconfigProvider.propertyValue.lf,
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
    'Should expose a strict, immutable lookup dictionary of standardized property values',
    test_propertyValue_isStrictImmutableDictionary
  );

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
    `getIndentSize returns default value if indent_size is '${editorconfigProvider.propertyValue.unset}' string`,
    () => test_getIndentSize_returnsDefaultValue({
      indent_size: editorconfigProvider.propertyValue.unset
    })
  );

  vitest.it.concurrent(
    `getIndentSize returns default value if indent_size is not '${editorconfigProvider.propertyValue.tab}' string`,
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
    `getIndentSize returns default value if indent_size is '${editorconfigProvider.propertyValue.tab}' string`,
    () => test_getIndentSize_returnsIndentSize({
      indent_size: editorconfigProvider.propertyValue.tab
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
    `getIndentStyle returns default value if indent_style is '${editorconfigProvider.propertyValue.unset}' string`,
    () => test_getIndentStyle_returnsDefaultValue({
      indent_style: editorconfigProvider.propertyValue.unset
    })
  );

  vitest.it.concurrent(
    `getIndentStyle returns default value if indent_style is not '${editorconfigProvider.propertyValue.tab}' or '${editorconfigProvider.propertyValue.space}' string`,
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
    `getIndentStyle returns indent_style if indent_style is '${editorconfigProvider.propertyValue.tab}' string`,
    () => test_getIndentStyle_returnsIndentStyle({
      indent_style: editorconfigProvider.propertyValue.tab
    })
  );

  vitest.it.concurrent(
    `getIndentStyle returns indent_style if indent_style is '${editorconfigProvider.propertyValue.space}' string`,
    () => test_getIndentStyle_returnsIndentStyle({
      indent_style: editorconfigProvider.propertyValue.space
    })
  );
}

function test_propertyValue_isStrictImmutableDictionary() {
  const values = editorconfigProvider.propertyValue;

  vitest.expect(Object.isFrozen(values)).toBe(true);

  vitest.expect(values.unset).toBe('unset');
  vitest.expect(values.tab).toBe('tab');
  vitest.expect(values.space).toBe('space');
  vitest.expect(values.lf).toBe('lf');
  vitest.expect(values.crlf).toBe('crlf');

  vitest.expect(Object.keys(values)).toHaveLength(5);
}

async function test_loadConfig_returnsUnchangedConfig_async() {
  const mockedEditorconfigProvider = await getMockedEditorconfigProviderAsync(expectedConfig);
  const actualConfig = mockedEditorconfigProvider.loadConfig('fakePath');

  vitest.expect(actualConfig).toEqual(expectedConfig);
}

function test_getConfig_returnsEmptyConfigIfUseEditorconfigIsFalse() {
  /** @type {import('editorconfig').Props} */
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
  const expectedValue2 = editorconfigProvider.propertyValue.tab;
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
  const deaultValue2 = editorconfigProvider.propertyValue.space;
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
  const expectedValue1 = editorconfigProvider.propertyValue.space;
  const expectedValue2 = editorconfigProvider.propertyValue.tab;
  const expectedValue3 = undefined;

  const actualValue1 = editorconfigProvider.getIndentStyle(config, expectedValue1);
  const actualValue2 = editorconfigProvider.getIndentStyle(config, expectedValue2);
  const actualValue3 = editorconfigProvider.getIndentStyle(config, expectedValue3);

  vitest.expect(actualValue1).toEqual(expectedValue1);
  vitest.expect(actualValue2).toEqual(expectedValue2);
  vitest.expect(actualValue3).toEqual(expectedValue3);
}

function test_getIndentStyle_returnsIndentStyle(config) {
  const deaultValue1 = 'editorconfigProvider.propertyValue.tab';
  const deaultValue2 = 'editorconfigProvider.propertyValue.space';
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
 * @param {import('editorconfig').Props} config - The predefined configuration properties to return from the mock.
 *
 * @returns {Promise<import('../../../infrastructure/editorconfig-provider.d.ts').EditorconfigProvider>} A promise that resolves to the mocked editorconfig provider module.
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

  return provider.default || provider;
}
