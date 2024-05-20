function quickestPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  const ladders: { [key: number]: number } = {};
  const snakes: { [key: number]: number } = {};

  for (const [start, end] of board.ladders) {
    ladders[start] = end;
  }

  for (const [start, end] of board.snakes) {
    snakes[start] = end;
  }

  function getNextPositions(position: number): [number, number][] {
    const nextPositions: [number, number][] = [];
    for (let diceRoll = 1; diceRoll <= 6; diceRoll++) {
      let nextPosition = position + diceRoll;
      if (ladders[nextPosition]) {
        nextPosition = ladders[nextPosition];
      } else if (snakes[nextPosition]) {
        nextPosition = snakes[nextPosition];
      }
      if (nextPosition <= 100) {
        nextPositions.push([nextPosition, diceRoll]);
      }
    }
    return nextPositions;
  }

  const queue: [number, number[]][] = [[1, []]];
  const visited: Set<number> = new Set();

  while (queue.length > 0) {
    const [currentPosition, path] = queue.shift()!;
    if (currentPosition === 100) {
      return path;
    }
    for (const [nextPosition, diceRoll] of getNextPositions(currentPosition)) {
      if (!visited.has(nextPosition)) {
        visited.add(nextPosition);
        queue.push([nextPosition, path.concat(diceRoll)]);
      }
    }
  }
  return [];
}
