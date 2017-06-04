import {
  MULTI_PREDICTIONS_COMMAND,
  MUNI_ROOT_URL,
  ROUTE_TO_STOP,
  SF_MUNI_AGENCY,
  STOP_NAMES,
} from './muniConstants';

function stopArg(route, stopId) {
  return `stops=${route}|${stopId}`
}

function fetchChurchPredictions() {
  const args = [
    MULTI_PREDICTIONS_COMMAND,
    SF_MUNI_AGENCY,
  ].concat(Array.from(ROUTE_TO_STOP).map(([route, stop]) => {
    return stopArg(route, stop)
  }));

  return fetch(MUNI_ROOT_URL + '?' + args.join('&')).then(response => response.json());
}

function predictionsToTimings(response) {
  const { predictions } = response;

  return new Map(predictions.map((routePredictions) => {
    const { routeTag } = routePredictions;
    const timings = routePredictions.direction.prediction.map((prediction) => {
      return new Date(Number.parseInt(prediction.epochTime));
    });
    return [routeTag, timings ]
  }));
}

export function fetchChurchTimings() {
  return fetchChurchPredictions().then(predictionsToTimings);
}

function th(){
}

export function fetchStopTimings() {
  return fetchChurchTimings().then((allTimings) => {
    let stops = new Map([...STOP_NAMES.keys()].map(k => [k, []]));

    allTimings.forEach((predictions, route) => {
      const stop = ROUTE_TO_STOP.get(route);
      predictions.forEach((prediction) => {
        stops.get(stop).push({
          time: prediction,
          route,
        });
      });
    });

    return stops;
  });
}

function trimTimings(timings, timeCutoff) {
  const sortedTimings = timings.sort((a, b) => {
    return a.time - b.time;
  })

  let size = 1;
  for (;size < sortedTimings.length && sortedTimings[size].time < timeCutoff; size++);

  return sortedTimings.slice(0, size);
}

export function fetchTrimmedStopTimings() {
  const now = new Date();

  const timeThreshhold = 10 * 60 * 1000; // 10 minutes
  const timeCutoff = new Date(now.getTime() + timeThreshhold);

  return fetchStopTimings().then((stopTimings) => {
    return [...stopTimings].map(([stop, timings]) => {
      const stopName = STOP_NAMES.get(stop);
      return {
        stop,
        stopName,
        times: trimTimings(timings, timeCutoff).map(({ route, time }) => {
          return {
            route,
            time,
          }
        })
      };
    }).sort((a, b) => {
      if (a.times.length == 0 && b.times.length == 0) {
        return 0;
      } else if (a.times.length == 0) {
        return -1;
      } else if (b.times.length == 0) {
        return 1;
      } else {
        return a.times[0].time - b.times[0].time;
      }
    });
  });
}
