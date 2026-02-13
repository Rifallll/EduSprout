import React from "react";

const LogoMarquee = () => {
    const logos = [
        { name: "UI", color: "text-blue-400" },
        { name: "ITB", color: "text-amber-400" },
        { name: "UGM", color: "text-emerald-400" },
        { name: "UNPAD", color: "text-rose-400" },
        { name: "ITS", color: "text-cyan-400" },
        { name: "IPB", color: "text-indigo-400" },
        { name: "UNDIP", color: "text-orange-400" },
        { name: "UB", color: "text-pink-400" },
    ];

    return (
        <div className="w-full py-20 overflow-hidden relative">
            <div className="container px-4 mb-12 text-center">
                <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/30">
                    Dipercaya oleh Mahasiswa dari Kampus Terbaik
                </p>
            </div>

            {/* Gradient Mask */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div className="flex animate-marquee whitespace-nowrap">
                {[...logos, ...logos].map((logo, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center mx-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    >
                        <span className={`text-4xl font-black tracking-tighter ${logo.color}`}>
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoMarquee;
