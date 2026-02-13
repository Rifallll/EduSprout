import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGamification } from "@/context/GamificationContext";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rocket, Download, FileText, CheckCircle, AlertTriangle, Lightbulb, RefreshCw, Wand2, Briefcase, GraduationCap, User } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

// --- Types ---
interface workExperience {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
}

interface educationHistory {
    id: string;
    degree: string;
    school: string;
    year: string;
}

interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    experience: workExperience[];
    education: educationHistory[];
    skills: string;
}

// --- Keywords for "AI" Scoring ---
const TECHNICAL_SKILLS = ["React", "TypeScript", "Node.js", "Python", "SQL", "AWS", "Docker", "Git", "Figma", "Agile"];
const BUZZWORDS = ["Led", "Developed", "Managed", "Created", "Optimized", "Designed", "Implemented", "Achieved", "Collaborated"];

const ResumeBuilder = () => {
    const { addXp, checkBadge } = useGamification();
    // --- State ---
    const [data, setData] = useState<ResumeData>({
        fullName: "",
        email: "",
        phone: "",
        summary: "",
        experience: [],
        education: [],
        skills: ""
    });

    const [aiScore, setAiScore] = useState(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const componentRef = useRef<HTMLDivElement>(null);

    // --- Handlers ---
    const updateField = (field: keyof ResumeData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const addExperience = () => {
        const newExp: workExperience = {
            id: Date.now().toString(),
            role: "",
            company: "",
            duration: "",
            description: ""
        };
        setData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const updateExperience = (id: string, field: keyof workExperience, value: string) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    const addEducation = () => {
        const newEdu: educationHistory = {
            id: Date.now().toString(),
            degree: "",
            school: "",
            year: ""
        };
        setData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const updateEducation = (id: string, field: keyof educationHistory, value: string) => {
        setData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        }));
    };

    // --- "AI" Analysis Logic ---
    const analyzeResume = () => {
        setIsAnalyzing(true);

        setTimeout(() => {
            let score = 0;
            const newSuggestions: string[] = [];
            const fullText = JSON.stringify(data).toLowerCase();

            // 1. Completeness Check (30 points)
            if (data.fullName) score += 5;
            if (data.email) score += 5;
            if (data.phone) score += 5;
            if (data.summary.length > 50) score += 10;
            else newSuggestions.push("Summary is too short. Aim for at least 50 characters to describe your professional self.");
            if (data.experience.length > 0) score += 5;
            else newSuggestions.push("Add at least one work experience to showcase your history.");

            // 2. Formatting & Length (20 points)
            const wordCount = data.summary.split(" ").length + data.experience.reduce((acc, curr) => acc + curr.description.split(" ").length, 0);
            if (wordCount > 100) score += 10;
            else newSuggestions.push("Your resume content is a bit thin. Elaborate more on your roles.");

            if (data.skills.length > 10) score += 10;
            else newSuggestions.push("Don't forget to list your key skills!");

            // 3. Keyword Impact (Action Verbs) (25 points)
            let buzzwordCount = 0;
            BUZZWORDS.forEach(word => {
                if (fullText.includes(word)) buzzwordCount++;
            });
            const buzzScore = Math.min(buzzwordCount * 2, 25);
            score += buzzScore;
            if (buzzwordCount < 5) newSuggestions.push(`Try using more action verbs like 'Managed', 'Developed', or 'Achieved' to make your experience pop.`);

            // 4. Industry Relevance (25 points)
            let techCount = 0;
            TECHNICAL_SKILLS.forEach(skill => {
                if (fullText.includes(skill)) techCount++;
            });
            const techScore = Math.min(techCount * 3, 25);
            score += techScore;
            if (techCount < 3) newSuggestions.push("Include more industry-specific technical skills to pass ATS filters.");

            setAiScore(score);
            setSuggestions(newSuggestions);
            setIsAnalyzing(false);
            toast.success("AI Analysis Complete", { description: `Your resume scored ${score}/100!` });

            // Gamification Trigger
            checkBadge("update_profile");
            addXp(50, "Mel melakukan Analisis Resume");

        }, 1500); // Simulate processing time
    };

    // --- Print Handler ---
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Resume_${data.fullName.replace(/\s+/g, "_")}`,
    });

    // Auto-analyze when data changes significantly (debounced in real app, here on button or mount)
    useEffect(() => {
        // Optional: Auto-analyze on mount if data exists
    }, []);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black gradient-text">AI Resume Builder</h1>
                        <p className="text-muted-foreground">Craft a perfect resume with real-time AI scoring.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={analyzeResume} disabled={isAnalyzing} className="bg-violet-600 hover:bg-violet-700">
                            {isAnalyzing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            {isAnalyzing ? "Analyzing..." : "AI Scan"}
                        </Button>
                        <Button variant="outline" onClick={handlePrint}>
                            <Download className="mr-2 h-4 w-4" /> Export PDF
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[80vh]">

                    {/* Editor Panel (Left) */}
                    <Card className="lg:col-span-5 h-full flex flex-col border-white/10 bg-white/[0.02]">
                        <Tabs defaultValue="personal" className="flex-1 flex flex-col h-full overflow-hidden">
                            <div className="p-4 border-b border-white/10">
                                <TabsList className="grid w-full grid-cols-4 bg-white/5">
                                    <TabsTrigger value="personal"><User className="w-4 h-4" /></TabsTrigger>
                                    <TabsTrigger value="experience"><Briefcase className="w-4 h-4" /></TabsTrigger>
                                    <TabsTrigger value="education"><GraduationCap className="w-4 h-4" /></TabsTrigger>
                                    <TabsTrigger value="skills"><Lightbulb className="w-4 h-4" /></TabsTrigger>
                                </TabsList>
                            </div>

                            <ScrollArea className="flex-1 p-6">
                                <TabsContent value="personal" className="space-y-4 mt-0">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input value={data.email} onChange={(e) => updateField("email", e.target.value)} placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input value={data.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+62 812..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Professional Summary</Label>
                                        <Textarea
                                            value={data.summary}
                                            onChange={(e) => updateField("summary", e.target.value)}
                                            placeholder="Experienced developer with a passion for..."
                                            className="h-32"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="experience" className="space-y-6 mt-0">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="p-4 rounded-xl bg-white/5 space-y-3 border border-white/10">
                                            <Input value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} placeholder="Job Title (e.g. Frontend Dev)" className="bg-black/20" />
                                            <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Company Name" className="bg-black/20" />
                                            <Input value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} placeholder="Duration (e.g. 2020 - Present)" className="bg-black/20" />
                                            <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Describe your achievements..." className="bg-black/20" />
                                        </div>
                                    ))}
                                    <Button variant="outline" onClick={addExperience} className="w-full border-dashed">+ Add Experience</Button>
                                </TabsContent>

                                <TabsContent value="education" className="space-y-6 mt-0">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="p-4 rounded-xl bg-white/5 space-y-3 border border-white/10">
                                            <Input value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} placeholder="University / School" className="bg-black/20" />
                                            <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Degree (e.g. Computer Science)" className="bg-black/20" />
                                            <Input value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} placeholder="Graduation Year" className="bg-black/20" />
                                        </div>
                                    ))}
                                    <Button variant="outline" onClick={addEducation} className="w-full border-dashed">+ Add Education</Button>
                                </TabsContent>

                                <TabsContent value="skills" className="space-y-4 mt-0">
                                    <div className="space-y-2">
                                        <Label>Skills (Comma separated)</Label>
                                        <Textarea
                                            value={data.skills}
                                            onChange={(e) => updateField("skills", e.target.value)}
                                            placeholder="React, TypeScript, Project Management, Communication..."
                                            className="h-40"
                                        />
                                    </div>
                                </TabsContent>
                            </ScrollArea>
                        </Tabs>
                    </Card>

                    {/* Preview Panel (Right) */}
                    <div className="lg:col-span-7 h-full flex flex-col gap-4">
                        {/* AI Score Card */}
                        <Card className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border-violet-500/20 p-4 flex items-center gap-4">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-violet-400 border-t-transparent animate-spin duration-[10000ms]"></div>
                                <span className="text-xl font-black text-white">{aiScore}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-white">Resume Strength</span>
                                    <span className={`text-sm font-bold ${aiScore > 80 ? 'text-green-400' : aiScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {aiScore > 80 ? 'Excellent' : aiScore > 50 ? 'Good' : 'Needs Improvement'}
                                    </span>
                                </div>
                                <Progress value={aiScore} className="h-2 bg-black/20" indicatorClassName="bg-violet-400" />
                            </div>
                        </Card>
                        {suggestions.length > 0 && (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-sm text-amber-200">
                                <div className="flex items-center gap-2 mb-2 font-bold text-amber-400">
                                    <AlertTriangle className="h-4 w-4" /> AI Suggestions
                                </div>
                                <ul className="list-disc list-inside space-y-1 opacity-80">
                                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Actual A4 Preview */}
                        <div className="flex-1 bg-zinc-800 rounded-xl overflow-hidden border border-white/10 relative shadow-2xl">
                            <div className="absolute inset-0 overflow-auto p-4 md:p-8 flex justify-center bg-zinc-900/50">
                                {/* Printable Area */}
                                <div
                                    ref={componentRef}
                                    className="w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] shadow-white/5 font-sans"
                                >
                                    <header className="border-b-2 border-slate-800 pb-6 mb-6">
                                        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2">{data.fullName || "YOUR NAME"}</h1>
                                        <div className="flex gap-4 text-sm text-slate-600 font-medium">
                                            {data.email && <span>{data.email}</span>}
                                            {data.phone && <span>• {data.phone}</span>}
                                        </div>
                                    </header>

                                    {data.summary && (
                                        <section className="mb-8">
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Professional Summary</h3>
                                            <p className="text-slate-700 leading-relaxed">{data.summary}</p>
                                        </section>
                                    )}

                                    {data.experience.length > 0 && (
                                        <section className="mb-8">
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Experience</h3>
                                            <div className="space-y-6">
                                                {data.experience.map(exp => (
                                                    <div key={exp.id}>
                                                        <div className="flex justify-between items-baseline mb-1">
                                                            <h4 className="font-bold text-lg text-slate-800">{exp.role || "Role"}</h4>
                                                            <span className="text-sm font-medium text-slate-500">{exp.duration}</span>
                                                        </div>
                                                        <div className="font-semibold text-violet-700 mb-2">{exp.company || "Company"}</div>
                                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {data.education.length > 0 && (
                                        <section className="mb-8">
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Education</h3>
                                            <div className="space-y-4">
                                                {data.education.map(edu => (
                                                    <div key={edu.id}>
                                                        <div className="flex justify-between items-baseline">
                                                            <h4 className="font-bold text-slate-800">{edu.school || "University"}</h4>
                                                            <span className="text-sm text-slate-500">{edu.year}</span>
                                                        </div>
                                                        <div className="text-sm text-slate-600">{edu.degree}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {data.skills && (
                                        <section>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-200 pb-2">Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {data.skills.split(',').map((skill, i) => (
                                                    skill.trim() && (
                                                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                                                            {skill.trim()}
                                                        </span>
                                                    )
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
