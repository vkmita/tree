/**
 * A js object representing a tree
 * @typedef NodeObject
 * @property value - The value of the node
 * @property children - The children of the node
 */
type NodeObject = {
  value: any;
  children: Array<NodeObject>;
}

/**
 * A class representing a tree
 */
class Tree {
  root: Node;

  /**
   * Create an instance of a tree from a js object
   * @param treeObject 
   */
  constructor(treeObject: NodeObject) {
    const root = new Node({ value: treeObject.value });

    // this is pretty gnarly, but works quite well
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

  /**
   * Create a tree node
   * @param children The child nodes of the current node
   * @param value The value of the node
   */
  constructor(
    { children = [], value }: 
    { children?: Array<Node>, value: any }
  ) {
    Object.assign(this, { children, value });
  }
}

export default Tree;