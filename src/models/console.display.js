
const renderCellOnLine = (x, y, isOnTheLine, symbol, line) => {
    if (isOnTheLine) {
        const i = Math.trunc(x);
        return line.substring(0, i) + symbol + line.substring(i + symbol.length, line.length);
    }
    return line;
}

module.exports.TermnalDisplay = class TermnalDisplay {

    constructor(width, height, {symbol, layers} = {}) {
        this.width = width;
        this.height = height;
        this.symbol = (symbol || ' ')[0];
        this.layers = layers || [];
    }

    render(movers) {
        let l = 0;
        return Array.from({length: this.height}).map(() => {
            let cells = Array.from({length: this.width}).map(_ => this.symbol);
            this.layers.forEach(({x, y, width, height, symbol}) => {
                if (l >= y && l <= y + height) {
                    const s = ((symbol || '') + '?')[0];
                    cells = cells.map((v, col) => (col >= x && col <= x + width) ? s : v);
                }
            })
            let line = cells.join('');
            movers.forEach(mover => {
                const [x, y] = mover.location;
                line = renderCellOnLine(x, y, Math.trunc(y) === l, mover.name, line)
            })
            return l++ + ':' + line;
        });
    }

}
