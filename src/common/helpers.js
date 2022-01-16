const ensure = (shouldBeTrue, error) => { if (!shouldBeTrue) throw new Error(error) };
const ensureValues = (actual, expectedValues, property) => ensure(expectedValues.indexOf(actual) > -1, `${property} value=${actual} should be one of=${expectedValues.join(',')}`);
const toF2 = (array) => array.map(n => (n + 0.00).toFixed(2));

module.exports = {
    ensure,
    ensureValues,
    toF2,
};
