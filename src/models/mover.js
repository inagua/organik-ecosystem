const {ensure, ensureValues, toF2} = require('../common/helpers');
const {V$, Vector} = require('../common/vector'); // http://sylvester.jcoglan.com/api/vector.html
const {nanoid} = require("nanoid");
const Perlin = require("perlin-simplex");

const perlin = new Perlin();

const BoundaryStrategies = {
    None: 'none',
    Cross: 'cross',
    CrossHorizontally: 'CrossHorizontally',
    CrossVertically: 'CrossVertically',
    Bounce: 'bounce',
};
module.exports.BoundaryStrategies = BoundaryStrategies;

const AccelerationTypes = {
    None: 'none',
    Constant: 'constant',
    Target: 'target',
    Random: 'random',
    Perlin: 'perlin', // Perlin's noise
    Accelerator: 'accelerator',
};
module.exports.AccelerationTypes = AccelerationTypes;

module.exports.Mover = class Mover {

    /**
     *
     * @param location (array, optional)
     * @param velocity (array, required)
     * @param velocityLimit (number, optional)
     * @param acceleration ({type, scale, accelerator}), @see method accelerate()
     * @param family
     * @param name
     * @param boundaryStrategy (@see BoundaryStrategies, BoundaryStrategies.Cross by default)
     * @param mass
     * @param debug
     */
    constructor({
                    location,
                    velocity,
                    velocityLimit,
                    acceleration,
                    family,
                    name,
                    boundaryStrategy,
                    mass,
                    useGravity,
                    debug
                }) {
        this.boundaryStrategy = boundaryStrategy || BoundaryStrategies.Cross;
        this.location = location;
        this.velocity = velocity;
        this.velocityLimit = velocityLimit /*|| 10*/;

        this.accelerate(acceleration);
        this.perlinX = Math.floor(Math.random() * 10000);
        this.perlinY = Math.floor(Math.random() * 10000);
        this.forces = V$([0, 0]); // #3

        this.mass = mass;
        this.useGravity = useGravity;

        this.name = name;
        this.family = family;
        this.id = `${family}-${nanoid(5)}`;

        this.layers = [];

        this.debug(debug);
    }

    debug(isDebug) {
        this.isDebug = isDebug;
        return this;
    }

    isStatic() {
        return this.accelerationType === AccelerationTypes.None
            && (!this.acceleration || JSON.stringify(this.acceleration) === JSON.stringify([0, 0]))
            && this.accelerationScale === 1
            && !this.accelerator
            ;
    }

    addLayers(layers) {
        this.layers = this.layers.concat(layers);
        return this;
    }

    locate(location) {
        this.location = location;
        return this;
    }

    locateRandomlyIn({width, height}) {
        return this.locate([
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height)
        ]);
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

    /**
     * #3
     *
     * @param force, an array
     * @param reset, set forces to 0 before if true
     */
    force(force, {reset} = {}) {
        if (reset) this.forces = this.forces.x(0);
        if (force) this.forces = this.forces.add(V$(force).x(1 / (this.mass || 1)));
        return this;
    }

    /**
     * Nature of code, Chapter 2. Forces, example 2.4, p82. #3
     *
     * @return Array of frictions as Vectors
     * @private
     */
    _frictions() {
        const isFriction = (layer) => layer.hasOwnProperty('friction');
        const pX = this.location[0];
        const pY = this.location[1];
        const isLayerContainMover = ({
                                         x,
                                         y,
                                         width,
                                         height
                                     }) => (x <= pX && pX <= x + width) && (y <= pY && pY <= y + height);
        const velocity = this.velocity;
        const frictionForLayer = ({friction: c}) => V$(velocity).toUnitVector().x(-c);

        return this.layers
            .filter(isFriction)
            .filter(isLayerContainMover)
            .map(frictionForLayer)
            ;
    }

    /**
     * Nature of code, Chapter 2. Forces, example 2.5, p87. #3
     *
     * @return Array of drag forces as Vectors
     * @private
     */
    _dragForces() {
        const isDragForce = (layer) => layer.hasOwnProperty('drag');
        const pX = this.location[0];
        const pY = this.location[1];
        const isLayerContainMover = ({
                                         x,
                                         y,
                                         width,
                                         height
                                     }) => (x <= pX && pX <= x + width) && (y <= pY && pY <= y + height);
        const velocity_ = V$(this.velocity);
        const dragForceForLayer = ({drag: c}) => {
            const velocity__ = velocity_.modulus();
            const drag_ = c * velocity__ * velocity__;
            return velocity_.toUnitVector().x(-drag_);
        }

        return this.layers
            .filter(isDragForce)
            .filter(isLayerContainMover)
            .map(dragForceForLayer)
            ;
    }

    /**
     * Nature of code, Chapter 2. Forces, example 2.5, p87. #3
     *
     * @return Array of zero or one gravity Vector... to easily handle the no gravity case while adding it (with `.concat()`)!
     * @private
     */
    _gravity() {
        if (!this.mass || !this.useGravity) return [];
        const mass = 0.1 * this.mass;
        const gravity_ = V$([0, mass]);
        return [gravity_];
    }

    _accelerationFor(target, width, height) {
        if (this.accelerationType === AccelerationTypes.None) {
            return V$([0, 0]);

        } else if (this.accelerationType === AccelerationTypes.Constant) {
            return V$(this.acceleration);

        } else if (this.accelerationType === AccelerationTypes.Target) {
            ensure(target, 'Target is required for this type of acceleration!');
            const direction = target && V$(target).subtract(this.location).toUnitVector().x(this.accelerationScale);
            return direction;

        } else if (this.accelerationType === AccelerationTypes.Random) {
            return Vector.Random(2).toUnitVector().x(this.accelerationScale);

        } else if (this.accelerationType === AccelerationTypes.Perlin) {
            const x = perlin.noise(this.perlinX, 0);
            this.perlinX += 0.01;
            const y = perlin.noise(0, this.perlinY);
            this.perlinY += 0.01;
            return V$([x, y]);

        } else if (this.accelerationType === AccelerationTypes.Accelerator) {
            ensure(this.accelerator, 'accelerator function required.')
            return V$(this.accelerator(this.location, {width, height})).toUnitVector();

        } else {
            throw new Error('Unknown acceleration type: ' + this.accelerationType);
        }
    }

    toString() {
        return `${this.id} - ${this.location}`;
    }

    boundLocation(location, {width, height} = {}) {
        const cross = (x, bound) => {
            if (x < 0) x = bound;
            if (x > bound) x = 0;
            return x;
        }
        const bounce = (x, bound) => {
            if (x < 0) x = 0;
            if (x > bound) x = bound;
            return x;
        }

        let [x, y] = location;
        if (this.boundaryStrategy === BoundaryStrategies.None) {
        } else if (this.boundaryStrategy === BoundaryStrategies.Cross) {
            if (width) x = cross(x, width);
            if (height) y = cross(y, height);
        } else if (this.boundaryStrategy === BoundaryStrategies.Bounce) {
            if (width) x = bounce(x, width);
            if (height) y = bounce(y, height);
        } else if (this.boundaryStrategy === BoundaryStrategies.CrossHorizontally) {
            if (width) x = cross(x, width);
            if (height) y = bounce(y, height);
        } else if (this.boundaryStrategy === BoundaryStrategies.CrossVertically) {
            if (width) x = bounce(x, width);
            if (height) y = cross(y, height);
        }
        return [x, y];
    }

    boundVelocity(location, velocity, {width, height} = {}) {
        let [x, y] = location;
        let [dx, dy] = velocity;
        if (this.boundaryStrategy === BoundaryStrategies.Bounce) {
            if (width) {
                if (x < 0) dx = dx * -1;
                if (x > width) dx = dx * -1;
            }
            if (height) {
                if (y < 0) dy = dy * -1;
                if (y > height) dy = dy * -1;
            }
        }
        return [dx, dy];
    }

    /**
     * To override.
     *
     * @param width
     * @param height
     */
    beforeStep({width, height}) {
    }

    /**
     * @see "The Nature Of Code", Chapter 1, p58
     *
     * @param target
     * @return {*}
     */
    step({target, width, height} = {}) {
        // http://sylvester.jcoglan.com/api/vector.html

        this.beforeStep({width, height});

        const forces_ = this._frictions() // #3, p82
            .concat(this._dragForces()) // #3, 87
            .concat(this._gravity()) // #3, 87
            .reduce((acc, friction) => acc.add(friction), this.forces.dup())
        ;

        const a = this
            ._accelerationFor(target, width, height)
            .add(forces_) // #3
        ;

        const velocity = V$(this.velocity).add(a);
        const v = this.velocityLimit ? velocity.limit(this.velocityLimit) : velocity;
        const l = V$(this.location).add(v);

        this.location = this.boundLocation(l.elements, {width, height});
        this.velocity = this.boundVelocity(l.elements, v.elements, {width, height});
        this.acceleration = a.elements;

        if (this.isDebug) {
            const magnitude = (arr) => V$(arr).modulus().toFixed(2);
            console.log(`'>> [${this.name}] ACC=[${toF2(this.acceleration)}]|${magnitude(this.acceleration)} - VEL=[${toF2(this.velocity)}]|${magnitude(this.velocity)} - LOC=[${toF2(this.location)}] - MAS=${this.mass}`);
        }

        return this;
    }

}
