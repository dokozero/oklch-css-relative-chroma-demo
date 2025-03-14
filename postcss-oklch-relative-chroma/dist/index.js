import { OKLCH_RELATIVE_CHROMA_REGEX } from './data.js';
import getConvertedOklchCode from './helpers/getConvertedOklchCode/getConvertedOklchCode.js';
// TODO
// Test also if gradient 'in oklch' don't create a bug.
// Work with 0.123 for L?
// Add automatic sRGB fallback with chroma reduction method?
//  Or another dedicated script?
export default () => {
    return {
        postcssPlugin: 'postcss-oklch-relative-chroma-notation',
        Declaration(decl) {
            if (!decl.value.includes('oklch'))
                return;
            decl.value = decl.value.replace(OKLCH_RELATIVE_CHROMA_REGEX, getConvertedOklchCode);
        }
    };
};
export const postcss = true;
