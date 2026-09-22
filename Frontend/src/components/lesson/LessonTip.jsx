const LessonTip = ({ tip }) => {
    return (
        <div className="flex items-start gap-3 bg-tense-bg p-4 rounded-xl text-tense">
            <div className="p-1 rounded-lg bg-white shadow-xs text-tense shrink-0">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="font-grammar-tip text-grammar-tip text-on-surface leading-relaxed">
                <span className="font-bold text-tense">Found</span> es la forma irregular del pasado de
                <span className="font-semibold">find</span>. A diferencia de los verbos regulares, no añade
                <em className="not-italic font-mono text-[11px] bg-white px-1 py-0.5 rounded shadow-xs">-ed</em>
                y comparte la misma forma para el participio pasado.
            </div>
        </div>
    )
}
export default LessonTip