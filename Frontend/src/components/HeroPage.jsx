export default function Hero() {
    return (
        <section className="text-center max-w-xl mx-auto mt-5 mb-10 md:mb-12">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-on-surface-variant mb-3 shadow-sm">
                {/* Se añade aria-hidden="true" para accesibilidad */}
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>

                {/* Se elimina 'text-on-surface-variant' por ser redundante con el padre */}
                <span className="font-label-caps text-label-caps uppercase tracking-wider">
                    Lección de hoy · 24 de Octubre
                </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface mb-2">
                Inmersión Diaria Asistida
            </h1>

            <p className="font-body-base text-body-base text-secondary max-w-md mx-auto">
                Aprende mediante exposición natural y contextual, asimilando patrones sin memorización forzada.
            </p>
        </section>

    );
}
