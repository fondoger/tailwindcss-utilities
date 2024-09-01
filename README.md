# Tailwindcss Utilities

[![npm version](https://img.shields.io/npm/v/tailwindcss-utilities?logo=npm&logoColor=fff)](https://www.npmjs.com/package/tailwindcss-utilities)
[![npm Downloads](https://img.shields.io/npm/dm/tailwindcss-utilities.svg?logo=npm&logoColor=fff)](https://npmcharts.com/compare/tailwindcss-utilities?minimal=true)


A pure CSS static file which contains set of CSS Utility classes generated from TailwindCSS. It should be more performant than the JIT version TailwindCSS PlayCDN. Suitable for old-style plain HTML developers.

If you're looking for a full functional version, please refer to the [Official PlayCDN](https://tailwindcss.com/docs/installation/play-cdn) or [jsDelivr/UNPKG/Npmirror CDN](https://github.com/fondoger/tailwindcss-cdn), which is an in-browser JIT compiler.

**Live Preview**: [TailwindCSS Viewer](https://fondoger.github.io/tailwindcss-utilities)

**Usage**

```html
<!-- From UNPKG -->
<link href="https://unpkg.com/tailwindcss-utilities@1.0.9/dist/tailwind-utilities.min.css" rel="stylesheet" crossorigin />
<script src="https://unpkg.com/tailwindcss-utilities@1.0.9/dist/tailwind-utilities.min.js" defer ></script>

<!-- From jsDelivr -->
<link href="https://cdn.jsdelivr.net/npm/tailwindcss-utilities@1.0.9/dist/tailwind-utilities.min.css" rel="stylesheet" crossorigin crossorigin />
<script src="https://cdn.jsdelivr.net/npm/tailwindcss-utilities@1.0.9/dist/tailwind-utilities.min.js" defer></script>

<!-- From Taobao npmmirror (option 3, for China users) -->
<link href="https://registry.npmmirror.com/tailwindcss-utilities/1.0.7/files/dist/tailwindcss-utilities-min.css" rel="stylesheet" crossorigin  />
<script src="https://registry.npmmirror.com/tailwindcss-utilities/1.0.7/files/dist/tailwindcss-utilities-min.js" defer ></script>
```

> **_NOTE:_**  If you don't need dark mode and Hover/Focus/Active pseudo classes, you can remove the `<script>` tag. And `crossorigin` of `link` tag must be added if you add the JS script.


## Part 0: Limitations

- Color Palette: Only ['gray', 'red', 'green', 'amber', 'sky'] are supported

- Arbitrary values not supported. (eg: `w-[100px]`)

- Most numeric CSS values are not supported. (eg: `w-0.5`)

- Responsive Design not supported

## Part 1: Layout

- Aspect ratio
    ```css
    .aspect-auto, .aspect-square, .aspect-video
    ```

- Container
    ```css
    .container
    ```

- Columns
    ```css
    .columns-auto, .columns-1, .columns-2, .columns-3, ...
    ```

- Break After
    ```css
    .break-after-avoid, .break-after-column, .break-after-page, ...
    ```

- Break Before
    ```css
    .break-before-avoid, .break-before-column, .break-before-page, ...
    ```

- Break Inside
    ```css
    .break-inside-avoid, .break-inside-column, .break-inside-page, ...
    ```

- Box Decoration Break
    ```css
    .decoration-break-slice, .decoration-break-clone
    ```

- Box Sizing
    ```css
    .sizing-border-box, .sizing-contet-box
    ```

- Display
    ```css
    .hidden, .block, .inline, .inline-block, .flex, .table, .grid, ...
    ```


- Floats
    ```css
    .float-none, .float-left, .left-end, ...
    ```

- Clear
    ```css
    .clear-start, .clear-left, .clear-end, ...
    ```

- Isolation
    ```css
    .isolate, .isolation-auto
    ```

- Object Fit
    ```css
    .object-fill, .object-contain, .object-cover, ...
    ```

- Object Position
    ```css
    .object-left, .object-right-bottom, ...
    ```

- Overflow
    ```css
    .overflow-hidden, .overflow-x-scroll, .overflow-y-visible, ...
    ```

- Overscroll Behavior
    ```css
    .overscroll-auto, .overscroll-x-none, .overscroll-y-contain, ...
    ```

- Position
    ```css
    .static, .fixed, .absolute, .relative, .sticky
    ```

- Position Top, Right, Bottom, Left: (Only ['0', '1', '2', '4', '8', '16', '32'] are supported)
    ```css
    .top-0, .top-1, .top-2, .top-4, .top-8, .top-16, .top-32
    .right-0, .bottom-0, .left-0, .inset-0
    ```

- Visibility
    ```css
    .visible, .invisible, .collapse
    ```

- Z Index
    ```css
    .z-0, .z-10, .z-20, ..., .z-50, .z-auto
    ```


## Part 2: Flexbox & Grid

- Flex Basis
    ```css
    NUMERIC CSS NOT AVAILABLE (eg: basis-0, ...)
    ```

- Flex Direction
    ```css
    .flex-row, .flex-row-reverse, .flex-col, .flex-col-reverse
    ```

- Flex Wrap
    ```css
    .flex-wrap, .flex-wrap-reverse, .flex-nowrap
    ```

- Flex
    ```css
    .flex-1, .flex-auto, .flex-initial, .flext-none
    ```

- Flex Grow
    ```css
    .grow, .grow-0
    ```

- Flex Shrink
    ```css
    .shrink, .shrink-0
    ```

- Flex Order: NOT SUPPORTED!
    ```css
    NUMERIC CSS NOT AVAILABLE (eg: .order-1, .order-first)
    ```

- Grid Template Columns
    ```css
    .grid-cols-1, .grid-cols-2, .grid-cols-3, ..., .grid-cols-12, ...
    ```

- Grid Column Span
    ```css
    .col-auto, .col-span-full, .col-span-1, .col-span-2, ..., .col-span-12
    ```

- Grid Template Rows
    ```css
    .grid-rows-1, .grid-rows-2, .grid-rows-3, ..., .grid-rows-12, ...
    ```

- Grid Row Span
    ```css
    .row-auto, .row-span-full, .row-span-1, .row-span-2, ..., .row-span-12
    ```

- Grid Auto Flow
    ```css
    .grid-flow-row, .grid-flow-col, ...
    ```

- Grid Auto Columns
    ```css
    .auto-cols-auto, .auto-cols-min, .auto-cols-max, .auto-cols-fr
    ```

- Grid Auto Rows
    ```css
    .auto-rows-auto, .auto-rows-min, .auto-rows-max, .auto-rows-fr
    ```

- Gap: (Only ['0', 'px', '1', '2', '4', '8', '16', '32'] are supported)
    ```css
    .gap-0, .gap-px, .gap-1, .gap-2, .gap-4, .gap-8, .gap-16, .gap-32
    ```


- Justify Content
    ```css
    .justify-center, .justify-start, .justify-evenly, ...
    ```

- Justify Items
    ```css
    .justify-items-start, .justify-items-center, ...
    ```

- Justify Self
    ```css
    .justify-self-start, .justify-self-center, ...
    ```

- Align Content
    ```css
    .content-start, .content-center, .content-evenly, ...
    ```

- Align Items
    ```css
    .items-start, .items-center, ...
    ```

- Align Self
    ```css
    .self-start, .self-center, ...
    ```

- Place Content
    ```css
    .place-content-start, .place-content-center, ...
    ```

- Place Items 
    ```css
    .place-items-start, .place-items-center, ...
    ```

- Place Self
    ```css
    .place-self-start, .place-self-center, ...
    ```

## Part 3: Spacing

- Margin & Padding: (Only ['0', 'px', '1', '2', '4', '8', '16', '32'] are supported)
    ```css
    .p-0, .p-1, .p-2, .p-4, .p-8, .p-16, .p-32, .p-px,
    .pl-0, .pt-0, .pr-0, .pb-0, .px-0, .py-0, .ps-0, .pe-0, ...
    ```

- Width(+min/max): Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported
    ```css
    .w-0, .w-full, .w-min, ...
    ```


- Height(+min/max): Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported
    ```css
    .h-0, .h-full, h-min, ...
    ```


- Size(+min/max): Only ['0', 'px', 'full', 'screen', 'auto', 'min', 'max', 'fit'] are supported
    ```css
    .size-0, .size-min, ...
    ```

## Part 4: Typography

- Font Family
    ```css
    .font-sans, .font-serif, .font-mono
    ```

- Font Size
    ```css
    .text-xs, .text-sm, .text-base, .text-lg, .text-xl, .text-2xl, ..., .text-9xl
    ```

- Font Smoothing:
    ```css
    .antialiased, .subpixel-antialiased
    ```

- Font Style
    ```css
    .italic, .not-italic
    ```

- Font Weight
    ```css
    .font-light, .font-normal, .font-medium, .font-semibold, .font-bold, ...
    ```

- Font Variant Numeric:
    ```css
    .normal-nums, .ordinal, .slashing-zero, ...
    ```

- Letter Spacing
    ```css
     .tracking-tight, .tracking-normal, .tracking-wide, ...
    ```

- Line Clamping:
    ```css
    .line-clamp-1, .line-clamp-2, .line-clamp-3, ...
    ```

- Line Height:
    ```css
    .leading-tight, .leading-snug, .leading-normal, .leading-relaxed, ...
    ```

- List Style Image: NOT SUPPORTED!
    ```css
    ARBITRARY VALUES NOT SUPPORTED.
    ```

- List Style Position:
    ```css
    .list-inside, .list-outside
    ```

- List Style Type
    ```css
    .list-dist, .list-decimal, .list-none
    ```

- Text Align
    ```css
    .text-left, .text-start, .text-center, .text-justify, ...
    ```

- Text Color: 
    ```css
    .text-white, .text-black, .text-gray-100, .text-red-200, ...
    ```

- Text Decoration
    ```css
    .underline, .no-underline, .line-through, ...
    ```

- Text Decoration Color
    ```css
    .decoration-black, .decoration-gray-100, ...
    ```

- Text Decoration Style
    ```css
    .docoration-solid, .decoration-dotted, ...
    ```

- Text Decoration Thickness
    ```css
    .decoration-1, .decoration-2, ...
    ```

- Text Underline Offset
    ```css
    .underline-offset-1, .underline-offset-2, ...
    ```

- Text Transform
    ```css
    .uppercase, .capitalize, ...
    ```

- Text Overflow
    ```css
    .truncate, .text-ellipsis, ...
    ```

- Text Wrap
    ```css
    .text-wrap, .text-nowrap, .text-balance, ...
    ```

- Text Indent: NOT SUPPORTED!
    ```css
    NUMERIC CSS NOT SUPPORTED
    ``` 

- Text Align
    ```css
    .align-middle, .align-top, .align-text-top, ...
    ```

- Whitespace
    ```css
    .whitespace-nowrap, .whitespace-pre, ...
    ```

- Word Break
    ```css
    .break-words, .break-all, .break-keep, ...
    ```

- Hyphens
    ```css
    .hyphens-manual, .hyphens-auto, ...
    ```

- Before/After Content:
    ```css
    ARBITRARY VALUES NOT SUPPORTED
    ```

## Part 5: Backgrounds

- Background Color
    ```css
    .bg-white, .bg-red-50, .bg-transparent, ...
    ```

- Other Background Properties: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 6: Borders

- Border Radius
    ```css
    .rounded, .rounded-sm, .rounded-md, .rounded-lg, ...
    ```

- Border Width: Only `.border` is supported
    ```css
    .border 
    ```

- Border Color
    ```css
    .border-black, .border-gray-50, ...
    ```

- Border Style
    ```css
    .border-solid, .border-dashed, ...
    ```

- Divide (Only `.divide-x` and `.divide-y` are supported)
    ```css
    .divide-x, .divide-y
    ```

- Outline:
    ```css
    NOT SUPPORTED
    ```

- Ring:
    ```css
    NOT SUPPORTED
    ```

## Part 7: Effects

- Box Shadow (Color not supported)
    ```css
    .shadow, .shadow-md, .shadow-lg, .shadow-inner, ...
    ```

- Opacity
    ```css
    .opacity-0, .opacity-5, .opacity-10, ..., .opacity-95, .opacity-100
    ```

- Mix Blend Mode: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

- Background Blend Mode: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 8: Filters

- Blur
    ```css
    .blur, .blue-sm, .blur-md, .blur-lg, ...
    ```

- Drop Shadow
    ```css
    .drop-shadow, .drop-shadow-sm, .drop-shadow-md, ...
    ```

- Grayscale
    ```css
    .grayscale, .grayscale-0
    ```

- Backdrop Blur
    ```css
    .backdrop-blur, .backdrop-blur-sm, .backdrop-blur-md, ...
    ```

- Other Filters: NOT SUPPORTED!
    ```css
    NOT SUPPORTED!
    ```

## Part 9: Tables

- Table Border Collapse
    ```css
    .border-collapse, .border-seperate, ...
    ```

- Table Border Spacing: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

- Table Layout
    ```css
    .table-auto, .table-fixed
    ```

- Table Caption Side
    ```css
    .caption-top, .caption-bottom
    ```


## Part 10: Transition/Animation

- Animation:
    ```css
    .animate-spin, .animate-ping, .animate-pulse, ...
    ```

- Other Transitions: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 11: Transforms

- All Transforms: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 12: Interactivity

- Accent Color
    ```css
    .accent-blue-500, .accent-green-500, ...
    ```

- Appearance
    ```css
    .appearance-none, .appearance-auto
    ```

- Cursor (Only ['auto', 'default', 'pointer', 'wait', 'text'] are supported)
    ```css
    .auto, .default, .pointer, .wait, .text
    ```

- Caret Color: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

- Pointer Events
    ```css
    .pointer-events-none, .pointer-events-auto, ...
    ```

- Resize
    ```css
    .resize, .resize-x, .resize-y, .resize-none
    ```

- All Other Interactivity: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 13: SVG

- All SVG: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 14: Accessibility

- All Accessibility: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```

## Part 15: Plugins

- All Plugins: NOT SUPPORTED!
    ```css
    NOT SUPPORTED
    ```
