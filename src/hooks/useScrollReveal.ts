import { useEffect } from "react";

export const useScrollReveal = () => {
    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll(".reveal");
            reveals.forEach((element) => {
                const windowHeight = window.innerHeight;
                const revealTop = element.getBoundingClientRect().top;
                const revealPoint = 150;

                if (revealTop < windowHeight - revealPoint) {
                    element.classList.add("active");
                } else {
                    // Optional: remove if you want it to hide again
                    // element.classList.remove("active");
                }
            });
        };

        window.addEventListener("scroll", reveal);
        // Initial check
        reveal();

        return () => window.removeEventListener("scroll", reveal);
    }, []);
};
