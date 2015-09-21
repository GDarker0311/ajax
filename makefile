./dest/ajax.js: ./event-emitter/src/event-emitter.js ./dest
	./node_modules/.bin/browserify ./src/ajax.js -t babelify --outfile ./dest/ajax.js

./dest:
	mkdir ./dest
