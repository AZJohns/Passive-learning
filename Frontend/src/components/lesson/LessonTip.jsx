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
        <article className="bg-blue-50/80 border border-blue-100 px-3 py-2 flex items-center justify-center gap-2 shrink-0 rounded-xl min-h-10">
            <div className="p-1 rounded-lg bg-white shadow-xs text-tense shrink-0 ">
                <span className="material-symbols-outlined text-[18px] ">lightbulb</span>
            </div>
            <p className="min-w-0 text-l leading-snug font-semibold text-blue-700 text-center">

                {conjugationText}

            </p>

            <p className="min-w-0 text-xs leading-snug font-semibold text-blue-700 text-center">

                {ruleText}

            </p>
        </article>
    )
}


export default LessonTip