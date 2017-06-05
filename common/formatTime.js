function padStart(str) {
  if (str.length == 1) {
    return '0' + str;
  } else {
    return str
  }
}

function modHours(hours) {
  if (hours % 12 === 0) {
    return 12;
  }

  return hours % 12;
}

export function dateToTime(date) {
  const hours = modHours(date.getHours());
  const minutes = padStart(date.getMinutes().toString());
  const seconds = padStart(date.getSeconds().toString());

  return [hours, minutes, seconds].join(':');
}

export function minutesUntil(date, now) {
  const dateTicks = date.getTime();
  const nowTicks = now.getTime();

  const diffTicks = dateTicks - nowTicks;
  const diffTotalSeconds = Math.round(diffTicks / 1000);

  if (diffTotalSeconds < 0) {
    return minutesUntil(now, date) + ' Ago';
  }

  if (diffTotalSeconds === 0) {
    return 'Now';
  }

  const diffSeconds = diffTotalSeconds % 60;
  const diffMinutes = Math.floor(diffTotalSeconds / 60);

  const secondsStr = `${diffSeconds} S`;

  if (diffMinutes > 0) {
    return `${diffMinutes} M, ${secondsStr}`
  } else {
    return secondsStr;
  }
}
