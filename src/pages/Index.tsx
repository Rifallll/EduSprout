import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MessageSquare,
  BookOpen,
  Image,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Newspaper,
  Upload,
  Handshake,
  Award,
  Plane,
  Megaphone
} from "lucide-react";
import NewsCard from "@/components/NewsCard";
import NewsSkeleton from "@/components/NewsSkeleton";
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json";

const Index = () => {
  // Array of hero image paths
  const heroImages = ["/1.jpg", "/2.jpg", "/3.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 60000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Use a slice of scrapedNewsAndTips for the homepage display
  const homepageNews = scrapedNewsAndTips.slice(0, 3);

  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setIsLoadingNews(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-pattern text-foreground selection:bg-violet-400/30 selection:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Clean Background with Subtle Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages[currentImageIndex]}
            alt="EduSprout Hero"
            className="w-full h-full object-cover scale-105 opacity-50 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        </div>

        {/* Hero Content - Minimalist & Centered */}
        <div className="container relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center px-5 py-2 mb-8 text-xs font-bold tracking-[0.2em] uppercase border border-white/10 rounded-full bg-white/[0.03] text-zinc-300 animate-fade-in backdrop-blur-md shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-violet-400 mr-3 animate-pulse"></span>
            Portal Edukasi No. 1 Indonesia
          </div>

          <h1 className="display-title mb-8 animate-fade-in-up text-white">
            Navigasi Masa Depan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-violet-200 animate-pulse-slow drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">Emasmu.</span>
          </h1>

          <p className="text-lg md:text-xl mb-12 text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
            Akses ribuan peluang beasiswa, kompetisi nasional, dan pengembangan karir dalam satu ekosistem yang terintegrasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link to="/events">
              <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold bg-white text-black hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] min-w-[200px]">
                Mulai Eksplorasi
              </Button>
            </Link>
            <Link to="/scholarships">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-base font-bold border-white/10 text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 min-w-[200px] bg-transparent backdrop-blur-sm">
                Cari Beasiswa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean Typography */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: "50K+", label: "Member Aktif" },
              { val: "500+", label: "Peluang Beasiswa" },
              { val: "200+", label: "Event Nasional" },
              { val: "100+", label: "Mitra Industri" },
            ].map((s, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white/90 group-hover:text-violet-400 transition-colors duration-300">{s.val}</div>
                <div className="text-xs font-medium tracking-widest uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Services Section - Clean Glass Cards */}
      <section className="py-32 relative reveal">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">Layanan <span className="text-zinc-500">Terintegrasi</span></h2>
              <p className="text-lg text-zinc-400 font-light">Satu platform untuk semua kebutuhan akademik dan karirmu.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {/* Bento Item 1 */}
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-violet-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-violet-400/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Calendar className="h-8 w-8 group-hover:text-violet-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">Event & Lomba</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed max-w-xs mx-auto">Temukan kompetisi bergengsi tingkat nasional dan internasional untuk mengasah bakatmu.</p>
              <Link to="/events" className="mt-auto inline-flex items-center text-sm font-bold text-white hover:text-violet-400 transition-colors bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 border border-white/5 hover:border-violet-400/30">
                Jelajahi Event <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Bento Item 2 */}
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-violet-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-violet-400/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <GraduationCap className="h-8 w-8 group-hover:text-violet-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">Beasiswa</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed max-w-xs mx-auto">Akses informasi beasiswa dalam dan luar negeri yang terverifikasi dan terupdate.</p>
              <Link to="/scholarships" className="mt-auto inline-flex items-center text-sm font-bold text-white hover:text-violet-400 transition-colors bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 border border-white/5 hover:border-violet-400/30">
                Cari Beasiswa <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Bento Item 3 */}
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-violet-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white border border-white/5 group-hover:border-violet-400/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Briefcase className="h-7 w-7 group-hover:text-violet-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-200">Karir</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">Lowongan magang dan kerja full-time.</p>
              <Link to="/jobs" className="mt-auto inline-flex items-center text-xs font-bold text-white/70 hover:text-violet-400 transition-colors">
                Lihat Lowongan <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Bento Item 4 */}
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-violet-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 group md:col-span-1.5 lg:col-span-1">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white border border-white/5 group-hover:border-violet-400/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Newspaper className="h-7 w-7 group-hover:text-violet-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-200">Berita</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">Tips pendidikan dan berita terkini.</p>
              <Link to="/news-and-tips" className="mt-auto inline-flex items-center text-xs font-bold text-white/70 hover:text-violet-400 transition-colors">
                Baca Berita <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Bento Item 5 (CTA) */}
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/20 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all duration-300 group md:col-span-2">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-200">Bergabung Sekarang</h3>
              <p className="text-zinc-300 text-sm mb-6 max-w-md mx-auto">Dapatkan akses eksklusif ke semua fitur EduSprout dan mulai perjalanan suksesmu hari ini.</p>
              <Link to="/signup">
                <Button className="rounded-full px-8 h-12 text-base font-bold bg-white text-black hover:bg-violet-400 hover:text-white transition-all shadow-lg hover:shadow-violet-400/30">
                  Buat Akun Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 reveal">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">Wawasan <span className="text-zinc-500">Terbaru</span></h2>
              <p className="text-lg text-zinc-400 font-light">Informasi terkini seputar dunia kampus, prestasi, dan karir nasional.</p>
            </div>
            <Link to="/news-and-tips">
              <Button variant="outline" className="rounded-full px-8 h-12 border-white/10 hover:border-violet-400/30 transition-all font-medium text-white bg-transparent hover:text-violet-400">
                Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoadingNews ? (
              <>
                <NewsSkeleton />
                <NewsSkeleton />
                <NewsSkeleton />
              </>
            ) : (
              homepageNews.map((newsItem) => (
                <div key={newsItem.id} className="hover:-translate-y-2 transition-transform duration-500">
                  <NewsCard {...newsItem} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Annual Programs - Minimal */}
      <section className="py-32 relative reveal">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-20 tracking-tight text-white">Program <span className="text-zinc-500 italic">Eksklusif</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Student Leaders",
                date: "Januari – April",
                desc: "Ajang kolaborasi pemimpin muda dari seluruh penjuru negeri.",
              },
              {
                icon: Award,
                title: "Beasiswa EduSprout",
                date: "3x Dalam Setahun",
                desc: "Dukungan dana untuk meringankan beban biaya pendidikanmu.",
              },
              {
                icon: Plane,
                title: "Future Leaders",
                date: "Internasional Trip",
                desc: "6 hari 5 malam perjalanan kepemimpinan 100% dibiayai penuh.",
              },
              {
                icon: Megaphone,
                title: "Festival FMBPI",
                date: "Juni – Agustus",
                desc: "Talkshow inspiratif bersama tokoh-tokoh besar nasional.",
              }
            ].map((p, i) => (
              <div key={i} className="bento-item p-8 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center bg-white/[0.02] hover:border-violet-400/20">
                <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/5 text-white group-hover:border-violet-400/30 group-hover:text-violet-400 transition-colors`}>
                  <p.icon className={`h-6 w-6`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-200 transition-colors">{p.title}</h3>
                <p className={`text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4 group-hover:text-zinc-400`}>{p.date}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10 text-center max-w-3xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Siap Memulai Perjalananmu?</h2>
          <p className="text-lg text-zinc-400 mb-10 font-light">
            Satu akun untuk akses tak terbatas ke semua fitur EduSprout.
            <br className="hidden md:block" /> Mulai langkah pertamamu hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-semibold bg-white text-black hover:bg-violet-400 hover:text-white transition-colors">
                Buat Akun Gratis
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium border-white/10 bg-transparent text-white hover:bg-white/5 backdrop-blur-sm">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;