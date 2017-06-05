import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import RouteToken from './RouteToken';
import { dateToTime, minutesUntil } from '../../common/formatTime';

const STOP_HEADING_HEIGHT = 40;
const HEADING_FONT_SIZE = 28;
const DATE_FONT_SIZE = 24;

const styles = StyleSheet.create({
  stopName: {
    height: STOP_HEADING_HEIGHT,
    backgroundColor: '#999',

    paddingLeft: 5,
  },
  nameBorderBottom: {
    height: 2,
    backgroundColor: '#444'
  },
  stopText: {
    color: '#111',
    height: STOP_HEADING_HEIGHT,
    textAlignVertical: 'center',

    fontFamily: 'Arial',
    fontSize: HEADING_FONT_SIZE,
  },
  routeContainer: {
    backgroundColor: '#bbb',
  },
  routeContentContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  routeContainerBottom: {
    height: 1,
    backgroundColor: '#666',
  },
  tokenContainer: {
    paddingLeft: 5,
  },
  dateContainer: {
    marginLeft: 10,
  },
  filler: {
    flex: 1,
  },
  emptyFiller: {
    flex: 1, 
    backgroundColor: '#eee'
  },
  dateText: {
    fontFamily: 'Arial',
    fontSize: DATE_FONT_SIZE,
    color: '#111',
    textAlignVertical: 'bottom',
  },
  countdownContainer: {
    marginLeft: 10,
  },
  countdownText: {
    fontFamily: 'Arial',
    fontSize: DATE_FONT_SIZE,
    color: '#555',
    textAlignVertical: 'bottom',
  },
});

export default class RouteList extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const { timings } = this.props;

    const now = new Date();

    return(
      <View style={styles.filler}  ref={component => this._root = component}>
        { timings.map(s => this.renderStop(s, now)) }
        <View style={styles.emptyFiller} />
      </View>
    );
  }

  renderStop(stopData, now) {
    const { stop, stopName, times } = stopData;

    if (times.length == 0) {
      return null;
    }

    return (
      <View key={stop}>
        <View style={styles.stopName}>
          <Text style={styles.stopText}> {stopData.stopName} </Text>
        </View>
        <View style={styles.nameBorderBottom} />

        <View>
          {times.map(t => this.renderTime(t, now))}
        </View>
      </View>
    )
  }

  renderTime(routeTime, now) {
    const { route, time } = routeTime;

    return (
      <View style={styles.routeContainer} key={route + time}>
        <View style={styles.routeContentContainer}>
          <View style={styles.tokenContainer}>
            <RouteToken route={route}/>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.filler} />
            <Text style={styles.dateText}> {dateToTime(time)} </Text>
          </View>
          <View style={styles.countdownContainer}>
            <View style={styles.filler} />
            <Text style={styles.countdownText}> {minutesUntil(time, now)} </Text>
          </View>
        </View>
        <View style={styles.routeContainerBottom} />
      </View>
    );
  }
}
