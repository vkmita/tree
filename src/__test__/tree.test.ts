import Tree from "../Tree";

describe("Tree", () => {
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

  describe("valuesBreadthFirst", () => {
    it("should return values in the correct order", () => {
      expect(tree.valuesBreadthFirst()).toEqual([1, 2, 4, 3]);
    });
  });

  describe("valuesDepthFirst", () => {
    expect(tree.valuesDepthFirst()).toEqual([3, 4, 2, 1]);
  });
});
