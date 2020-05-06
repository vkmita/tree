type NodeObject = {
  value: any;
  children: Array<NodeObject>;
}

/**
 * A class represeniting a tree
 */
class Tree {
  root: Node;

  constructor(treeObject: NodeObject) {
    const root = new Node({ value: treeObject.value });

    let nodeObjectChildrenTuples: Array<[Node, Array<NodeObject>]> = [[root, treeObject.children]] 
    while (nodeObjectChildrenTuples.length > 0) {
      nodeObjectChildrenTuples = nodeObjectChildrenTuples.reduce(
        (newTuples, [node, objectChildren]) => {
          node.children = objectChildren.map(
            child => {
              const newNode = new Node ({ value: child.value })
              newTuples.push([newNode, child.children]);
              return newNode;
            }
          )
          return newTuples;
        }, [])
    }

    this.root = root;
  }
}

/**
 * A class representing a node of a tree
 */
class Node {
  children: Array<Node>;
  value: any;

  constructor(
    { children = [], value }: 
    { children?: Array<Node>, value: any }
  ) {
    Object.assign(this, { children, value });
  }
}

export default Tree;