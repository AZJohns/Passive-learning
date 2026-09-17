import Header from "../layouts/Header.jsx";
import HeroPage from "../components/HeroPage.jsx";
import bookMark from "../assets/icons/bookmark_border.png"
import copy from "../assets/icons/content_copy.png"
import LessonSentence from "../components/lesson/LessonSentence.jsx";

export default function Home() {
    return (
        <>
            <Header />
            <HeroPage />
            <main className="w-full flex justify-center">
                <article className="w-full max-w-[720px] bg-surface rounded-2xl shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
                    {/* <!-- Top accent gradient line --> */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary via-tense to-verb"></div>
                    <div className="p-6 md:p-10 flex flex-col gap-8">
                        {/* <!-- Card Meta Header --> */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-cefr-pill text-cefr-pill uppercase tracking-wider">
                                    Nivel A2
                                </span>
                                <span className="text-outline-variant font-label-caps text-label-caps">•</span>
                                <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-secondary font-label-caps text-label-caps uppercase tracking-wider">
                                    Categoría: Places
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-outline">
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container-low hover:text-on-surface transition-colors" id="btn-save-bookmark" title="Guardar para repaso sutil">
                                    <span className="material-symbols-outlined text-[18px]">
                                        {<img src={bookMark} alt="" />}
                                    </span>
                                </button>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container-low hover:text-on-surface transition-colors" id="btn-copy-phrase" title="Copiar frase modelo">
                                    <span className="material-symbols-outlined text-[18px]">
                                        {<img src={copy} alt="" />}</span>
                                </button>
                            </div>
                        </div>
                        {/* aqui va mi componente*/}
                        <LessonSentence />
                    </div>
                </article>
            </main>
        </>

    );
}