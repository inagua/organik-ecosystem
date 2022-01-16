const {TargetMover} = require('./src/models/movers/target.mover');
const {SnakeMover} = require('./src/models/movers/snake.mover');
const {FlyMover} = require('./src/models/movers/fly.mover');
const {FishMover} = require('./src/models/movers/fish.mover');
const {WindyBallMover} = require('./src/models/movers/windy-ball.mover');

const IsDebug = true;

const display = (movers, {width, height}) => {
    let l = 0;
    return Array.from({length: height}).map(() => {
        let line = l + ':' + Array.from({length: width}).map(_ => ' ').join('');
        movers.forEach(mover => {
            const [x, y] = mover.location;
            if (Math.trunc(y) === l) {
                const i = Math.trunc(x);
                line = line.substring(0, i) + mover.name + line.substring(i + mover.name.length, line.length);
            }
        })
        l++;
        return line;
    });
}

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

setInterval(() => {
    display([
        new TargetMover(target),
        snake1.step(target, resolution),
        snake2.step(target, resolution),
        snake3.step(target, resolution),
        fly1.step(null, resolution),
        fish1.step(null, resolution),
        ball1.step(null, resolution),
        ball2.step(null, resolution),
        ball3.step(null, resolution),
    ], resolution)
        .map(line => console.log(line))
    ;
}, 1000);
