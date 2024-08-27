sync:
	rm -rf ./docs
	rm -rf ./tcv-build
	npx --no-install tailwind-config-viewer export
	node ./scripts/generate-css.js
	mv -f ./tcv-build ./docs

publish:
	npm publish