import React, { Component } from 'react'

import { fetchTrimmedStopTimings } from 'common/fetchRoutes'
import RouteList from './RouteList'

export default class RouteLoader extends Component {
  constructor() {
    super();

    document.onclick = () => {
      this.refetchTimings();
    };

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
      return (
        <RouteList timings={timings} />
      );
    } else if (loadingTimings) {
      return (
        <div>
          Loading...
        </div>
      );
    } else {
      return (
        <div>
          There has been an error. Please refresh.
        </div>
      );
    }
  }
}
