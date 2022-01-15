const {Mover} = require('../mover');

module.exports.TargetMover = class TargetMover extends Mover {

    constructor(location, name = 'X') {
        super({
            name,
            family: 'target',
            location,
            velocity: [0, 0],
            acceleration: [0, 0],
        });
    }

}
