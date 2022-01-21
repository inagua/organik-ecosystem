const {Mover, AccelerationTypes, BoundaryStrategies} = require('../../mover');
const {V$, Vector} = require('../../../common/vector');

/**
 * Instead of objects bouncing off the edge of the wall, create an example in which an invisible
 * force pushes back on the objects to keep them in the window. Can you weight the force according
 * to how far the object is from an edge—i.e., the closer it is, the stronger the force?
 *
 * Exercise 2.3, page 77
 */
module.exports.MagneticMover = class MagneticMover extends Mover {

    constructor(name = '.', mass = 1) {
        super({
            name,
            family: 'magnetic',
            boundaryStrategy: BoundaryStrategies.Bounce,
            location: [0, 0],
            velocity: [0, 0],
            velocityLimit: 5,
            acceleration: {
                type: AccelerationTypes.Constant,
                acceleration: [0.5, 1]
            },
            mass
        });
    }

    beforeStep({width, height}) {
        const dZ = (z, bound) => {
            if (z < 1) return 0.001;
            if (z > bound - 1) return -0.001;
            return z < height / 2 ? z : z - height;
        }
        const [x, y] = this.location;
        const force = [1/dZ(x, width), 1/dZ(y, height)];
        this.force(force, {reset: true});
    }

}
