import bookIcon from "../assets/book.svg"
import starIcon from "../assets/star.png"
import chainIcon from "../assets/chain.png"
import calendarIcon from "../assets/calendar.png"
import profileIcon from "../assets/profile.png"
import lightIcon from "../assets/light.png"
import verbs from "../data/verbs.json"
import { getDailyLesson } from "../utils/getDailyLesson"

const getText = (value) => {
    if (typeof value === "string" || typeof value === "number") {
        return String(value)
    }

    return ""
}

const getFieldLabel = (field) =>
    field
        .replace(/^verb/i, "")
        .replace(/^base/i, "")
        .replace(/([A-Z])/g, " $1")
        .trim()
        .toUpperCase()

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

const Widget = () => {
    const activeLesson = getDailyLesson(verbs)

    if (!activeLesson || typeof activeLesson !== "object") {
        return (
            <section className="bg-white max-w-200 h-auto p-1 m-1 border border-black rounded-3xl flex flex-col gap-3 [&_span]:text-blue-600" >
                <article className="mt-1 mb-2">
                    <div className="flex items-center ml-2 mt-2">
                        <img className="w-10 h-10" src={bookIcon} alt="" />
                    </div>

                    <p className="text-center font-bold text-lg text-blue-600">No hay lecciones disponibles.</p>
                </article>
            </section>
        )
    }

    const title = [activeLesson.category, activeLesson.level].map(getText).filter(Boolean).join(" - ")
    const detailItems = [
        { icon: chainIcon, field: "verbTranslation", value: activeLesson.verbTranslation, labelClassName: "text-gray-600 text-sm" },
        { icon: chainIcon, field: "baseVerb", value: activeLesson.baseVerb, labelClassName: "text-gray-600 text-sm" },
        { icon: starIcon, field: "conjugation", value: activeLesson.conjugation, labelClassName: "text-gray-600 text-sm" },
        { icon: calendarIcon, field: "tense", value: activeLesson.tense, labelClassName: "text-gray-600 font-sm" },
        { icon: profileIcon, field: "subject", value: activeLesson.subject, labelClassName: "text-gray-600 text-sm" },
    ]

    return (
        <section className="bg-white max-w-200 h-auto p-1 m-1 border border-black rounded-3xl flex flex-col gap-3 [&_span]:text-blue-600" >
            <article className="mt-1 mb-2">
                <div className="flex items-center ml-2 mt-2">
                    <img className="w-10 h-10" src={bookIcon} alt="" />
                    <h1 className="font-bold text-lg text-blue-600 ml-5 pr-5 flex-grow uppercase">{title}</h1>
                    <button>
                        <img className="w-10 h-10 hover:cursor-pointer" src={bookIcon} alt="" />
                    </button>
                </div>

                <h2 className=" text-center font-bold text-2xl uppercase">{renderSentence(activeLesson.sentence, activeLesson.conjugation)}</h2>
                <p className="text-center text-sm text-gray-600">{getText(activeLesson.sentenceTranslation)}</p>
            </article>

            <span className="border border-gray-400 w-full"></span>

            <article className="mt-2 mb-2 grid grid-cols-5 gap-5">
                {detailItems.map((item) => (
                    <div className="grid grid-cols-[40px_1fr] items-start gap-2" key={item.field}>
                        <img className="w-10 h-10 row-span-2" src={item.icon} alt="" />
                        <p className={item.labelClassName}>{getFieldLabel(item.field)}</p>
                        <h3 className="font-bold">{getText(item.value)}</h3>
                    </div>
                ))}
            </article>

            <article className="mt-2 mb-3 bg-gray-200 p-2 text-center items-center h-20 rounded-3xl [&_span]:text-blue-800 [&_span]:font-bold gap-2 flex flex-row justify-center ">
                <img className="w-10 h-10 flex" src={lightIcon} alt="" />
                <p className="text-blue-600 m-5">{getText(activeLesson.rule)}</p>
            </article>


        </section>
    );
}

export default Widget;
