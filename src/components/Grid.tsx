import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridItem: {
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  text: {
    color: 'white'
  }
});

interface Props {
  rows: number;
  cols: number;
  width: number;
  colorSequence: Array<string>;
  gridItemsBgColors: Array<string>;
  setGridItemsBgColor: any;
  onItemClick: any;
};

const _renderItems = (props) => {

  // destructure the properties for easier use
  const { rows, cols, width, gridItemsBgColors, colorSequence, setGridItemsBgColor, onItemClick } = props;

  // the maximum number of grids to be created
  const max = rows * cols;

  // holds the grids
  const grids = [];

  // set current backgroundColorindex
  let bgColorIndex = 1;

  for (let i = 1; i <= max; i++) {

    /** If current index exists in the colors array, set the grid item */
    if (!gridItemsBgColors[i]) {
      /**
       * If the current index is equals to the number of columns required or,
       * If the current index is a multiple of the columns required
       * Set the background color to the last color in the colors array and
       * Reset the bgColorIndex to 0 as it will be incremented later in the code
       * 
       * If neither, set the background color by the current bgColorIndex
       */
      if ((i === cols) || ((i % cols) === 0)) {
        bgColorIndex = 0;
        gridItemsBgColors[i] = colorSequence[cols];
      } else {
        gridItemsBgColors[i] = colorSequence[bgColorIndex];
      }
  
      // increment background color index for next round
      bgColorIndex++;
  
      // set the current grid item background color in the state
      {() => setGridItemsBgColor(gridItemsBgColors)}
    }

    grids.push(
      <View key={i}>

        <TouchableOpacity onPress={() => onItemClick(i)}>
          <View
            style={[styles.gridItem, {
              width: width,
              height: width,
              backgroundColor: gridItemsBgColors[i]
            }]}
          >
            <Text style={styles.text}>{i}</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }

  return grids;
}

const Grid = (props) =>  {

  return (
    <View style={styles.gridRow}>
      {_renderItems(props)}
    </View>
  );

};

export default Grid;
