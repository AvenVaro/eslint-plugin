import * as vitest from 'vitest';
import { ePropertyValue } from '@avenvaro/eslint-plugin';

//================================
// Tests
//================================

vitest.describe.concurrent('PropertyValue - Unit Testing', describe);

function describe() {
  vitest.it.concurrent(
    'Should expose a strict, immutable lookup dictionary of standardized property values',
    test_propertyValue_isStrictImmutableDictionary
  );
}

function test_propertyValue_isStrictImmutableDictionary() {
  vitest.expect(Object.isFrozen(ePropertyValue)).toBe(true);

  vitest.expect(ePropertyValue.unset).toBe('unset');
  vitest.expect(ePropertyValue.tab).toBe('tab');
  vitest.expect(ePropertyValue.space).toBe('space');
  vitest.expect(ePropertyValue.lf).toBe('lf');
  vitest.expect(ePropertyValue.crlf).toBe('crlf');
  vitest.expect(ePropertyValue.off).toBe('off');
  vitest.expect(ePropertyValue.first).toBe('first');
  vitest.expect(ePropertyValue.first).toBe('first');
  vitest.expect(ePropertyValue.latin1).toBe('latin1');
  vitest.expect(ePropertyValue.utf8).toBe('utf-8');
  vitest.expect(ePropertyValue.utf8bom).toBe('utf-8-bom');
  vitest.expect(ePropertyValue.utf16be).toBe('utf-16be');
  vitest.expect(ePropertyValue.utf16le).toBe('utf-16le');

  vitest.expect(Object.keys(ePropertyValue)).toHaveLength(12);
}
