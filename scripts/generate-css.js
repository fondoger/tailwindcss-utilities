
const config = require('../tcv-build/config.712db4de.json');
const fs = require('fs');
const path = require('path');

// modify the config file in place
for (const color in config.theme.accentColor) {
    if (typeof (config.theme.accentColor[color]) !== 'string' && !(['gray', 'red', 'green', 'amber', 'sky'].includes(color))) {
        for (const shade in config.theme.accentColor[color]) {
            delete config.theme.backgroundColor[`${color}-${shade}`];
            delete config.theme.borderColor[`${color}-${shade}`];
            delete config.theme.textColor[`${color}-${shade}`];
        }
        delete config.theme.accentColor[color];
    }
}
// Size (Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported)
for (const height of Object.keys(config.theme.height)) {
    if (['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'].indexOf(height) == -1) {
        delete config.theme.height[height];
        delete config.theme.width[height];
        delete config.theme.size[height];
        delete config.theme.minHeight[height];
        delete config.theme.maxHeight[height];
        delete config.theme.minWidth[height];
        delete config.theme.maxWidth[height];
    }
}
// Spacing (Only ['0', 'px', '1', '2', '4', '8', '16', '32'] are supported)
for (const size in config.theme.spacing) {
    if (!(['0', 'px', '1', '2', '4', '8', '16', '32'].includes(size))) {
        delete config.theme.spacing[size];
    }
}
// Responsive Design not supported
delete config.theme.screens;
// Transition not supported
delete config.theme.transitionTimingFunction;


fs.writeFileSync(path.join(__dirname, '../tcv-build/config.712db4de.json'), JSON.stringify(config, null, 4));

var css = '';
const allowedColors = ['gray', 'red', 'green', 'amber', 'sky'];

// 0.5 => 0\.5
function escapeDot(str) {
    return str.replace(/\./g, '\\.').replace('/', '\\/');
}

// Common presets
css += `*, ::after, ::before { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }\n`;

// Part 0: Limitations

// - Color Palette: Only ['gray', 'red', 'green', 'amber', 'sky'] are supported

// - Most numeric CSS values are not supported.

// - Responsive Design not supported

// - Dark Mode not supported

// - Hover, Focus and other states not supported


// Part 1: Layout

// - Aspect ratio
for (const ratio in config.theme.aspectRatio) {
    css += `.aspect-${escapeDot(ratio)} { aspect-ratio: ${config.theme.aspectRatio[ratio]}; }\n`;
}

// - Container
css += `.container { width: 100%; }\n`;
for (const size in config.theme.screens) {
    css += `@media (min-width: ${config.theme.screens[size]}) { .container { max-width: ${config.theme.screens[size]}; } }\n`;
}

// - Columns
for (const size in config.theme.columns) {
    css += `.columns-${size} { columns: ${config.theme.columns[size]}; }\n`;
}

// - Break After
for (const size of ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column']) {
    css += `.break-after-${size} { break-after: ${size}; }\n`;
}

// - Break Before
for (const size of ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column']) {
    css += `.break-before-${size} { break-before: ${size}; }\n`;
}

// - Break Inside
for (const size of ['auto', 'avoid', 'avoid-page', 'avoid-column']) {
    css += `.break-inside-${size} { break-inside: ${size}; }\n`;
}

// - Box Decoration Break
for (const size of ['slice', 'clone']) {
    css += `.decoration-break-${size} { box-decoration-break: ${size}; }\n`;
}

// - Box Sizing
for (const size of ['border-box', 'content-box']) {
    css += `.sizing-${size} { box-sizing: ${size}; }\n`;
}

// - Display
for (const size of
    ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'table', 'inline-table',
        'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group',
        'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid',
        'contents', 'list-item', 'hidden']) {
    if (size == 'hidden') {
        css += `.hidden { display: none; }\n`;
    } else {
        css += `.${size} { display: ${size}; }\n`;
    }
}

