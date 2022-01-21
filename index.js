const {NoMover} = require('./src/models/movers/exercises/no.mover');
const {SnakeMover} = require('./src/models/movers/snake.mover');
const {FlyMover} = require('./src/models/movers/fly.mover');
const {FishMover} = require('./src/models/movers/fish.mover');
const {WindyBallMover} = require('./src/models/movers/exercises/windy-ball.mover');
const {BalloonMover} = require('./src/models/movers/exercises/balloon.mover');
const {MagneticMover} = require('./src/models/movers/exercises/magnetic.mover');
const {TermnalDisplay} = require('./src/models/console.display');

const IsDebug = false;

const resolution = {width: 80, height: 40};
const target = [25, 15];

const snake1 = new SnakeMover('s1').locate([0, 0]).debug(IsDebug);
const snake2 = new SnakeMover('s2').locate([30, 20]).debug(IsDebug);
const snake3 = new SnakeMover('s3').locate([40, 15]).debug(IsDebug);
const fly1 = new FlyMover('F1').locate([15, 23]).debug(IsDebug);
const fish1 = new FishMover('P1').locate([35, 7]).debug(IsDebug);
const ball1 = new WindyBallMover('B1', 1).locateRandomlyIn(resolution).debug(IsDebug);
const ball2 = new WindyBallMover('B2', 5).locateRandomlyIn(resolution).debug(IsDebug);
const ball3 = new WindyBallMover('B3', 10).locateRandomlyIn(resolution).debug(IsDebug);
const balloon1 = new BalloonMover('Ba', 1).locate([5, resolution.height]).debug(IsDebug);
const magnetic1 = new MagneticMover('M1').locateRandomlyIn(resolution).debug(IsDebug);

const terminalDisplay = new TermnalDisplay(resolution.width, resolution.height, {
    layers: [
        {x: 10, y: 10, width: 10, height: 10, symbol: '~', friction: 0.01},
        {x: 15, y: 15, width: 10, height: 10, symbol: '.', friction: 0.05}
    ]
})

setInterval(() => {
    terminalDisplay.render([
        new NoMover(target),
        snake1.step({target, ...resolution}),
        snake2.step({target, ...resolution}),
        snake3.step({target, ...resolution}),
        fly1.step(resolution),
        fish1.step(resolution),
        ball1.step(resolution),
        ball2.step(resolution),
        ball3.step(resolution),
        balloon1.step(resolution),
        magnetic1.step(resolution),
    ], resolution)
        .map(line => console.log(line))
    ;
}, 1000);
