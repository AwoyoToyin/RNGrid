import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  gridColumn: {
    flex: 1,
    flexDirection: 'column',
  },
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
  rows: number,
  cols: number,
  width: number,
  colors: Array<string>,
  onItemClick: any
};

const backgroundColor = (currentBgColor: string, nextBgColor: string) => this.animatedValue.interpolate({
  inputRange: [ 0, 1 ],
  outputRange: [ currentBgColor, nextBgColor ]
});

export default class Grid extends Component<Props> {

  render() {

    // destructure the properties for easier use
    const { rows, cols, width, colors, onItemClick } = this.props;

    return (

        <View style={styles.gridColumn}>

        {/* Loop through and create the required number of columns */}
        {_.times(cols, i =>
          <View
            key={i}
            style={styles.gridRow}
          >

            {/* Loop through and create the required number of rows */}
            {_.times(rows, r =>

              <TouchableOpacity key={r} onPress={() => onItemClick(r)}>
                <View
                  style={[styles.gridItem, {
                    width: width,
                    height: width,
                    backgroundColor: colors[r]
                  }]}
                >
                  <Text style={styles.text}>{r}</Text>
                </View>
              </TouchableOpacity>

            )}

          </View>
        )}

      </View>
    );
  }
};