// - Floats
for (const size of ['start', 'end', 'left', 'right', 'none']) {
    if (size == 'start' || size == 'end') {
        css += `.float-${size} { float: inline-${size}; }\n`;
    } else {
        css += `.float-${size} { float: ${size}; }\n`;
    }
}

// - Clear
for (const size of ['start', 'end', 'left', 'right', 'both', 'none']) {
    if (size == 'start' || size == 'end') {
        css += `.clear-${size} { clear: inline-${size}; }\n`;
    } else {
        css += `.clear-${size} { clear: ${size}; }\n`;
    }
}

// - Isolation
for (const size of ['auto', 'isolate']) {
    if (size == 'isolate') {
        css += `.isolate { isolation: isolate; }\n`;
    } else {
        css += `.isolation-${size} { isolation: ${size}; }\n`;
    }
}

// - Object Fit
for (const size of ['fill', 'contain', 'cover', 'none', 'scale-down']) {
    css += `.object-${size} { object-fit: ${size}; }\n`;
}

// - Object Position
for (const size of ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top']) {
    css += `.object-${size} { object-position: ${size.replace('-', ' ')}; }\n`;
}

// - Overflow
for (const size of ['auto', 'hidden', 'clip', 'scroll', 'visible']) {
    css += `.overflow-${size} { overflow: ${size}; }\n`;
    css += `.overflow-x-${size} { overflow-x: ${size}; }\n`;
    css += `.overflow-y-${size} { overflow-y: ${size}; }\n`;
}

// - Overscroll Behavior
for (const size of ['auto', 'contain', 'none']) {
    css += `.overscroll-${size} { overscroll-behavior: ${size}; }\n`;
    css += `.overscroll-x-${size} { overscroll-behavior-x: ${size}; }\n`;
    css += `.overscroll-y-${size} { overscroll-behavior-y: ${size}; }\n`;
}

// - Position
for (const size of ['static', 'fixed', 'absolute', 'relative', 'sticky']) {
    css += `.${size} { position: ${size}; }\n`;
}

// - Top, Right, Bottom, Left: Not Support

// - Visibility
for (const size of ['visible', 'hidden', 'collapse']) {
    css += `.${size} { visibility: ${size}; }\n`;
}

// - Z Index
for (const size in config.theme.zIndex) {
    css += `.z-${size} { z-index: ${config.theme.zIndex[size]}; }\n`;
}


// Part 2: Flexbox & Grid

// - Flex Direction
for (const [k, v] of Object.entries({
    'row': 'row',
    'row-reverse': 'row-reverse',
    'col': 'column',
    'col-reverse': 'column-reverse'
})) {
    css += `.flex-${k} { flex-direction: ${v}; }\n`;
}

// - Flex Wrap
for (const size of ['wrap', 'wrap-reverse', 'nowrap']) {
    css += `.flex-${size} { flex-wrap: ${size}; }\n`;
}

// - Flex
for (const size in config.theme.flex) {
    css += `.flex-${size} { flex: ${config.theme.flex[size]}; }\n`;
}

// - Flex Grow
for (const size in config.theme.flexGrow) {
    if (size == 'DEFAULT') {
        css += `.grow { flex-grow: ${config.theme.flexGrow[size]}; }\n`;
    } else {
        css += `.grow-${size} { flex-grow: ${config.theme.flexGrow[size]}; }\n`;
    }
}

// - Flex Shrink
for (const size in config.theme.flexShrink) {
    if (size == 'DEFAULT') {
        css += `.shrink { flex-shrink: ${config.theme.flexShrink[size]}; }\n`;
    } else {
        css += `.shrink-${size} { flex-shrink: ${config.theme.flexShrink[size]}; }\n`;
    }
}

// - Flex Order: NOT SUPPORTED!

// - Grid Template Columns
for (const size in config.theme.gridTemplateColumns) {
    css += `.grid-cols-${size} { grid-template-columns: ${config.theme.gridTemplateColumns[size]}; }\n`;
}

