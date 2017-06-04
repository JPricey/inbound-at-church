export function dateToTime(date) {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

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
    return diffSeconds;
  }
}
