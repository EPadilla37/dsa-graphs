class Node {
  constructor(value) {
    this.value = value;
    this.adjacent = new Set();
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => this.addVertex(vertex));
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    this.nodes.delete(vertex);
    vertex.adjacent.forEach((adjVertex) => {
      adjVertex.adjacent.delete(vertex);
    });
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(node) {
      if (!node) return;

      visited.add(node);
      result.push(node.value);

      node.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      });
    }

    traverse(start);
    return result;
  }

  breadthFirstSearch(start) {
    const queue = [start];
    const visited = new Set();
    const result = [];

    visited.add(start);

    while (queue.length) {
      const currentNode = queue.shift();
      result.push(currentNode.value);

      currentNode.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };
