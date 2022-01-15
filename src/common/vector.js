const {Vector} = require('sylvester');
const V$ = Vector.create;

Vector.prototype.limit = function(l) {
    return l && this.modulus() !== 0 ? this.multiply(l / this.modulus()) : this.dup();
}

module.exports = {
    Vector,
    V$
}
