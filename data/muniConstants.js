export let MUNI_ROOT_URL = 'http://webservices.nextbus.com/service/publicJSONFeed';

export let COMMAND_PREFIX = 'command=';
export let MULTI_PREDICTIONS_COMMAND_OPTION = 'predictionsForMultiStops';

export let MULTI_PREDICTIONS_COMMAND = COMMAND_PREFIX + MULTI_PREDICTIONS_COMMAND_OPTION;

export let SF_MUNI_AGENCY = 'a=sf-muni';

export let ROUTE_TO_STOP = new Map(Object.entries({
  N: 4448,
  J: 7073,
  L: 5726,
  M: 5726,
  KT: 5726,
}));

export let ROUTE_COLOURS = new Map(Object.entries({
  N: '#003399',
  J: '#cc6600',
  L: '#660099',
  M: '#006633',
  KT: '#cc0033',
}));

export let STOP_TO_ROUTES = do {
  let result = new Map();
  ROUTE_TO_STOP.forEach((stop, route) => {
    if (result.has(stop)) {
      result.get(stop).push(route);
    } else {
      result.set(stop, [route]);
    }
  })
  result;
};

export let STOP_NAMES = new Map([
  [4448, 'N (14th Street)'],
  [7073, 'J (Church Street)'],
  [5726, 'KT, M, L (Underground)'],
]);
