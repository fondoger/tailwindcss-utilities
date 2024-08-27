sync:
	npx --no-install tailwind-config-viewer export
	node ./scripts/generate-css.js

publish:
	npm publish