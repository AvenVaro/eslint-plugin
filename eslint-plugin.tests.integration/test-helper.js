import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import { ePropertyValue } from '@avenvaro/eslint-plugin';

//================================
// Typedefs
//================================

/**
 * @typedef {import('node:fs').MakeDirectoryOptions} MakeDirectoryOptions
 * @typedef {import('node:fs').RmOptions} RmOptions
 * @typedef {import('./test-helper.d.ts').TestHelper} TestHelper
 * @typedef {import('./test-helper.d.ts').FilesystemBlueprint} FilesystemBlueprint
 * @typedef {import('@avenvaro/eslint-plugin').EPropertyValue} EPropertyValue
 */

//================================
// Constants
//================================

/** @type {MakeDirectoryOptions} */
const mkdirOptions = Object.freeze({
  recursive: true
});

/** @type {RmOptions} */
const rmOptions = Object.freeze({
  recursive: true,
  force: true
});

/** @type {TestHelper} */
const testHelper = Object.freeze({
  mkdirOptions: mkdirOptions,
  rmOptions: rmOptions,
  createTempRootDirAsync: createTempRootDirAsync,
  createTempPaths: createTempPaths,
  createTempFilesAsync: createTempFilesAsync,
  createTempTargetFileDirAsync: createTempTargetFileDirAsync,
  createTempTargetFilePath: createTempTargetFilePath,
  convertCodeArrayToCodeString: convertCodeArrayToCodeString,
  removeAsync: removeAsync,
  createIndentString: createIndentString
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
      `eslint-plugin-${partDirName}-integraation-tests-`
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
 * @returns {FilesystemBlueprint} A structural blueprint holding resolved path metrics.
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
 * @param {FilesystemBlueprint} paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
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

/**
 * @private
 *
 * Assembles a structured multi-line source text file template string from a sequential token line array block.
 * **Warning:** Passing a mutable reference to the `codeArray` parameter will mutate the source array if `insertEOL` evaluates to true.
 *
 * @param {string[]} codeArray - A sequential collection of raw source code content line strings.
 * @param {boolean} [insertEOL=true] - Appends an empty string token at the EOF array index to enforce trailing newline normalization.
 *
 * @returns {string} A concatenated multi-line source execution file payload string.
 */
function convertCodeArrayToCodeString(codeArray, insertEOL = true) {
  if (insertEOL) {
    codeArray.push('');
  }

  return codeArray.join('\n');
}

/**
 * @private
 *
 * Asynchronously removes a file or directory at the specified path if it is provided.
 * Uses the predefined integration test options for the filesystem removal operation.
 *
 * @param {string} path - The filesystem path to the file or directory to remove.
 *
 * @returns {Promise<void>} A promise that resolves when the removal operation is complete.
 */
async function removeAsync(path) {
  if (path) {
    await fs.rm(path, testHelper.rmOptions);
  }
}

/**
 * @private
 *
 * Generates an indentation string consisting of repeated space or tab characters.
 *
 * This utility constructs a concrete whitespace indentation sequence based on the
 * requested length and character type, throwing a TypeError if an unsupported format is provided.
 *
 * @param {number} indent - The number of times the indentation character should be repeated.
 * @param {EPropertyValue['space'] | EPropertyValue['tab']} type - The type of indentation character to use (space or tab).
 *
 * @returns {string} A string sequence composed entirely of the requested indentation characters. Or an empty string if the inden is less than or equal to zero.
 *
 * @throws {TypeError} If the provided indentation type is neither a space nor a tab configuration.
 */
function createIndentString(indent, type) {
  if (indent <= 0) {
    return '';
  }

  if (type === ePropertyValue.space) {
    return ' '.repeat(indent);
  }

  if (type === ePropertyValue.tab) {
    return '\t'.repeat(indent);
  }

  throw new TypeError(`The type must be '${ePropertyValue.space}' or '${ePropertyValue.tab}'.`);
}
