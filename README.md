# OkLCH CSS relative chroma demo

![Palettes from the demo.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/demo.webp?updatedAt=1742417909171)

Demo code for the PostCSS plugin: [postcss-oklch-relative-chroma](https://github.com/dokozero/postcss-oklch-relative-chroma).

[Live demo](https://dokozero.github.io/oklch-css-relative-chroma-demo/)

[Documentation](https://dokozero.design/en/projects/oklch-relative-chroma/)

There is a [discussion in csswg-drafts repo](https://github.com/w3c/csswg-drafts/issues/11946).

## How to modify the demo

- Clone the repo on your machine.
- Run `npm run dev` to see your changes locally.

### To modify the relative chroma palettes

- Change the values in `src/demo/styles/sass/constants.scss` and do the same in `src/demo/data/constants.ts`.

### To modify the relative chroma palettes with manual chroma/hue adjustments

- Change the values in `src/demo/styles/sass/manual-palette-tokens.scss`.

When you are done, you can update the build with `npm run build` and run `npm run preview` to check it.
