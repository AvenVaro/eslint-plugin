import * as vitest from 'vitest';
import fs from 'node:fs/promises';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';
import integrationTestsTestHelper from '../integration-tests-test-helper.js';

//================================
// Tests
//================================

vitest.describe.concurrent('EditorConfig Provider - Physical Integration Tier', describeAsync);

async function describeAsync() {
  const testTempRootDir = await integrationTestsTestHelper.createTempRootDirAsync('editorconfigProvider');

  vitest.afterAll(async () => await afterAllAsync(testTempRootDir));

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

async function afterAllAsync(testTempRootDir) {
  if (testTempRootDir) {
    await fs.rm(testTempRootDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js_async',
    'index.js'
  );

  const expectedIndentSize = 3;
  const expectedCharset = 'unset_charset';
  const expectedInsertFinalNewline = true;
  const expectedTrimTrailingWhitespace = true;

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    'indent_size = 10',
    `insert_final_newline = ${expectedInsertFinalNewline}`,
    `trim_trailing_whitespace = ${expectedTrimTrailingWhitespace}`,
    `charset = ${expectedCharset}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`,
    '',
    '[*.md]',
    'indent_size = 5',
    'trim_trailing_whitespace = false',
    '',
    '[*.js]',
    `indent_size = ${expectedIndentSize}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.tab);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBe(expectedInsertFinalNewline);
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBe(expectedTrimTrailingWhitespace);
    vitest.expect(config.charset).toBe(expectedCharset);
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md_async',
    'index.md'
  );

  const expectedIndentSize = 5;
  const expectedCharset = 'unset_charset';
  const expectedInsertFinalNewline = true;
  const expectedTrimTrailingWhitespace = false;

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    'indent_size = 10',
    `insert_final_newline = ${expectedInsertFinalNewline}`,
    'trim_trailing_whitespace = true',
    `charset = ${expectedCharset}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`,
    '',
    '[*.md]',
    `indent_size = ${expectedIndentSize}`,
    `trim_trailing_whitespace = ${expectedTrimTrailingWhitespace}`,
    '',
    '[*.js]',
    'indent_size = 3'
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.tab);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBe(expectedInsertFinalNewline);
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBe(expectedTrimTrailingWhitespace);
    vitest.expect(config.charset).toBe(expectedCharset);
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_async',
    'index.js'
  );

  const expectedIndentSize = 4;

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.tab);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_async',
    'index.js'
  );

  const expectedIndentSize = 'string_value';

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.tab);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth_async',
    'index.js'
  );

  const expectedIndentSize = 4;

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.tab);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth_async',
    'index.js'
  );

  const expectedIndentSize = 'string_value';

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.tab);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_async',
    'index.js'
  );

  const expectedIndentSize = 4;

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.space);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_async',
    'index.js'
  );

  const expectedIndentSize = 'string_value';

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.space);
    vitest.expect(config.indent_size).toBe(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth_async',
    'index.js'
  );

  const expectedIndentSize = 4;

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.space);
    vitest.expect(config.indent_size).toBeUndefined();
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth_async(testTempRootDir) {
  const paths = integrationTestsTestHelper.createTempPaths(
    testTempRootDir,
    'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth_async',
    'index.js'
  );

  const expectedIndentSize = 'string_value';

  const editorconfig = integrationTestsTestHelper.convertCodeArrayToCodeString([
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ]);

  try {
    await integrationTestsTestHelper.createTempFilesAsync(paths, editorconfig);

    const config = editorconfigProvider.getConfig(true, paths.mockTargetFile);

    vitest.expect(config).toBeDefined();
    vitest.expect(config.end_of_line).toBe(editorconfigProvider.propertyValue.lf);
    vitest.expect(config.indent_style).toBe(editorconfigProvider.propertyValue.space);
    vitest.expect(config.indent_size).toBeUndefined(expectedIndentSize);
    vitest.expect(config.insert_final_newline).toBeUndefined();
    vitest.expect(config.tab_width).toBe(expectedIndentSize);
    vitest.expect(config.trim_trailing_whitespace).toBeUndefined();
    vitest.expect(config.charset).toBeUndefined();
  }
  finally {
    await fs.rm(paths.testTmpDir, integrationTestsTestHelper.rmOptions);
  }
}

async function test_loadConfig_editorconfigFileIsNotFounded_async() {
  let tmpRootDir;

  try {
    tmpRootDir = await integrationTestsTestHelper.createTempRootDirAsync('editorconfigProvider');

    const targetFile = integrationTestsTestHelper.createTempTargetFilePath(tmpRootDir, 'app.js');

    await integrationTestsTestHelper.createTempTargetFileDirAsync(targetFile);

    const config = editorconfigProvider.loadConfig(targetFile);

    vitest.expect(config).toEqual({});
  }
  finally {
    if (tmpRootDir) {
      await fs.rm(tmpRootDir, integrationTestsTestHelper.rmOptions);
    }
  }
}
