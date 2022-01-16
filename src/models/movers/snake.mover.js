const {Mover, AccelerationTypes, BoundaryStrategies} = require('../mover');

module.exports.SnakeMover = class SnakeMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'snake',
            boundaryStrategy: BoundaryStrategies.None,
            location: [0, 0],
            velocity: [0, 0],
            acceleration: {
                type: AccelerationTypes.Target,
                scale: 0.5
            },
        });
    }

}
