function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  function aStar(start, end, grid) {
    const openSet = [];
    const closedSet = new Set();
    const cameFrom = new Map();
  
    const gScore = new Map();
    const fScore = new Map();
  
    openSet.push(start);
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, end));
  
    while (openSet.length > 0) {
      openSet.sort((a, b) => fScore.get(a) - fScore.get(b));
      const current = openSet.shift();
  
      if (current.x === end.x && current.y === end.y) {
        const path = [];
        let temp = current;
        while (temp) {
          path.push(temp);
          temp = cameFrom.get(temp);
        }
        return path.reverse();
      }
  
      closedSet.add(current);
  
      for (const neighbor of getNeighbors(current, grid)) {
        if (closedSet.has(neighbor) || !neighbor.traversable) continue;
  
        const tentativeGScore = gScore.get(current) + 1;
  
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeGScore >= gScore.get(neighbor)) {
          continue;
        }
  
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, gScore.get(neighbor) + heuristic(neighbor, end));
      }
    }
  
    return [];
  }
  
  function getNeighbors(node, grid) {
    const neighbors = [];
    const { x, y } = node;
    if (grid[x - 1] && grid[x - 1][y]) neighbors.push(grid[x - 1][y]);
    if (grid[x + 1] && grid[x + 1][y]) neighbors.push(grid[x + 1][y]);
    if (grid[x][y - 1]) neighbors.push(grid[x][y - 1]);
    if (grid[x][y + 1]) neighbors.push(grid[x][y + 1]);
    return neighbors;
  }
  
  export { aStar };
  