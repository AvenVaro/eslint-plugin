import { Props } from 'editorconfig';

/**
 * Standardized immutable lookup tokens matching the exact string literal values used by EditorConfig.
 */
export type EditorconfigPropertyValues = Readonly<{
  unset: 'unset';
  tab: 'tab';
  space: 'space';
  lf: 'lf';
  crlf: 'crlf';
}>;

/**
 * Interface representing the EditorConfig data provider and its runtime mocking sub-system.
 */
export interface EditorconfigProvider {
  /**
   * Strict immutable lookup dictionary containing standardized string literal values for EditorConfig properties.
   */
  readonly propertyValue: EditorconfigPropertyValues;

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

  /**
   * Validates and extracts the indentation size metric, falling back if invalid or missing.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback size identifier applied on validation failure.
   *
   * @returns A validated indentation count or the literal string layout token.
   */
  getIndentSize(config: Props | undefined, defaultValue: number | 'tab'): number | 'tab';

  /**
   * Validates and extracts the indentation formatting layout token style from configuration.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback formatting identifier applied on validation failure.
   *
   * @returns A validated style layout keyword token.
   */
  getIndentStyle(config: Props | undefined, defaultValue: 'space' | 'tab'): 'space' | 'tab';

  /**
   * Validates and extracts the targeted line-ending sequence token from configuration metadata.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback sequence identifier applied on validation failure.
   *
   * @returns A validated line termination style keyword token.
   */
  getEndOfLine(config: Props | undefined, defaultValue: 'lf' | 'crlf'): 'lf' | 'crlf';

  /**
   * Validates and extracts the active validation state flag for final newline injections.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback toggle state applied on validation failure.
   *
   * @returns The active verification boolean identifier.
   */
  getInsertFinalNewLine(config: Props | undefined, defaultValue: boolean): boolean;

  /**
   * Validates and extracts the explicit horizontal layout tab width boundary configuration integer.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback scale multiplier applied on validation failure.
   *
   * @returns A non-negative layout step size metric.
   */
  geTabWidth(config: Props | undefined, defaultValue: number): number;

  /**
   * Validates and extracts the active structural optimization switch state for removing trailing whitespace tokens.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback process toggle state applied on validation failure.
   *
   * @returns The active content cleaner operation state flag.
   */
  getTrimTrailingWhitespace(config: Props | undefined, defaultValue: boolean): boolean;

  /**
   * Validates, cleans, and extracts the target character encryption identifier string token.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback encoding type text block applied on validation failure.
   *
   * @returns A sanitized configuration layout metadata text string.
   */
  getCharset(config: Props | undefined, defaultValue: string): string;
}

declare const editorconfigProvider: EditorconfigProvider;

export default editorconfigProvider;
