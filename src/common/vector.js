const {Vector} = require('sylvester');
const V$ = Vector.create;

Vector.prototype.limit = function(l) {
    return l && this.modulus() > l ? this.multiply(l / this.modulus()) : this.dup();
}

module.exports = {
    Vector,
    V$
}
