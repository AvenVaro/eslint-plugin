import { Props } from 'editorconfig';
import { EditorconfigProvider } from '../infrastructure/editorconfig-provider.js';

/**
 * Declares the structured type configuration contract for the frozen test helper runtime object.
 */
export interface TestHelper {
  /**
   * Asynchronously creates a mocked instance of the editorconfig provider.
   * Intercepts the underlying 'editorconfig' engine core dependency using esmock.
   *
   * @param config - The predefined configuration properties to return from the mock.
   *
   * @returns A promise resolving directly to the mocked editorconfig provider module wrapper.
   *
   * @throws {Error} Thrown if esmock fails to resolve, initialize, or load the module payload.
   */
  getMockedEditorconfigProviderAsync(config: Props): Promise<EditorconfigProvider>;
}

declare const testHelper: TestHelper;

export default testHelper;
