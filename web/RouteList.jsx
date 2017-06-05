import React, { Component } from 'react'

import RouteToken from './RouteToken';
import { dateToTime, minutesUntil } from 'common/formatTime';

const STOP_HEADING_HEIGHT_PX = '30px';

const stopNameCss = {
  height: STOP_HEADING_HEIGHT_PX,
  background: '#999',

  color: '#111',
  lineHeight: STOP_HEADING_HEIGHT_PX,
  fontFamily: 'Arial',
  fontSize: '16px',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  cursor: 'default',

  paddingLeft: '5px',

  borderBottom: 'solid #444 2px'
};

const routeContainerCss = {
  display: 'flex',

  background: '#bbb',
  padding: '5px',

  borderBottom: 'solid #666 1px'
}

const tokenContainerCss = {
  margin: '0px 5px',
};

const dateContainerCss = {
  display: 'flex',
  alignItems: 'flex-end',

  color: '#111',
  fontFamily: 'Arial',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  cursor: 'default',

  margin: '0px 5px',

};

const countdownContainerCss = {
  display: 'flex',
  alignItems: 'flex-end',

  color: '#555',
  fontFamily: 'Arial',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  cursor: 'default',

  margin: '0px 5px',
};

export default class RouteList extends Component {
  render() {
    const { timings } = this.props;

    return (
      <div>
        { timings.map(s => this.renderStop(s)) }
      </div>
    );
  }

  renderStop(stopData) {
    const { stop, stopName, times } = stopData;

    return (
      <div key={stop}>
        <div style={stopNameCss}>
          {stopData.stopName}
        </div>

        <div>
          {times.map(t => this.renderTime(t))}
        </div>
      </div>
    )
  }

  renderTime(routeTime) {
    const { route, time } = routeTime;
    const now = new Date();

    return (
      <div style={routeContainerCss} key={route + time}>
        <div style={tokenContainerCss}>
          <RouteToken route={route} />
        </div>
        <div style={dateContainerCss}>
          {dateToTime(time)}
        </div>
        <div style={countdownContainerCss}>
          {minutesUntil(time, now)}
        </div>
      </div>
    );
  }
}
