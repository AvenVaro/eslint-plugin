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
   * Resolves the absolute directory path targeting a specialized top-level temporary test sandbox on disk.
   *
   * @param partDirName - The semantic namespace token segment used to isolate the target rule layer category (e.g., 'rules' or 'infrastructure').
   *
   * @returns The resolved absolute filesystem path string pointing to the root container mapping.
   */
  createTempRootPathAsync(partDirName: string): Promise<string>;

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
   * @returns {Promise<void>} A promise that resolves once the directories are created and the configuration payload is cleanly written.
   */
  createTempFilesAsync(paths: IntegrationTestFilesystemBlueprint, editorconfig: string): Promise<void>;
}

declare const integrationTestsTestHelper: IntegrationTestsTestHelper;

export default integrationTestsTestHelper;
