const {ensure, ensureValues} = require('../common/helpers');
const {V$, Vector} = require('../common/vector');
const {nanoid} = require("nanoid");

const AccelerationTypes = {
    None: 'none',
    Constant: 'constant',
    Target: 'target',
    Random: 'random',
    Accelerator: 'accelerator',
};
module.exports.AccelerationTypes = AccelerationTypes;

module.exports.Mover = class Mover {

    /**
     *
     * @param location (vector, optional)
     * @param velocity (vector, required)
     * @param velocityLimit (number, optional)
     * @param acceleration ({type, scale, accelerator}), @see method accelerate()
     */
    constructor({location, velocity, velocityLimit, acceleration, family, name, isBoundLocation}) {
        this.isBoundLocation = isBoundLocation;
        this.location = location;
        this.velocity = velocity;
        this.velocityLimit = velocityLimit /*|| 10*/;

        this.accelerate(acceleration);

        this.name = name;
        this.family = family;
        this.id = `${family}-${nanoid(5)}`;
    }

    accelerate({type, scale, acceleration, accelerator}) {
        ensure(type, 'Acceleration type is required');
        ensureValues(type, Object.values(AccelerationTypes), 'acceleration.type');

        this.accelerationType = type;
        this.acceleration = acceleration;
        this.accelerationScale = scale || 1;
        this.accelerator = accelerator;
        return this;
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
    step(target, {width, height} = {}) {
        // http://sylvester.jcoglan.com/api/vector.html

        let a;
        if (this.accelerationType === AccelerationTypes.None) {
            a = V$([0, 0]);

        } else if (this.accelerationType === AccelerationTypes.Constant) {
            a = V$(this.acceleration);

        } else if (this.accelerationType === AccelerationTypes.Target) {
            ensure(target, 'Target is required for this type of acceleration!');
            const direction = target && V$(target).subtract(this.location).toUnitVector().x(this.accelerationScale);
            a = direction;

        } else if (this.accelerationType === AccelerationTypes.Random) {
            a = Vector.Random(2).toUnitVector().x(this.accelerationScale);

        } else if (this.accelerationType === AccelerationTypes.Accelerator) {
            ensure(this.accelerator, 'accelerator function required.')
            a = V$(this.accelerator()).toUnitVector();

        } else {
            throw new Error('Unknown acceleration type: ' + this.accelerationType);
        }

        const velocity = $V(this.velocity).add(a);
        const v = this.velocityLimit ? velocity.limit(this.velocityLimit) : velocity;
        const l = $V(this.location).add(v);

        this.location = this.boundLocation(l.elements, {width, height});
        this.velocity = v.elements;
        this.acceleration = a.elements;
        return this;
    }

    toString() {
        return `${this.id} - ${this.location}`;
    }

    boundLocation(coordinates, {width, height} = {}) {
        let [x, y]  = coordinates;
        if (this.isBoundLocation) {
            if (width) {
                if (x < 0) x = width;
                if (x > width) x = 0;
            }
            if (height) {
                if (y < 0) y = height;
                if (y > width) y = 0;
            }
        }
        return [x, y];
    }
}
