// __tests__/Intro-test.js
import React from 'react';
import Intro from '../Intro';
import 'react-native';

import renderer from 'react-test-renderer';

let findElement = (tree, element) => {
  for (let node in tree.children) {
    if (tree.children[node].props.testID === element) {
      return true;
    }
  }
  return undefined;
};

it('find element', () => {
  // const tree = renderer.create(<Intro />).toJSON();
  // expect(tree).toMatchSnapshot();

  // let tree = renderer.create(<Intro />).getInstance();
  // console.log(tree);

  // tree._sum(2, 2);

  // expect(tree.state.data).toEqual(4);
  // expect(findElement(tree, 'username')).toBeDefined();
});
