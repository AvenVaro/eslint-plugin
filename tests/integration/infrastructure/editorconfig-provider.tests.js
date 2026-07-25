import * as vitest from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';

//================================
// Constants
//================================

/** @type {import('node:fs').MakeDirectoryOptions} */
const mkdirOptions = {
  recursive: true
};

/** @type {import('node:fs').RmOptions} */
const rmOptions = {
  recursive: true,
  force: true
};

//================================
// Tests
//================================

vitest.describe.concurrent('EditorConfig Provider - Physical Integration Tier', describe);

function describe() {
  const testTempRootDir = path.join(import.meta.dirname, '__tmp_integration_editorconfigProvider_tests__');

  vitest.afterAll(() => afterAll(testTempRootDir));

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For js.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For md.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab. Indent size is string.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab. Tab width.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For tab. Tab width. Indent size is string.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space. Indent size is string.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space. Tab width.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should physically read properties from a real .editorconfig file on disk. For space. Tab width. Indent size is string.',
    () => test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth(testTempRootDir)
  );

  vitest.it.concurrent(
    'Should safely return an empty object if .editorconfig is missing',
    test_loadConfig_editorconfigFileIsNotFounded
  );
}

function afterAll(testTempRootDir) {
  if (fs.existsSync(testTempRootDir)) {
    fs.rmSync(testTempRootDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_js');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 3;
  const expectedCharset = 'unset_charset';
  const expectedInsertFinalNewline = true;
  const expectedTrimTrailingWhitespace = true;

  const editorconfig = [
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
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_md');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.md');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 5;
  const expectedCharset = 'unset_charset';
  const expectedInsertFinalNewline = true;
  const expectedTrimTrailingWhitespace = false;

  const editorconfig = [
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
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 4;

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 'string_value';

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_tabWidth');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 4;

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_tab_indentSizeIsString_tabWidth');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 'string_value';

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.tab}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 4;

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 'string_value';

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `indent_size = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_tabWidth');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 4;

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth(testTempRootDir) {
  const testTmpDir = path.join(testTempRootDir, 'test_loadConfig_editorconfigFileIsFoundedAndSuccessfullyParsed_space_indentSizeIsString_tabWidth');
  const mockTargetFile = path.join(testTmpDir, 'src', 'index.js');
  const mockEditorconfigFile = path.join(testTmpDir, '.editorconfig');

  const expectedIndentSize = 'string_value';

  const editorconfig = [
    'root = true',
    '',
    '[*.js]',
    `indent_style = ${editorconfigProvider.propertyValue.space}`,
    `tab_width = ${expectedIndentSize}`,
    `end_of_line = ${editorconfigProvider.propertyValue.lf}`
  ];

  try {
    fs.mkdirSync(path.dirname(mockTargetFile), mkdirOptions);
    fs.writeFileSync(mockEditorconfigFile, editorconfig.join('\n'));

    const config = editorconfigProvider.getConfig(true, mockTargetFile);

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
    fs.rmSync(testTmpDir, rmOptions);
  }
}

function test_loadConfig_editorconfigFileIsNotFounded() {
  let systemTmpDir;

  try {
    systemTmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eslint-plugin-avenvaro-editorconfig-integtation-tests-'));

    const targetFile = path.join(systemTmpDir, 'isolated', 'project', 'app.js');

    fs.mkdirSync(path.dirname(targetFile), mkdirOptions);

    const config = editorconfigProvider.loadConfig(targetFile);

    vitest.expect(config).toEqual({});
  }
  finally {
    if (systemTmpDir) {
      fs.rmSync(systemTmpDir, rmOptions);
    }
  }
}
