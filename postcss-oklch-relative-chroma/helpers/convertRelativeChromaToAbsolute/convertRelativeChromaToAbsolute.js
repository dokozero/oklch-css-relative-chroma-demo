import { clampChroma } from 'culori';
import { MAX_ABSOLUTE_CHROMA_P3 } from '../../data.js';
/**
 * Calculates absolute chroma value from relative chroma
 * @param {number} l - Lightness value (0-100)
 * @param {number} relativeChroma - Relative chroma value (0-1 and more in theory)
 * @param {number} h - Hue angle (0-360)
 * @param {string} colorSpace - Target color space from COLOR_SPACE_NAME_CULORI_MAPPING
 * @returns {number} Calculated absolute chroma value
 */
export default function convertRelativeChromaToAbsolute(l, relativeChroma, h, colorSpace) {
    try {
        // First we need to calculate the current maximum chroma for the given lightness and hue.
        const currentMaxChroma = clampChroma({ mode: 'oklch', l: l / 100, c: MAX_ABSOLUTE_CHROMA_P3, h }, 'oklch', colorSpace).c;
        // Then, as we know the absolute chroma value of a relative one of 100%, we can calculate the absolute chroma from the requested relative one.
        return Number(((relativeChroma * currentMaxChroma) / 100).toFixed(6));
    }
    catch (error) {
        console.error(`Error calculating absolute chroma from relative chroma. Error: ${error.message}`);
        return relativeChroma;
    }
}
