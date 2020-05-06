import Tree from "../Tree";

describe("Tree", () => {
  /**
   *      1
   *    2   4
   *  3
   */
  const objectNodes = {
    value: 1,
    children: [
      {
        value: 2,
        children: [
          {
            value: 3,
            children: [],
          },
        ],
      },
      {
        value: 4,
        children: [],
      },
    ],
  };

  const tree = new Tree(objectNodes);

  describe("constructor", () => {
    it("should create a tree resembling the object", () => {
      expect(tree.root.value).toEqual(1);
      expect(tree.root.children[0].value).toEqual(2);
      expect(tree.root.children[1].value).toEqual(4);
      expect(tree.root.children[0].children[0].value).toEqual(3);
      expect(tree.root.children[0].children[0].children).toEqual([]);
    });
  });

  describe("traversalValues", () => {
    describe('postOrder', () => {
      it("should return values in the correct order", () => {
        expect(tree.traversalValues({ traversal: 'postOrder' }))
        .toEqual([3, 2, 4, 1]);
      });
    });
    describe('levelOrder', () => {
      it("should return values in the correct order", () => {
        expect(tree.traversalValues({ traversal: 'levelOrder' })).toEqual([1, 2, 4, 3]);
      });
    });
  });
});
