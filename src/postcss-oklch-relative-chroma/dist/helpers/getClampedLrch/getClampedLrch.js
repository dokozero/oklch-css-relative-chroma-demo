import getClampedValue from '../getClampedValue/getClampedValue.js';
export default function getClampedLrch(props) {
    const { l, rc, h } = props;
    const clampedLrch = {
        l: l,
        rc: rc,
        h: h
    };
    clampedLrch.l = getClampedValue({
        value: l,
        min: 0,
        max: 100
    });
    clampedLrch.rc = getClampedValue({
        value: rc,
        min: 0,
        max: 100
    });
    clampedLrch.h = getClampedValue({
        value: h,
        min: 0,
        max: 360
    });
    return clampedLrch;
}
