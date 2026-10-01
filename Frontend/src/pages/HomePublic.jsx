import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
    ArrowRight,
    Bookmark,
    BookOpen,
    Clock3,
    Columns3,
    Library,
    Lightbulb,
    Menu,
    RefreshCw,
    ShieldCheck,
    Square,
    Timer,
    TrendingUp,
    Volume2,
    X,
} from 'lucide-react';

// Datos de demostración. Sustitúyelos por tus lecciones reales al integrar la página.
const PHRASES = [
    {
        rawEn: 'She has worked here for three years.',
        es: 'Ella ha trabajado aquí durante tres años.',
        verb: 'work',
        conjugation: 'has worked',
        tense: 'Present Perfect',
        subject: 'She',
        level: 'A2',
        category: 'Trabajo',
        rule: 'Usamos have o has seguido del participio para hablar de acciones que comenzaron en el pasado y continúan en el presente.',
    },
    {
        rawEn: 'They are developing a new feature.',
        es: 'Ellos están desarrollando una nueva funcionalidad.',
        verb: 'develop',
        conjugation: 'are developing',
        tense: 'Present Continuous',
        subject: 'They',
        level: 'A2',
        category: 'Tecnología',
        rule: 'Usamos el verbo to be seguido de un verbo terminado en -ing para hablar de acciones que están en progreso.',
    },
    {
        rawEn: 'We will launch the product tomorrow.',
        es: 'Lanzaremos el producto mañana.',
        verb: 'launch',
        conjugation: 'will launch',
        tense: 'Future Simple',
        subject: 'We',
        level: 'A2',
        category: 'Trabajo',
        rule: 'Usamos will seguido del verbo base para hablar de hechos futuros, predicciones, promesas o decisiones tomadas en el momento.',
    },
];

const FOCUS =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';
const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-8';
const PRIMARY_BUTTON = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 ${FOCUS}`;
const SECONDARY_BUTTON = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 active:bg-slate-100 ${FOCUS}`;

const STEPS = [
    {
        icon: BookOpen,
        tone: 'bg-blue-50 text-blue-700',
        labelTone: 'text-blue-700',
        label: '01. Descubrimiento',
        title: 'Recibe una frase diaria',
        description: 'Descubre cada día una frase en inglés y su traducción.',
        detailIcon: Clock3,
        detail: 'Unos minutos al día',
    },
    {
        icon: TrendingUp,
        tone: 'bg-emerald-50 text-emerald-700',
        labelTone: 'text-emerald-700',
        label: '02. Estructura',
        title: 'Comprende cómo se construye',
        description:
            'Escucha la pronunciación y consulta su estructura gramatical.',
        detailIcon: Volume2,
        detail: 'Audio y explicación gramatical',
    },
    {
        icon: Bookmark,
        tone: 'bg-violet-50 text-violet-700',
        labelTone: 'text-violet-700',
        label: '03. Repaso',
        title: 'Guarda lo aprendido',
        description: 'Con una cuenta, podrás guardar y revisar tus lecciones.',
        detailIcon: Library,
        detail: 'Tus lecciones en un solo lugar',
    },
];

const BENEFITS = [
    {
        icon: Timer,
        title: 'Aprendizaje breve',
        description: 'Lecciones pensadas para completarse en pocos minutos.',
    },
    {
        icon: Columns3,
        title: 'Gramática contextual',
        description:
            'Comprende las reglas dentro de frases reales y fáciles de recordar.',
    },
    {
        icon: Library,
        title: 'Progreso organizado',
        description:
            'Guarda, revisa y consulta las lecciones que ya has aprendido.',
    },
];


function Brand({ compact = false }) {
    return (
        <Link
            to="/"
            className={`inline-flex items-center gap-2.5 rounded-lg ${FOCUS}`}
            aria-label="Passive Learning, inicio"
        >
            <span
                aria-hidden="true"
                className={`flex shrink-0 items-center justify-center bg-blue-600 font-bold tracking-tight text-white ${compact ? 'h-7 w-7 rounded-lg text-xs' : 'h-9 w-9 rounded-xl text-sm'}`}
            >
                PL
            </span>
            <span
                className={`font-semibold tracking-tight text-slate-950 ${compact ? 'text-base' : 'text-sm leading-tight sm:text-lg'}`}
            >
                <span className={compact ? '' : 'block sm:inline'}>Passive</span>{' '}
                <span className={compact ? '' : 'block sm:inline'}>Learning</span>
            </span>
        </Link>
    );
}