// - Grid Column Span
for (const size in config.theme.gridColumn) {
    css += `.col-${size} { grid-column: ${config.theme.gridColumn[size]}; }\n`;
}

// - Grid Template Rows
for (const size in config.theme.gridTemplateRows) {
    css += `.grid-rows-${size} { grid-template-rows: ${config.theme.gridTemplateRows[size]}; }\n`;
}

// - Grid Row Span
for (const size in config.theme.gridRow) {
    css += `.row-${size} { grid-row: ${config.theme.gridRow[size]}; }\n`;
}

// - Grid Auto Flow
for (const size of ['row', 'col', 'dense', 'row-dense', 'col-dense']) {
    css += `.grid-flow-${size} { grid-auto-flow: ${size.replace('-', ' ')}; }\n`;
}

// - Grid Auto Columns
for (const size in config.theme.gridAutoColumns) {
    css += `.auto-cols-${size} { grid-auto-columns: ${config.theme.gridAutoColumns[size]}; }\n`;
}

// - Grid Auto Rows
for (const size in config.theme.gridAutoRows) {
    css += `.auto-rows-${size} { grid-auto-rows: ${config.theme.gridAutoRows[size]}; }\n`;
}

// - Gap: (Only ['0', 'px', '1', '2', '4', '8', '16', '32'] are supported)
for (const size in config.theme.gap) {
    if (['0', 'px', '1', '2', '4', '8', '16', '32'].indexOf(size) == -1) {
        continue;
    }
    css += `.gap-${escapeDot(size)} { gap: ${config.theme.gap[size]}; }\n`;
}


// - Justify Content
for (const size of ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch']) {
    if (size in ['start', 'end']) {
        css += `.justify-${size} { justify-content: flex-${size}; }\n`;
    } else if (size in ['between', 'around', 'evenly']) {
        css += `.justify-${size} { justify-content: space-${size}; }\n`;
    } else {
        css += `.justify-${size} { justify-content: ${size}; }\n`;
    }
}

// - Justify Items
for (const size of ['start', 'end', 'center', 'stretch']) {
    css += `.justify-items-${size} { justify-items: ${size}; }\n`;
}

// - Justify Self
for (const size of ['auto', 'start', 'end', 'center', 'stretch']) {
    css += `.justify-self-${size} { justify-self: ${size}; }\n`;
}

// - Align Content
for (const size of ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'baseline', 'stretch']) {
    if (size in ['start', 'end']) {
        css += `.content-${size} { align-content: flex-${size}; }\n`;
    } else if (size in ['between', 'around', 'evenly']) {
        css += `.content-${size} { align-content: space-${size}; }\n`;
    } else {
        css += `.content-${size} { align-content: ${size}; }\n`;
    }
}

// - Align Items
for (const size of ['start', 'end', 'center', 'baseline', 'stretch']) {
    if (size in ['start', 'end']) {
        css += `.items-${size} { align-items: flex-${size}; }\n`;
    } else {
        css += `.items-${size} { align-items: ${size}; }\n`;
    }
}

// - Align Self
for (const size of ['auto', 'start', 'end', 'center', 'baseline', 'stretch']) {
    if (size in ['start', 'end']) {
        css += `.self-${size} { align-self: flex-${size}; }\n`;
    } else {
        css += `.self-${size} { align-self: ${size}; }\n`;
    }
}

// - Place Content
for (const size of ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch']) {
    if (size in ['between', 'around', 'evenly']) {
        css += `.place-content-${size} { place-content: space-${size}; }\n`;
    } else {
        css += `.place-content-${size} { place-content: ${size}; }\n`;
    }
}

// - Place Items 
for (const size of ['start', 'end', 'center', 'stretch']) {
    css += `.place-items-${size} { place-items: ${size}; }\n`;
}

