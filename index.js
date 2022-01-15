const {TargetMover} = require('./src/models/movers/target.mover');
const {SnakeMover} = require('./src/models/movers/snake.mover');

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

const target = [25, 15];
const snake1 = new SnakeMover('s1').locate([0, 0]);
const snake2 = new SnakeMover('s2').locate([30, 20]);
const snake3 = new SnakeMover('s3').locate([40, 15]);
setInterval(() => {
    // console.log('>>>>> STEP=', snake.step([20, 50]).toString());

    const d = display([
        new TargetMover(target),
        snake1.step(target),
        snake2.step(target),
        snake3.step(target),
    ], {width: 50, height: 40});
    d.map(line => console.log(line));

}, 1000);
