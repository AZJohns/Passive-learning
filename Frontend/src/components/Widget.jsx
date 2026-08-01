import bookIcon from "../assets/book.svg"
import starIcon from "../assets/star.png"
import chainIcon from "../assets/chain.png"
import calendarIcon from "../assets/calendar.png"
import profileIcon from "../assets/profile.png"
import lightIcon from "../assets/light.png"
import verbs from "../data/verbs.json"
import { getDailyLesson } from "../utils/getDailyLesson.js"
import { getRandomLesson } from "../utils/getRandomLesson.js"
import { useState } from "react"



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

    // crea una función manejadora para el clic.

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

    const title = [activeLesson.category, activeLesson.level].map(getText).filter(Boolean).join(" - ")
    const detailItems = [
        { icon: chainIcon, field: "baseVerb", value: activeLesson.baseVerb, labelClassName: "text-gray-600 text-sm" },
        { icon: starIcon, field: "conjugation", value: activeLesson.conjugation, labelClassName: "text-gray-600 text-sm" },
        { icon: chainIcon, field: "verbTranslation", value: activeLesson.verbTranslation, labelClassName: "text-gray-600 text-sm" },
        { icon: calendarIcon, field: "tense", value: activeLesson.tense, labelClassName: "text-gray-600 font-sm" },
        { icon: profileIcon, field: "subject", value: activeLesson.subject, labelClassName: "text-gray-600 text-sm" },
    ]

    return (
        // 1. Contenedor Principal: Sombra suave y bordes redondeados modernos
        <section className="bg-white max-w-200 h-90 p-3 m-1 border border-gray-100 shadow-xl shadow-blue-900/5 rounded-3xl flex flex-col justify-between overflow-hidden [&_span]:text-blue-600">

            {/* 2. Cabecera (Categoría y Botón aleatorio) */}
            <article className="flex shrink-0 items-center justify-between px-3 pt-1">
                <div className="flex items-center gap-2">
                    <img className="w-8 h-8 shrink-0" src={bookIcon} alt="" />
                    <h1 className="font-extrabold text-sm text-blue-700 tracking-wider uppercase">
                        {title}
                    </h1>
                </div>
                <button className="shrink-0 p-2 rounded-full hover:bg-blue-50 transition-colors" onClick={handleClick}>
                    <img className="w-8 h-8 hover:cursor-pointer" src={bookIcon} alt="Random" />
                </button>
            </article>

            {/* 3. Oración Principal (Con más respiro) */}
            <article className="flex flex-col items-center justify-center px-4 shrink-0">
                <h2 className="text-center font-black text-2xl sm:text-3xl uppercase tracking-tight text-gray-800">
                    {renderSentence(activeLesson.sentence, activeLesson.conjugation)}
                </h2>
                <p className="text-center text-sm font-medium text-gray-500 mt-1">
                    {getText(activeLesson.sentenceTranslation)}
                </p>
            </article>

            {/* Línea divisoria muy sutil para separar secciones */}
            <hr className="w-[85%] mx-auto border-gray-100 shrink-0" />

            {/* 4. Grid de 5 Columnas (Diseño App: Icono+Etiqueta arriba, Valor abajo) */}
            <article className="grid w-full grid-cols-5 gap-1 px-2 shrink-0">
                {detailItems.map((item) => (
                    <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl hover:bg-gray-50 transition-colors" key={item.field}>
                        {/* Icono y Etiqueta */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-1">
                            <img className="w-5 h-5 sm:w-6 sm:h-6 opacity-70" src={item.icon} alt="" />
                            <p className={`${item.labelClassName} text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider`}>
                                {getFieldLabel(item.field)}
                            </p>
                        </div>
                        {/* Valor Destacado */}
                        <h3 className="font-extrabold text-sm sm:text-base text-gray-800 text-center w-full truncate capitalize">
                            {getText(item.value)}
                        </h3>
                    </div>
                ))}
            </article>

            {/* 5. Tarjeta de Regla / Tip (Fondo azul suave nativo) */}
            <article className="bg-blue-50/80 border border-blue-100 mx-3 mb-1 p-3 flex flex-row items-center justify-center gap-3 shrink-0 rounded-2xl h-16">
                <img className="w-6 h-6 shrink-0 opacity-80" src={lightIcon} alt="Tip" />
                <p className="min-w-0 line-clamp-2 text-sm font-semibold text-blue-700 text-center">
                    {getText(activeLesson.rule)}
                </p>
            </article>

        </section>
    );
}

export default Widget;
