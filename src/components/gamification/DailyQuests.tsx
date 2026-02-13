import React, { useState } from "react";
import { useGamification } from "@/context/GamificationContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Trophy } from "lucide-react";

interface Quest {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: number;
    completed: boolean;
}

const DailyQuests: React.FC = () => {
    const { progress, addXp } = useGamification();

    // Mock daily quests - in production this would come from context
    const [quests, setQuests] = useState<Quest[]>([
        {
            id: "view_scholarships",
            title: "Jelajahi Beasiswa",
            description: "Lihat 3 detail beasiswa",
            target: 3,
            current: 0,
            reward: 50,
            completed: false,
        },
        {
            id: "view_jobs",
            title: "Cari Peluang Karir",
            description: "Lihat 5 lowongan kerja",
            target: 5,
            current: 0,
            reward: 75,
            completed: false,
        },
        {
            id: "update_profile",
            title: "Lengkapi Profil",
            description: "Update resume kamu",
            target: 1,
            current: 0,
            reward: 100,
            completed: false,
        },
    ]);

    const completeQuest = (questId: string) => {
        setQuests(prev =>
            prev.map(q =>
                q.id === questId && !q.completed
                    ? { ...q, completed: true }
                    : q
            )
        );
        const quest = quests.find(q => q.id === questId);
        if (quest && !quest.completed) {
            addXp(quest.reward, `Menyelesaikan quest: ${quest.title}`);
        }
    };

    const totalQuests = quests.length;
    const completedQuests = quests.filter(q => q.completed).length;
    const progressPercentage = (completedQuests / totalQuests) * 100;

    return (
        <Card className="glass-dark border-white/10 p-6 hover:border-violet-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Quest Harian</h3>
                        <p className="text-xs text-zinc-400">
                            {completedQuests}/{totalQuests} selesai
                        </p>
                    </div>
                </div>
                <Trophy className="w-6 h-6 text-yellow-400" />
            </div>

            {/* Overall Progress */}
            <div className="mb-6">
                <Progress
                    value={progressPercentage}
                    className="h-2 bg-white/5"
                />
            </div>

            {/* Quest List */}
            <div className="space-y-3">
                {quests.map((quest) => (
                    <div
                        key={quest.id}
                        className={`p-4 rounded-xl border transition-all ${quest.completed
                                ? "bg-violet-500/10 border-violet-500/30"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                            }`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {quest.completed && (
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                    <h4 className="font-bold text-white text-sm">
                                        {quest.title}
                                    </h4>
                                </div>
                                <p className="text-xs text-zinc-400">{quest.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                                    +{quest.reward} XP
                                </div>
                            </div>
                        </div>

                        {/* Quest Progress */}
                        <div className="flex items-center gap-2 mt-2">
                            <Progress
                                value={(quest.current / quest.target) * 100}
                                className="h-1.5 bg-black/20 flex-1"
                            />
                            <span className="text-xs text-zinc-500">
                                {quest.current}/{quest.target}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Tip */}
            <div className="mt-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <p className="text-xs text-zinc-400">
                    💡 <span className="font-semibold text-violet-300">Pro Tip:</span> Quest baru muncul setiap hari! Selesaikan semuanya untuk XP maksimal.
                </p>
            </div>
        </Card>
    );
};

export default DailyQuests;
