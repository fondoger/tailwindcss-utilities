# Repository Guidelines

## Project Structure & Module Organization
- `dist/` holds generated CSS/JS bundles; never edit directly.
- `docs/` is the Tailwind Config Viewer export served on GitHub Pages and rebuilt via `make sync`.
- `scripts/` contains the Node generators (`generate-css.js`, `generate-dart-colors.js`) that trim Tailwind tokens before writing assets.
- `dart_package/` hosts the Flutter color package with `lib/`, `test/`, and its own `Makefile`.
- Supporting files: `tailwind.config.js` seeds Tailwind, the root `Makefile` runs the full sync, and `dart_package/Makefile` wraps Dart formatting.

## Build, Test, and Development Commands
- Run `npm ci` to install pinned tooling before regenerating assets.
- `make sync` cleans outputs, exports Tailwind config, minifies with `terser`, rebuilds CSS/JS, and triggers the Dart sync; run after any config or data change.
- `node scripts/generate-css.js` lets you iterate on CSS pruning without the full sync cycle.
- `make -C dart_package sync` refreshes `lib/tailwindcss_colors.dart` and applies `dart format`; use when only Dart colors change.
- Fetch Dart deps with `dart pub get` inside `dart_package`, then validate with `dart test`.

## Coding Style & Naming Conventions
- JavaScript follows 4-space indentation, double quotes, and semicolons as seen in `scripts/*.js`; stay consistent with existing patterns.
- Dart sources rely on `dart format`, which enforces the standard two-space indent; avoid manual alignment.
- CSS class names follow Tailwind’s dashed pattern (`bg-amber-500`, `hover:text-red-700`); align updates with `generate-css.js`.
- Treat files in `dist/`, `docs/`, and `dart_package/lib/` as generated artifacts and regenerate instead of hand-editing.

## Testing Guidelines
- Keep Dart tests under `dart_package/test/` with a `_test.dart` suffix and run them via `dart test`.
- Add a proper `npm test` target (e.g., `node --test`) once JS coverage exists, and run it alongside the Dart suite before publishing.
- Document manual checks (viewer smoke test, bundle size spot-check) in PRs until automated coverage is added.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages (`Upgrade to tailwindcss v4.1`, `Add dart package`) and keep subjects ≤72 chars.
- Reference issues in commit bodies (`Refs #123`) and call out regenerated artifacts.
- PRs should summarize the change, attach visuals when UI output shifts, and list verification commands (`make sync`, `dart test`).
- Version bumps in `package.json` or `dart_package/pubspec.yaml` work best in dedicated commits for traceable releases.
