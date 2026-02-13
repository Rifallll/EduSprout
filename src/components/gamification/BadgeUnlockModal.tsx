import React, { useState, useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface BadgeUnlockModalProps {
    badge: {
        name: string;
        description: string;
        icon: string;
        xpValue: number;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen && badge) {
            // Trigger confetti animation
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ["#8b5cf6", "#a78bfa", "#c4b5fd"],
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ["#8b5cf6", "#a78bfa", "#c4b5fd"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [isOpen, badge]);

    if (!badge) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-dark border-white/10 max-w-md">
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    {/* Badge Icon with Animation */}
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                        <div className="relative text-8xl animate-bounce">
                            {badge.icon}
                        </div>
                    </div>

                    {/* Badge Unlocked Text */}
                    <div className="mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                            Badge Unlocked!
                        </h2>
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                    </div>

                    {/* Badge Name */}
                    <h3 className="text-3xl font-black text-white mb-3">
                        {badge.name}
                    </h3>

                    {/* Badge Description */}
                    <p className="text-zinc-400 mb-4 max-w-sm">
                        {badge.description}
                    </p>

                    {/* XP Reward */}
                    {badge.xpValue > 0 && (
                        <div className="mb-6 px-6 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full border border-violet-400/30">
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                                +{badge.xpValue} XP
                            </span>
                        </div>
                    )}

                    {/* Claim Button */}
                    <Button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-6 text-lg"
                    >
                        Klaim Hadiah! 🎉
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BadgeUnlockModal;
