export const DEBUG = true;
export const COLOR_SPACE_NAME_CULORI_MAPPING = {
    'srgb': 'rgb',
    'srgb-linear': 'lrgb',
    'display-p3': 'p3',
    'a98-rgb': 'a98',
    'prophoto-rgb': 'prophoto',
    'rec2020': 'rec2020',
    'xyz-d50': 'xyz50',
    'xyz-d65': 'xyz65'
};
export const MAX_ABSOLUTE_CHROMA_P3 = 0.37;
export const OKLCH_RELATIVE_CHROMA_REGEX = /oklch\(([a-zA-Z0-9-]+)\s+([\d.]+)%\s+([\d.]+)%\s+([\d.]+)\)/g;
