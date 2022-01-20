
const renderCellOnLine = (x, y, lineIndex, symbol, line) => {
    if (Math.trunc(y) === lineIndex) {
        const i = Math.trunc(x);
        return line.substring(0, i) + symbol + line.substring(i + symbol.length, line.length);
    }
    return line;
}

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
                line = renderCellOnLine(x, y, l, mover.name, line)
            })
            l++;
            return line;
        });
    }

}
