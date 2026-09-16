import { NavLink } from "react-router";

export default function Header() {
    const navLinkClass = ({ isActive }) =>
        `
      relative flex h-full items-center px-1
      text-sm font-medium
      transition-colors duration-200
      ${isActive
            ? "text-primary"
            : "text-secondary hover:text-text"
        }
    `;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-2.5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                        </svg>
                    </div>

                    <span className="font-heading text-lg font-bold tracking-tight text-text">
                        Passive Learning
                    </span>
                </NavLink>

                {/* Navegación */}
                <nav className="hidden h-full items-center gap-8 md:flex">
                    <NavLink
                        to="/"
                        end
                        className={navLinkClass}
                    >
                        {({ isActive }) => (
                            <>Hoy {isActive && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
                            )}
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/library"
                        className={navLinkClass}
                    >
                        {({ isActive }) => (
                            <> Biblioteca {isActive && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
                            )}
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/progress"
                        className={navLinkClass}
                    >
                        {({ isActive }) => (
                            <> Progreso {isActive && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
                            )}
                            </>
                        )}
                    </NavLink>
                </nav>

                {/* Cuenta */}
                <div className="hidden items-center gap-3 md:flex">
                    <NavLink
                        to="/login"
                        className=" rounded-md px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-bg hover:text-text "
                    >
                        Iniciar sesión
                    </NavLink>

                    <NavLink
                        to="/register"
                        className=" rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover active:bg-primary-active "
                    >
                        Crear cuenta
                    </NavLink>
                </div>

            </div>
            {/* <section className="text-center max-w-xl mx-auto mb-10 md:mb-12">
                <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-on-surface-variant mb-3 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">Lección de hoy · 24 de Octubre</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface mb-2">Inmersión Diaria Asistida</h1>
                <p className="font-body-base text-body-base text-secondary max-w-md mx-auto">
                    Aprende mediante exposición natural y contextual, asimilando patrones sin memorización forzada.
                </p>
            </section> */}
        </header>





    );
}