import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Heart, Share2, MoreHorizontal, Send, RefreshCw, User } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { toast } from "sonner";

interface Comment {
    id: string;
    author: string;
    avatar: string; // url or initials
    content: string;
    timestamp: string;
    likes: number;
}

interface Post {
    id: string;
    author: string;
    avatar: string;
    role: string;
    content: string;
    category: "General" | "Scholarship" | "Career" | "Interview";
    timestamp: string;
    likes: number;
    comments: Comment[];
}

const SEEDED_POSTS: Post[] = [
    {
        id: "1",
        author: "Sarah Wijaya",
        avatar: "SW",
        role: "Awardee LPDP",
        content: "Tips lolos wawancara LPDP: Fokus pada kontribusi nyata yang akan kamu bawa pulang ke Indonesia. Jangan terlalu teoritis! #LPDP #Beasiswa",
        category: "Scholarship",
        timestamp: "2 jam yang lalu",
        likes: 124,
        comments: [
            { id: "c1", author: "Budi Santoso", avatar: "BS", content: "Wah makasih tipsnya kak! Sangat membantu.", timestamp: "1 jam yang lalu", likes: 5 },
            { id: "c2", author: "Rina A.", avatar: "RA", content: "Kalau untuk essay gimana kak?", timestamp: "45 menit yang lalu", likes: 2 }
        ]
    },
    {
        id: "2",
        author: "Tech Recruiter Indo",
        avatar: "TR",
        role: "HR Manager",
        content: "Banyak pelamar jatuh di tahap teknikal karena kurang paham dasar algoritma. Jangan cuma hafal framework, pahami dasarnya! 💻",
        category: "Career",
        timestamp: "5 jam yang lalu",
        likes: 89,
        comments: []
    },
    {
        id: "3",
        author: "Admin EduSprout",
        avatar: "AE",
        role: "Official",
        content: "Selamat datang di Komunitas EduSprout! Gunakan wadah ini untuk saling berbagi dan tumbuh bersama. 🌱",
        category: "General",
        timestamp: "1 hari yang lalu",
        likes: 542,
        comments: []
    }
];

const CommunityPage = () => {
    const { addXp, checkBadge } = useGamification();
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Load posts
    useEffect(() => {
        const saved = localStorage.getItem("edusprout_community_posts");
        if (saved) {
            setPosts(JSON.parse(saved));
        } else {
            setPosts(SEEDED_POSTS);
            localStorage.setItem("edusprout_community_posts", JSON.stringify(SEEDED_POSTS));
        }
    }, []);

    // Check Badge on mount
    useEffect(() => {
        checkBadge("visit_community");
    }, [checkBadge]);

    const handleCreatePost = () => {
        if (!newPostContent.trim()) return;

        const newPost: Post = {
            id: Date.now().toString(),
            author: "Kamu", // In real app, get from AuthContext
            avatar: "ME",
            role: "Member",
            content: newPostContent,
            category: activeCategory === "All" ? "General" : activeCategory as "General" | "Scholarship" | "Career" | "Interview",
            timestamp: "Baru saja",
            likes: 0,
            comments: []
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem("edusprout_community_posts", JSON.stringify(updatedPosts));

        setNewPostContent("");
        addXp(50, "Membuat Postingan");
        toast.success("Postingan berhasil dibuat!");
    };

    const handleLike = (postId: string) => {
        const updatedPosts = posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
        localStorage.setItem("edusprout_community_posts", JSON.stringify(updatedPosts));
    };

    const filteredPosts = activeCategory === "All"
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container px-4 max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black gradient-text mb-4">Community Hub</h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan pelajar dan profesional lainnya. Diskusi, berbagi tips, dan bangun koneksi.
                    </p>
                </div>

                {/* Create Post Widget */}
                <Card className="bg-white/[0.02] border border-white/10 p-4 mb-8">
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10 border border-white/10">
                            <AvatarFallback className="bg-violet-600 text-white">ME</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <Textarea
                                placeholder="Apa yang sedang kamu pikirkan? Bagikan tips atau pertanyaan..."
                                className="bg-black/20 border-white/10 min-h-[100px] resize-none"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    {/* Category Selector (Simplistic) */}
                                    {["General", "Scholarship", "Career", "Interview"].map(cat => (
                                        <Badge
                                            key={cat}
                                            variant="outline"
                                            className={`cursor-pointer ${activeCategory === cat ? 'bg-violet-500/20 text-violet-300 border-violet-500/50' : 'text-zinc-500 hover:text-white'}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                                <Button onClick={handleCreatePost} disabled={!newPostContent.trim()} className="bg-violet-600 hover:bg-violet-700">
                                    <Send className="w-4 h-4 mr-2" /> Posting
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                    {["All", "General", "Scholarship", "Career", "Interview"].map((tab) => (
                        <Button
                            key={tab}
                            variant={activeCategory === tab ? "default" : "secondary"}
                            className={`rounded-full ${activeCategory === tab ? 'bg-white text-black hover:bg-zinc-200' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
                            onClick={() => setActiveCategory(tab)}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} className="bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.04] transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback className={`text-xs ${post.role === 'Official' ? 'bg-blue-600' : 'bg-zinc-700'} text-white`}>
                                            {post.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white text-sm">{post.author}</h3>
                                            {post.role && <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-white/10 text-zinc-300">{post.role}</Badge>}
                                        </div>
                                        <p className="text-xs text-zinc-500">{post.timestamp}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white" aria-label="More options">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>

                            <p className="text-zinc-300 mb-6 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                            <div className="flex items-center gap-6 text-zinc-500 text-sm">
                                <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                                    <Heart className="w-4 h-4 group-hover:fill-current" />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{post.comments.length}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto" aria-label="Share post">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Simple Comment Section Preview */}
                            {post.comments.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
                                    {post.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                                                {comment.avatar}
                                            </div>
                                            <div className="bg-white/5 rounded-xl px-3 py-2 text-sm flex-1">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span className="font-bold text-zinc-300 text-xs">{comment.author}</span>
                                                    <span className="text-[10px] text-zinc-600">{comment.timestamp}</span>
                                                </div>
                                                <p className="text-zinc-400">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CommunityPage;
