import { Link } from "react-router";

function isRouteLink(href) {
    return typeof href === "string" && href.startsWith("/") && !href.startsWith("/#") && !href.startsWith("//#");
}

const variants = {
    primary:
        "bg-cta text-white hover:bg-cta-hover shadow-sm hover:shadow-md active:scale-[0.98]",
    outline:
        "border-2 border-accent text-accent hover:bg-accent hover:text-white active:scale-[0.98]",
    ghost:
        "text-accent hover:text-accent-hover",
    white:
        "bg-white text-accent hover:bg-accent-muted active:scale-[0.98]",
};

const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-2.5 text-sm rounded-lg",
    lg: "px-8 py-3.5 text-base rounded-lg",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    type = "button",
    className = "",
    ...rest
}) {
    const base =
        "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2";
    const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

    if (href && isRouteLink(href)) {
        return (
            <Link to={href} className={classes} {...rest}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    );
}