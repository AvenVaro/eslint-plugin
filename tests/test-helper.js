import esmock from 'esmock';

/** @type {import('./test-helper.d.ts').TestHelper} */
const testHelper = Object.freeze({
  getMockedEditorconfigProviderAsync: getMockedEditorconfigProviderAsync
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
