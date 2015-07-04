test: data/phoneme-groups-with-syllables.json
	node tests/indexing-tests.js
	node tests/word-syllable-map-tests.js

data/phoneme-groups-with-syllables.json:
	cd node_modules/phonemenon && \
	make phoneme-groups-with-syllables.json && \
	mv phoneme-groups-with-syllables.json ../../data

pushall:
	git push origin master && npm publish
