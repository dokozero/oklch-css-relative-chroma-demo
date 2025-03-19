import { OKLCH_RELATIVE_CHROMA_REGEX } from './constants.js';
import getConvertedOklchCode from './helpers/getConvertedOklchCode/getConvertedOklchCode.js';
export default () => {
    return {
        postcssPlugin: 'postcss-oklch-relative-chroma',
        Declaration(decl) {
            if (!decl.value.includes('oklch'))
                return;
            decl.value = decl.value.replace(OKLCH_RELATIVE_CHROMA_REGEX, getConvertedOklchCode);
        }
    };
};
export const postcss = true;
