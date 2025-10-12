import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:tailwindcss_colors/tailwindcss_colors.dart';

void main() {
  test("Color opacity", () {
    const Color primary = TWColors.sky500;  // const Color
    final Color predefinedOpacity = TWColors.sky500.o100; // opacity 100%
    final Color customOpacity = TWColors.sky500.o(100); // opacity 100%

    expect(predefinedOpacity, customOpacity);
    print("value equals ${predefinedOpacity.value == customOpacity.value}");
  });
}
