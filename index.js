const {TargetMover} = require('./src/models/movers/target.mover');
const {SnakeMover} = require('./src/models/movers/snake.mover');
const {FlyMover} = require('./src/models/movers/fly.mover');
const {FishMover} = require('./src/models/movers/fish.mover');

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

const snake1 = new SnakeMover('s1').locate([0, 0]);
const snake2 = new SnakeMover('s2').locate([30, 20]);
const snake3 = new SnakeMover('s3').locate([40, 15]);
const fly1 = new FlyMover('F1').locate([15, 23]);
const fish1 = new FishMover('P1').locate([35, 7]);

setInterval(() => {
    display([
        new TargetMover(target),
        snake1.step(target, resolution),
        snake2.step(target, resolution),
        snake3.step(target, resolution),
        fly1.step(null, resolution),
        fish1.step(null, resolution),
    ], resolution)
        .map(line => console.log(line))
    ;
}, 1000);
