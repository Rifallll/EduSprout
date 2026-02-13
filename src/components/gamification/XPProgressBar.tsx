import React from "react";
import { useGamification } from "@/context/GamificationContext";
import { Trophy, Zap } from "lucide-react";

const XPProgressBar: React.FC = () => {
    const { progress } = useGamification();

    // Calculate XP for current level
    const xpForCurrentLevel = (progress.level - 1) * 1000;
    const xpForNextLevel = progress.level * 1000;
    const currentLevelXp = progress.xp - xpForCurrentLevel;
    const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
    const progressPercentage = (currentLevelXp / xpNeededForLevel) * 100;

    return (
        <div className="flex items-center gap-3 px-4 py-2 glass-dark rounded-full border border-white/10 hover:border-violet-400/30 transition-all group">
            {/* Level Badge */}
            <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-sm">Lv {progress.level}</span>
            </div>

            {/* XP Progress Bar */}
            <div className="hidden md:flex flex-col gap-1 min-w-[150px]">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        XP
                    </span>
                    <span className="text-zinc-300 font-medium">
                        {currentLevelXp}/{xpNeededForLevel}
                    </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 rounded-full transition-all duration-500 ease-out animate-pulse-slow xp-progress-fill"
                        data-progress={progressPercentage}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Mobile: Just show level */}
            <div className="md:hidden text-xs text-zinc-400">
                {currentLevelXp} XP
            </div>
        </div>
    );
};

export default XPProgressBar;
