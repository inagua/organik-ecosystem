module.exports.TermnalDisplay = class TermnalDisplay {

    constructor(width, height, {layers} = {}) {
        this.width = width;
        this.height = height;
        this.layers = layers || [];
    }

    render(movers) {
        let l = 0;
        return Array.from({length: this.height}).map(() => {
            let line = l + ':' + Array.from({length: this.width}).map(_ => ' ').join('');
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


}
