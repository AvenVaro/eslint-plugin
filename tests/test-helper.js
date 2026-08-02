import esmock from 'esmock';

/** @type {import('./test-helper.d.ts').TestHelper} */
const testHelper = Object.freeze({
  getMockedEditorconfigProviderAsync: getMockedEditorconfigProviderAsync,
  convertCodeArrayToCodeString: convertCodeArrayToCodeString
});

//================================
// Exports
//================================

export default testHelper;

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
 * @returns {Promise<import('../infrastructure/editorconfig-provider.d.ts').EditorconfigProvider>} A promise that resolves to the mocked editorconfig provider module.
 *
 * @throws {Error} Thrown if esmock fails to resolve, initialize, or load the mocked module target payload.
 */
async function getMockedEditorconfigProviderAsync(config) {
  const provider = await esmock(
    '../infrastructure/editorconfig-provider.js',
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

/**
 * Assembles a structured multi-line source text file template string from a sequential token line array block.
 * **Warning:** Passing a mutable reference to the `codeArray` parameter will mutate the source array if `insertEOL` evaluates to true.
 *
 * @param {string[]} codeArray - A sequential collection of raw source code content line strings.
 * @param {boolean} [insertEOL=true] - Appends an empty string token at the EOF array index to enforce trailing newline normalization.
 *
 * @returns {string} A concatenated multi-line source execution file payload string.
 */
function convertCodeArrayToCodeString(codeArray, insertEOL = true) {
  if (insertEOL) {
    codeArray.push('');
  }

  return codeArray.join('\n');
}