// - Place Self
for (const size of ['auto', 'start', 'end', 'center', 'stretch']) {
    css += `.place-self-${size} { place-self: ${size}; }\n`;
}

// Part 3: Spacing

// - Margin & Padding 
// (Only ['0', 'px', '1', '2', '4', '8', '16', '32'] are supported)
for (const prefix of ['p', 'm', '-m']) {
    for (const dir of ['', 't', 'r', 'b', 'l']) {
        for (const size in config.theme.spacing) {
            if (['0', 'px', '1', '2', '4', '8', '16', '32'].indexOf(size) == -1) {
                continue;
            }
            const css1 = prefix == 'p' ? 'padding' : 'margin';
            const css2 = {
                '': '',
                't': '-top',
                'r': '-right',
                'b': '-bottom',
                'l': '-left'
            }[dir];
            css += `.${prefix}${dir}-${escapeDot(size)} { ${css1}${css2}: ${config.theme.spacing[size]}; }\n`;
        }
    }
    for (const dir of ['x', 'y']) {
        for (const size in config.theme.spacing) {
            if (['0', 'px', '1', '2', '4', '8', '16', '32'].indexOf(size) == -1) {
                continue;
            }
            const css1 = prefix == 'p' ? 'padding' : 'margin';
            const a = dir == 'x' ? 'left' : 'top';
            const b = dir == 'x' ? 'right' : 'bottom';
            css += `.${prefix}${dir}-${escapeDot(size)} { ${css1}-${a}: ${config.theme.spacing[size]}; ${css1}-${b}: ${config.theme.spacing[size]}; }\n`;
        }
    }
    for (const dir of ['s', 'e']) {
        for (const size in config.theme.spacing) {
            if (['0', 'px', '1', '2', '4', '8', '16', '32'].indexOf(size) == -1) {
                continue;
            }
            const css1 = prefix == 'p' ? 'padding' : 'margin';
            const css2 = dir == 's' ? 'inline-start' : 'inline-end';
            css += `.${prefix}${dir}-${escapeDot(size)} { ${css1}-${css2}: ${config.theme.spacing[size]}; }\n`;
        }
    }
}

// - Width(+min/max): Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported
for (const size in config.theme.width) {
    if (['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'].indexOf(size) == -1) {
        continue;
    }
    css += `.w-${escapeDot(size)} { width: ${config.theme.width[size]}; }\n`;
    css += `.min-w-${escapeDot(size)} { min-width: ${config.theme.width[size]}; }\n`;
    css += `.max-w-${escapeDot(size)} { max-width: ${config.theme.width[size]}; }\n`;
}

// - Height(+min/max): Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported
for (const size in config.theme.height) {
    if (['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'].indexOf(size) == -1) {
        continue;
    }
    css += `.h-${escapeDot(size)} { height: ${config.theme.height[size]}; }\n`;
    css += `.min-h-${escapeDot(size)} { min-height: ${config.theme.height[size]}; }\n`;
    css += `.max-h-${escapeDot(size)} { max-height: ${config.theme.height[size]}; }\n`;
}


// - Size(+min/max): Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported
for (const size in config.theme.size) {
    if (['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'].indexOf(size) == -1) {
        continue;
    }
    css += `.size-${escapeDot(size)} { width: ${config.theme.size[size]}; height: ${config.theme.size[size]}; }\n`;
    css += `.min-size-${escapeDot(size)} { min-width: ${config.theme.size[size]}; min-height: ${config.theme.size[size]}; }\n`;
    css += `.max-size-${escapeDot(size)} { max-width: ${config.theme.size[size]}; max-height: ${config.theme.size[size]}; }\n`;
}

// Part 4: Typography

// - Font Family
for (const family in config.theme.fontFamily) {
    css += `.font-${family} { font-family: ${config.theme.fontFamily[family].join(', ')}; }\n`;
}

// - Font Size
for (const size in config.theme.fontSize) {
    css += `.text-${size} { font-size: ${config.theme.fontSize[size][0]}; line-height: ${config.theme.fontSize[size][1]['lineHeight']}; }\n`;
}

