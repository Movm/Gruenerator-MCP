import test from 'node:test';
import assert from 'node:assert/strict';
import {
  foldUmlauts,
  normalizeUnicodeNumbers,
  normalizeQuery,
  tokenizeQuery,
  generateQueryVariants
} from './textNormalization.js';

test('foldUmlauts converts German characters to ASCII equivalents', () => {
  assert.equal(foldUmlauts('Öl über Straße'), 'Oel ueber Strasse');
});

test('normalizeUnicodeNumbers converts subscript and superscript digits', () => {
  assert.equal(normalizeUnicodeNumbers('CO₂ und m²'), 'CO2 und m2');
});

test('normalizeQuery handles whitespace, umlauts, and compound hyphens', () => {
  assert.equal(normalizeQuery('  Grüne   Sozial-politik '), 'gruene sozialpolitik');
});

test('tokenizeQuery removes punctuation while retaining words and digits', () => {
  assert.deepEqual(tokenizeQuery('Klimaschutz für 2030!'), ['Klimaschutz', 'für', '2030']);
});

test('generateQueryVariants returns useful German search variants', () => {
  const variants = generateQueryVariants('Grüne Politik');
  assert.ok(variants.includes('grüne politik'));
  assert.ok(variants.includes('grüne-politik'));
  assert.ok(variants.includes('gruenepolitik'));
});
