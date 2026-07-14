import { Props } from 'editorconfig';

/**
 * Interface representing the EditorConfig data provider and its runtime mocking sub-system.
 */
export interface EditorconfigProvider {
  /**
   * Synchronously reads and parses the .editorconfig file for the target file path.
   *
   * @param filePath The absolute file path of the currently processed source file.
   *
   * @returns The raw properties object parsed by the underlying editorconfig engine.
   */
  loadConfig(filePath: string): Props;

  /**
   * Intercepts the core config-loading mechanism to return predefined mock properties during tests.
   *
   * @param properties The fake configuration properties to inject into the provider state.
   * @param expectedFilePath The target file path for which the injected mock properties should apply.
   *
   * @returns void
   */
  mockLoadConfig(properties: Props, expectedFilePath: string): void;

  /**
   * Reverts the config-loading mechanism back to its original runtime implementation, clearing injected test hooks.
   *
   * @returns void
   */
  resetMockingLoadConfig(): void;

  /**
   * High-level orchestration method that evaluates user flags and safely coordinates configuration retrieval.
   *
   * @param useEditorconfig Toggle flag determining whether the system should hit the file system or bypass it.
   * @param filePath The absolute file path of the currently processed source file.
   *
   * @returns The resolved configuration properties block, or an empty fallback object.
   */
  getConfig(useEditorconfig: boolean | undefined, filePath: string): Props;
}

declare const editorconfigProvider: EditorconfigProvider;

export default editorconfigProvider;