// - Font Smoothing:
css += `.antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n`;
css += `.subpixel-antialiased { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }\n`;

// - Font Style
for (const size of ['normal', 'italic']) {
    if (size == 'normal') {
        css += `.not-italic { font-style: normal; }\n`;
    } else {
        css += `.italic { font-style: ${size}; }\n`;
    }
}

// - Font Weight
for (const weight in config.theme.fontWeight) {
    css += `.font-${weight} { font-weight: ${config.theme.fontWeight[weight]}; }\n`;
}

// - Font Variant Numeric:
for (const size of ['normal-nums', 'ordinal', 'slashed-zero', 'lining-nums', 'oldstyle-nums', 'proportional-nums', 'tabular-nums', 'diagonal-fractions', 'stacked-fractions']) {
    css += `.${size} { font-variant-numeric: ${size}; }\n`;
}

// - Letter Spacing
for (const size in config.theme.letterSpacing) {
    css += `.tracking-${size} { letter-spacing: ${config.theme.letterSpacing[size]}; }\n`;
}

// - Line Clamping:
for (const size in config.theme.lineClamp) {
    css += `.line-clamp-${size} { overflow: hidden; display: -webkit-box; -webkit-line-clamp: ${size}; -webkit-box-orient: vertical; }\n`;
}
css += `.line-clamp-none { overflow: visible; display: block; -webkit-line-clamp: initial; -webkit-box-orient: horizontal; }\n`;

// - Line Height:
for (const size in config.theme.lineHeight) {
    css += `.leading-${size} { line-height: ${config.theme.lineHeight[size]}; }\n`;
}

// - List Style Image: NOT SUPPORTED!

// - List Style Position
for (const size of ['inside', 'outside']) {
    css += `.list-${size} { list-style-position: ${size}; }\n`;
}

// - List Style Type
for (const size of ['none', 'disc', 'decimal']) {
    css += `.list-${size} { list-style-type: ${size}; }\n`;
}

// - Text Align
for (const size of ['left', 'center', 'right', 'justify', 'start', 'end']) {
    css += `.text-${size} { text-align: ${size}; }\n`;
}

// - Text Color: Only ['gray', 'red', 'green', 'amber', 'sky'] are supported
for (const color in config.theme.textColor) {
    if (typeof (config.theme.textColor[color]) === 'string') {
        css += `.text-${color} { color: ${config.theme.textColor[color]}; }\n`;
    } else {
        if (allowedColors.indexOf(color) == -1) {
            continue;
        }
        for (const shade in config.theme.textColor[color]) {
            css += `.text-${color}-${shade} { color: ${config.theme.textColor[color][shade]}; }\n`;
        }
    }
}

// - Text Decoration
for (const size of ['no-underline', 'underline', 'line-through', 'overline']) {
    if (size == 'no-underline') {
        css += `.no-underline { text-decoration: none; }\n`;
    } else {
        css += `.${size} { text-decoration: ${size}; }\n`;
    }
}
// - Text Decoration Color
for (const size in config.theme.textDecorationColor) {
    if (typeof (config.theme.textDecorationColor[size]) === 'string') {
        css += `.decoration-${size} { text-decoration-color: ${config.theme.textDecorationColor[size]}; }\n`;
    } else {
        if (allowedColors.indexOf(size) == -1) {
            continue;
        }
        for (const shade in config.theme.textDecorationColor[size]) {
            css += `.decoration-${size}-${shade} { text-decoration-color: ${config.theme.textDecorationColor[size][shade]}; }\n`;
        }
    }
}

// - Text Decoration Style
for (const size of ['solid', 'double', 'dotted', 'dashed', 'wavy']) {
    css += `.decoration-${size} { text-decoration-style: ${size}; }\n`;
}

