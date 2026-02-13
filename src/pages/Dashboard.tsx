import React from 'react';
import { useBookmarks } from '@/context/BookmarkContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import JobCard from "@/components/JobCard"; // Reuse existing
import ScholarshipListItem from "@/components/ScholarshipListItem"; // Reuse existing
import { Bookmark, LayoutDashboard, FileText, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useGamification } from '@/context/GamificationContext';
import { useApplications } from '@/context/ApplicationContext';
import { useUser } from '@/context/UserContext';
import { Progress } from "@/components/ui/progress";
import { Badge as UiBadge } from "@/components/ui/badge";
import { MoveRight } from 'lucide-react';
import DailyQuests from '@/components/gamification/DailyQuests';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const Dashboard = () => {

    // ... inside Dashboard component
    const { savedJobs, savedScholarships } = useBookmarks();
    const { progress } = useGamification();
    const { applications } = useApplications();
    const { user, updateUser } = useUser();

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="container px-4 sm:px-6">

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Saya</h1>
                        <p className="text-zinc-400">Kelola lamaran, simpanan, dan profil kamu.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Profile Summary */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-violet-500/20 relative">
                                {user.name.charAt(0)}
                                <div className="absolute -bottom-2 bg-black/80 text-xs px-2 py-0.5 rounded-full border border-white/10 text-violet-300">
                                    Lvl {progress.level}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                            <p className="text-sm text-zinc-500 mb-4">{user.university} • {user.major}</p>

                            <div className="mb-6 text-left bg-white/5 p-3 rounded-xl">
                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                    <span className="text-zinc-400">XP Progress</span>
                                    <span className="text-violet-300">{progress.xp} XP</span>
                                </div>
                                <Progress value={(progress.xp % 1000) / 10} className="h-2 bg-black/40" indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                            </div>

                            {/* Edit Profile Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 mb-2 justify-start">
                                        <User className="mr-2 h-4 w-4" /> Edit Profil
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Profil</DialogTitle>
                                        <DialogDescription className="text-zinc-400">
                                            Ubah informasi profil Anda di sini. Klik simpan setelah selesai.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right text-zinc-400">
                                                Nama
                                            </Label>
                                            <Input
                                                id="name"
                                                defaultValue={user.name}
                                                className="col-span-3 bg-white/5 border-white/10 text-white focus:border-violet-500"
                                                onChange={(e) => updateUser({ name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="university" className="text-right text-zinc-400">
                                                Kampus
                                            </Label>
                                            <Input
                                                id="university"
                                                defaultValue={user.university}
                                                className="col-span-3 bg-white/5 border-white/10 text-white focus:border-violet-500"
                                                onChange={(e) => updateUser({ university: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="major" className="text-right text-zinc-400">
                                                Jurusan
                                            </Label>
                                            <Input
                                                id="major"
                                                defaultValue={user.major}
                                                className="col-span-3 bg-white/5 border-white/10 text-white focus:border-violet-500"
                                                onChange={(e) => updateUser({ major: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="semester" className="text-right text-zinc-400">
                                                Semester
                                            </Label>
                                            <Input
                                                id="semester"
                                                defaultValue={user.semester}
                                                className="col-span-3 bg-white/5 border-white/10 text-white focus:border-violet-500"
                                                onChange={(e) => updateUser({ semester: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="bio" className="text-right text-zinc-400">
                                                Bio
                                            </Label>
                                            <Textarea
                                                id="bio"
                                                defaultValue={user.bio}
                                                className="col-span-3 bg-white/5 border-white/10 text-white focus:border-violet-500 min-h-[80px]"
                                                onChange={(e) => updateUser({ bio: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">Simpan Perubahan</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button variant="outline" className="w-full border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 mb-2 justify-start">
                                <Settings className="mr-2 h-4 w-4" /> Pengaturan
                            </Button>
                            <Link to="/">
                                <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/10 justify-start">
                                    <LogOut className="mr-2 h-4 w-4" /> Keluar
                                </Button>
                            </Link>
                        </div>

                        {/* Badges Widget */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Badges Saya</h3>
                            <div className="flex flex-wrap gap-3">
                                {progress.badges.map((badge) => (
                                    <Tooltip key={badge.id}>
                                        <TooltipTrigger asChild>
                                            <div className="relative group cursor-help">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border transition-all duration-300 ${badge.unlocked ? 'bg-violet-500/20 border-violet-500/50 text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]' : 'bg-white/5 border-white/10 opacity-40 grayscale group-hover:opacity-60'}`}>
                                                    {badge.icon}
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-zinc-950 border-white/10 text-white max-w-[150px] text-center">
                                            <p className="font-bold mb-1 text-violet-300">{badge.name}</p>
                                            <p className="text-xs text-zinc-400">{badge.description}</p>
                                            {!badge.unlocked && <p className="text-[10px] text-zinc-500 mt-2 italic border-t border-white/10 pt-1">🔒 Lakukan aktivitas untuk membuka</p>}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>

                        {/* Daily Quests Widget */}
                        <DailyQuests />
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3">
                        <Tabs defaultValue="saved" className="w-full">
                            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-8 w-full sm:w-auto overflow-x-auto justify-start">
                                <TabsTrigger value="summary" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white rounded-lg px-6">
                                    <LayoutDashboard className="mr-2 h-4 w-4" /> Ringkasan
                                </TabsTrigger>
                                <TabsTrigger value="saved" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white rounded-lg px-6">
                                    <Bookmark className="mr-2 h-4 w-4" /> Disimpan
                                </TabsTrigger>
                                <TabsTrigger value="applications" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white rounded-lg px-6">
                                    <FileText className="mr-2 h-4 w-4" /> Lamaran
                                </TabsTrigger>
                            </TabsList>

                            {/* Summary Tab */}
                            <TabsContent value="summary">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                                        <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Lamaran</h3>
                                        <p className="text-3xl font-bold text-white">{applications.length}</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                                        <h3 className="text-zinc-400 text-sm font-medium mb-2">Item Disimpan</h3>
                                        <p className="text-3xl font-bold text-violet-400">{savedJobs.length + savedScholarships.length}</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                                        <h3 className="text-zinc-400 text-sm font-medium mb-2">Panggilan Interview</h3>
                                        <p className="text-3xl font-bold text-green-400">0</p>
                                    </div>
                                </div>
                                <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                                    <p className="text-zinc-500">Belum ada aktivitas terbaru.</p>
                                    <Link to="/jobs">
                                        <Button variant="link" className="text-violet-400">Mulai cari lowongan</Button>
                                    </Link>
                                </div>
                            </TabsContent>

                            {/* Saved Items Tab */}
                            <TabsContent value="saved" className="space-y-8">

                                {/* Saved Jobs Section */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">Lowongan Disimpan ({savedJobs.length})</h3>
                                    </div>
                                    {savedJobs.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {savedJobs.map((item) => (
                                                // Reconstruct props for JobCard
                                                <JobCard
                                                    key={item.id}
                                                    {...item.data}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/5">
                                            <p className="text-zinc-500 mb-4">Belum ada lowongan yang disimpan.</p>
                                            <Link to="/jobs">
                                                <Button variant="outline" className="border-violet-500/30 text-violet-300 hover:bg-violet-500/20">Cari Lowongan</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Separator className="bg-white/10" />

                                {/* Saved Scholarships Section */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">Beasiswa Disimpan ({savedScholarships.length})</h3>
                                    </div>
                                    {savedScholarships.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {savedScholarships.map((item) => (
                                                <ScholarshipListItem
                                                    key={item.id}
                                                    {...item.data}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/5">
                                            <p className="text-zinc-500 mb-4">Belum ada beasiswa yang disimpan.</p>
                                            <Link to="/scholarships">
                                                <Button variant="outline" className="border-violet-500/30 text-violet-300 hover:bg-violet-500/20">Cari Beasiswa</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                            </TabsContent>

                            {/* Applications Tab */}
                            <TabsContent value="applications">
                                {applications.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-bold text-white">Riwayat Lamaran ({applications.length})</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {applications.map((app) => (
                                                <div key={app.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors group">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{app.jobTitle}</h4>
                                                        <div className="flex flex-wrap gap-2 text-sm text-zinc-400 mb-2">
                                                            <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {app.company}</span>
                                                            <span className="text-zinc-600">•</span>
                                                            <span>{app.location}</span>
                                                            <span className="text-zinc-600">•</span>
                                                            <span>Dilamar pada: {app.dateApplied}</span>
                                                        </div>
                                                        <div className="flex items-center mt-2">
                                                            <UiBadge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 capitalize">
                                                                {app.status === 'sent' ? 'Terkirim' : app.status}
                                                            </UiBadge>
                                                        </div>
                                                    </div>
                                                    <Link to={app.link}>
                                                        <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                                            Lihat Detail <MoveRight className="ml-2 h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/5">
                                        <FileText className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-white mb-2">Belum ada lamaran terkirim</h3>
                                        <p className="text-zinc-500 mb-6">Riwayat lamaran kamu akan muncul di sini.</p>
                                        <Link to="/jobs">
                                            <Button className="bg-violet-600 hover:bg-violet-700">Mulai Melamar</Button>
                                        </Link>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </main>
                </div >
            </div >
        </div >
    );
};

export default Dashboard;
