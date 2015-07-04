// Depends on indexing-tests having been run first, unfortunately.

var test = require('tape');
var createWordSyllableMap = require('../word-syllable-map');
var callNextTick = require('call-next-tick');

var dbLocation = __dirname + '/test.db';

test('Create and use map', function syllablesForWords(t) {
  var expectedSyllablesForWords = [
    {
      word: 'ARK',
      syllables: [
        ['AA', 'R', 'K']
      ]
    },
    {
      word: 'ABNORMALLY',
      syllables: [
        ['AE', 'B'], 
        ['N', 'AO', 'R'],
        ['M', 'AH'], 
        ['L', 'IY']
      ]
    },
    {
      word: 'ABLER',
      syllables: [
        ['EY'], 
        ['B', 'AH'],
        ['L', 'ER']
      ]
    }
  ];

  t.plan(expectedSyllablesForWords.length * 2 + 2);

  var wordSyllableMap = createWordSyllableMap({
    dbLocation: dbLocation
  });

  t.ok(wordSyllableMap, 'No error while creating map.');

  expectedSyllablesForWords.forEach(runSyllableForWordTest);

  function runSyllableForWordTest(pair) {
    wordSyllableMap.syllablesForWord(pair.word, checkSyllables);

    function checkSyllables(error, syllables) {
      t.ok(!error, 'No error occured while looking for syllables.');
      t.deepEqual(syllables, pair.syllables, 'Expected syllables returned.');
    }
  }

  wordSyllableMap.close(checkClose);

  function checkClose(error) {
    t.ok(!error, 'Database closes successfully.');
  }
});