// - Text Decoratio Thickness
for (const size in config.theme.textDecorationThickness) {
    css += `.decoration-${size} { text-decoration-thickness: ${config.theme.textDecorationThickness[size]}; }\n`;
}

// - Text Underline Offset
for (const size in config.theme.textUnderlineOffset) {
    css += `.underline-offset-${size} { text-underline-offset: ${config.theme.textUnderlineOffset[size]}; }\n`;
}

// - Text Transform
for (const size of ['uppercase', 'lowercase', 'capitalize', 'normal']) {
    if (size == 'normal') {
        css += `.normal-case { text-transform: none; }\n`;
    } else {
        css += `.${size} { text-transform: ${size}; }\n`;
    }
}

// - Text Overflow
for (const size of ['truncate', 'ellipsis', 'clip']) {
    if (size == 'truncate') {
        css += `.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n`;
    } else {
        css += `.text-${size} { text-overflow: ${size}; }\n`;
    }
}

// - Text Wrap
for (const size of ['wrap', 'nowrap', 'balance', 'pretty']) {
    css += `.text-${size} { text-wrap: ${size}; }\n`;
}

// - Text Indent: NOT SUPPORTED!

// - Text Align
for (const size of ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super']) {
    css += `.align-${size} { vertical-align: ${size}; }\n`;
}

// - Whitespace
for (const size of ['normal', 'no-wrap', 'pre', 'pre-line', 'pre-wrap']) {
    css += `.whitespace-${size} { white-space: ${size}; }\n`;
}

// - Word Break
for (const size of ['normal', 'words', 'all', 'keep']) {
    if (size == 'normal') {
        css += `.break-normal { word-break: normal; overflow-wrap: normal; }\n`;
    } else if (size == 'keep') {
        css += `.break-keep { word-break: keep-all; }\n`;
    } else {
        css += `.break-${size} { word-break: break-${size}; }\n`;
    }
}

// - Hyphens
for (const size of ['none', 'manual', 'auto']) {
    css += `.hyphen-${size} { hyphens: ${size}; }\n`;
}

// - Before/After Content: NOT SUPPORTED!

// Part 5: Backgrounds

// - Background Color
for (const color in config.theme.accentColor) {
    if (typeof (config.theme.accentColor[color]) === 'string') {
        css += `.bg-${color} { background-color: ${config.theme.accentColor[color]}; }\n`;
    } else {
        if (allowedColors.indexOf(color) == -1) {
            continue;
        }
        for (const shade in config.theme.accentColor[color]) {
            css += `.bg-${color}-${shade} { background-color: ${config.theme.accentColor[color][shade]}; }\n`;
        }
    }
}

// - Other Background Properties: NOT SUPPORTED!

// Part 6: Borders

// - Border Radius

for (const size in config.theme.borderRadius) {
    suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.rounded${suffix} { border-radius: ${config.theme.borderRadius[size]}; }\n`;
}

// - Border Width: Only `.border` is supported
css += `.border { border-width: 1px; }\n`;

// - Border Color
for (const color in config.theme.accentColor) {
    if (typeof (config.theme.accentColor[color]) === 'string') {
        css += `.border-${color} { border-color: ${config.theme.accentColor[color]}; }\n`;
    } else {
        if (allowedColors.indexOf(color) == -1) {
            continue;
        }
        for (const shade in config.theme.accentColor[color]) {
            css += `.border-${color}-${shade} { border-color: ${config.theme.accentColor[color][shade]}; }\n`;
        }
    }
}

// - Border Style
for (const size of ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none']) {
    css += `.border-${size} { border-style: ${size}; }\n`;
}

// - Divide (Only `.divide-x` and `.divide-y` are supported)
css += `.divide-x>:not([hidden])~:not([hidden]) { border-left-width: 1px; }\n`;
css += `.divide-y>:not([hidden])~:not([hidden]) { border-top-width: 1px; }\n`;

// - Outline: NOT SUPPORTED!

// - Ring: NOT SUPPORTED!

// Part 7: Effects

// - Box Shadow (Color not supported)
for (const size in config.theme.boxShadow) {
    suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.shadow${suffix} { box-shadow: ${config.theme.boxShadow[size]}; }\n`;
}

