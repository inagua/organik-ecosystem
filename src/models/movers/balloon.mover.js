const {Mover, AccelerationTypes, BoundaryStrategies} = require('../mover');

/**
 * Helium-filled balloon floating upward, p70
 */
module.exports.BalloonMover = class BalloonMover extends Mover {

    constructor(name = '.', mass = 1) {
        super({
            name,
            family: 'balloon',
            boundaryStrategy: BoundaryStrategies.CrossHorizontaly,
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
