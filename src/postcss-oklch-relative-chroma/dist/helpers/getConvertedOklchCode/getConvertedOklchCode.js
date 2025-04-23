import { GAMUT_CULORI_NAME_MAPPING, DEBUG } from '../../constants.js';
import convertRelativeChromaToAbsolute from '../convertRelativeChromaToAbsolute/convertRelativeChromaToAbsolute.js';
import getClampedLrch from '../getClampedLrch/getClampedLrch.js';
export default function getConvertedOklchCode(match, gamutRegularName, lightness, relativeChroma, hue) {
    // We need to convert the gamut name to the one used in Culori as they are different from CSS one like in color().
    const gamutCuloriName = GAMUT_CULORI_NAME_MAPPING[gamutRegularName];
    // If gamut value is not in GAMUT_CULORI_NAME_MAPPING we get and undefined value.
    if (gamutCuloriName === undefined) {
        console.error(`Invalid gamut: '${gamutRegularName}', supported gamuts are: ${Object.keys(GAMUT_CULORI_NAME_MAPPING).join(', ')}`);
        return match;
    }
    // In case some values are outside their range.
    const clampedLrch = getClampedLrch({
        l: parseFloat(lightness),
        rc: parseFloat(relativeChroma),
        h: parseFloat(hue)
    });
    const absoluteChroma = convertRelativeChromaToAbsolute({
        lrch: clampedLrch,
        gamut: gamutCuloriName
    });
    const convertedOklchCode = `oklch(${lightness}% ${absoluteChroma} ${hue})`;
    if (DEBUG) {
        console.log(`PostCSS – converted: '${match}' to '${convertedOklchCode}'`);
    }
    return convertedOklchCode;
}
