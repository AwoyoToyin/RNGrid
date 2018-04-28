/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */
import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { Grid } from './components';
import { Colors } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

interface Props {};

interface State {
  gridWidth: number;
};

export default class App extends Component<Props, State> {

  rows = 7; // number of rows we need
  cols = 7; // number of columns we need

  constructor(props: Props) {
    super(props);

    // set the initial gridWidth in the app state
    this.state = {
      gridWidth: 0
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
     * Since we're giving the grid items a margin of 2, that adds an extra width of (2 * num of columns)
     * 
     * Subtract this extra from the current width to get the actual width we're working with
     * Divide the result by the number of columns
     */
    const gridWidth = Math.round(width - (this.cols * 2)) / this.cols;
    // update the gridWidth in the state for use
    this.setState({ gridWidth });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        onLayout={this._handleLayoutChanged}
      >

        <Grid
          rows={this.rows}
          cols={this.cols}
          width={this.state.gridWidth}
        />

      </ScrollView>
    );
  }
}
