import rt from "reading-time";

export function getReadingTime(text: string) {
  const readingTime = rt(text);

  const roundedMins = Math.round(readingTime.minutes);

  const minutes = roundedMins === 0 ? 1 : roundedMins;

  const minuteOrMinutes = minutes > 1 ? "minutes" : "minute";
  const minOrMins = minutes > 1 ? "mins" : "min";

  return {
    minutes,
    minuteOrMinutes,
    minOrMins,
    words: readingTime.text,
  };
}

export type ReadingTime = ReturnType<typeof getReadingTime>;
