sync:
	rm -rf lib/tailwindcss_colors.dart
	node ../scripts/generate-dart-colors.js
	dart format lib/tailwindcss_colors.dart

publish:
	flutter pub login
	flutter pub publish