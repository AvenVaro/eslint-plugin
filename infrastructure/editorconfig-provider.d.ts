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
  getIndentSize(config: Props | undefined, defaultValue: number | 'tab' | undefined): number | 'tab' | undefined;

  /**
   * Validates and extracts the indentation formatting layout token style from configuration.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback formatting identifier applied on validation failure.
   *
   * @returns A validated style layout keyword token.
   */
  getIndentStyle(config: Props | undefined, defaultValue: 'space' | 'tab' | undefined): 'space' | 'tab' | undefined;

  /**
   * Validates and extracts the targeted line-ending sequence token from configuration metadata.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback sequence identifier applied on validation failure.
   *
   * @returns A validated line termination style keyword token.
   */
  getEndOfLine(config: Props | undefined, defaultValue: 'lf' | 'crlf' | undefined): 'lf' | 'crlf' | undefined;

  /**
   * Validates and extracts the active validation state flag for final newline injections.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback toggle state applied on validation failure.
   *
   * @returns The active verification boolean identifier.
   */
  getInsertFinalNewLine(config: Props | undefined, defaultValue: boolean | undefined): boolean | undefined;

  /**
   * Validates and extracts the explicit horizontal layout tab width boundary configuration integer.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback scale multiplier applied on validation failure.
   *
   * @returns A non-negative layout step size metric.
   */
  geTabWidth(config: Props | undefined, defaultValue: number | undefined): number | undefined;

  /**
   * Validates and extracts the active structural optimization switch state for removing trailing whitespace tokens.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback process toggle state applied on validation failure.
   *
   * @returns The active content cleaner operation state flag.
   */
  getTrimTrailingWhitespace(config: Props | undefined, defaultValue: boolean | undefined): boolean | undefined;

  /**
   * Validates, cleans, and extracts the target character encryption identifier string token.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback encoding type text block applied on validation failure.
   *
   * @returns A sanitized configuration layout metadata text string.
   */
  getCharset(config: Props | undefined, defaultValue: string | undefined): string | undefined;
}

declare const editorconfigProvider: EditorconfigProvider;

export default editorconfigProvider;
