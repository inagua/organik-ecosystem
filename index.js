const {TargetMover} = require('./src/models/movers/target.mover');
const {SnakeMover} = require('./src/models/movers/snake.mover');
const {FlyMover} = require('./src/models/movers/fly.mover');
const {FishMover} = require('./src/models/movers/fish.mover');
const {WindyBallMover} = require('./src/models/movers/windy-ball.mover');
const {BalloonMover} = require('./src/models/movers/balloon.mover');
const {MagneticMover} = require('./src/models/movers/magnetic.mover');
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

const termnalDisplay = new TermnalDisplay(resolution.width, resolution.height, {
    layers: [
        {x: 10, y: 10, width: 10, height: 10, symbol: '~'},
        {x: 15, y: 15, width: 10, height: 10, symbol: '.'}
    ]
})

setInterval(() => {
    termnalDisplay.render([
        new TargetMover(target),
        snake1.step(target, resolution),
        snake2.step(target, resolution),
        snake3.step(target, resolution),
        fly1.step(null, resolution),
        fish1.step(null, resolution),
        ball1.step(null, resolution),
        ball2.step(null, resolution),
        ball3.step(null, resolution),
        balloon1.step(null, resolution),
        magnetic1.step(null, resolution),
    ], resolution)
        .map(line => console.log(line))
    ;
}, 1000);
