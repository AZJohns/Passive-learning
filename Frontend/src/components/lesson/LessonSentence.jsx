import bookIcon from "../../assets/book.svg"
import verbs from "../../data/verbs.json"
import { getDailyLesson } from "../../utils/getDailyLesson.js"
import { useState } from "react"

const getText = (value) => {
    if (typeof value === "string" || typeof value === "number") {
        return String(value)
    }

    return ""
}

const LessonSentence = () => {
    const [activeLesson, setActiveLesson] = useState(getDailyLesson(verbs));

    if (!activeLesson || typeof activeLesson !== "object") {
        return (
            <section className="bg-white max-w-200 h-auto p-1 m-1 border border-black rounded-3xl flex flex-col gap-3 [&_span]:text-blue-600" >
                <article className="mt-1 mb-2">
                    <div className="flex items-center ml-2 mt-2">
                        <img className="w-10 h-10"
                            src={bookIcon}
                            alt="" />
                    </div>

                    <p className="text-center font-bold text-lg text-blue-600">No hay lecciones disponibles.</p>
                </article>
            </section>
        )
    }


    const renderSentence = (sentence, conjugation) => {
        const sentenceText = getText(sentence)
        const conjugationText = getText(conjugation)
        const conjugationIndex = conjugationText ? sentenceText.indexOf(conjugationText) : -1

        if (conjugationIndex === -1) {
            return sentenceText
        }

        return (
            <>
                {sentenceText.slice(0, conjugationIndex)}
                <span>{sentenceText.slice(conjugationIndex, conjugationIndex + conjugationText.length)}</span>
                {sentenceText.slice(conjugationIndex + conjugationText.length)}
            </>
        )
    }

    return (
        // <div>
        //     <h1>Lesson sentence va la frace principal</h1>
        // </div>
        <article className="flex min-h-[68px] flex-1 flex-col items-center justify-center px-3">
            <h2 className="text-center font-black text-[19px] leading-[1.15] uppercase tracking-tight text-gray-800">
                {renderSentence(
                    activeLesson.sentence,
                    activeLesson.conjugation
                )}
                {/* La frase principal */}
            </h2>
            <p className="mt-1 text-center text-xs leading-snug font-medium text-gray-500">
                {getText(activeLesson.sentenceTranslation)}
                {/* traduccion de la frase principal */}
            </p>
        </article>
    );
};

export default LessonSentence;
