import React, { useState, useEffect, useRef } from "react";

const ScrollProgressBar = () => {
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll <= 0) return;
            const currentScroll = window.scrollY;
            const progress = (currentScroll / totalScroll) * 100;

            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${progress}%`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial call
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none">
            <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-100 ease-out"
            />
        </div>
    );
};

export default ScrollProgressBar;
