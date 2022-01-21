const {Mover, AccelerationTypes, BoundaryStrategies} = require('../../mover');

module.exports.WindyBallMover = class WindyBallMover extends Mover {

    constructor(name = '.', mass = 1) {
        super({
            name,
            family: 'ball',
            boundaryStrategy: BoundaryStrategies.Bounce,
            location: [0, 0],
            velocity: [0, 0],
            velocityLimit: 10,
            acceleration: {
                type: AccelerationTypes.None,
                // acceleration: [0, 0]
            },
            mass
        });

        this.force([0.5, 0]); // WIND
        this.force([0, 0.1]); // GRAVITY
    }

}
