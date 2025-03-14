# OkLCH CSS relative chroma

This repo holds the documentation for the proposal of an upgraded `oklch()` notation with a relative chroma feature.

It uses the PostCSS plugin [postcss-oklch-relative-chroma](https://github.com/dokozero/postcss-oklch-relative-chroma). Clone and open index.html in the dist folder to see the results.

This is a work in progress which might change in the future.

To see relative chroma in action visually, you can use the [OkColor Figma plugin](https://www.figma.com/community/plugin/1173638098109123591/okcolor).

## Motivation

OkLCH model only offers absolute chroma, problem is, with `oklch()` in CSS, **it's easy to go out of gamut.**

From there, currently, browsers will clip the individual RGB values of the requested color, which is not ideal because the resulting color will have a lightness and hue shift, more or less important depending on the chroma value.

For example, `oklch(80% 0.37 20)` is [out of gamut](https://oklch.com/#80,0.37,20,100) but we don't know that just by reading the color code. In that case, for a P3 display, the resulting color in browsers will be `oklch(65.71% 0.2963 14.53)`, but we might still think that we get a color with a lightness of 80% and a hue of 20 because in the code, we only have `oklch(80% 0.37 20)` displayed.

Wouldn't it be great if from `oklch()`, we could somehow say: "for a lightness of 80% and a hue of 20, I want a color with the maximum chroma possible in the P3 space".

## Proposal

From the current `oklch()` notation, the idea is to add support for a relative chroma value like this `oklch(display-p3 80% 100% 20)`.

But why not simply `oklch(80% 100% 20)`? In that case, we are missing something, indeed, with an absolute chroma value like 0.24, we don't need to specify the color model in which color space we want to be, but with a relative value, yes.

In fact, with models like `hsl()` or `rgb()`, we also have relative values, but we can't specify the model to which color space they are relative, that's because with them, in a CSS context, **they are always relative to the sRGB space.**

So, with `oklch(80% 100% 20)`, to which space is 100% relative to? We need this information to get the right absolute chroma value.

RGB `color()` notation already solves this, by having a `color-space` property.

So the idea is to have the same here, which gives us the following syntax:

```css
oklch(colorspace L RC H)
```

We can think of it like **an improved HSL color model,** which is uniform and allows to pick colors in larger color spaces than sRGB.

`colorspace` can either be `srgb`, `display-p3` or `rec2020` (and more in theory, but for now, the [PostCSS plugin](https://github.com/dokozero/postcss-oklch-relative-chroma) supports these only.).

From there, `oklch(display-p3 80% 100% 20)` has to be read as: "for a lightness of 80% and a hue of 20, I want a color with the maximum chroma possible in the P3 space", which gives us `oklch(80% 0.148 20)`.

Another example, `oklch(srgb 40% 80% 140)` has to be read as: "for a lightness of 40% and a hue of 140, I want a color with 80% of the maximum chroma possible in the sRGB space", which gives us `oklch(40% 0.103 140)`.

Note that currently, we can indeed use `oklch(80% 100% 20)` for example, but here 100% always means 0.4 ([source](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)) which is **not useful for our purpose** as the value is always relative to 0.4 and not the bounds of the color space we want to work with.

## Advantages

With this upgraded notation, we easily stay within the color space bounds we want to work in.

But that's not all, **a major advantage** is that we can now easily create color palettes on the fly, which is uniform and consistent.

For example, if we start from a base color of `oklch(display-p3 55% 100% 250)`, we just have to change the lightness value, and the model will automatically get the right absolute chroma behind, without the need to manually define it ourselves.

From there, we can easily create a color palette by going for example from `oklch(display-p3 5% 100% 250)` to `oklch(display-p3 95% 100% 250)` using lightness steps of 5% (see demo file in dist folder).

In the dist/ demo file, you can see what happens if we try the same logic of palette generation on the fly with a fixed absolute chroma.

Because of the way browsers clip the values, **we lose the uniformity OkLCH** and thus, lightness, absolute chroma, and hue consistency of the palette.
