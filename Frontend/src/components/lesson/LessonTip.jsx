import verbs from "../../data/verbs.json"
import { getDailyLesson } from "../../utils/getDailyLesson.js"



const getText = (value) => {
    if (typeof value === "string" || typeof value === "number") {
        return String(value)
    }

    return ""
}
const LessonTip = ({ lesson }) => {
    const activeLesson = lesson ?? getDailyLesson(verbs)



    const conjugationText = getText(activeLesson?.conjugation)
    if (!conjugationText || conjugationText === "-1") {
        return null;
    }

    const ruleText = getText(activeLesson?.rule)
    if (!ruleText || ruleText === "-1") {
        return null;
    }




    return (
        // <div className="flex items-start gap-3 bg-tense-bg p-4 rounded-xl text-tense">
        //     <div className="p-1 rounded-lg bg-white shadow-xs text-tense shrink-0">
        //         <span className="material-symbols-outlined text-[18px]">lightbulb</span>
        //     </div>
        //     <div className="font-grammar-tip text-grammar-tip text-on-surface leading-relaxed">
        //         <span className="font-bold text-tense">
        //             {conjugationText}
        //             {ruleText}
        //         </span>
        //     </div>
        // </div>
        <article className="flex min-h-16 items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3">
            <div
                className="mt-0.5 shrink-0 rounded-lg bg-white p-1.5 text-blue-600 shadow-xs"
                aria-hidden="true"
            >
                <span className="material-symbols-outlined block text-[19px]">
                    lightbulb
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Consejo de conjugación
                </p>

                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                    <span className="font-bold text-blue-700">
                        {conjugationText}:
                    </span>{" "}
                    {ruleText}
                </p>
            </div>
        </article>
    )
}


export default LessonTip