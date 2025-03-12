const { clampChroma } = require('culori')

// TODO
// Use Typescript for package.
// add support for lch() and decimal oklch(notation).
// Test also if gradient 'in oklch' don't create a bug.
// Work with 0.123 for L?
// Add automatic sRGB fallback with chroma reduction approach?
//  Or another dedicated script?
// Add tests with vitests.

// Convert to cjs not js

/**
 * Constants
 */
const DEBUG = true

const COLOR_SPACE_NAME_CULORI_MAPPING = {
  'srgb': 'rgb',
  'srgb-linear': 'lrgb',
  'display-p3': 'p3',
  'a98-rgb': 'a98',
  'prophoto-rgb': 'prophoto',
  'rec2020': 'rec2020',
  'xyz-d50': 'xyz50',
  'xyz-d65': 'xyz65'
}

const MAX_ABSOLUTE_CHROMA_P3 = 0.37
const OKLCH_RELATIVE_CHROMA_REGEX = /oklch\(([a-zA-Z0-9-]+)\s+([\d.]+)%\s+([\d.]+)%\s+([\d.]+)\)/g

/**
 * Helper function
 */

/**
 * Calculates absolute chroma value from relative chroma
 * @param {number} l - Lightness value (0-100)
 * @param {number} relativeChroma - Relative chroma value (0-1 and more in theory)
 * @param {number} h - Hue angle (0-360)
 * @param {string} colorSpace - Target color space from COLOR_SPACE_NAME_CULORI_MAPPING
 * @returns {number} Calculated absolute chroma value
 */
const convertRelativeChromaToAbsolute = (l, relativeChroma, h, colorSpace) => {
  try {
    // First we need to calculate the current maximum chroma for the given lightness and hue.
    const currentMaxChroma = clampChroma({ mode: 'oklch', l: l / 100, c: MAX_ABSOLUTE_CHROMA_P3, h }, 'oklch', colorSpace).c

    // Then, as we know the absolute chroma value of a relative one of 100%, we can calculate the absolute chroma from the requested relative one.
    return Number(((relativeChroma * currentMaxChroma) / 100).toFixed(6))
  } catch (error) {
    console.error(`Error calculating absolute chroma from relative chroma. Error: ${error.message}`)
    return relativeChroma
  }
}

/**
 * The PostCSS plugin part
 */
module.exports = () => ({
  postcssPlugin: 'postcss-oklch-relative-chroma-notation',
  Declaration(decl) {
    if (!decl.value.includes('oklch')) return

    decl.value = decl.value.replace(OKLCH_RELATIVE_CHROMA_REGEX, (match, colorSpace, l, relativeChroma, h) => {
      // We need to convert the color space name to the one used in Culori as they are different from CSS one like in color().
      const colorSpaceInCuloriNaming = COLOR_SPACE_NAME_CULORI_MAPPING[colorSpace]

      // If colorSpace value is not in COLOR_SPACE_NAME_CULORI_MAPPING we get and undefined value.
      if (colorSpaceInCuloriNaming === undefined) {
        console.error(
          `Invalid color space: '${colorSpace}', supported color spaces are: ${Object.keys(COLOR_SPACE_NAME_CULORI_MAPPING).join(', ')}`
        )
        return match
      }

      const absoluteChroma = convertRelativeChromaToAbsolute(
        parseFloat(l),
        parseFloat(relativeChroma),
        parseFloat(h),
        colorSpaceInCuloriNaming
      )

      const convertedColorCode = `oklch(${l}% ${absoluteChroma} ${h})`

      if (DEBUG) {
        console.log(`PostCSS – converted: '${match}' to '${convertedColorCode}'`)
      }

      return convertedColorCode
    })
  }
})

module.exports.postcss = true
