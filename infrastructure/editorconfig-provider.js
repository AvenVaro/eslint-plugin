import editorconfig from 'editorconfig';

/** @type {import('./editorconfig-provider.d.ts').EditorconfigProvider} */
const editorconfigProvider = {
  loadConfig: loadConfig,
  mockLoadConfig: mockingLoadConfig,
  resetMockingLoadConfig: resetMockingLoadConfig,
  getConfig: getConfig
};

const originalLoadConfig = editorconfigProvider.loadConfig;

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
 * Intercepts the operational config-loading mechanism with an isolated test wrapper.
 *
 * @param {import('editorconfig').KnownProps} properties - Fake properties payload to return in tests.
 * @param {string} expectedFilePath - The targeted file path where this fake state must trigger.
 *
 * @returns {void}
 */
function mockingLoadConfig(properties, expectedFilePath) {
  editorconfigProvider.loadConfig = (filePath) => mockLoadConfig(properties, filePath, expectedFilePath);
}

/**
 * Reverts the modified provider execution state back to the original operational setup.
 *
 * @returns {void}
 */
function resetMockingLoadConfig() {
  editorconfigProvider.loadConfig = originalLoadConfig;
}

/**
 * Evaluates operational execution paths and substitutes live disk payload with test mock variables.
 *
 * @param {import('editorconfig').KnownProps} properties - Fake properties payload injected by the mock system.
 * @param {string} actualFilePath - Runtime file path evaluated by the active rule during asset scanning.
 * @param {string} expectedFilePath - Strict isolation path filter injected during test setup hooks.
 *
 * @returns {import('editorconfig').KnownProps} Mocked payload on filter match, or an empty fallback configuration object.
 */
function mockLoadConfig(properties, actualFilePath, expectedFilePath) {
  if (actualFilePath === expectedFilePath) {
    return properties;
  }

  return {};
}

/**
 * Orchestrates runtime configuration parsing behavior, evaluating global bypass rules.
 *
 * @param {boolean | undefined} useEditorconfig - User runtime toggle flag extracted from ESLint rules array.
 * @param {string} filePath - The absolute target asset destination evaluated during active traversal.
 *
 * @returns {import('editorconfig').KnownProps} Final configuration block properties, or an isolated empty fallback structure.
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
