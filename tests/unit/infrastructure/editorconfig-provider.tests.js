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
