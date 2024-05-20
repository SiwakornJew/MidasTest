function quickestPath(board) {
    var ladders = {};
    var snakes = {};
    for (var _i = 0, _a = board.ladders; _i < _a.length; _i++) {
        var _b = _a[_i], start = _b[0], end = _b[1];
        ladders[start] = end;
    }
    for (var _c = 0, _d = board.snakes; _c < _d.length; _c++) {
        var _e = _d[_c], start = _e[0], end = _e[1];
        snakes[start] = end;
    }
    function getNextPositions(position) {
        var nextPositions = [];
        for (var diceRoll = 1; diceRoll <= 6; diceRoll++) {
            var nextPosition = position + diceRoll;
            if (ladders[nextPosition]) {
                nextPosition = ladders[nextPosition];
            }
            else if (snakes[nextPosition]) {
                nextPosition = snakes[nextPosition];
            }
            if (nextPosition <= 100) {
                nextPositions.push([nextPosition, diceRoll]);
            }
        }
        return nextPositions;
    }
    var queue = [[1, []]];
    var visited = new Set();
    while (queue.length > 0) {
        var _f = queue.shift(), currentPosition = _f[0], path = _f[1];
        if (currentPosition === 100) {
            return path;
        }
        for (var _g = 0, _h = getNextPositions(currentPosition); _g < _h.length; _g++) {
            var _j = _h[_g], nextPosition = _j[0], diceRoll = _j[1];
            if (!visited.has(nextPosition)) {
                visited.add(nextPosition);
                queue.push([nextPosition, path.concat(diceRoll)]);
            }
        }
    }
    return [];
}
