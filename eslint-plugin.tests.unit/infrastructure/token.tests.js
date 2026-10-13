import * as vitest from 'vitest';
import eToken from '@avenvaro/eslint-plugin/src/infrastructure/token.enum.js';

//================================
// Tests
//================================

vitest.describe.concurrent('Token - Unit Testing', describe);

function describe() {
  vitest.it.concurrent(
    'Should expose a strict, immutable lookup dictionary of standardized tokens',
    test_token_isStrictImmutableDictionary
  );
}

function test_token_isStrictImmutableDictionary() {
  vitest.expect(Object.isFrozen(eToken)).toBe(true);

  vitest.expect(eToken.semicolon).toBe(';');
  vitest.expect(eToken.comma).toBe(',');
  vitest.expect(eToken.question).toBe('?');
  vitest.expect(eToken.colon).toBe(':');

  vitest.expect(Object.keys(eToken)).toHaveLength(4);
}
