import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AppReadyContext } from "../../context/appReady";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function Reveal({
    children,
    delay = 0,
    className = "",
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [intersected, setIntersected] = useState(false);
    const appReady = useContext(AppReadyContext);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersected(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    /* Only actually reveal once BOTH are true: the element is in view,
       AND the splash screen has finished covering the page. */
    const visible = intersected && appReady;

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
