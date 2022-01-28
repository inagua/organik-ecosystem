const {NoMover} = require('./movers/exercises/no.mover');
const {SnakeMover} = require('./movers/snake.mover');
const {FlyMover} = require('./movers/fly.mover');
const {FishMover} = require('./movers/fish.mover');
const {WindyBallMover} = require('./movers/exercises/windy-ball.mover');
const {BalloonMover} = require('./movers/exercises/balloon.mover');
const {MagneticMover} = require('./movers/exercises/magnetic.mover');

const createMovers = ({resolution, target, isDebug, locationScale}) => {
    // const resolution = {width: 80, height: 40};
    // const target = [25, 15];
    const sand = {x: 20, y: 15, width: 40, height: 10, symbol: '.', friction: 0.8}; // Chapter 2, Force - 2.7 Frictions
    const water = {x: 10, y: 10, width: 20, height: 10, symbol: '~', drag: 0.01};   // Chapter 2, Force - 2.8 Drag force

    const ls = locationScale || 1;

    // Ecosystem
    const snake1 = new SnakeMover('s1').locate([0, 0])/*.debug(IsDebug)*/;
    const snake2 = new SnakeMover('s2').locate([30 * ls, 20 * ls])/*.debug(IsDebug)*/;
    const snake3 = new SnakeMover('s3').locate([40 * ls, 15 * ls])/*.debug(IsDebug)*/;
    const fly1 = new FlyMover('F1').locate([15 * ls, 23 * ls]).addLayers([water, sand])/*.debug(IsDebug)*/;
    const fish1 = new FishMover('P1').locate([35 * ls, 7 * ls])/*.debug(IsDebug)*/;

    // Exercises
    const ball1 = new WindyBallMover('B1', 1).locateRandomlyIn(resolution)/*.debug(IsDebug)*/;
    const ball2_high = new WindyBallMover('B2h', 5).locate([20 * ls, 0 * ls])/*.debug(IsDebug)*/;    // Chapter 2, Force - 2.8 Gravity, same mass, different heights
    const ball2_medium = new WindyBallMover('B2m', 5).locate([30 * ls, 15 * ls])/*.debug(IsDebug)*/; // Chapter 2, Force - 2.8 Gravity, same mass, different heights
    const ball2_low = new WindyBallMover('B2l', 5).locate([40 * ls, 30 * ls])/*.debug(IsDebug)*/;    // Chapter 2, Force - 2.8 Gravity, same mass, different heights
    const ball3 = new WindyBallMover('B3', 10).locateRandomlyIn(resolution)/*.debug(IsDebug)*/;
    const balloon1 = new BalloonMover('Ba', 1).locate([5 * ls, resolution.height])/*.debug(IsDebug)*/;
    const magnetic1 = new MagneticMover('M1').locateRandomlyIn(resolution)/*.debug(IsDebug)*/;

    return [
        new NoMover(target),
        snake1/*.step({target, ...resolution})*/,
        snake2/*.step({target, ...resolution})*/,
        snake3/*.step({target, ...resolution})*/,
        fly1/*.step(resolution)*/,
        fish1/*.step(resolution)*/,
        ball1/*.step(resolution)*/,
        ball2_high/*.step(resolution)*/,
        ball2_medium/*.step(resolution)*/,
        ball2_low/*.step(resolution)*/,
        ball3/*.step(resolution)*/,
        balloon1/*.step(resolution)*/,
        magnetic1/*.step(resolution)*/,
    ].map(mover => mover.debug(isDebug))
};

export default createMovers;
