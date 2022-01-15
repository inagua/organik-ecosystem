const {Mover, AccelerationTypes} = require('../mover');

module.exports.SnakeMover = class SnakeMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'snake',
            location: [0, 0],
            velocity: [0, 0],
            acceleration: {
                type: AccelerationTypes.Target,
                a: [-0.001, 0.01]
            },
        });
    }

}
