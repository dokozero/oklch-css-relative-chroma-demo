import { clampChroma } from 'culori';
import { ABSOLUTE_CHROMA_DECIMAL_PRECISION, MAX_CHROMA_REC2020 } from '../../constants.js';
export default function convertRelativeChromaToAbsolute(props) {
    const { lrch, colorSpace } = props;
    try {
        // First, we need to get the current maximum chroma for the given lightness and hue. For that, we clamp the color with the maxium absolute chroma in rec2020 space.
        const currentMaxChroma = clampChroma({ mode: 'oklch', l: lrch.l / 100, c: MAX_CHROMA_REC2020, h: lrch.h }, 'oklch', colorSpace).c;
        // Then, as we know the absolute chroma value of a relative one of 100%, we can get the absolute chroma from the requested relative one with a cross multiplication operation.
        return Number(((lrch.rc * currentMaxChroma) / 100).toFixed(ABSOLUTE_CHROMA_DECIMAL_PRECISION));
    }
    catch (error) {
        throw new Error(error);
    }
}
