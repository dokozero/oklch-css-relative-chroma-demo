export default function getClampedValue(props) {
    const { value, min, max } = props;
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
