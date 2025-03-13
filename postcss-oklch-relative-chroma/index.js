import { OKLCH_RELATIVE_CHROMA_REGEX, COLOR_SPACE_NAME_CULORI_MAPPING, DEBUG } from './data.js'
import convertRelativeChromaToAbsolute from './helpers/convertRelativeChromaToAbsolute/convertRelativeChromaToAbsolute.js'
// TODO
// Test also if gradient 'in oklch' don't create a bug.
// Work with 0.123 for L?
// Add automatic sRGB fallback with chroma reduction method?
//  Or another dedicated script?
/**
 * The PostCSS plugin part
 */
export default () => {
  return {
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
  }
}
export const postcss = true
