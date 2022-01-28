const {Mover, AccelerationTypes, BoundaryStrategies} = require('../../mover');

/**
 * Using forces, simulate a helium-filled balloon floating upward and bouncing off the top of a window.
 * Can you add a wind force that changes over time, perhaps according to Perlin noise?
 *
 * Exercise 2.1, p70
 */
module.exports.BalloonMover = class BalloonMover extends Mover {

    constructor(name = '.', mass = 1) {
        super({
            name,
            family: 'balloon',
            boundaryStrategy: BoundaryStrategies.CrossHorizontally,
            location: [0, 0],
            velocity: [0, 0],
            velocityLimit: 10,
            acceleration: {
                type: AccelerationTypes.None,
            },
            mass
        });

        this.force([0.4, 0]); // WIND
        this.force([0, -0.2]); // helium-filled balloon floating upward
    }

}
