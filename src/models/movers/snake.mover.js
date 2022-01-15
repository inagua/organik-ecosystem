const {Mover} = require('../mover');

module.exports.SnakeMover = class SnakeMover extends Mover {

    constructor(name = '.') {
        super({
            name,
            family: 'snake',
            location: [0, 0],
            velocity: [0, 0],
            acceleration: [-0.001, 0.01],
        });
    }

}
