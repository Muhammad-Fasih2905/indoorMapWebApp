// // src/algorithms/dijkstra.js
// export const dijkstra = (nodes, edges, startNode, endNode) => {
//     // Initialize distances and previous nodes
//     const distances = {};
//     const prevNodes = {};
//     const unvisited = new Set(nodes.map(node => node.id));
  
//     nodes.forEach(node => {
//       distances[node.id] = Infinity;
//       prevNodes[node.id] = null;
//     });
  
//     distances[startNode] = 0;
  
//     while (unvisited.size > 0) {
//       const currentNode = Array.from(unvisited).reduce((minNode, node) =>
//         distances[node] < distances[minNode] ? node : minNode
//       );
  
//       if (currentNode === endNode) break;
//       unvisited.delete(currentNode);
  
//       edges
//         .filter(edge => edge.from === currentNode || edge.to === currentNode)
//         .forEach(edge => {
//           const neighbor = edge.from === currentNode ? edge.to : edge.from;
//           if (!unvisited.has(neighbor)) return;
  
//           const newDist = distances[currentNode] + edge.weight;
//           if (newDist < distances[neighbor]) {
//             distances[neighbor] = newDist;
//             prevNodes[neighbor] = currentNode;
//           }
//         });
//     }
  
//     const path = [];
//     let currentNode = endNode;
//     while (currentNode) {
//       path.unshift(nodes.find(node => node.id === currentNode));
//       currentNode = prevNodes[currentNode];
//     }
  
//     return path;
//   };
  