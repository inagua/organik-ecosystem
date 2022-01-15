const {Mover, AccelerationTypes} = require('../mover');

module.exports.FlyMover = class FlyMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'fly',
            location: [0, 0],
            velocity: [0, 0],
            acceleration: {
                type: AccelerationTypes.Random,
                scale: 2
            },
        });
    }

}
