#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const outputPath = path.join(repoRoot, "dart_package", "lib", "tailwindcss_colors.dart");

const SPECIAL_COLOR_VALUES = {
    transparent: "00000000",
};

const OPACITY_STEPS = Array.from({ length: 11 }, (_, index) => index * 10);

function findConfigFile(dir) {
    const candidates = fs.readdirSync(dir).filter((file) => /^config\..+\.json$/.test(file));
    if (candidates.length === 0) {
        throw new Error(`No Tailwind config JSON found in ${dir}`);
    }
    candidates.sort();
    return path.join(dir, candidates[candidates.length - 1]);
}

function normalizeHex(hex) {
    const value = hex.slice(1);
    if (value.length === 3) {
        return value.split("").map((char) => char + char).join("").toUpperCase();
    }
    return value.toUpperCase();
}

function resolveColorValue(value) {
    const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (hexPattern.test(value)) {
        const rgb = normalizeHex(value);
        return { argb: `FF${rgb}`, rgb };
    }

    if (Object.prototype.hasOwnProperty.call(SPECIAL_COLOR_VALUES, value)) {
        const argb = SPECIAL_COLOR_VALUES[value].toUpperCase();
        return { argb, rgb: argb.slice(2).padStart(6, "0") };
    }

    return null;
}

function toIdentifier(token) {
    const identifier = token.replace(/[^a-zA-Z0-9]/g, "");
    if (!identifier) {
        throw new Error(`Unable to build identifier for token: ${token}`);
    }
    if (/^[0-9]/.test(identifier)) {
        return `c${identifier}`;
    }
    return identifier;
}

function buildSortKey(token) {
    const hyphenMatch = token.match(/^([a-z0-9]+)-(\d+)$/i);
    if (hyphenMatch) {
        return {
            group: hyphenMatch[1],
            weight: Number(hyphenMatch[2]),
            token,
        };
    }
    return { group: token, weight: Number.POSITIVE_INFINITY, token };
}

function compareEntries(a, b) {
    const keyA = buildSortKey(a.token);
    const keyB = buildSortKey(b.token);
    const groupCompare = keyA.group.localeCompare(keyB.group);
    if (groupCompare !== 0) {
        return groupCompare;
    }
    if (keyA.weight !== keyB.weight) {
        return keyA.weight - keyB.weight;
    }
    return keyA.token.localeCompare(keyB.token);
}

function buildOpacityLiteral(rgb, percentage) {
    const alpha = Math.round((percentage / 100) * 255);
    const alphaHex = alpha.toString(16).toUpperCase().padStart(2, "0");
    return `0x${alphaHex}${rgb}`;
}

(function generate() {
    const configPath = findConfigFile(docsDir);
    const raw = fs.readFileSync(configPath, "utf8");
    const config = JSON.parse(raw);
    const colors = config?.theme?.colors;

    if (!colors || typeof colors !== "object") {
        throw new Error("Invalid config: expected theme.colors to be an object");
    }

    const entries = [];
    for (const [token, value] of Object.entries(colors)) {
        if (typeof value !== "string") {
            continue;
        }

        const resolved = resolveColorValue(value);
        if (!resolved) {
            continue;
        }

        entries.push({
            token,
            name: toIdentifier(token),
            argb: resolved.argb.padStart(8, "0"),
            rgb: resolved.rgb.padStart(6, "0"),
        });
    }

    entries.sort(compareEntries);

    const header = "// GENERATED CODE - DO NOT MODIFY BY HAND\n" +
        "// Run `make sync` in the repository root to regenerate.\n\n";

    const importLine = "import 'package:flutter/material.dart';\n\n";

    const twColorClass = [
        "class TWColor extends Color {",
        "  const TWColor(super.value, this.o0, this.o10, this.o20, this.o30,",
        "      this.o40, this.o50, this.o60, this.o70, this.o80, this.o90, this.o100);",
        "",
        "  final Color o0;",
        "  final Color o10;",
        "  final Color o20;",
        "  final Color o30;",
        "  final Color o40;",
        "  final Color o50;",
        "  final Color o60;",
        "  final Color o70;",
        "  final Color o80;",
        "  final Color o90;",
        "  final Color o100;",
        "}",
        "",
        "extension TWColorExt on TWColor {",
        "  /// opacity percentage 0..100",
        "  Color o(int opacityPercentage) {",
        "    final alpha = ((opacityPercentage * 255) / 100).round();",
        "    return withAlpha(alpha);",
        "  }",
        "}",
        "",
    ].join("\n");

    const lines = ["class TWColors {", "  const TWColors._();", ""];

    for (const entry of entries) {
        lines.push(`  static const TWColor ${entry.name} = TWColor(`);
        lines.push(`    0x${entry.argb},`);
        for (const step of OPACITY_STEPS) {
            lines.push(`    const Color(${buildOpacityLiteral(entry.rgb, step)}),`);
        }
        lines.push("  );");
        lines.push("");
    }

    if (lines[lines.length - 1] === "") {
        lines.pop();
    }
    lines.push("}");

    const content = header + importLine + twColorClass + lines.join("\n") + "\n";
    fs.writeFileSync(outputPath, content);
})();
