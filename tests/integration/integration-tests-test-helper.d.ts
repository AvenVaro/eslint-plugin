import { MakeDirectoryOptions, RmOptions } from 'node:fs';

/**
 * Represents the absolute filesystem resolution tracks for a dedicated integration test container block.
 */
export interface IntegrationTestFilesystemBlueprint {
  /** The absolute path targeting the isolated sandbox workspace folder assigned to a single test method. */
  readonly testTmpDir: string;

  /** The destination target track routing directly to the mock source code asset file entry point. */
  readonly mockTargetFile: string;

  /** The absolute track routing directly to the generated configuration manifest metadata asset on disk. */
  readonly mockEditorconfigFile: string;
}

/**
 * Declares the structured configuration contract for the frozen integration tests filesystem helper utility.
 */
export interface IntegrationTestsTestHelper {
  /** Baseline recursion options mapping used for standard directory creation workflows. */
  readonly mkdirOptions: MakeDirectoryOptions;

  /** Guarded recursion and force-override parameters mapping used for disk cleanup workflows. */
  readonly rmOptions: RmOptions;

  /**
   * Asynchronously generates a unique, isolated temporary root sandbox directory within the operating system's temporary file workspace.
   *
   * @param partDirName - The semantic namespace token segment used to isolate the target rule layer category (e.g., 'rules' or 'infrastructure').
   *
   * @returns A promise that resolves to the newly created absolute temporary directory root path string.
   */
  createTempRootDirAsync(partDirName: string): Promise<string>;

  /**
   * Resolves absolute sandbox filesystem tracks for an isolated rule integration test container pass.
   *
   * @param rootDirName - The absolute workspace destination path string targeting the root temporary test sandbox sandbox directory.
   * @param dirName - The target unique subdirectory name mapping the active test case.
   * @param fileName - The source asset module filename placeholder (e.g., 'index.js').
   *
   * @returns A structural blueprint holding resolved path metrics.
   */
  createTempPaths(rootDirName: string, dirName: string, fileName: string): IntegrationTestFilesystemBlueprint;

  /**
   * Asynchronously constructs the temporary directory structure and commits the mock `.editorconfig` manifest file to disk.
   *
   * @param paths - The structural blueprint holding resolved absolute filesystem tracks for the active test container pass.
   * @param editorconfig - The raw serialization string payload containing the file layout parameters to be committed to disk.
   *
   * @returns A promise that resolves once the directories are created and the configuration payload is cleanly written.
   */
  createTempFilesAsync(paths: IntegrationTestFilesystemBlueprint, editorconfig: string): Promise<void>;

  /**
   * Asynchronously extracts the parent folder path from the target file tracking token and constructs the deep nested container directory layout on disk.
   *
   * @param mockTargetFile - The absolute tracking path string routing to the virtual source asset location block.
   *
   * @returns A promise that resolves once the parent directory structure has been successfully initialized on disk.
   */
  createTempTargetFileDirAsync(mockTargetFile: string): Promise<void>;

  /**
   * Resolves the absolute filesystem path routing directly to the mock source code asset file entry point inside the source container layout.
   *
   * @param testTmpDir - The absolute path targeting the isolated sandbox workspace folder assigned to the active test case.
   * @param fileName - The source asset module filename placeholder string (e.g., 'index.js').
   *
   * @returns The completed absolute track string routing to the virtual source asset location block.
   */
  createTempTargetFilePath(testTmpDir: string, fileName: string): string;
}

declare const integrationTestsTestHelper: IntegrationTestsTestHelper;

export default integrationTestsTestHelper;
