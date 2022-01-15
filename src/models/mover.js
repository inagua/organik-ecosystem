const {V$} = require('../common/vector');
const {nanoid} = require("nanoid");

module.exports.Mover = class Mover {

    /**
     *
     * @param location (vector, optional)
     * @param velocity (vector, required)
     * @param velocityLimit (number, optional)
     * @param acceleration (vector, optional), if not provided the step()'s 'target' will be used
     * @param accelerationScale (number, optional), used when the  step()'s 'target' is used instead of 'acceleration'
     */
    constructor({location, velocity, velocityLimit, acceleration, accelerationScale, family, name}) {
        this.location = location;
        this.velocity = velocity;
        this.velocityLimit = velocityLimit;
        this.acceleration = acceleration;
        this.accelerationScale = accelerationScale || 0.5;

        this.name = name;
        this.family = family;
        this.id = `${family}-${nanoid(5)}`;
    }

    locate(location) {
        this.location = location;
        return this;
    }

    /**
     * @see "The Nature Of Code", Chapter 1, p58
     *
     * @param target
     * @return {*}
     */
    step(target) {
        // http://sylvester.jcoglan.com/api/vector.html
        const direction = target && V$(target).subtract(this.location).toUnitVector().x(this.accelerationScale);
        const a = direction || V$(this.acceleration);
        const v = $V(this.velocity).add(a).limit(this.velocityLimit);
        const l = $V(this.location).add(v);

        this.location = l.elements;
        this.velocity = v.elements;
        this.acceleration = a.elements;
        return this;
    }

    toString() {
        return `${this.id} - ${this.location}`;
    }

}
