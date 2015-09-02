./dest/ajax.js: ./build/event-emitter.js ./build/ajax.js
	cat ./build/event-emitter.js ./build/ajax.js > ./dest/ajax.js
	rm -rf ./build

./build/ajax.js: ./src/ajax.js ./build
	./node_modules/.bin/babel ./src/ajax.js -o ./build/ajax.js --modules umd --module-id Ajax
	
./build/event-emitter.js: ./event-emitter/src/event-emitter.js ./build
	./node_modules/.bin/babel ./event-emitter/src/event-emitter.js -o ./build/event-emitter.js --modules umd --module-id EventEmitter

./dest:
	mkdir ./dest

./build:
	mkdir ./build
