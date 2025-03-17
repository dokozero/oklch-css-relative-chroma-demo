# OkLCH CSS relative chroma documentation

This repo holds the documentation for the proposal of an upgraded `oklch()` notation with a relative chroma feature.

It uses the PostCSS plugin [postcss-oklch-relative-chroma](https://github.com/dokozero/postcss-oklch-relative-chroma). Clone and open index.html in the dist folder to see the results.

This is a work in progress which might change in the future.

To see relative chroma in action visually, you can use the [OkColor Figma plugin](https://www.figma.com/community/plugin/1173638098109123591/okcolor).

## Table of contents

- [Motivation](#motivation)
- [Proposal](#proposal)
- [Use cases](#use-cases)
- [Limitations](#limitations)
- [How to modify the demo](#how-to-modify-the-demo)
- [About the lack of chroma in some palettes](#about-the-lack-of-chroma-in-some-palettes)

## Motivation

OkLCH model only offers absolute chroma, problem is, with `oklch()` in CSS, **it's easy to go out of gamut.**

From there, currently, browsers will clip the individual RGB values of the requested color, which is not ideal because the resulting color will have a lightness and hue shift, more or less important depending on the chroma value.

For example, `oklch(80% 0.37 20)` is [out of gamut](https://oklch.com/#80,0.37,20,100) but we don't know that just by reading the color code. In that case, for a P3 display, the resulting color in browsers will be `oklch(65.71% 0.2963 14.53)`, but we might still think that we get a color with a lightness of 80 % and a hue of 20 because in the code, we only have `oklch(80% 0.37 20)` displayed.

Check this Codepen for more examples: [OkLCH gamut clipping tests](https://codepen.io/dokozero/full/pvoPpdg).

Wouldn't it be great if from `oklch()`, we could somehow say: "for a lightness of 80 % and a hue of 20, I want a color with the maximum chroma possible in the P3 space".

## Proposal

From the current `oklch()` notation, the idea is to add support for a relative chroma value like this `oklch(display-p3 80% 100% 20)`. This is similar to `color(colorspace c1 c2 c3)` notation used to define RGB colors in relation to a `colorspace` value.

But why not simply `oklch(80% 100% 20)`? In that case, we are missing something, indeed, with an absolute chroma value like 0.24, we don't need to specify in which color space we want to be, but with a relative value, yes.

In fact, with models like `hsl()` or `rgb()`, we also have relative values, but we can't specify to which color space they are relative, that's because with them, in a CSS context, **they are always relative to the sRGB space.**

So, with `oklch(80% 100% 20)`, to which space is 100 % relative to? We need this information to get the right absolute chroma value.

RGB `color()` notation already solves this, by having a `colorspace` property.

So the idea is to have the same here, which gives us the following syntax:

```markdown
oklch(colorspace L RC H)
```

With this upgraded notation, we easily stay within the color space bounds we want to work in.

We can think of it as **an improved HSL color model,** which is uniform and allows us to pick colors in larger color spaces than sRGB.

`colorspace` can either be `srgb`, `display-p3` or `rec2020` (and more in theory, but for now, the [PostCSS plugin](https://github.com/dokozero/postcss-oklch-relative-chroma) supports these only).

From there, `oklch(display-p3 80% 100% 20)` has to be read as: "for a lightness of 80 % and a hue of 20, I want a color with the maximum chroma possible in the P3 space", which gives us `oklch(80% 0.148 20)`.

Another example, `oklch(srgb 40% 80% 140)` has to be read as: "for a lightness of 40 % and a hue of 140, I want a color with 80 % of the maximum chroma possible in the sRGB space", which gives us `oklch(40% 0.103 140)`.

Note that currently, we can indeed use `oklch(80% 100% 20)` for example, but here 100 % always means 0.4 ([source](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)) which is **not useful for our purpose** as the value is always relative to 0.4 and not the bounds of the color space we want to work with.

## Use cases

With this new feature, we can now easily create color palettes on the fly, which are uniform and consistent, without leaving CSS.

For example, if we start from a base color of `oklch(display-p3 50% 100% 135)`, we just have to change the lightness value, and the model will automatically get the right absolute chroma behind, without the need to manually define it ourselves.

From there, we can easily create a color palette by going from `oklch(display-p3 5% 100% 135)` to `oklch(display-p3 95% 100% 135)` using lightness steps of 10 %, or another value.

Here is a visualization in Figma with OkColor plugin:

![Color palettes using relative chroma and OkColor Figma plugin.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/oklch-palette-creation.webp?updatedAt=1742115531237)

If we tried to use the same absolute chroma value for all lightness variants, we would get palettes that are not uniform with unwanted lightness and hue shifting:

![Two color palettes, first with fixed relative chroma, second with fixed absolute chroma.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/fixed-absolute-chroma-palette.webp?updatedAt=1742115531207)

For more examples of this, you can see the demo file in the dist folder which has more palettes with fixed absolute chroma values.

Note that even if we clip only the chroma, using a fixed relative chroma for the palette is better because with a fixed absolute chroma, some lightness variants would have the same chroma value and some different ones, which leads to inconsistent palettes.

Now for some practical examples, we can then easily create lightness variants on the fly as needed:

![Practical UI Design examples with lightness variants that uses fixed relative chroma values.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/oklch-variant-usage.webp?updatedAt=1742115531189)

Of course, here we could still use the same absolute chroma value for the variants, but for consistency sake and depending on the color we start from, we could be out of gamut and have unwanted lightness and hue shifts.

## Limitations

On the demo file, you can see that on some palettes, there is one color that seems to be a bit too vivid, although barely noticeable. This is the case when the relative chroma is around 90-100 %.

However, this is because we see it in relation to all the other lightness variants in the palette, but in practice, when designing, users never see the palettes like this and is less of a problem.

In the case we need to create complete palettes before designing, we can manually adjust the relative chroma of this lightness variant if needed.

## How to modify the demo

- Install the npm dependencies.
- Modify the constants if you want in the `src/demo/css/sass/data.scss` file.
- Do the same in the `<script>` tag in `src/demo/index.html` (`LIGHTNESS_STEPS` is enough).
- Make sure that build.zsh is executable with `chmod +x build.zsh`.
- Run `npm run build` or `pnpm build`.
- Open `dist/index.html` in your browser.

You can also watch the src files with `npm run all-css-watch` or `pnpm all-css-watch` and open index.html from the src folder to see your changes live.

## About the lack of chroma in some palettes

As you can see in the demo file, some palettes like the yellow one lack chroma in the dark variants.

This is not a bug from OkLCH but a limitation of our screens and human vision. Compared for example to a blue hue, you can see with OkColor this lack of chroma for the yellow hue:

![Two palettes, first blue one with good chroma progression, second yellow one with lack of chroma in the dark lightness variants.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/weak-chroma-variants.webp?updatedAt=1742115531202)

The solution here is to manually shift the hue of palette's lightness variants by a fixed step:

![Two yellow palettes, first with manual hue shifting for more chroma in the dark lightness variants, second without manual hue shifting.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/weak-chroma-palette-tints.webp?updatedAt=1742115531135)

But a simpler approach is to use lightness variants from two palettes. For example, the lime palette below could benefit from a hue shift in the dark variants toward green hue, but in practice and if we create lightness variants on the fly, we can simply use two palettes:

![UI Design card example with two palettes.](https://ik.imagekit.io/cgavlsdta/tr:cp-true/oklch-css-relative-chroma-documentation/two-palettes-harmony.webp?updatedAt=1742115531200)
