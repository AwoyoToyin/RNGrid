import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';

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
};

interface State {
  colorSequence: Array<string>;
  gridBgColors: Array<string>;
};

export default class Grid extends Component<Props, State>  {

  constructor(props) {
    super(props);

    this.state = {
      colorSequence: Colors.sequence,
      gridBgColors:  Colors.sequence
    }
  }

  _handleGridItemClicked = (index: number) => {
    let { gridBgColors } = this.state;
    console.log('Grid Colors: ', gridBgColors);

    if (gridBgColors[index+1]) {
      gridBgColors[index] = gridBgColors[index+1];
      this.setState({ gridBgColors }, function () {
        console.log('Clicked: ', this.state);
      });
    }
  }

  _renderItems = () => {

    // destructure the properties for easier use
    const { rows, cols, width } = this.props;
    let { gridBgColors, colorSequence } = this.state;
  
    // the maximum number of grids to be created
    const max = rows * cols;
  
    // holds the grids
    const grids = [];
  
    // set current backgroundColorindex
    let bgColorIndex = 1;
  
    for (let i = 1; i <= max; i++) {
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
        gridBgColors[i] = colorSequence[cols];
      } else {
        gridBgColors[i] = colorSequence[bgColorIndex];
      }
  
      {() => this.setState({gridBgColors})};
  
      grids.push(
        <View key={i}>
  
          <TouchableOpacity onPress={() => this._handleGridItemClicked(i)}>
            <View
              style={[styles.gridItem, {
                width: width,
                height: width,
                backgroundColor: this.state.gridBgColors[i]
              }]}
            >
              <Text style={styles.text}>{i}</Text>
            </View>
          </TouchableOpacity>
  
        </View>
      );
  
      bgColorIndex++;
    }
  
    return grids;
  }

  render() {
    console.log('GridBGColors: ', this.state.gridBgColors);
    return (
      <View style={styles.gridRow}>
        {this._renderItems()}
      </View>
    );
  }
};
