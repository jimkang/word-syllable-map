var indexWordsAndSyllables = require('./index-words-and-syllables');
var createWordSyllableMap = require('./word-syllable-map');

module.exports = {
  setUpDatabase: indexWordsAndSyllables,
  createWordSyllableMap: createWordSyllableMap
};
