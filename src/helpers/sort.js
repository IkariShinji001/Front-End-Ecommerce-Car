export const sortDecrease = (array, field) => {
    array.sort((a, b) => b[field] - a[field]);
}