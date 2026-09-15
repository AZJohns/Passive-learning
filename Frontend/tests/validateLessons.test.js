// importamos las librerias desde node para validar 
import test from "node:test"
import assert from "node:assert/strict"
import { validateLessons } from "../src/utils/validateLessons.js"

// definimos las constantes de validación
const MIN_LONG_SENTENCE_LENGTH = 120
const MIN_LONG_RULE_LENGTH = 200

// creamos una lección con datos validos
const createValidLesson = (overrides = {}) => ({
    id: 900001,
    baseVerb: "study",
    verbTranslation: "estudiar",
    subject: "She",
    subjectTranslation: "Ella",
    conjugation: "is studying",
    tense: "Present Continuous",
    tenseTranslation: "Presente continuo",
    sentence: "She is studying English now.",
    sentenceTranslation: "Ella está estudiando inglés ahora.",
    rule: "Usamos el presente continuo para acciones que están ocurriendo ahora.",
    level: "A2",
    category: "education",
    irregular: false,
    ...overrides,
})

test("acepta una lección completa con una frase larga", () => {
    const lesson = createValidLesson({
        id: 900002,
        sentence:
            "She is studying English at the public library this afternoon because she has an important exam next week and wants to review every topic carefully before returning home.",
        sentenceTranslation:
            "Ella está estudiando inglés en la biblioteca pública esta tarde porque tiene un examen importante la próxima semana y quiere repasar cuidadosamente todos los temas antes de volver a casa.",
    })

    // comprobacion assert.ok evita que alguien acorte la frase en el futuro y la prueba siga llamándose “frase larga” sin serlo realmente.
    assert.ok(
        lesson.sentence.length >= MIN_LONG_SENTENCE_LENGTH,
        `La frase debe tener al menos ${MIN_LONG_SENTENCE_LENGTH} caracteres.`,
    )

    // assert.deepEqual significa que los objetos son iguales
    assert.deepEqual(validateLessons([lesson]), [])
})

test("acepta una lección completa con una regla larga", () => {
    const lesson = createValidLesson({
        id: 900003,
        rule:
            "Usamos el presente continuo para describir acciones que están ocurriendo en el momento de hablar o durante un periodo temporal cercano al presente. Se forma con el verbo to be conjugado según el sujeto y el verbo principal terminado en -ing. También puede utilizarse para situaciones temporales que no necesariamente suceden en este segundo exacto.",
    })

    assert.ok(
        lesson.rule.length >= MIN_LONG_RULE_LENGTH,
        `La regla debe tener al menos ${MIN_LONG_RULE_LENGTH} caracteres.`,
    )

    assert.deepEqual(validateLessons([lesson]), [])
})