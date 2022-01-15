const {Mover, AccelerationTypes} = require('../mover');

module.exports.FishMover = class FishMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'fish',
            isBoundLocation: true,
            location: [0, 0],
            velocity: [0, 0],
            acceleration: {
                type: AccelerationTypes.Constant,
                acceleration: [-0.001, 0.01]
            },
        });
    }

}
