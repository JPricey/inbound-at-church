import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { fetchTrimmedStopTimings } from '../../common/fetchRoutes'
import RouteList from './RouteList'

const styles = StyleSheet.create({
  filler: {
    flex: 1,
  },
});

export default class RouteLoader extends Component {
  constructor() {
    super();

    this.state = {
      loadingTimings: false,
      loadedTimings: false,
      errorLoading: false,
      timings: [],
    }
  }

  componentWillMount() {
    this.refetchTimings();
  }

  refetchTimings() {
    if (this.state.loadingTimings) {
      return;
    }

    this.setState({ loadingTimings: true });

    fetchTrimmedStopTimings().then((results) => {
      this.setState({
        timings: results,
        loadedTimings: true,
        loadingTimings: false,
        errorLoading: false,
      });
    });
  }

  render() {
    const { loadedTimings, loadingTimings, timings } = this.state;

    if (loadedTimings) {
      return(
        <TouchableHighlight style={styles.filler} onPress={::this.refetchTimings}>
          <RouteList style={styles.filler} timings={timings} />
        </TouchableHighlight>
      );
    } else if (loadingTimings) {
      return (
        <Text> Loading... </Text>
      );
    } else {
      return (
        <Text> There has been an error. </Text>
      );
    }
  }
}
