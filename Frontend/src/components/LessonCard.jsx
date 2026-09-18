import bookIcon from "../assets/book.svg"
import starIcon from "../assets/star.png"
import chainIcon from "../assets/chain.png"
import calendarIcon from "../assets/calendar.png"
import profileIcon from "../assets/profile.png"
import lightIcon from "../assets/light.png"
import verbs from "../data/verbs.json"
import { getDailyLesson } from "../utils/getDailyLesson.js"
import { getRandomLesson } from "../utils/getRandomLesson.js"
import { useState, useEffect } from "react"



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
    const [activeLesson, setActiveLesson] = useState(getDailyLesson(verbs))

    useEffect(() => {
        let timerId

        function scheduleChange() {
            // obtenemos la cantidad de milisegundos que faltan para el siguiente día
            const milisegundosRestantes = getMillisecondsUntilNextDay()

            // creamos el temporizador
            timerId = setTimeout(() => {
                // actualizamos el estado cuando el tiempo se acaba
                const newDailyLesson = getDailyLesson(verbs)

                // evita actualizar el estado con valor null
                if (newDailyLesson) {
                    // cambia la leccion
                    setActiveLesson(newDailyLesson)
                }

                scheduleChange()
            }, milisegundosRestantes)
        }

        scheduleChange()

        // limpiamos el temporizador
        return () => {
            // cancelamos el temporizador
            clearTimeout(timerId)
        }
    }, [])

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
    const valideLesson = (lesson) => {
        if (lesson) {
            return true
        }
        return false
    }

    const activeRandomLesson = function (getRandomLesson, verbs, currentLessonId) {
        // 1. Ahora SÍ le pasas ambos datos a la función que busca la lección
        const randomLesson = getRandomLesson(verbs, currentLessonId);

        // 2. Compruebas que la lección realmente exista (que no sea null o undefined)
        if (randomLesson) {
            // 3. Aquí actualizas el estado de tu Widget de React.
            // Si tienes un setter de useState (ej: setCurrentLesson), lo usarías aquí:
            // setCurrentLesson(randomLesson);

            return randomLesson;
        }
        return null

    }
    const handleClick = () => {
        const randomLesson = activeRandomLesson(getRandomLesson, verbs, activeLesson.id)
        if (randomLesson) {
            setActiveLesson(randomLesson)
        }
    }

    const getMillisecondsUntilNextDay = () => {

        const currentDate = new Date();
        const currentDay = currentDate.getDate();

        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDay + 1);

        nextDay.setHours(0, 0, 0, 0);

        return (
            nextDay.getTime() - currentDate.getTime()
        )
    }



    const title = [activeLesson.category, activeLesson.level].map(getText).filter(Boolean).join(" - ")
    const detailItems = [
        { icon: chainIcon, field: "baseVerb", value: activeLesson.baseVerb, labelClassName: "text-gray-600 text-sm" },
        { icon: starIcon, field: "conjugation", value: activeLesson.conjugation, labelClassName: "text-gray-600 text-sm" },
        { icon: chainIcon, field: "verbTranslation", value: activeLesson.verbTranslation, labelClassName: "text-gray-600 text-sm" },
        { icon: calendarIcon, field: "tense", value: activeLesson.tense, labelClassName: "text-gray-600 font-sm" },
        { icon: profileIcon, field: "subject", value: activeLesson.subject, labelClassName: "text-gray-600 text-sm" },
    ]



   return (
    <section className="w-full h-full box-border bg-white px-4 py-3 border border-gray-100 shadow-xl shadow-blue-900/5 rounded-2xl flex flex-col gap-2 [&_span]:text-blue-600">

        {/* Cabecera */}
        <article className="flex shrink-0 items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
                <img
                    className="w-7 h-7 shrink-0"
                    src={bookIcon}
                    alt=""
                />

                <h1 className="font-extrabold text-sm text-blue-700 tracking-wider uppercase">
                    {title}
                </h1>
            </div>

            <button
                className="shrink-0 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                onClick={handleClick}
            >
                <img
                    className="w-7 h-7 hover:cursor-pointer"
                    src={bookIcon}
                    alt="Random"
                />
            </button>
        </article>


        {/* Frase principal */}
        <article className="flex min-h-[68px] flex-1 flex-col items-center justify-center px-3">
            <h2 className="text-center font-black text-[19px] leading-[1.15] uppercase tracking-tight text-gray-800">
                {renderSentence(
                    activeLesson.sentence,
                    activeLesson.conjugation
                )}
            </h2>

            <p className="mt-1 text-center text-xs leading-snug font-medium text-gray-500">
                {getText(activeLesson.sentenceTranslation)}
            </p>
        </article>


        {/* Separador */}
        <hr className="w-[94%] mx-auto border-gray-100 shrink-0" />


        {/* Información gramatical */}
        <article className="grid w-full grid-cols-[minmax(0,0.7fr)_minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1.55fr)_minmax(0,1.1fr)] gap-1 shrink-0">
            {detailItems.map((item) => (
                <div
                    className="min-w-0 flex flex-col items-center justify-start gap-0.5 px-0.5"
                    key={item.field}
                >
                    <img
                        className="w-4 h-4 shrink-0 opacity-70"
                        src={item.icon}
                        alt=""
                    />

                    <p className="w-full text-center text-[8px] leading-tight font-bold text-gray-400 uppercase">
                        {getFieldLabel(item.field)}
                    </p>

                    <h3 className="w-full text-center font-extrabold text-[11px] leading-tight text-gray-800 capitalize break-normal whitespace-normal">
                        {getText(item.value)}
                    </h3>
                </div>
            ))}
        </article>


        {/* Regla */}
        <article className="bg-blue-50/80 border border-blue-100 px-3 py-2 flex items-center justify-center gap-2 shrink-0 rounded-xl min-h-10">
            <img
                className="w-5 h-5 shrink-0 opacity-80"
                src={lightIcon}
                alt="Tip"
            />

            <p className="min-w-0 text-xs leading-snug font-semibold text-blue-700 text-center">
                {getText(activeLesson.rule)}
            </p>
        </article>

    </section>
);
}

export default Widget;
