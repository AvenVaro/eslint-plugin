import editorconfig from 'editorconfig';

/** @type {import('./editorconfig-provider.d.ts').EditorconfigPropertyValues} */
const propertyValue = Object.freeze({
  unset: 'unset',
  tab: 'tab',
  space: 'space',
  lf: 'lf',
  crlf: 'crlf'
});

/** @type {import('./editorconfig-provider.d.ts').EditorconfigProvider} */
const editorconfigProvider = {
  propertyValue: propertyValue,
  loadConfig: loadConfig,
  getConfig: getConfig,
  getIndentSize: getIndentSize,
  getIndentStyle: getIndentStyle,
  getEndOfLine: getEndOfLine,
  getInsertFinalNewLine: getInsertFinalNewLine,
  geTabWidth: geTabWidth,
  getTrimTrailingWhitespace: getTrimTrailingWhitespace,
  getCharset: getCharset
};

//================================
// Exports
//================================

export default editorconfigProvider;

//================================
// Private Functions
//================================

/**
 * Synchronously processes the file system to parse `.editorconfig` rules.
 *
 * @param {string} filePath - The absolute destination path of the target source file.
 *
 * @returns {import('editorconfig').Props} Core configuration metadata block parsed from disk.
 */
function loadConfig(filePath) {
  return editorconfig.parseSync(filePath);
}

/**
 * Orchestrates runtime configuration parsing behavior, evaluating global bypass rules.
 *
 * @param {boolean | undefined} useEditorconfig - User runtime toggle flag extracted from ESLint rules array.
 * @param {string} filePath - The absolute target asset destination evaluated during active traversal.
 *
 * @returns {import('editorconfig').Props} Final configuration block properties, or an isolated empty fallback structure.
 */
function getConfig(useEditorconfig, filePath) {
  useEditorconfig = useEditorconfig === undefined
    ? true
    : useEditorconfig
  ;

  if (useEditorconfig) {
    return editorconfigProvider.loadConfig(filePath);
  }

  return {};
}

/**
 * Evaluates whether a target configuration property is unassigned or explicitly set to an unset token.
 *
 * @param {any} property - The configuration property layout state value to check.
 *
 * @returns {boolean} True if the property represents an unassigned or explicitly unset state, otherwise false.
 */
function isUnset(property) {
  return property === undefined || property === propertyValue.unset;
}

/**
 * Resolves the indentation size or fallback value, validating numerical ranges and tab string identifiers.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {number | 'tab' | undefined} defaultValue - Fallback configuration token used when the target property is invalid or missing.
 *
 * @returns {number | 'tab' | undefined} Valid indentation quantity value or the provided fallback.
 */
function getIndentSize(config, defaultValue) {
  if (isUnset(config?.indent_size)) {
    return defaultValue;
  }

  if (
    (
      typeof config.indent_size === 'string'
      && config.indent_size === propertyValue.tab
    )
    || (typeof config.indent_size === 'number' && config.indent_size >= 0)
  ) {
    return config.indent_size;
  }

  return defaultValue;
}

/**
 * Resolves the structural indentation formatting layout style token from the raw configuration.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {'space' | 'tab' | undefined} defaultValue - Fallback formatting layout value used when the target property is invalid or missing.
 *
 * @returns {'space' | 'tab' | undefined} Valid style layout type keyword or the provided fallback.
 */
function getIndentStyle(config, defaultValue) {
  if (isUnset(config?.indent_style)) {
    return defaultValue;
  }

  if (
    typeof config.indent_style === 'string'
    && (
      config.indent_style === propertyValue.space
      || config.indent_style === propertyValue.tab
    )
  ) {
    return config.indent_style;
  }

  return defaultValue;
}

/**
 * Resolves the targeted line-ending normalization sequence keyword from the raw configuration block.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {'lf' | 'crlf' | undefined} defaultValue - Fallback line ending sequence value used when the target property is invalid or missing.
 *
 * @returns {'lf' | 'crlf' | undefined} Valid line termination style keyword or the provided fallback.
 */
function getEndOfLine(config, defaultValue) {
  if (isUnset(config?.end_of_line)) {
    return defaultValue;
  }

  if (
    typeof config.indent_style === 'string'
    && (
      config.end_of_line === propertyValue.lf
      || config.end_of_line === propertyValue.crlf
    )
  ) {
    return config.end_of_line;
  }

  return defaultValue;
}

/**
 * Resolves whether files should enforce trailing line-termination characters at EOF locations.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {boolean | undefined} defaultValue - Fallback validation logic switch state used when the target property is invalid or missing.
 *
 * @returns {boolean | undefined} Valid active state flag identifier or the provided fallback.
 */
function getInsertFinalNewLine(config, defaultValue) {
  if (isUnset(config?.insert_final_newline)) {
    return defaultValue;
  }

  if (typeof config.insert_final_newline === 'boolean') {
    return config.insert_final_newline;
  }

  return defaultValue;
}

/**
 * Resolves the hard-coded width token representing tab spaces, enforcing non-negative restrictions.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {number | undefined} defaultValue - Fallback integer scale boundary metric used when the target property is invalid or missing.
 *
 * @returns {number | undefined} Valid fallback layout scale value or the provided boundary multiplier.
 */
function geTabWidth(config, defaultValue) {
  if (isUnset(config?.tab_width)) {
    return defaultValue;
  }

  if (typeof config.tab_width === 'number' && config.tab_width >= 0) {
    return config.tab_width;
  }

  return defaultValue;
}

/**
 * Resolves whether trailing whitespaces must be stripped from source line contents during asset evaluations.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {boolean | undefined} defaultValue - Fallback execution state switcher token used when the target property is invalid or missing.
 *
 * @returns {boolean | undefined} Valid active modification configuration value or the provided fallback.
 */
function getTrimTrailingWhitespace(config, defaultValue) {
  if (isUnset(config?.trim_trailing_whitespace)) {
    return defaultValue;
  }

  if (typeof config.trim_trailing_whitespace === 'boolean') {
    return config.trim_trailing_whitespace;
  }

  return defaultValue;
}

/**
 * Resolves the active string layout token representing file character encoding schemas.
 *
 * @param {import('editorconfig').Props | undefined} config - Raw EditorConfig properties block read from disk.
 * @param {string | undefined} defaultValue - Fallback file encoding schema text identifier used when the target property is invalid or missing.
 *
 * @returns {string | undefined} Clean non-empty configuration string asset block or the provided fallback.
 */
function getCharset(config, defaultValue) {
  if (isUnset(config?.charset)) {
    return defaultValue;
  }

  if (typeof config.charset === 'string') {
    const charset = config.charset.trim();

    if (charset) {
      return charset;
    }
  }

  return defaultValue;
}
