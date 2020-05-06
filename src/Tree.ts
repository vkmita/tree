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
type Traversal = 'levelOrder' | 'postOrder' | 'preOrder';

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
            const newNode = new Node({ value: child.value });
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
   * Node values when traversing in level order (also "breadth first")
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

  /**
   * Node values when traversing in post order
   */
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
   * Node values when traversing in pre order
   */
  preOrderValues = (node = this.root, values = []): Array<any> => {
    values.push(node.value);

    const { children } = node;
    children.forEach(child => {
      values = this.preOrderValues(child, values);
    });

    return values;
  }

  /**
   * Node values for traversal in the specified traversal order
   */
  values = ({ traversal }: { traversal: Traversal }): Array<any> => {
    switch (traversal) {
      case('levelOrder'):
        return this.levelOrderValues();
      case('postOrder'):
        return this.postOrderValues();
      case('preOrder'):
        return this.preOrderValues();
    }
  };
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
  constructor({
    children = [],
    value,
  }: {
    children?: Array<Node>;
    value: any;
  }) {
    Object.assign(this, { children, value });
  }
}

export default Tree;
