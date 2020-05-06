/**
 * A js object representing a tree
 * @typedef NodeObject
 * @property value - The value of the node
 * @property children - The children of the node
 */
type NodeObject = {
  value: any;
  children: Array<NodeObject>;
};

/**
 * The types of depth first search traversals
 * @typedef Traversal
 */
type Traversal = 'inOrder' | 'levelOrder' | 'postOrder' | 'preOrder';

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
    let nodeObjectChildrenTuples: Array<[Node, Array<NodeObject>]> = [
      [root, treeObject.children],
    ];
    while (nodeObjectChildrenTuples.length > 0) {
      nodeObjectChildrenTuples = nodeObjectChildrenTuples.reduce(
        (newTuples, [node, objectChildren]) => {
          node.children = objectChildren.map((child) => {
            const newNode = new Node({ parent: node, value: child.value });
            newTuples.push([newNode, child.children]);
            return newNode;
          });
          return newTuples;
        },
        []
      );
    }

    this.root = root;
  }

  /**
   * Node values when searching breadth first, treat values as a "queue"
   */
  levelOrderValues = (): Array<any> => {
    const values = [this.root.value];
    let children = this.root.children;
    while (children.length > 0) {
      children = children.reduce((nextChildren, child) => {
        values.push(child.value);
        nextChildren.push(...child.children);
        return nextChildren;
      }, []);
    }

    return values;
  };

  postOrderValues = (node = this.root, values = []): Array<any> => {
    const { children } = node;
    if (children.length === 0) {
      values.push(node.value);
      return values;
    }

    children.forEach(child => {
      values = this.postOrderValues(child, values);
    });

    values.push(node.value);

    return values;
  }

  /**
   * Node values for postorder traversal (doesn't actually treverse in
   *   postorder)
   */
  values = ({ traversal }: { traversal: Traversal }): Array<any> => {
    switch (traversal) {
      case('inOrder'):
      case('levelOrder'):
        return this.levelOrderValues();
      case('postOrder'):
        return this.postOrderValues();
      case('preOrder'):
    }
  };
}

/**
 * A class representing a node of a tree
 */
class Node {
  children: Array<Node>;
  parent?: Node;
  value: any;

  /**
   * Create a tree node
   * @param children The child nodes of the current node
   * @param value The value of the node
   */
  constructor({
    children = [],
    parent,
    value,
  }: {
    children?: Array<Node>;
    parent?: Node,
    value: any;
  }) {
    Object.assign(this, { children, value });
  }
}

export default Tree;
