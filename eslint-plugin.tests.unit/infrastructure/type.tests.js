import * as vitest from 'vitest';
import eType from '@avenvaro/eslint-plugin/src/infrastructure/type.enum.js';

//================================
// Tests
//================================

vitest.describe.concurrent('Type - Unit Testing', describe);

function describe() {
  vitest.it.concurrent(
    'Should expose a strict, immutable lookup dictionary of standardized types',
    test_propertyValue_isStrictImmutableDictionary
  );
}

function test_propertyValue_isStrictImmutableDictionary() {
  vitest.expect(Object.isFrozen(eType)).toBe(true);

  vitest.expect(eType.undefined).toBe('undefined');
  vitest.expect(eType.object).toBe('object');
  vitest.expect(eType.number).toBe('number');
  vitest.expect(eType.string).toBe('string');
  vitest.expect(eType.boolean).toBe('boolean');
  vitest.expect(eType.function).toBe('function');
  vitest.expect(eType.symbol).toBe('symbol');
  vitest.expect(eType.bigint).toBe('bigint');
  vitest.expect(eType.integer).toBe('integer');
  vitest.expect(eType.array).toBe('array');
  vitest.expect(eType.null).toBe('null');
  vitest.expect(eType.any).toBe('any');

  vitest.expect(Object.keys(eType)).toHaveLength(12);

  vitest.expect(typeof undefined === eType.undefined).toBe(true);
  vitest.expect(typeof null === eType.object).toBe(true);
  vitest.expect(typeof 5 === eType.number).toBe(true);
  vitest.expect(typeof '5' === eType.string).toBe(true);
  vitest.expect(typeof false === eType.boolean).toBe(true);
  vitest.expect(typeof describe === eType.function).toBe(true);
  vitest.expect(typeof Symbol('test') === eType.symbol).toBe(true);
  vitest.expect(typeof 42n === eType.bigint).toBe(true);
}
