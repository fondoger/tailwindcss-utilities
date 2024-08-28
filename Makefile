sync:
	rm -rf ./docs
	rm -rf ./tcv-build
	npx --no-install --yes tailwind-config-viewer export
	npx --no-install --yes terser -c -m -o dist/tailwind-utilities.min.js -- dist/tailwind-utilities.js
	node ./scripts/generate-css.js
	mv -f ./tcv-build ./docs

publish:
	npm publish