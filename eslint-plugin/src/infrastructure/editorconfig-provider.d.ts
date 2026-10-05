import { Props } from 'editorconfig';
import { EPropertyValue } from './property-value.enum.js';
import { DisableProperty } from './rules-build-helper.js';

/**
 * Specifies a configuration value that controls line endings, or disables it entirely.
 */
export type Charset = EPropertyValue['latin1'] | EPropertyValue['utf8'] | EPropertyValue['utf8bom'] | EPropertyValue['utf16be'] | EPropertyValue['utf16le'] | DisableProperty;

/**
 * Specifies a configuration value that controls line endings, or disables it entirely.
 */
export type EndOfLine = EPropertyValue['lf'] | EPropertyValue['crlf'] | DisableProperty;

/**
 * Provides indentation size as a fixed number of spaces/tabs or a special formatting mode (e.g., 'first', 'unset' or 'off').
 */
export type IndentSize = number | EPropertyValue['tab'] | DisableProperty;

/**
 * Defines a configuration value that can either be a numeric indent size or disabled entirely.
 */
export type IndentStyle = EPropertyValue['space'] | EPropertyValue['tab'] | DisableProperty;

/**
 * Specifies whether a file must end with a single trailing newline character, or disables the check entirely.
 */
export type InsertFinalNewLine = true | false | DisableProperty;

/**
 * Defines the visual width of a single tab character in spaces, or disables the configuration entirely.
 */
export type TabWidth = number | DisableProperty;

/**
 * Specifies whether any whitespace characters preceding a newline should be stripped, or disables the check entirely.
 */
export type TrimTrailingWhitespace = true | false | DisableProperty;

/**
 * Interface representing the EditorConfig data provider.
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
  getIndentSize(config: Props | undefined, defaultValue: IndentSize): IndentSize;

  /**
   * Validates and extracts the indentation formatting layout token style from configuration.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback formatting identifier applied on validation failure.
   *
   * @returns A validated style layout keyword token.
   */
  getIndentStyle(config: Props | undefined, defaultValue: IndentStyle): IndentStyle;

  /**
   * Validates and extracts the targeted line-ending sequence token from configuration metadata.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback sequence identifier applied on validation failure.
   *
   * @returns A validated line termination style keyword token.
   */
  getEndOfLine(config: Props | undefined, defaultValue: EndOfLine): EndOfLine;

  /**
   * Validates and extracts the active validation state flag for final newline injections.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback toggle state applied on validation failure.
   *
   * @returns The active verification boolean identifier.
   */
  getInsertFinalNewLine(config: Props | undefined, defaultValue: InsertFinalNewLine): InsertFinalNewLine;

  /**
   * Validates and extracts the explicit horizontal layout tab width boundary configuration integer.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback scale multiplier applied on validation failure.
   *
   * @returns A non-negative layout step size metric.
   */
  geTabWidth(config: Props | undefined, defaultValue: TabWidth): TabWidth;

  /**
   * Validates and extracts the active structural optimization switch state for removing trailing whitespace tokens.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback process toggle state applied on validation failure.
   *
   * @returns The active content cleaner operation state flag.
   */
  getTrimTrailingWhitespace(config: Props | undefined, defaultValue: TrimTrailingWhitespace): TrimTrailingWhitespace;

  /**
   * Validates, cleans, and extracts the target character encryption identifier string token.
   *
   * @param config The raw properties object read from the active configuration.
   * @param defaultValue The fallback encoding type text block applied on validation failure.
   *
   * @returns A sanitized configuration layout metadata text string.
   */
  getCharset(config: Props | undefined, defaultValue: Charset): Charset;
}

declare const editorconfigProvider: EditorconfigProvider;

export default editorconfigProvider;
