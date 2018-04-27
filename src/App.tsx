/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */
import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Grid } from './components';

import { Colors } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

interface Props {};

interface State {
  gridWidth: number,
  colorSequence: Array<string>
};

export default class App extends Component<Props, State> {

  rows = 7; // number of rows we need
  cols = 7; // number of columns we need

  constructor(props: Props) {
    super(props);

    // set the initial gridWidth in the app state
    this.state = {
      gridWidth: 0,
      colorSequence: Colors.sequence
    }
  }

  /**
   * Handles Screen Orientation Change
   * Recalculates the width and grid size based on the current
   * screen width
   */
  _handleLayoutChanged = () => {
    // get current width
    const width = Dimensions.get('window').width;

    /**
     * Re-calculate each grid size
     * Since we're giving the grid items a margin of 2, that adds an extra width of (2 * num of rows)
     * 
     * Subtract this extra from the current width to get the actual width we're working with
     * Divide the result by the number of rows
     */
    const gridWidth = Math.round(width - (this.rows * 2)) / this.rows;
    // update the gridWidth in the state for use
    this.setState({ gridWidth });
  }

  _handleGridItemClicked = (index: number) => {
    const colorSequence = this.state.colorSequence;

    if (colorSequence[index+1]) {
      colorSequence[index] = colorSequence[index+1];
    }

    this.setState({ colorSequence })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        onLayout={this._handleLayoutChanged}
      >

        <Grid
          rows={7}
          cols={7}
          width={this.state.gridWidth}
          colors={this.state.colorSequence}
          onItemClick={this._handleGridItemClicked}
        />

      </ScrollView>
    );
  }
}
