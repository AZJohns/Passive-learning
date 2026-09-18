import LessonSentence from "../lesson/LessonSentence.jsx";
import GrammarAttributes from "../lesson/GrammarAttributes.jsx";
import verbs from "../../data/verbs.json";
import { getDailyLesson } from "../../utils/getDailyLesson.js";

const TodayLessonCard = ({ lesson }) => {
    const activeLesson = lesson ?? getDailyLesson(verbs)

    return (
        <section className="flex min-w-0 flex-col gap-4">
            <LessonSentence lesson={activeLesson} />
            <GrammarAttributes lesson={activeLesson} />
        </section>
    )
}

export default TodayLessonCard;
