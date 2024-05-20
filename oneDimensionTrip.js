function minEnergy(start, shops, stations, target) {
    function neighbors(pos) {
        var result = [];
        if (pos - 1 >= 0) {
            result.push([pos - 1, 1]);
        }
        result.push([pos + 1, 1]);
        if (stations.includes(pos)) {
            for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
                var station = stations_1[_i];
                if (station !== pos) {
                    result.push([station, 0]);
                }
            }
        }
        return result;
    }
    var shopSet = new Set(shops);
    var nShops = shops.length;
    var visited = new Set();
    var pq = [];
    pq.push({ energy: 0, position: start, visitedShops: new Set() });
    while (pq.length > 0) {
        var state = pq.sort(function (a, b) { return a.energy - b.energy; }).shift();
        if (!state)
            break;
        var energy = state.energy, position = state.position, visitedShops = state.visitedShops;
        if (position === target && visitedShops.size === nShops) {
            return energy;
        }
        var visitedKey = "".concat(position, "-").concat(Array.from(visitedShops)
            .sort()
            .join(","));
        if (visited.has(visitedKey)) {
            continue;
        }
        visited.add(visitedKey);
        for (var _i = 0, _a = neighbors(position); _i < _a.length; _i++) {
            var _b = _a[_i], neighbor = _b[0], cost = _b[1];
            var newEnergy = energy + cost;
            var newVisitedShops = new Set(visitedShops);
            if (shopSet.has(neighbor)) {
                newVisitedShops.add(neighbor);
            }
            pq.push({
                energy: newEnergy,
                position: neighbor,
                visitedShops: newVisitedShops,
            });
        }
    }
    return -1;
}
