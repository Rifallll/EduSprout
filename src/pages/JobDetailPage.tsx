import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Briefcase, Building2, MapPin, CalendarDays, DollarSign, GraduationCap, Lightbulb, Zap, CheckCircle, Star, Clock, Home, Users, TrendingUp, MessageCircleQuestion, Bookmark, Share2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import JobCard from "@/components/JobCard";
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json";
import { useBookmarks, BookmarkedItem } from "@/context/BookmarkContext";
import { useGamification } from "@/context/GamificationContext";
import { useApplications } from "@/context/ApplicationContext";
import { toast } from "sonner";

// Define JobItem type (ensure consistent)
interface JobItem {
  id: string;
  source: string;
  title: string;
  company?: string;
  location?: string;
  link: string;
  date_posted?: string;
  salaryRange?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  isPremium?: boolean;
  isHot?: boolean;
  isActiveRecruiting?: boolean;
  jobType?: string;
  workPolicy?: string;
  descriptionDetail?: string;
  companyDescription?: string;
  companyIndustry?: string;
  companySize?: string;
  applicationQuestions?: { question: string; type: string; options?: string[] }[];
  salaryMatch?: string;
  applicantCount?: string;
  skillMatch?: string;
  companyLogoUrl?: string;
}

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job: JobItem | undefined = scrapedJobsFromDB.find((j) => j.id === jobId) as JobItem | undefined;
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { checkBadge, addXp } = useGamification();
  const { addApplication, hasApplied } = useApplications();

  if (!job) {
    return (
      <div className="container py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Lowongan Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Maaf, lowongan yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/jobs">
          <Button size="lg">Kembali ke Daftar Lowongan</Button>
        </Link>
      </div>
    );
  }

  const isSaved = isBookmarked(job.id, 'job');

  const handleBookmark = () => {
    const item: BookmarkedItem = {
      id: job.id,
      type: 'job',
      title: job.title,
      subtitle: job.company,
      location: job.location,
      link: `/jobs/${job.id}`,
      date: job.date_posted,
      data: job
    };
    toggleBookmark(item);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link disalin!", { description: "Bagikan lowongan ini ke temanmu." });
  };

  const relatedJobs = scrapedJobsFromDB.filter(j => j.id !== jobId).slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      {/* Premium Header / Hero */}
      <div className="relative border-b border-white/5 bg-white/[0.02] pb-12 mb-12">
        <div className="container px-4 sm:px-6">
          <div className="mb-8">
            <Link to="/jobs" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-medium hover:-translate-x-1 duration-200">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Lowongan
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center p-4 shadow-2xl shadow-violet-500/10 border border-white/10 flex-shrink-0">
              {job.companyLogoUrl ? (
                <img src={job.companyLogoUrl} alt={job.company} className="w-full h-full object-contain" />
              ) : (
                <Building2 className="w-12 h-12 text-zinc-800" />
              )}
            </div>

            <div className="flex-grow space-y-4">
              <div className="flex flex-wrap gap-3">
                {job.isPremium && <Badge className="bg-amber-400 text-black hover:bg-amber-500 font-bold"><Star className="h-3 w-3 mr-1 fill-black" /> Premium</Badge>}
                {job.isHot && <Badge className="bg-red-500 text-white hover:bg-red-600 font-bold"><Zap className="h-3 w-3 mr-1 fill-current" /> HOT</Badge>}
                <Badge variant="outline" className="border-violet-500/30 text-violet-300 bg-violet-500/10">
                  {job.jobType || "Full Time"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-base">
                {job.company && (
                  <div className="flex items-center hover:text-white transition-colors">
                    <Building2 className="mr-2 h-5 w-5 text-violet-400" />
                    <span className="font-semibold">{job.company}</span>
                  </div>
                )}
                {job.location && (
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>{job.location}</span>
                  </div>
                )}
                {job.date_posted && (
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5 text-zinc-500" />
                    <span>{job.date_posted}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              {/* Bookmark Button */}
              <Button
                size="icon"
                variant="outline"
                className={`h-12 w-12 rounded-xl border-white/10 ${isSaved ? 'bg-violet-500/20 text-violet-400 border-violet-500/50' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </Button>

              {/* Share Button */}
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>

              {/* Apply Button with Gamification Trigger */}
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow md:flex-grow-0"
                onClick={(e) => {
                  // Always trigger gamification & history, but don't prevent default (let them go to the link)
                  // If already applied, we just let them go to the link again without duplicating history (handled by context)
                  if (!hasApplied(job.id)) {
                    addApplication(job);
                    checkBadge("apply_job");
                    addXp(10, "Melamar Pekerjaan");
                  }
                }}
              >
                <Button
                  size="lg"
                  className={`w-full h-12 rounded-xl px-8 font-bold transition-all shadow-lg ${hasApplied(job.id) ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' : 'bg-white text-black hover:bg-violet-400 hover:text-white hover:shadow-violet-500/30'}`}
                >
                  {hasApplied(job.id) ? (
                    <>Lamaran Terkirim <CheckCircle className="ml-2 h-5 w-5" /></>
                  ) : (
                    <>Lamar Sekarang <Briefcase className="ml-2 h-5 w-5" /></>
                  )}
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
            {/* Quick Info Grid - Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: DollarSign, label: "Gaji", value: job.salaryRange || "Kompetitif" },
                { icon: Briefcase, label: "Pengalaman", value: job.experience || "Sesuai level" },
                { icon: GraduationCap, label: "Pendidikan", value: job.education || "Semua jurusan" },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center space-x-4 hover:bg-white/[0.04] transition-colors">
                  <div className="p-3 bg-white/5 rounded-xl text-violet-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-white/5" />

            <div className="prose prose-invert max-w-none prose-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Deskripsi Pekerjaan</h3>
              <div className="text-zinc-300 leading-relaxed space-y-4">
                {job.descriptionDetail ? (
                  job.descriptionDetail.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))
                ) : (
                  <p>Informasi lengkap mengenai posisi ini dapat dilihat pada website resmi perusahaan.</p>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mt-10 mb-6">Kualifikasi</h3>
              <ul className="text-zinc-300 space-y-2">
                {job.skills?.map((skill, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-violet-500 mr-3 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
                {!job.skills && <li>Lihat kualifikasi lengkap di website pendaftaran.</li>}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">

            {/* AI Insights Card */}
            {(job.salaryMatch || job.applicantCount || job.skillMatch) && (
              <div className="bg-gradient-to-b from-violet-900/20 to-transparent border border-violet-500/20 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Zap className="h-5 w-5 text-violet-400 mr-2" /> AI Insights
                </h3>
                <div className="space-y-4">
                  {job.applicantCount && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Pelamar</span>
                      <span className="font-bold text-white">{job.applicantCount}</span>
                    </div>
                  )}
                  {job.salaryMatch && (
                    <div>
                      <span className="text-zinc-400 text-xs uppercase font-bold">Kesesuaian Gaji</span>
                      <p className="text-white font-medium">{job.salaryMatch}</p>
                    </div>
                  )}
                  <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                    <p className="text-xs text-violet-200">
                      <strong>Tips:</strong> Lengkapi profilmu untuk meningkatkan peluang lolos seleksi hingga 40%.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Company Card */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Tentang Perusahaan</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                  {job.companyLogoUrl ? <img src={job.companyLogoUrl} alt={`${job.company} logo`} className="w-full h-full object-contain" /> : <Building2 className="text-black" />}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{job.company}</p>
                  {job.companyIndustry && <p className="text-sm text-zinc-500">{job.companyIndustry}</p>}
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                {job.companyDescription || "Perusahaan ini bergerak di bidang inovasi dan teknologi..."}
              </p>
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-zinc-300">
                Lihat Profil Perusahaan
              </Button>
            </div>

          </div>
        </div>

        {/* Similar Jobs */}
        {relatedJobs.length > 0 && (
          <div className="mt-20 border-t border-white/5 pt-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white">Lowongan Serupa</h2>
              <Link to="/jobs" className="text-violet-400 hover:text-violet-300 font-bold">Lihat Semua</Link>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {relatedJobs.map((relatedJob) => (
                  <CarouselItem key={relatedJob.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    {/* Pass internal link to cards */}
                    <JobCard
                      {...relatedJob}
                      link={`/jobs/${relatedJob.id}`}
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

export default JobDetailPage;