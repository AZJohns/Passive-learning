import { useEffect, useRef } from "react";
import LessonSentence from "../lesson/LessonSentence.jsx";
import GrammarAttributes from "../lesson/GrammarAttributes.jsx";
import LessonTip from "./LessonTip.jsx";
import verbs from "../../data/verbs.json";
import { getDailyLesson } from "../../utils/getDailyLesson.js";

const TodayLessonCard = ({ lesson }) => {
    const activeLesson = lesson ?? getDailyLesson(verbs);
    const audioRef = useRef(null);

    useEffect(() => {
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, [activeLesson?.id]);

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

    return (
        <section className="flex min-w-0 flex-col gap-4">
            <LessonSentence lesson={activeLesson} />
            <GrammarAttributes lesson={activeLesson} />
            <LessonTip lesson={activeLesson} />

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
        </section>
    );
};

export default TodayLessonCard;