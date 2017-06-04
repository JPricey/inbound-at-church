import React, { Component } from 'react';

import { ROUTE_COLOURS } from 'data/muniConstants';

const TOKEN_HEIGHT = 25;
const TOKEN_HEIGHT_PX = `${TOKEN_HEIGHT}px`;

const circleCSS = {
  width: TOKEN_HEIGHT_PX,
  height: TOKEN_HEIGHT_PX,
  borderRadius: '50%',

  textAlign: 'center',
  lineHeight: TOKEN_HEIGHT_PX,

  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '#111',

  color: '#eee',
  fontFamily: 'Arial',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  cursor: 'default',
};

export default class RouteToken extends Component {
  render() {
    const { route } = this.props;
    const colour = ROUTE_COLOURS.get(route);

    const routeCSS = { ...circleCSS, backgroundColor: colour };

    return (
      <div style={routeCSS}>
        {route}
      </div>
    );
  }
}