function PhraseText({ phrase }) {
    const start = phrase.rawEn.indexOf(phrase.conjugation);
    if (start === -1) return phrase.rawEn;

    return (
        <>
            {phrase.rawEn.slice(0, start)}
            <span className="rounded bg-blue-50 px-0.5 font-semibold text-blue-700 underline decoration-blue-300 decoration-2 underline-offset-4">
                {phrase.conjugation}
            </span>
            {phrase.rawEn.slice(start + phrase.conjugation.length)}
        </>
    );
}

function GrammarTag({ label, value, className, lang }) {
    return (
        <div className={`min-w-0 rounded-xl px-3 py-2.5 ${className}`}>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                {label}
            </dt>
            <dd
                lang={lang}
                className="mt-0.5 break-words text-sm font-medium leading-snug"
            >
                {value}
            </dd>
        </div>
    );
}

// Si el layout ya incluye encabezado o footer, usa showHeader={false} / showFooter={false}.
// Necesita estar dentro del BrowserRouter que ya tienes en main.jsx.
export default function HomePublic({ showHeader = true, showFooter = true }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioError, setAudioError] = useState('');
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const utteranceRef = useRef(null);
    const dialogRef = useRef(null);
    const currentPhrase = PHRASES[currentIndex];

    useEffect(() => {
        return () => {
            const utterance = utteranceRef.current;
            utteranceRef.current = null;
            if (utterance && 'speechSynthesis' in window)
                window.speechSynthesis.cancel();
        };
    }, []);

    // El dialog nativo gestiona el foco, bloquea el fondo y permite cerrar con Escape.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (showAuthPrompt && !dialog.open) dialog.showModal();
        if (!showAuthPrompt && dialog.open) dialog.close();
    }, [showAuthPrompt]);

    useEffect(() => {
        if (!menuOpen) return;
        const handleEscape = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [menuOpen]);

    function stopAudio() {
        const utterance = utteranceRef.current;
        utteranceRef.current = null;
        if (utterance && 'speechSynthesis' in window)
            window.speechSynthesis.cancel();
        setIsPlaying(false);
    }

    function handlePlayAudio() {
        if (utteranceRef.current) {
            stopAudio();
            return;
        }

        setAudioError('');
        if (
            !('speechSynthesis' in window) ||
            !('SpeechSynthesisUtterance' in window)
        ) {
            setAudioError('Tu navegador no permite reproducir esta pronunciación.');
            return;
        }

        const utterance = new window.SpeechSynthesisUtterance(currentPhrase.rawEn);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utteranceRef.current = utterance;

        utterance.onend = () => {
            if (utteranceRef.current !== utterance) return;
            utteranceRef.current = null;
            setIsPlaying(false);
        };
        utterance.onerror = () => {
            if (utteranceRef.current !== utterance) return;
            utteranceRef.current = null;
            setIsPlaying(false);
            setAudioError('No se pudo reproducir el audio. Inténtalo de nuevo.');
        };

        try {
            setIsPlaying(true);
            window.speechSynthesis.speak(utterance);
        } catch {
            utteranceRef.current = null;
            setIsPlaying(false);
            setAudioError('No se pudo reproducir el audio. Inténtalo de nuevo.');
        }
    }

    function handleNextPhrase() {
        stopAudio();
        setAudioError('');
        // Los datos son locales: no hace falta simular una carga ni recargar la página.
        setCurrentIndex((previous) => (previous + 1) % PHRASES.length);
    }

    function handleBackdropClick(event) {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const outside =
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom;
        if (outside) setShowAuthPrompt(false);
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-950">
            <a
                href="#contenido-publico"
                className={`sr-only z-50 rounded-xl bg-white p-3 text-blue-700 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${FOCUS}`}
            >
                Saltar al contenido
            </a>

            {showHeader && (
                <header className="border-b border-slate-100 bg-white">
                    <div className={`${CONTAINER} flex min-h-[72px] items-center gap-4`}>
                        <Brand />
                        <nav
                            aria-label="Navegación principal"
                            className="ml-3 hidden items-center gap-7 text-sm text-slate-600 md:flex"
                        >
                            <a
                                href="#como-funciona"
                                className={`rounded hover:text-blue-700 ${FOCUS}`}
                            >
                                Cómo funciona
                            </a>
                            <a
                                href="#demo-section"
                                className={`rounded hover:text-blue-700 ${FOCUS}`}
                            >
                                Ejemplo
                            </a>
                        </nav>
                        <div className="ml-auto flex items-center gap-2 sm:gap-4">
                            <Link
                                to="/login"
                                className={`hidden min-h-11 items-center rounded-xl px-2 text-sm font-medium hover:text-blue-700 md:inline-flex ${FOCUS}`}
                            >
                                Iniciar sesión
                            </Link>
                            <Link to="/register" className={`${PRIMARY_BUTTON} px-3 sm:px-5`}>
                                Crear cuenta
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMenuOpen((open) => !open)}
                                aria-expanded={menuOpen}
                                aria-controls="public-mobile-navigation"
                                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                                className={`flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-50 md:hidden ${FOCUS}`}
                            >
                                {menuOpen ? (
                                    <X aria-hidden="true" size={20} />
                                ) : (
                                    <Menu aria-hidden="true" size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                    <nav
                        id="public-mobile-navigation"
                        aria-label="Navegación móvil"
                        hidden={!menuOpen}
                        className="border-t border-slate-100 px-5 py-2 md:hidden"
                    >
                        <a
                            href="#como-funciona"
                            onClick={() => setMenuOpen(false)}
                            className={`flex min-h-11 items-center rounded-lg px-3 text-sm text-slate-700 hover:bg-slate-50 ${FOCUS}`}
                        >
                            Cómo funciona
                        </a>
                        <a
                            href="#demo-section"
                            onClick={() => setMenuOpen(false)}
                            className={`flex min-h-11 items-center rounded-lg px-3 text-sm text-slate-700 hover:bg-slate-50 ${FOCUS}`}
                        >
                            Ejemplo
                        </a>
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-blue-700 hover:bg-blue-50 ${FOCUS}`}
                        >
                            Iniciar sesión
                        </Link>
                    </nav>
                </header>
            )}

            <main id="contenido-publico">
                <section className="bg-[#faf8ff]" aria-labelledby="public-hero-title">
                    <div
                        className={`${CONTAINER} grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-20`}
                    >
                        <div className="lg:col-span-7">
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                                <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                                />
                                Aprende a tu propio ritmo · Sin presión
                            </span>
                            <h1
                                id="public-hero-title"
                                className="max-w-2xl text-[30px] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[34px] xl:text-[36px]"
                            >
                                Aprende inglés con una frase al día
                            </h1>
                            <p className="mt-5 max-w-[540px] text-base leading-7 text-slate-600">
                                Escucha una frase real, entiende cómo se construye y guarda tu
                                progreso en pocos minutos.
                            </p>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link to="/register" className={`${PRIMARY_BUTTON} px-6`}>
                                    Crear cuenta <ArrowRight aria-hidden="true" size={17} />
                                </Link>
                                <a href="#demo-section" className={SECONDARY_BUTTON}>
                                    Ver una lección
                                </a>
                            </div>
                            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-600">
                                <ShieldCheck
                                    aria-hidden="true"
                                    size={15}
                                    className="mt-0.5 shrink-0 text-emerald-700"
                                />
                                Prueba la lección interactiva sin registrarte.
                            </p>
                        </div>

                        <div className="min-w-0 lg:col-span-5">
                            <article
                                id="demo-section"
                                aria-labelledby="demo-title"
                                className="mx-auto w-full max-w-[480px] scroll-mt-6 rounded-3xl border border-white bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-6"
                            >
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2
                                            id="demo-title"
                                            className="text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-700"
                                        >
                                            Lección de ejemplo
                                        </h2>
                                        <span
                                            aria-hidden="true"
                                            className="h-1 w-1 rounded-full bg-slate-300"
                                        />
                                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                                            {currentPhrase.category}
                                        </span>
                                    </div>
                                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-semibold text-indigo-800">
                                        {currentPhrase.level}
                                    </span>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="min-w-0 flex-1"
                                            aria-live="polite"
                                            aria-atomic="true"
                                        >
                                            <p
                                                lang="en"
                                                className="break-words text-xl font-medium leading-snug text-slate-950 sm:text-[22px]"
                                            >
                                                <PhraseText phrase={currentPhrase} />
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {currentPhrase.es}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handlePlayAudio}
                                            aria-label={
                                                isPlaying
                                                    ? 'Detener pronunciación'
                                                    : 'Escuchar pronunciación'
                                            }
                                            aria-pressed={isPlaying}
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white text-blue-600 shadow-sm transition-colors hover:bg-blue-50 ${FOCUS}`}
                                        >
                                            {isPlaying ? (
                                                <Square
                                                    aria-hidden="true"
                                                    size={17}
                                                    className="fill-current"
                                                />
                                            ) : (
                                                <Volume2 aria-hidden="true" size={20} />
                                            )}
                                        </button>
                                    </div>
                                    <p
                                        role="status"
                                        className={`mt-3 flex items-start gap-1.5 text-xs leading-5 ${audioError ? 'text-red-700' : 'text-slate-500'}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${audioError ? 'bg-red-500' : isPlaying ? 'bg-blue-600' : 'bg-slate-300'}`}
                                        />
                                        {audioError ||
                                            (isPlaying
                                                ? 'Reproduciendo pronunciación…'
                                                : 'Escucha la pronunciación')}
                                    </p>
                                </div>

                                <dl className="mt-4 grid grid-cols-2 gap-2">
                                    <GrammarTag
                                        label="Verbo"
                                        value={currentPhrase.verb}
                                        lang="en"
                                        className="bg-emerald-50 text-emerald-800"
                                    />
                                    <GrammarTag
                                        label="Conjugación"
                                        value={currentPhrase.conjugation}
                                        lang="en"
                                        className="bg-violet-50 text-violet-800"
                                    />
                                    <GrammarTag
                                        label="Tiempo verbal"
                                        value={currentPhrase.tense}
                                        lang="en"
                                        className="bg-blue-50 text-blue-800"
                                    />
                                    <GrammarTag
                                        label="Sujeto"
                                        value={currentPhrase.subject}
                                        lang="en"
                                        className="bg-cyan-50 text-cyan-800"
                                    />
                                </dl>

                                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-blue-50 p-4">
                                    <Lightbulb
                                        aria-hidden="true"
                                        size={18}
                                        className="mt-0.5 shrink-0 text-blue-600"
                                    />
                                    <p className="text-sm leading-6 text-slate-700">
                                        {currentPhrase.rule}
                                    </p>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={handleNextPhrase}
                                        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 active:bg-slate-200 ${FOCUS}`}
                                    >
                                        <RefreshCw aria-hidden="true" size={16} /> Otra frase
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAuthPrompt(true)}
                                        className={`${PRIMARY_BUTTON} px-3`}
                                    >
                                        <Bookmark aria-hidden="true" size={16} /> Guardar lección
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section
                    id="como-funciona"
                    aria-labelledby="steps-title"
                    className="scroll-mt-6 bg-white py-14 sm:py-20"
                >
                    <div className={CONTAINER}>
                        <div className="mx-auto mb-9 max-w-xl text-center sm:mb-12">
                            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-800">
                                Método simple
                            </span>
                            <h2
                                id="steps-title"
                                className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
                            >
                                Aprende en tres pasos
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                                Una rutina breve basada en frases y comprensión contextual.
                            </p>
                        </div>
                        <ol className="grid gap-5 md:grid-cols-3 lg:gap-7">
                            {STEPS.map(({ icon: Icon, detailIcon: DetailIcon, ...step }) => (
                                <li
                                    key={step.label}
                                    className="flex flex-col rounded-2xl bg-slate-50 p-6 sm:p-8"
                                >
                                    <span
                                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${step.tone}`}
                                    >
                                        <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
                                    </span>
                                    <p
                                        className={`text-[11px] font-semibold uppercase tracking-wider ${step.labelTone}`}
                                    >
                                        {step.label}
                                    </p>
                                    <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                    <p className="mt-auto flex items-center gap-2 pt-8 text-xs leading-5 text-slate-500">
                                        <DetailIcon
                                            aria-hidden="true"
                                            size={14}
                                            className="shrink-0"
                                        />
                                        {step.detail}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section
                    id="proyecto"
                    aria-labelledby="benefits-title"
                    className="bg-[#faf8ff] py-14 sm:py-20"
                >
                    <div className={CONTAINER}>
                        <div className="mb-9 max-w-[680px] sm:mb-11">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                                Un poco cada día
                            </p>
                            <h2
                                id="benefits-title"
                                className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
                            >
                                Una forma sencilla de mantener el inglés presente cada día
                            </h2>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
                            {BENEFITS.map(({ icon: Icon, title, description }) => (
                                <article
                                    key={title}
                                    className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:p-8"
                                >
                                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-blue-700">
                                        <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                                    </span>
                                    <h3 className="text-lg font-semibold tracking-tight">
                                        {title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {description}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <section
                            aria-labelledby="final-cta-title"
                            className="mt-12 flex flex-col gap-7 rounded-3xl bg-white p-7 shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:mt-16 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12"
                        >
                            <div>
                                <h2
                                    id="final-cta-title"
                                    className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
                                >
                                    Empieza hoy con tu primera frase
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Crea una cuenta gratuita y guarda todo lo que vayas
                                    aprendiendo.
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                                <Link to="/register" className={`${PRIMARY_BUTTON} px-6`}>
                                    Crear cuenta
                                </Link>
                                <Link
                                    to="/login"
                                    className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-medium text-slate-700 hover:text-blue-700 ${FOCUS}`}
                                >
                                    Ya tengo una cuenta
                                </Link>
                            </div>
                        </section>
                    </div>
                </section>
            </main>

            {showFooter && (
                <footer className="border-t border-slate-100 bg-white py-7">
                    <div
                        className={`${CONTAINER} flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left`}
                    >
                        <div>
                            <Brand compact />
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                                Aprende inglés un poco cada día.
                            </p>
                            <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                © {new Date().getFullYear()} Passive Learning. Todos los
                                derechos reservados.
                            </p>
                        </div>
                        <nav
                            aria-label="Enlaces del pie de página"
                            className="flex flex-wrap justify-center gap-5 text-sm text-slate-600"
                        >
                            <a
                                href="#proyecto"
                                className={`inline-flex min-h-11 items-center rounded hover:text-blue-700 ${FOCUS}`}
                            >
                                Proyecto
                            </a>
                            {/* Estas dos rutas necesitan sus propias páginas en tu aplicación. */}
                            <Link
                                to="/privacidad"
                                className={`inline-flex min-h-11 items-center rounded hover:text-blue-700 ${FOCUS}`}
                            >
                                Privacidad
                            </Link>
                            <Link
                                to="/contacto"
                                className={`inline-flex min-h-11 items-center rounded hover:text-blue-700 ${FOCUS}`}
                            >
                                Contacto
                            </Link>
                        </nav>
                    </div>
                </footer>
            )}

            {/* Solicita acceso; todavía no realiza ningún guardado en el backend. */}
            <dialog
                ref={dialogRef}
                onCancel={() => setShowAuthPrompt(false)}
                onClose={() => setShowAuthPrompt(false)}
                onClick={handleBackdropClick}
                aria-labelledby="auth-prompt-title"
                aria-describedby="auth-prompt-description"
                className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[540px] overflow-y-auto rounded-3xl border-0 bg-white p-0 text-slate-950 shadow-2xl backdrop:bg-slate-950/40 backdrop:backdrop-blur-sm"
            >
                <div className="relative p-6 sm:p-9">
                    <button
                        type="button"
                        aria-label="Cerrar aviso de registro"
                        onClick={() => setShowAuthPrompt(false)}
                        className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50 ${FOCUS}`}
                    >
                        <X aria-hidden="true" size={21} />
                    </button>
                    <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <Bookmark aria-hidden="true" size={26} />
                    </span>
                    <h2
                        id="auth-prompt-title"
                        className="text-2xl font-bold tracking-tight"
                    >
                        Guarda tu progreso
                    </h2>
                    <p
                        id="auth-prompt-description"
                        className="mt-3 text-base leading-7 text-slate-600"
                    >
                        Crea una cuenta para guardar esta lección y revisar lo que vayas
                        aprendiendo.
                    </p>
                    <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold">
                            <span className="uppercase tracking-wider text-slate-500">
                                Lección actual
                            </span>
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                                Lección sin guardar
                            </span>
                        </div>
                        <p lang="en" className="mt-3 text-lg font-semibold leading-snug">
                            {currentPhrase.rawEn}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                            <span lang="en">{currentPhrase.tense}</span> · Nivel{' '}
                            {currentPhrase.level}
                        </p>
                    </div>
                    <div className="mt-7 flex flex-col gap-3">
                        <Link
                            to="/register"
                            onClick={() => setShowAuthPrompt(false)}
                            className={`${PRIMARY_BUTTON} px-6`}
                        >
                            Crear cuenta <ArrowRight aria-hidden="true" size={18} />
                        </Link>
                        <Link
                            to="/login"
                            onClick={() => setShowAuthPrompt(false)}
                            className={SECONDARY_BUTTON}
                        >
                            Iniciar sesión
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowAuthPrompt(false)}
                            className={`min-h-11 rounded-xl text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-blue-700 ${FOCUS}`}
                        >
                            Seguir explorando
                        </button>
                    </div>
                    <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                        <ShieldCheck aria-hidden="true" size={15} className="shrink-0" />
                        Puedes seguir explorando sin registrarte.
                    </p>
                </div>
            </dialog>
        </div>
    );
}
