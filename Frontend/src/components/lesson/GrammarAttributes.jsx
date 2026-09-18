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

const materialSymbols = {
    eco: "\uea35",
    tune: "\ue429",
    translate: "\ue8e2",
    schedule: "\uefd6",
    group: "\uea21",
}

const GrammarAttributes = ({ lesson }) => {
    if (!lesson || typeof lesson !== "object") {
        return null
    }

    const attributes = [
        {
            field: "baseVerb",
            label: "Verbo",
            icon: materialSymbols.eco,
            value: lesson.baseVerb,
            description: "Infinitivo",
            backgroundClass: "bg-verb-bg",
            accentClass: "text-verb",
        },
        {
            field: "conjugation",
            label: "Conjugación",
            icon: materialSymbols.tune,
            value: lesson.conjugation,
            description: getConjugationDescription(lesson.irregular),
            backgroundClass: "bg-conjugation-bg",
            accentClass: "text-conjugation",
        },
        {
            field: "verbTranslation",
            label: "Traducción",
            icon: materialSymbols.translate,
            value: lesson.verbTranslation,
            description: "Sentido base",
            backgroundClass: "bg-translation-bg",
            accentClass: "text-translation",
        },
        {
            field: "tense",
            label: "Tiempo",
            icon: materialSymbols.schedule,
            value: lesson.tense,
            description: lesson.tenseTranslation,
            backgroundClass: "bg-tense-bg",
            accentClass: "text-tense",
        },
        {
            field: "subject",
            label: "Sujeto",
            icon: materialSymbols.group,
            value: lesson.subject,
            description: lesson.subjectTranslation,
            backgroundClass: "bg-subject-bg",
            accentClass: "text-subject",
        },
    ]

    return (
        <dl
            aria-label="Atributos gramaticales"
            className="grid w-full auto-rows-fr grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
        >
            {attributes.map((attribute) => (
                <div
                    className={`flex h-full min-w-0 flex-col rounded-xl border border-black/[0.03] px-2.5 py-3.5 shadow-sm shadow-slate-900/5 ${attribute.backgroundClass}`}
                    key={attribute.field}
                >
                    <dt className={`flex min-w-0 items-start gap-0.5 ${attribute.accentClass}`}>
                        <span
                            aria-hidden="true"
                            className="material-symbols-outlined inline-flex size-4 shrink-0 items-center justify-center overflow-hidden text-base leading-none"
                        >
                            {attribute.icon}
                        </span>
                        <span className="min-w-0 flex-1 whitespace-normal break-words text-[10px] font-bold uppercase leading-tight tracking-[0.025em]">
                            {attribute.label}
                        </span>
                    </dt>

                    <dd className="mt-3 min-w-0 whitespace-normal break-words text-base font-bold leading-snug text-text">
                        {getText(attribute.value)}
                    </dd>

                    <dd className="mt-auto min-w-0 whitespace-normal break-words pt-2 text-[11px] leading-snug text-secondary">
                        {getText(attribute.description)}
                    </dd>
                </div>
            ))}
        </dl>
    )
}

export default GrammarAttributes
