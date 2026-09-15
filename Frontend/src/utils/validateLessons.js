export const requiredLessonFields = [
  "id",
  "baseVerb",
  "verbTranslation",
  "subject",
  "subjectTranslation",
  "conjugation",
  "tense",
  "tenseTranslation",
  "sentence",
  "sentenceTranslation",
  "rule",
  "level",
  "category",
  "irregular",
]

export const allowedTenses = [
  "Present Simple",
  "Past Simple",
  "Future Simple",
  "Present Continuous",
  "Past Continuous",
  "Present Perfect",
  "Be going to",
]


const allowedLevels = ["A1", "A2"]
const stringFields = requiredLessonFields.filter(
  (field) => field !== "id" && field !== "irregular",
)

const hasOwn = (lesson, field) => Object.prototype.hasOwnProperty.call(lesson, field)

export const validateLessons = (lessons) => {
  const errors = []

  if (!Array.isArray(lessons)) {
    return ["Lesson data must be an array."]
  }

  const ids = new Set()

  lessons.forEach((lesson, index) => {
    const label = `Lesson at index ${index}`

    if (!lesson || typeof lesson !== "object" || Array.isArray(lesson)) {
      errors.push(`${label} must be an object.`)
      return
    }

    const keys = Object.keys(lesson)
    const missingFields = requiredLessonFields.filter((field) => !hasOwn(lesson, field))
    const extraFields = keys.filter((field) => !requiredLessonFields.includes(field))

    missingFields.forEach((field) => {
      errors.push(`${label} is missing "${field}".`)
    })

    extraFields.forEach((field) => {
      errors.push(`${label} has unexpected field "${field}".`)
    })

    if (!Number.isInteger(lesson.id)) {
      errors.push(`${label} has an invalid id.`)
    } else if (ids.has(lesson.id)) {
      errors.push(`${label} repeats id ${lesson.id}.`)
    } else {
      ids.add(lesson.id)
    }

    stringFields.forEach((field) => {
      if (typeof lesson[field] !== "string" || lesson[field].trim() === "") {
        errors.push(`${label} has an invalid "${field}".`)
      }
    })

    if (typeof lesson.irregular !== "boolean") {
      errors.push(`${label} has an invalid irregular value.`)
    }

    if (typeof lesson.tense === "string" && !allowedTenses.includes(lesson.tense)) {
      errors.push(`${label} uses an unsupported tense "${lesson.tense}".`)
    }

    if (typeof lesson.level === "string" && !allowedLevels.includes(lesson.level)) {
      errors.push(`${label} uses an unsupported level "${lesson.level}".`)
    }

    if (
      typeof lesson.sentence === "string" &&
      typeof lesson.conjugation === "string" &&
      !lesson.sentence.includes(lesson.conjugation)
    ) {
      errors.push(`${label} does not include the conjugation in the sentence.`)
    }
  })


  return errors
}