// - Opacity
for (const size in config.theme.opacity) {
    css += `.opacity-${size} { opacity: ${config.theme.opacity[size]}; }\n`;
}

// - Mix Blend Mode: NOT SUPPORTED!

// - Background Blend Mode: NOT SUPPORTED!

// Part 8: Filters

// - Blur
for (const size in config.theme.blur) {
    const suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.blur${suffix} { filter: blur(${config.theme.blur[size]}); }\n`;
}

// - Brightness
for (const size in config.theme.brightness) {
    const suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.brightness${suffix} { filter: brightness(${config.theme.brightness[size]}); }\n`;
}

// - Drop Shadow
for (const size in config.theme.dropShadow) {
    const suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.drop-shadow${suffix} { filter: drop-shadow(${config.theme.dropShadow[size]}); }\n`;
}

// - Grayscale
for (const size in config.theme.grayscale) {
    const suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.grayscale${suffix} { filter: grayscale(${config.theme.grayscale[size]}); }\n`;
}

// - Backdrop Blur
for (const size in config.theme.backdropBlur) {
    const suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.backdrop-blur${suffix} { backdrop-filter: blur(${config.theme.backdropBlur[size]}); }\n`;
}

// - Other Filters: NOT SUPPORTED!

// Part 9: Tables

// - Table Border Collapse
for (const size of ['separate', 'collapse']) {
    css += `.border-${size} { border-collapse: ${size}; }\n`;
}

// - Table Border Spacing: NOT SUPPORTED!

// - Table Layout
for (const size of ['auto', 'fixed']) {
    css += `.table-${size} { table-layout: ${size}; }\n`;
}

// - Table Caption Side
for (const size of ['top', 'bottom']) {
    css += `.caption-${size} { caption-side: ${size}; }\n`;
}

// Part 10: Transition/Animation

// - Animation:
for (const size in config.theme.animation) {
    css += `.animate-${size} { animation: ${config.theme.animation[size]}; }\n`;
}

// - Other Transitions: NOT SUPPORTED!

// Part 11: Transforms

// - All Transforms: NOT SUPPORTED!

// Part 12: Interactivity

// - Accent Color

for (const color in config.theme.accentColor) {
    if (typeof (config.theme.accentColor[color]) === 'string') {
        css += `.accent-${color} { accent-color: ${config.theme.accentColor[color]}; }\n`;
    } else {
        if (allowedColors.indexOf(color) == -1) {
            continue;
        }
        for (const shade in config.theme.accentColor[color]) {
            css += `.accent-${color}-${shade} { accent-color: ${config.theme.accentColor[color][shade]}; }\n`;
        }
    }
}

// - Appearance
for (const size of ['none', 'auto']) {
    css += `.appearance-${size} { appearance: ${size}; }\n`;
}

// - Cursor (Only ['auto', 'default', 'pointer', 'wait', 'text'] are supported)
for (const size in config.theme.cursor) {
    if (['auto', 'default', 'pointer', 'wait', 'text'].indexOf(size) == -1) {
        continue;
    }
    css += `.cursor-${size} { cursor: ${config.theme.cursor[size]}; }\n`;
}

// - Caret Color: NOT SUPPORTED!

// - Pointer Events
for (const size of ['auto', 'none']) {
    css += `.pointer-${size} { pointer-events: ${size}; }\n`;
}

// - Resize
css += `.resize-none { resize: none; }\n`;
css += `.resize-x { resize: horizontal; }\n`;
css += `.resize-y { resize: vertical; }\n`;
css += `.resize { resize: both; }\n`;

// - All Other Interactivity: NOT SUPPORTED!

// Part 13: SVG

// - All SVG: NOT SUPPORTED!

// Part 14: Accessibility

// - All Accessibility: NOT SUPPORTED!

// Part 15: Plugins

// - All Plugins: NOT SUPPORTED!


/*

// - Colors (Text, Background, Border)
// (Only ['gray', 'red', 'skye', 'blue'] are supported)
for (const prefix of ['bg', 'text', 'border']) {
    for (const color in config.theme.accentColor) {
        if (['gray', 'red', 'green', 'blue'].indexOf(color) == -1) {
            continue;
        }
        if (typeof (config.theme.accentColor[color]) === 'string') {
            css += `.${prefix}-${color} { background-color: ${config.theme.accentColor[color]}; }\n`;
        } else {
            for (const shade in config.theme.accentColor[color]) {
                css += `.${prefix}-${color}-${shade} { background-color: ${config.theme.accentColor[color][shade]}; }\n`;
            }
        }
    }
}

/*


// - Font size
for (const size in config.theme.fontSize) {
    css += `.text-${size} { font-size: ${config.theme.fontSize[size][0]}; line-height: ${config.theme.fontSize[size][1]}; }\n`;
}

// - Font family
for (const family in config.theme.fontFamily) {
    css += `.font-${family} { font-family: ${config.theme.fontFamily[family]}; }\n`;
}

// - Font weight
for (const weight in config.theme.fontWeight) {
    css += `.font-${weight} { font-weight: ${config.theme.fontWeight[weight]}; }\n`;
}

// - Letter spacing
for (const size in config.theme.letterSpacing) {
    css += `.tracking-${size} { letter-spacing: ${config.theme.letterSpacing[size]}; }\n`;
}

// - Line height
for (const size in config.theme.lineHeight) {
    css += `.leading-${size} { line-height: ${config.theme.lineHeight[size]}; }\n`;
}

// - Shadows
for (const size in config.theme.boxShadow) {
    suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.shadow${suffix} { box-shadow: ${config.theme.boxShadow[size]}; }\n`;
}

