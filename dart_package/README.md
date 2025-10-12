# Tailwind CSS Colors (Flutter)

[![Pub](https://img.shields.io/pub/v/tailwindcss_colors.svg)](https://pub.dev/packages/tailwindcss_colors)

This Flutter package exposes the Tailwind color palette as const `TWColor` values
and convenience opacity helpers.

The palette is generated from Tailwind CSS 4.1.14 using
`scripts/generate-dart-colors.js`.

**Preview Tailwind CSS colors**: https://tailwindcss.com/docs/colors.

## Usage

```dart
import 'package:tailwindcss_colors/tailwindcss_colors.dart';

final Color primary = TWColors.sky500;                // constant
final Color predefinedOpacity = TWColors.sky500.o90;  // opacity 90%
final Color customOpacity = TWColors.sky500.o(75);    // opacity 75%
```
