const {Mover, AccelerationTypes} = require('../mover');

module.exports.FlyMover = class FlyMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'fly',
            isBoundLocation: true,
            location: [0, 0],
            velocity: [0, 0],
            velocityLimit: 8,
            acceleration: {
                type: AccelerationTypes.Random,
                // scale: 2
            },
        });
    }

}
