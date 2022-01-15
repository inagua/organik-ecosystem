const {Mover, AccelerationTypes} = require('../mover');

module.exports.TargetMover = class TargetMover extends Mover {

    constructor(location, name = 'X') {
        super({
            name,
            family: 'target',
            location,
            velocity: [0, 0],
            acceleration: {
                type: AccelerationTypes.None
            },
        });
    }

}
