import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Building2, MapPin, CalendarDays, DollarSign, GraduationCap, CheckCircle, Star, Bookmark, Share2, Globe, Wallet, Award, ArrowRight, Lightbulb, Clock, Users, Briefcase, FileText, ExternalLink } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ScholarshipListItem from "@/components/ScholarshipListItem";
import scrapedScholarships from "@/data/scrapedScholarships.json";
import { useBookmarks, BookmarkedItem } from "@/context/BookmarkContext";
import { toast } from "sonner";
import { enrichScholarshipData, EnrichedScholarshipItem } from "@/utils/scholarshipUtils";
import { useGamification } from "@/context/GamificationContext";

const ScholarshipDetailPage = () => {
    const { scholarshipId } = useParams<{ scholarshipId: string }>();
    const { checkBadge } = useGamification();

    // Trigger gamification
    React.useEffect(() => {
        checkBadge("view_scholarship");
    }, [checkBadge]);

    // Find and enrich the scholarship data
    const rawScholarship = scrapedScholarships.find((s) => s.id === scholarshipId);
    const scholarship: EnrichedScholarshipItem | undefined = rawScholarship ? enrichScholarshipData(rawScholarship) : undefined;

    const { isBookmarked, toggleBookmark } = useBookmarks();

    if (!scholarship) {
        return (
            <div className="container py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4 gradient-text">Beasiswa Tidak Ditemukan</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Maaf, beasiswa yang Anda cari tidak tersedia atau telah dihapus.
                </p>
                <Link to="/scholarships">
                    <Button size="lg">Kembali ke Daftar Beasiswa</Button>
                </Link>
            </div>
        );
    }

    const isSaved = isBookmarked(scholarship.id, 'scholarship');

    const handleBookmark = () => {
        const item: BookmarkedItem = {
            id: scholarship.id,
            type: 'scholarship',
            title: scholarship.title,
            subtitle: scholarship.organizer,
            location: scholarship.location,
            link: `/scholarships/${scholarship.id}`,
            date: scholarship.date,
            data: scholarship
        };
        toggleBookmark(item);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link disalin!", { description: "Bagikan beasiswa ini ke temanmu." });
    };

    const relatedScholarships = scrapedScholarships
        .filter(s => s.id !== scholarshipId)
        .slice(0, 5)
        .map(enrichScholarshipData);

    return (
        <div className="min-h-screen bg-background pb-20 pt-24">
            {/* Premium Hero Section */}
            <div className="relative border-b border-white/5 bg-white/[0.02] pb-12 mb-12">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                <div className="container px-4 sm:px-6 relative z-10">
                    <div className="mb-8">
                        <Link to="/scholarships" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-medium hover:-translate-x-1 duration-200">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beasiswa
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center p-4 shadow-2xl shadow-violet-500/20 border border-white/10 flex-shrink-0 text-white">
                            <GraduationCap className="w-16 h-16" />
                        </div>

                        <div className="flex-grow space-y-4">
                            <div className="flex flex-wrap gap-3">
                                {scholarship.fundingType && (
                                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30">
                                        <Wallet className="h-3 w-3 mr-1.5" /> {scholarship.fundingType}
                                    </Badge>
                                )}
                                {scholarship.degreeLevels?.map((level, i) => (
                                    <Badge key={i} variant="outline" className="border-white/10 text-zinc-300 bg-white/5">
                                        {level}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
                                {scholarship.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-base">
                                {scholarship.organizer && (
                                    <div className="flex items-center hover:text-white transition-colors">
                                        <Building2 className="mr-2 h-5 w-5 text-violet-400" />
                                        <span className="font-semibold">{scholarship.organizer}</span>
                                    </div>
                                )}
                                {scholarship.location && (
                                    <div className="flex items-center">
                                        <Globe className="mr-2 h-5 w-5 text-zinc-500" />
                                        <span>{scholarship.location}</span>
                                    </div>
                                )}
                                {scholarship.date && (
                                    <div className="flex items-center text-red-300 font-medium">
                                        <CalendarDays className="mr-2 h-5 w-5" />
                                        <span>Deadline: {scholarship.date}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <Button
                                size="icon"
                                variant="outline"
                                className={`h-12 w-12 rounded-xl border-white/10 ${isSaved ? 'bg-violet-500/20 text-violet-400 border-violet-500/50' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                                onClick={handleBookmark}
                            >
                                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-12 w-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                                onClick={handleShare}
                            >
                                <Share2 className="h-5 w-5" />
                            </Button>
                            <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="flex-grow md:flex-grow-0">
                                <Button size="lg" className="w-full h-12 rounded-xl px-8 font-bold bg-white text-black hover:bg-violet-400 hover:text-white transition-all shadow-lg hover:shadow-violet-500/30">
                                    Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:bg-white/[0.04] transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Wallet className="w-24 h-24" />
                                </div>
                                <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Cakupan Pendanaan</h3>
                                <p className="text-2xl font-bold text-white mb-1">{scholarship.fundingType || "Partial / Full"}</p>
                                <p className="text-sm text-zinc-500">Mencakup biaya pendidikan & sebagian biaya hidup</p>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:bg-white/[0.04] transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <GraduationCap className="w-24 h-24" />
                                </div>
                                <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Jenjang Studi</h3>
                                <div className="flex flex-wrap gap-2">
                                    {scholarship.degreeLevels?.map((l, i) => (
                                        <Badge key={i} className="bg-white/10 hover:bg-white/20 text-white">{l}</Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-zinc-500 mt-2">Terbuka untuk berbagai jurusan</p>
                            </div>
                        </div>

                        <Separator className="bg-white/5" />

                        <div className="prose prose-invert max-w-none prose-lg">
                            <h3 className="text-2xl font-bold text-white mb-6">Tentang Program</h3>
                            <p className="text-zinc-300 leading-relaxed">
                                Program {scholarship.title} adalah kesempatan emas bagi pelajar Indonesia untuk melanjutkan pendidikan di {scholarship.location || "institusi terkemuka"}.
                                Beasiswa ini dirancang untuk mencetak pemimpin masa depan yang berprestasi dan berkontribusi bagi bangsa.
                            </p>

                            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Persyaratan Umum</h3>
                            <ul className="text-zinc-300 space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>Warga Negara Indonesia (WNI).</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>Memiliki prestasi akademik atau non-akademik yang baik.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>Sehat jasmani dan rohani.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>Memenuhi persyaratan bahasa (TOEFL/IELTS) jika diminta.</span>
                                </li>
                            </ul>

                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mt-8 flex items-start gap-4">
                                <Lightbulb className="h-8 w-8 text-amber-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-amber-500 mb-2 text-lg">Tips Sukses</h4>
                                    <p className="text-amber-200/80 text-sm">
                                        Pastikan Anda membaca panduan pendaftaran secara teliti di website resmi dan siapkan dokumen jauh-jauh hari sebelum deadline pada {scholarship.date}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Timeline Widget */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                                <Clock className="w-5 h-5 mr-3 text-violet-400" /> Timeline Seleksi
                            </h3>
                            <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8">
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-violet-500 border-4 border-black"></div>
                                    <p className="text-xs text-violet-400 font-bold uppercase mb-1">Sekarang</p>
                                    <p className="text-white font-bold">Pendaftaran Dibuka</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-zinc-700 border-4 border-black"></div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase mb-1">{scholarship.date}</p>
                                    <p className="text-zinc-400 font-bold">Batas Akhir Pendaftaran</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-zinc-700 border-4 border-black"></div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase mb-1">TBA</p>
                                    <p className="text-zinc-400 font-bold">Seleksi Berkas</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-zinc-700 border-4 border-black"></div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase mb-1">TBA</p>
                                    <p className="text-zinc-400 font-bold">Pengumuman</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-violet-900 to-indigo-900 rounded-3xl p-8 text-center">
                            <Award className="w-16 h-16 text-white/20 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">Butuh Bantuan Mentoring?</h3>
                            <p className="text-white/60 mb-6 text-sm">Dapatkan bimbingan dari awardee tahun lalu untuk meningkatkan peluang lolosmu.</p>
                            <Button className="w-full bg-white text-black hover:bg-zinc-200">Cari Mentor</Button>
                        </div>

                    </div>
                </div>

                {/* Similar Scholarships */}
                {relatedScholarships.length > 0 && (
                    <div className="mt-20 border-t border-white/5 pt-20">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-3xl font-bold text-white">Beasiswa Serupa</h2>
                            <Link to="/scholarships" className="text-violet-400 hover:text-violet-300 font-bold">Lihat Semua</Link>
                        </div>
                        <Carousel opts={{ align: "start" }} className="w-full">
                            <CarouselContent className="-ml-4">
                                {relatedScholarships.map((s) => (
                                    <CarouselItem key={s.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <ScholarshipListItem
                                            id={s.id}
                                            title={s.title}
                                            organizer={s.organizer}
                                            location={s.location}
                                            deadline={s.deadline || s.date || "Open"}
                                            link={`/scholarships/${s.id}`}
                                            degreeLevels={s.degreeLevels}
                                            fundingType={s.fundingType}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ScholarshipDetailPage;
