var fs = require('fs');
var Writable = require('stream').Writable;
var ldjsonStream = require('ldjson-stream')
var level = require('level');

function indexWordsAndSyllables(opts, done) {
  var dbOpts = {
    valueEncoding: 'json'
  };
  var db = level(opts.dbLocation, dbOpts);
  var linesIndexed = 0;

  fs.createReadStream(__dirname + '/data/phoneme-groups-with-syllables.json')
    .pipe(ldjsonStream.parse())
    .on('data', writeDatumToIndex)
    .on('end', cleanUp);

  function writeDatumToIndex(wordDatum) {
    debugger;
    if (opts.numberOfLinesToIndex === undefined ||
      linesIndexed < opts.numberOfLinesToIndex) {

      linesIndexed += 1;
      db.put(wordDatum.word, wordDatum.syllables);
    }
  }

  function cleanUp(error) {
    db.close(passError);

    function passError() {
      done(error);
    }
  }
}

module.exports = indexWordsAndSyllables;
