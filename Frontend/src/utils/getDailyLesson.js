const DAY_IN_MS = 86_400_000
const START_YEAR = 2026

const getLocalCalendarTimestamp = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return null
  }

  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  )
}

const getDaysSinceStart = (date) => {
  const currentDayTimestamp = getLocalCalendarTimestamp(date)

  if (currentDayTimestamp === null) {
    return null
  }

  const startDayTimestamp = Date.UTC(START_YEAR, 0, 1)

  return Math.floor(
    (currentDayTimestamp - startDayTimestamp) / DAY_IN_MS,
  )
}

export const getDailyLessonIndex = (
  lessonsLength,
  date = new Date(),
) => {
  if (!Number.isInteger(lessonsLength) || lessonsLength <= 0) {
    return -1
  }

  const daysSinceStart = getDaysSinceStart(date)

  if (!Number.isInteger(daysSinceStart)) {
    return -1
  }

  return (
    (daysSinceStart % lessonsLength) + lessonsLength
  ) % lessonsLength
}

export const getDailyLesson = (
  lessons,
  date = new Date(),
) => {
  if (!Array.isArray(lessons) || lessons.length === 0) {
    return null
  }

  const index = getDailyLessonIndex(lessons.length, date)

  return index === -1 ? null : lessons[index] ?? null
}