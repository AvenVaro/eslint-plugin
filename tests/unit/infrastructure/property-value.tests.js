import * as vitest from 'vitest';
import propertyValue from '../../../infrastructure/property-value.enum.js';

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
  vitest.expect(Object.isFrozen(propertyValue)).toBe(true);

  vitest.expect(propertyValue.unset).toBe('unset');
  vitest.expect(propertyValue.tab).toBe('tab');
  vitest.expect(propertyValue.space).toBe('space');
  vitest.expect(propertyValue.lf).toBe('lf');
  vitest.expect(propertyValue.crlf).toBe('crlf');
  vitest.expect(propertyValue.off).toBe('off');
  vitest.expect(propertyValue.first).toBe('first');

  vitest.expect(Object.keys(propertyValue)).toHaveLength(7);
}
