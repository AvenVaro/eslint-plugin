import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';

/** @type {import('node:fs').MakeDirectoryOptions} */
const mkdirOptions = Object.freeze({
  recursive: true
});

/** @type {import('node:fs').RmOptions} */
const rmOptions = Object.freeze({
  recursive: true,
  force: true
});

/** @type {import('./integration-tests-test-helper.d.ts').IntegrationTestsTestHelper} */
const integrationTestsTestHelper = Object.freeze({
  mkdirOptions: mkdirOptions,
  rmOptions: rmOptions,
  createTempRootDirAsync: createTempRootDirAsync,
  createTempPaths: createTempPaths,
  createTempFilesAsync: createTempFilesAsync,
  createTempTargetFileDirAsync: createTempTargetFileDirAsync,
  createTempTargetFilePath: createTempTargetFilePath
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
 * @async
 *
 * Asynchronously generates a unique, isolated temporary root sandbox directory within the operating system's temporary file workspace.
 *
 * @param {string} partDirName - The semantic namespace token segment used to isolate the target rule layer category (e.g., 'rules' or 'infrastructure').
 *
 * @returns {Promise<string>} A promise that resolves to the newly created absolute temporary directory root path string.
 */
async function createTempRootDirAsync(partDirName) {
  return await fs.mkdtemp(
    path.join(
      os.tmpdir(),
      `eslint-plugin-avenvaro-${partDirName}-integraation-tests-`
    )
  );
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
    mockTargetFile: createTempTargetFilePath(testTmpDir, fileName),
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
  await createTempTargetFileDirAsync(paths.mockTargetFile);
  await fs.writeFile(paths.mockEditorconfigFile, editorconfig);
}

/**
 * @private
 * @async
 *
 * Asynchronously extracts the parent folder path from the target file tracking token and constructs the deep nested container directory layout on disk.
 *
 * @param {string} mockTargetFile - The absolute tracking path string routing to the virtual source asset location block.
 *
 * @returns {Promise<void>} A promise that resolves once the parent directory structure has been successfully initialized on disk.
 */
async function createTempTargetFileDirAsync(mockTargetFile) {
  await fs.mkdir(path.dirname(mockTargetFile), mkdirOptions);
}

/**
 * @private
 *
 * Resolves the absolute filesystem path routing directly to the mock source code asset file entry point inside the source container layout.
 *
 * @param {string} testTmpDir - The absolute path targeting the isolated sandbox workspace folder assigned to the active test case.
 * @param {string} fileName - The source asset module filename placeholder string (e.g., 'index.js').
 *
 * @returns {string} The completed absolute track string routing to the virtual source asset location block.
 */
function createTempTargetFilePath(testTmpDir, fileName) {
  return path.join(testTmpDir, 'src', fileName);
}
