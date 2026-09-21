const LessonTip = ({ tip }) => {
    return (
        <div class="flex items-start gap-3 bg-tense-bg p-4 rounded-xl text-tense">
            <div class="p-1 rounded-lg bg-white shadow-xs text-tense shrink-0">
                <span class="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div class="font-grammar-tip text-grammar-tip text-on-surface leading-relaxed">
                <span class="font-bold text-tense">Found</span> es la forma irregular del pasado de <span class="font-semibold">find</span>. A diferencia de los verbos regulares, no añade <em class="not-italic font-mono text-[11px] bg-white px-1 py-0.5 rounded shadow-xs">-ed</em> y comparte la misma forma para el participio pasado.
            </div>
        </div>
    )
}
export default LessonTip