import { useEffect, useRef, useState } from "react";
import LessonSentence from "../lesson/LessonSentence.jsx";
import GrammarAttributes from "../lesson/GrammarAttributes.jsx";
import LessonTip from "./LessonTip.jsx";
import verbs from "../../data/verbs.json";
import { getDailyLesson } from "../../utils/getDailyLesson.js";
import { getRandomLesson } from "../../utils/getRandomLesson.js";

const TodayLessonCard = ({ lesson }) => {
    
    const [activeLesson, setActiveLesson] = useState(
        () => lesson ?? getDailyLesson(verbs)
    );
    const audioRef = useRef(null);

    useEffect(() => {
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, [activeLesson?.id]);

    // funcion para reproducir audio
    const handlePlay = () => {
        if (activeLesson?.id == null) return;

        audioRef.current?.pause();

        const audio = new Audio(
            `/audio/sentence_${activeLesson.id}.mp3`
        );

        audioRef.current = audio;

        audio.play().catch((error) => {
            console.error("No se pudo reproducir el audio:", error);
        });
    };

    // funcion para cambiar de leccion aleatoria
    const handleRandomLesson = () => {
        if (activeLesson?.id == null) return;

        const nextLesson = getRandomLesson(verbs, activeLesson.id);

        if (nextLesson) {
            setActiveLesson(nextLesson);
        }
    };


    return (
        <section className="flex min-w-0 flex-col gap-4">
            <LessonSentence lesson={activeLesson} />
            <GrammarAttributes lesson={activeLesson} />
            <LessonTip lesson={activeLesson} />

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={handlePlay}
                    disabled={activeLesson?.id == null}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-container-low px-4 py-2.5 font-tag-value text-tag-value text-on-surface shadow-xs transition-all hover:bg-surface-container active:scale-[0.98]"
                >
                    <span
                        className="material-symbols-outlined text-[20px] text-primary"
                        aria-hidden="true"
                    >
                        volume_up
                    </span>
                    <span>Escuchar pronunciación</span>
                </button>
                <button type="button"
                    onClick={handleRandomLesson}
                    disabled={activeLesson?.id == null}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary hover:text-on-surface font-tag-value text-tag-value transition-all active:scale-[0.98] shadow-xs cursor-pointer" id="btn-shuffle" title="Cargar otra oración de este patrón">

                    <span className="material-symbols-outlined text-[18px] transition-transform duration-500" id="shuffle-icon">shuffle</span>
                    <span>Otra frase</span>
                </button>
            </div>
        </section>
    );
};

export default TodayLessonCard;