// Opacity
for (const size in config.theme.opacity) {
    css += `.opacity-${size} { opacity: ${config.theme.opacity[size]}; }\n`;
}

// Border radius
for (const size in config.theme.borderRadius) {
    suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.rounded${suffix} { border-radius: ${config.theme.borderRadius[size]}; }\n`;
}

// Border width
for (const size in config.theme.borderWidth) {
    suffix = size == 'DEFAULT' ? '' : `-${size}`;
    css += `.border${suffix} { border-width: ${config.theme.borderWidth[size]}; }\n`;
}

// Min width
for (const size in config.theme.minWidth) {
    css += `.min-w-${escapeDot(size)} { min-width: ${config.theme.minWidth[size]}; }\n`;
}

// Width
for (const size in config.theme.width) {
    css += `.w-${escapeDot(size)} { width: ${config.theme.width[size]}; }\n`;
}

// Max width
for (const size in config.theme.maxWidth) {
    css += `.max-w-${escapeDot(size)} { max-width: ${config.theme.maxWidth[size]}; }\n`;
}

// Height
for (const size in config.theme.height) {
    css += `.h-${escapeDot(size)} { height: ${config.theme.height[size]}; }\n`;
}

// Max height
for (const size in config.theme.maxHeight) {
    css += `.max-h-${escapeDot(size)} { max-height: ${config.theme.maxHeight[size]}; }\n`;
}

// Min height
for (const size in config.theme.minHeight) {
    css += `.min-h-${escapeDot(size)} { min-height: ${config.theme.minHeight[size]}; }\n`;
}
*/

// write css to file
fs.writeFileSync(path.join(__dirname, '../dist/tailwind-utilities.css'), css);
var CleanCSS = require('clean-css');
var output = new CleanCSS({
    level: 2, // Most aggressive level
}).minify(css);
fs.writeFileSync(path.join(__dirname, '../dist/tailwind-utilities.min.css'), output.styles);