import React, { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
                cursorRef.current.style.opacity = '1';
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("clickable");

            setIsHovering(!!isClickable);
            if (cursorRef.current) {
                cursorRef.current.style.transform = isClickable ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)';
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0';
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] transition-transform duration-300 ease-out hidden md:block opacity-0 -translate-x-1/2 -translate-y-1/2"
        >
            <div ref={cursorInnerRef} className={`absolute inset-0 bg-primary/20 rounded-full scale-50`} />
        </div>
    );
};

export default CustomCursor;
