const {Mover, AccelerationTypes, BoundaryStrategies} = require('../mover');

module.exports.FlyMover = class FlyMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'fly',
            boundaryStrategy: BoundaryStrategies.Cross,
            location: [0, 0],
            velocity: [0, 0],
            velocityLimit: 8,
            acceleration: {
                type: AccelerationTypes.Perlin,
                // scale: 2
            },
        });
    }

}
