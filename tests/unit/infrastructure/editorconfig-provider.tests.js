import * as vitest from 'vitest';
import editorconfigProvider from '../../../infrastructure/editorconfig-provider.js';

//================================
// Tests
//================================

vitest.describe.concurrent('EditorConfig Provider - Unit Testing', describe);

function describe() {
  vitest.it.concurrent(
    'Should expose a strict, immutable lookup dictionary of standardized property values',
    test_propertyValue_isStrictImmutableDictionary
  );
}

function test_propertyValue_isStrictImmutableDictionary() {
  const values = editorconfigProvider.propertyValue;

  vitest.expect(Object.isFrozen(values)).toBe(true);

  vitest.expect(values.unset).toBe('unset');
  vitest.expect(values.tab).toBe('tab');
  vitest.expect(values.space).toBe('space');
  vitest.expect(values.lf).toBe('lf');
  vitest.expect(values.crlf).toBe('crlf');

  vitest.expect(Object.keys(values)).toHaveLength(5);
}
