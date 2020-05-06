import Tree from '../Tree';

describe('Tree', () => {
  describe('constructor', () => {
    it('should create a tree resembling the object', () => {
      const objectNodes = {
        value: 1,
        children: [
          {
            value: 2,
            children: [
              {
                value: 3,
                children: [],
              }
            ]
          },
          {
            value: 4,
            children: [],
          }
        ]
      };

      const tree = new Tree(objectNodes);

      expect(tree.root.value).toEqual(1);
      expect(tree.root.children[0].value).toEqual(2);
      expect(tree.root.children[1].value).toEqual(4);
      expect(tree.root.children[0].children[0].value).toEqual(3);
      expect(tree.root.children[0].children[0].children).toEqual([]);
    })
  })
})