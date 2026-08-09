import * as vitest from 'vitest';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';
import propertyValue from '../../../infrastructure/property-value.enum.js';
import integrationTestsTestHelper from '../integration-tests-test-helper.js';

//================================
// Tests
//================================

vitest.describe.concurrent('EditorConfig Provider - Physical Integration Tier', describeAsync);

async function describeAsync() {
  const testTempRootDir = await integrationTestsTestHelper.createTempRootDirAsync('editorconfigProvider');

  vitest.afterAll(async () => await integrationTestsTestHelper.removeAsync(testTempRootDir));

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For js.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For md.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab. Indent size is string.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab. Tab width.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab. Tab width. Indent size is string.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space. Indent size is string.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space. Tab width.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space. Tab width. Indent size is string.',
    async () => await test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth_async(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should safely return an empty object if .editorconfig is missing',
    test_loadConfig_editorconfigFileIsNotFounded_async
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.tab,
    tab_width: 3,
    end_of_line: propertyValue.lf,
    indent_size: 3,
    insert_final_newline: true,
    trim_trailing_whitespace: true,
    charset: 'unset_charset'
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*]',
      `indent_style = ${expectedConfig.indent_style}`,
      'indent_size = 10',
      `insert_final_newline = ${expectedConfig.insert_final_newline}`,
      `trim_trailing_whitespace = ${expectedConfig.trim_trailing_whitespace}`,
      `charset = ${expectedConfig.charset}`,
      `end_of_line = ${expectedConfig.end_of_line}`,
      '',
      '[*.md]',
      'indent_size = 5',
      'trim_trailing_whitespace = false',
      '',
      '[*.js]',
      `indent_size = ${expectedConfig.indent_size}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.tab,
    tab_width: 5,
    end_of_line: propertyValue.lf,
    indent_size: 5,
    insert_final_newline: true,
    trim_trailing_whitespace: false,
    charset: 'unset_charset'
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*]',
      `indent_style = ${expectedConfig.indent_style}`,
      'indent_size = 10',
      `insert_final_newline = ${expectedConfig.insert_final_newline}`,
      'trim_trailing_whitespace = true',
      `charset = ${expectedConfig.charset}`,
      `end_of_line = ${expectedConfig.end_of_line}`,
      '',
      '[*.md]',
      `indent_size = ${expectedConfig.indent_size}`,
      `trim_trailing_whitespace = ${expectedConfig.trim_trailing_whitespace}`,
      '',
      '[*.js]',
      'indent_size = 3'
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md_async',
    'index.md'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.tab,
    tab_width: 4,
    end_of_line: propertyValue.lf,
    indent_size: 4
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `indent_size = ${expectedConfig.indent_size}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.tab,
    tab_width: 'string_value',
    end_of_line: propertyValue.lf,
    indent_size: 'string_value'
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `indent_size = ${expectedConfig.indent_size}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.tab,
    tab_width: 4,
    end_of_line: propertyValue.lf,
    indent_size: 4
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `tab_width = ${expectedConfig.tab_width}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.tab,
    tab_width: 'string_value',
    end_of_line: propertyValue.lf,
    indent_size: 'string_value'
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `tab_width = ${expectedConfig.tab_width}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.space,
    tab_width: 4,
    end_of_line: propertyValue.lf,
    indent_size: 4
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `indent_size = ${expectedConfig.indent_size}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.space,
    tab_width: 'string_value',
    end_of_line: propertyValue.lf,
    indent_size: 'string_value'
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `indent_size = ${expectedConfig.indent_size}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.space,
    tab_width: 4,
    end_of_line: propertyValue.lf
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `tab_width = ${expectedConfig.tab_width}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth_async'
  );
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth_async(testTempRootDir) {
  /** @type {import('editorconfig').Props} */
  const expectedConfig = {
    indent_style: propertyValue.space,
    tab_width: 'string_value',
    end_of_line: propertyValue.lf
  };

  await tryExpectConfigAsync(
    expectedConfig,
    integrationTestsTestHelper.convertCodeArrayToCodeString([
      'root = true',
      '',
      '[*.js]',
      `indent_style = ${expectedConfig.indent_style}`,
      `tab_width = ${expectedConfig.tab_width}`,
      `end_of_line = ${expectedConfig.end_of_line}`
    ]),
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth_async'
  );
}

async function test_loadConfig_editorconfigFileIsNotFounded_async() {
  let tmpRootDir;

  try {
    tmpRootDir = await integrationTestsTestHelper.createTempRootDirAsync('editorconfigProvider');

    const targetFile = integrationTestsTestHelper.createTempTargetFilePath(tmpRootDir, 'app.js');

    await integrationTestsTestHelper.createTempTargetFileDirAsync(targetFile);

    /** @type {import('editorconfig').Props} */
    const expectedConfig = {};
    const actualConfig = editorconfigProvider.loadConfig(targetFile);

    expectConfig(actualConfig, expectedConfig);
  }
  finally {
    await integrationTestsTestHelper.removeAsync(tmpRootDir);
  }
}

//================================
// Private Functions
//================================

/**
 * @private
 *
 * Asserts that the actual EditorConfig properties match the expected configuration.
 *
 * @param {import('editorconfig').Props} actualConfig - The configuration object received from the provider.
 * @param {import('editorconfig').Props} expectedConfig - The reference configuration object to compare against.
 *
 * @returns {void} This function does not return a value.
 */
function expectConfig(actualConfig, expectedConfig) {
  vitest.expect(actualConfig).toBeDefined();
  vitest.expect(actualConfig.end_of_line).toBe(expectedConfig.end_of_line);
  vitest.expect(actualConfig.indent_style).toBe(expectedConfig.indent_style);
  vitest.expect(actualConfig.indent_size).toBe(expectedConfig.indent_size);
  vitest.expect(actualConfig.insert_final_newline).toBe(expectedConfig.insert_final_newline);
  vitest.expect(actualConfig.tab_width).toBe(expectedConfig.tab_width);
  vitest.expect(actualConfig.trim_trailing_whitespace).toBe(expectedConfig.trim_trailing_whitespace);
  vitest.expect(actualConfig.charset).toBe(expectedConfig.charset);
}

/**
 * @private
 * @async
 *
 * Asynchronously attempts to create temporary configuration files, retrieve the actual
 * EditorConfig properties, and assert them against the expected configuration.
 * Automatically cleans up the created temporary directory in the `finally` block.
 *
 * @param {import('editorconfig').Props} expectedConfig - The reference configuration object to compare against.
 * @param {string} editorconfig - The raw content or configuration string for the .editorconfig file.
 * @param {string} testTempRootDir - The root directory where the temporary test folders are created.
 * @param {string} dirName - The specific name of the temporary directory for this test case.
 * @param {string} [fileName='index.js'] - The optional name of the mock target file.
 *
 * @returns {Promise<void>} A promise that resolves when the assertion and cleanup are complete.
 */
async function tryExpectConfigAsync(expectedConfig, editorconfig, testTempRootDir, dirName, fileName = 'index.js') {
  const paths = integrationTestsTestHelper.createTempPaths(testTempRootDir, dirName, fileName);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const actualConfig = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    expectConfig(actualConfig, expectedConfig);
  }
  finally {
    await integrationTestsTestHelper.removeAsync(paths.testTmpDir);
  }
}
