type State = {
  energy: number;
  position: number;
  visitedShops: Set<number>;
};

function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  function neighbors(pos: number): [number, number][] {
    const result: [number, number][] = [];
    if (pos - 1 >= 0) {
      result.push([pos - 1, 1]);
    }
    result.push([pos + 1, 1]);
    if (stations.includes(pos)) {
      for (const station of stations) {
        if (station !== pos) {
          result.push([station, 0]);
        }
      }
    }
    return result;
  }

  const shopSet = new Set(shops);
  const nShops = shops.length;
  const visited = new Set<string>();
  const pq: State[] = [];

  pq.push({ energy: 0, position: start, visitedShops: new Set() });

  while (pq.length > 0) {
    const state = pq.sort((a, b) => a.energy - b.energy).shift();
    if (!state) break;

    const { energy, position, visitedShops } = state;

    if (position === target && visitedShops.size === nShops) {
      return energy;
    }

    const visitedKey = `${position}-${Array.from(visitedShops)
      .sort()
      .join(",")}`;
    if (visited.has(visitedKey)) {
      continue;
    }

    visited.add(visitedKey);

    for (const [neighbor, cost] of neighbors(position)) {
      const newEnergy = energy + cost;
      const newVisitedShops = new Set(visitedShops);
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
