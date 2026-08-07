import path from 'node:path';
import fs from 'node:fs';

/** @type {import('node:fs').MakeDirectoryOptions} */
const mkdirOptions = {
  recursive: true
};

/** @type {import('node:fs').RmOptions} */
const rmOptions = {
  recursive: true,
  force: true
};

/** @type {import('./integration-tests-test-helper.d.ts').IntegrationTestsTestHelper} */
const integrationTestsTestHelper = Object.freeze({
  mkdirOptions: mkdirOptions,
  rmOptions: rmOptions,
  createTempRootPaths: createTempRootPaths,
  createTempPaths: createTempPaths,
  createTempFilesAsync: createTempFilesAsync
});

//================================
// Exports
//================================

export default integrationTestsTestHelper;

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Resolves the absolute directory path targeting a specialized top-level temporary test sandbox on disk.
 *
 * @param {string} partDirName - The semantic namespace token segment used to isolate the target rule layer category (e.g., 'rules' or 'infrastructure').
 *
 * @returns {string} The resolved absolute filesystem path string pointing to the root container mapping.
 */
function createTempRootPaths(partDirName) {
  return path.join(import.meta.dirname, `__tmp_integration_${partDirName}_tests__`);
}

/**
 * @private
 *
 * Resolves absolute sandbox filesystem tracks for an isolated rule integration test container pass.
 *
 * @param {string} rootDirName - The absolute workspace destination path string targeting the root temporary test sandbox sandbox directory.
 * @param {string} dirName - The target unique subdirectory name mapping the active test case.
 * @param {string} fileName - The source asset module filename placeholder (e.g., 'index.js').
 *
 * @returns {import('./integration-tests-test-helper.d.ts').IntegrationTestFilesystemBlueprint} A structural blueprint holding resolved path metrics.
 */
function createTempPaths(rootDirName, dirName, fileName) {
  const testTmpDir = path.join(rootDirName, dirName);

  return {
    testTmpDir: testTmpDir,
    mockTargetFile: path.join(testTmpDir, 'src', fileName),
    mockEditorconfigFile: path.join(testTmpDir, '.editorconfig')
  };
}

/**
 * @private
 * @async
 *
 * Asynchronously constructs the temporary directory structure and commits the mock `.editorconfig` manifest file to disk.
 *
 * @param {import('./integration-tests-test-helper.d.ts').IntegrationTestFilesystemBlueprint} paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
 * @param {string} editorconfig - The raw serialization string payload containing the file layout parameters to be committed to disk.
 *
 * @returns {Promise<void>} A promise that resolves once the directories are created and the configuration payload is cleanly written.
 */
async function createTempFilesAsync(paths, editorconfig) {
  await fs.mkdir(path.dirname(paths.mockTargetFile), mkdirOptions);
  await fs.writeFile(paths.mockEditorconfigFile, editorconfig);
}
