const getText = (value, fallback = "—") => {
    if (typeof value !== "string" && typeof value !== "number") {
        return fallback
    }

    return String(value).trim() || fallback
}

const getConjugationDescription = (irregular) => {
    if (irregular === true) return "Irregular"
    if (irregular === false) return "Regular"

    return "Tipo no indicado"
}

const GrammarAttributes = ({ lesson }) => {
    if (!lesson || typeof lesson !== "object") {
        return null
    }

    const attributes = [
        {
            field: "baseVerb",
            label: "Verbo",
            icon: "eco",
            value: lesson.baseVerb,
            description: "Infinitivo",
            backgroundClass: "bg-verb-bg",
            accentClass: "text-verb",
            desktopPosition: "lg:col-start-1 lg:row-start-1",
        },
        {
            field: "conjugation",
            label: "Conjugación",
            icon: "tune",
            value: lesson.conjugation,
            description: getConjugationDescription(lesson.irregular),
            backgroundClass: "bg-conjugation-bg",
            accentClass: "text-conjugation",
            desktopPosition: "lg:col-start-5 lg:row-start-1",
        },
        {
            field: "verbTranslation",
            label: "Traducción",
            icon: "translate",
            value: lesson.verbTranslation,
            description: "Sentido base",
            backgroundClass: "bg-translation-bg",
            accentClass: "text-translation",
            desktopPosition: "lg:col-start-9 lg:row-start-1",
        },
        {
            field: "tense",
            label: "Tiempo",
            icon: "schedule",
            value: lesson.tense,
            description: lesson.tenseTranslation,
            backgroundClass: "bg-tense-bg",
            accentClass: "text-tense",
            desktopPosition: "lg:col-start-2 lg:row-start-2",
        },
        {
            field: "subject",
            label: "Sujeto",
            icon: "group",
            value: lesson.subject,
            description: lesson.subjectTranslation,
            backgroundClass: "bg-subject-bg",
            accentClass: "text-subject",
            desktopPosition: "lg:col-start-8 lg:row-start-2",
        },
    ]

    return (
        <dl
            aria-label="Atributos gramaticales"
            className="
                grid w-full
                auto-rows-fr
                grid-cols-1
                gap-3
                min-[420px]:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-12
                lg:gap-4
            "
        >
            {attributes.map((attribute) => (
                <div
                    key={attribute.field}
                    className={`
                        flex min-h-[128px] min-w-0 flex-col
                        rounded-2xl
                        border border-black/[0.04]
                        px-4 py-3.5
                        shadow-sm shadow-slate-900/5
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:shadow-md
                        md:col-span-1
                        lg:col-span-4
                        ${attribute.backgroundClass}
                        ${attribute.desktopPosition}
                    `}
                >
                    {/* Encabezado */}
                    <dt
                        className={`
                            flex min-w-0 items-center gap-2.5
                            ${attribute.accentClass}
                        `}
                    >
                        {/* Contenedor del icono */}
                        <span
                            aria-hidden="true"
                            className="
                                flex size-8 shrink-0
                                items-center justify-center
                                rounded-lg
                                bg-white/60
                                ring-1 ring-black/[0.04]
                            "
                        >
                            <span className="material-symbols-outlined text-[19px] leading-none">
                                {attribute.icon}
                            </span>
                        </span>

                        {/* Título */}
                        <span
                            className="
                                min-w-0
                                whitespace-normal
                                break-words
                                text-[10px]
                                font-bold
                                uppercase
                                leading-tight
                                tracking-[0.04em]
                            "
                        >
                            {attribute.label}
                        </span>
                    </dt>

                    {/* Valor principal */}
                    <dd
                        className="
                            mt-3
                            min-w-0
                            whitespace-normal
                            break-words
                            text-[17px]
                            font-bold
                            leading-snug
                            text-text
                        "
                    >
                        {getText(attribute.value)}
                    </dd>

                    {/* Descripción */}
                    <dd
                        className="
                            mt-auto
                            min-w-0
                            whitespace-normal
                            break-words
                            pt-2
                            text-[11px]
                            leading-snug
                            text-secondary
                        "
                    >
                        {getText(attribute.description)}
                    </dd>
                </div>
            ))}
        </dl>
    )
}

export default GrammarAttributes