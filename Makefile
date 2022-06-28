
all: build

clean:
	rm -rf build

build: src/**/* tsconfig.json
	npx tsc 
	cp src/server/index.html build/server/index.html

watch:
	npx tsc -w 

lint:
	npx gts fix

unit:
	npx jest

server: build
	node build/server/web.js

.PHONY: server lint watch clean unit
