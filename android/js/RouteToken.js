import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ROUTE_COLOURS } from '../../common/muniConstants';

const TOKEN_HEIGHT = 40;

const styles = StyleSheet.create({
  container: {
    width: TOKEN_HEIGHT,
    height: TOKEN_HEIGHT,
    borderRadius: TOKEN_HEIGHT/2,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#111',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',

    color: '#eee',
    fontFamily: 'Arial',
    fontSize: 24,
  }
});

export default class RouteToken extends Component {
  render() {
    const { route } = this.props;
    const colour = ROUTE_COLOURS.get(route);

    return (
      <View style={[styles.container, { backgroundColor: colour }]}>
        <Text style={styles.text}> {route} </Text>
      </View>
    );
  }
}
