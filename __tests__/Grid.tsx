import 'react-native';
import React from 'react';
import Grid from '../src/components/Grid';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders the supplied number of grids correctly', () => {
  const tree = renderer.create(
    <Grid
      rows={3}
      cols={3}
      width={30}
      colorSequence={['grey', 'brown', 'pink']}
      gridItemsBgColors={jest.fn}
      setGridItemsBgColor={jest.fn}
      onItemClick={jest.fn}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
