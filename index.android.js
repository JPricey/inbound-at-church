import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RouteLoader from './android/js/RouteLoader';

export default class InboundAtChurch extends Component {
  render() {
    return <RouteLoader />
  }
}

AppRegistry.registerComponent('InboundAtChurch', () =>InboundAtChurch);
