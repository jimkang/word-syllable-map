var level = require('level');

function createWordSyllableMap(opts) {
  if (!opts || !opts.dbLocation) {
    throw new Error('Cannot create wordSyllableMap without dbLocation.');
  }

  var dbOpts = {
    valueEncoding: 'json'
  };
  var db = level(opts.dbLocation, dbOpts);

  return {
    syllablesForWord: syllablesForWord,
    close: db.close.bind(db)
  };

  function syllablesForWord(word, done) {
    db.get(word, done);
  }
}

module.exports = createWordSyllableMap;
