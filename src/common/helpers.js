const ensure = (shouldBeTrue, error) => { if (!shouldBeTrue) throw new Error(error) };
const ensureValues = (actual, expectedValues, property) => ensure(expectedValues.indexOf(actual) > -1, `${property} value=${actual} should be one of=${expectedValues.join(',')}`);

module.exports = {
    ensure,
    ensureValues,
};
