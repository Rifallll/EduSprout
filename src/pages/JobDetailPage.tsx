import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Briefcase, Building2, MapPin, CalendarDays, DollarSign, GraduationCap, Lightbulb, Zap, CheckCircle, Star, Clock, Home, Users, TrendingUp, MessageCircleQuestion } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import Carousel components
import JobCard from "@/components/JobCard"; // Re-use JobCard for related jobs
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json";

// Extend JobItem type for more detailed information (for demonstration purposes)
interface DetailedJobItem {
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
  // New detailed fields
  descriptionDetail?: string;
  companyDescription?: string;
  companyIndustry?: string;
  companySize?: string;
  applicationQuestions?: { question: string; type: 'text' | 'number' | 'select' }[];
  salaryMatch?: string;
  applicantCount?: string;
  skillMatch?: string;
}

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = scrapedJobsFromDB.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Lowongan Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">
          Maaf, lowongan yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/jobs">
          <Button>Kembali ke Daftar Lowongan</Button>
        </Link>
      </div>
    );
  }

  // Dummy detailed data for demonstration, extending the basic job object
  // In a real application, this data would be fetched from a more comprehensive API endpoint.
  const detailedJob: DetailedJobItem = {
    ...job,
    descriptionDetail: `
      Mengembangkan dan melaksanakan konsep kreatif untuk kampanye pemasaran, memastikan selaras dengan indetitas merek dan tujuan Brand.
      Berkolaborasi dengan tim produk, penjualan dan digital untuk mengahasilkan visual dan aset kreatif lainnya untuk pemasaran.
      Menyediakan dan mengawasi pembuatan materi pemasaran termasuk materi cetak dan barang promosi kebutuhan tim marketing.
      Berinisiatif kreatif untuk pemasaran brand guna meningkatkan upaya pemasaran dengan mengedepankan visi misi brand yang bertujuan untuk meningkatkan penjualan.
      Bereksperimen dengan pendekatan kreatif baru untuk melibatkan audiens target dan meningkatkan peminat brand.
      Membuat dan menjalankan event skala nasional guna meningkatkan brand awareness.
      Membuat dan menjalankan media-media promosi offline.
    `,
    companyDescription: `
      PT BERDIKARI INTI GEMILANG (LUBY INDONESIA) berdiri sejak tahun 2009. Kami memulai usaha dengan menawarkan penerangan mobile di Indonesia. Dengan visi dan misi kami, produk kami dapat bersaing dengan produk serupa yang ada di Indonesia. Filosofi kami “Inovasi adalah prioritas kami”, LUBY terus mengembangkan produk baru. Kami menciptakan produk berkualitas tinggi seperti lampu darurat, lampu LED, senter, dan lain-lain untuk memenuhi kebutuhan dan kepuasan pelanggan. Kami memposisikan LUBY sebagai merek yang memiliki desain bagus, produk berkualitas tinggi dengan teknologi terkini.
    `,
    companyIndustry: "Manufacturing, Transport & Logistics",
    companySize: "1,001-5,000 employees",
    applicationQuestions: [
      { question: "Berapa gaji bulanan yang kamu inginkan?", type: "text" },
      { question: "Kualifikasi mana yang kamu miliki?", type: "text" },
      { question: "How many years' experience do you have as a Marketing Communication Staff?", type: "number" },
      { question: "Berapa lama waktu yang kamu butuhkan untuk memberi tahu perusahaanmu saat ini?", type: "text" },
    ],
    salaryMatch: "Rp5.000.000 – Rp6.000.000 per month", // Using salary range as match for demo
    applicantCount: "Jumlah pelamar: 150+",
    skillMatch: "Kecocokan keahlian: 80%",
  };

  // Filter for related jobs (excluding the current job)
  // For demonstration, we'll just pick a few other jobs. In a real app, this would be based on actual relevance.
  const relatedJobs = scrapedJobsFromDB.filter(j => j.id !== jobId).slice(0, 5); // Get up to 5 related jobs

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/jobs" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Lowongan
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Job Detail Card */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold mb-2">{detailedJob.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-base">
                {detailedJob.company && (
                  <span className="flex items-center">
                    <Building2 className="h-4 w-4 mr-1" /> {detailedJob.company}
                  </span>
                )}
                {detailedJob.location && (
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {detailedJob.location}
                  </span>
                )}
                {detailedJob.date_posted && (
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" /> Posted {detailedJob.date_posted}
                  </span>
                )}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {detailedJob.isPremium && <Badge className="bg-yellow-500 text-white hover:bg-yellow-600"><Star className="h-3 w-3 mr-1" /> Premium</Badge>}
                {detailedJob.isHot && <Badge className="bg-red-500 text-white hover:bg-red-600"><Zap className="h-3 w-3 mr-1" /> HOT</Badge>}
                {detailedJob.isActiveRecruiting && <Badge className="bg-green-500 text-white hover:bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Aktif Merekrut</Badge>}
                <Badge variant="secondary" className="capitalize bg-muted text-muted-foreground">
                  Sumber: {detailedJob.source.replace(/-/g, " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />

              {/* Quick Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {detailedJob.salaryRange && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <DollarSign className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Gaji</p>
                      <p className="text-muted-foreground">{detailedJob.salaryRange}</p>
                    </div>
                  </div>
                )}
                {detailedJob.experience && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <Briefcase className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Pengalaman</p>
                      <p className="text-muted-foreground">{detailedJob.experience}</p>
                    </div>
                  </div>
                )}
                {detailedJob.education && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <GraduationCap className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Pendidikan</p>
                      <p className="text-muted-foreground">{detailedJob.education}</p>
                    </div>
                  </div>
                )}
                {detailedJob.jobType && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Tipe Pekerjaan</p>
                      <p className="text-muted-foreground">{detailedJob.jobType}</p>
                    </div>
                  </div>
                )}
                {detailedJob.workPolicy && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <Home className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Kebijakan Kerja</p>
                      <p className="text-muted-foreground">{detailedJob.workPolicy}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Detailed Job Description */}
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-3">Deskripsi Pekerjaan</h3>
                {detailedJob.descriptionDetail ? (
                  detailedJob.descriptionDetail.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2">{paragraph.trim()}</p>
                  ))
                ) : (
                  <p>
                    Ini adalah contoh deskripsi pekerjaan untuk posisi {detailedJob.title} di {detailedJob.company || "perusahaan ini"}.
                    Detail lengkap mengenai tanggung jawab, kualifikasi, dan manfaat akan ditemukan di tautan lamaran asli.
                    Kami mencari individu yang bersemangat dan berkomitmen untuk bergabung dengan tim kami.
                  </p>
                )}
              </div>

              {/* Qualifications (reusing existing structure) */}
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mt-6 mb-3">Kualifikasi</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pendidikan minimal S1 di bidang terkait.</li>
                  <li>Pengalaman kerja relevan (jika ada).</li>
                  <li>Kemampuan komunikasi yang baik.</li>
                  <li>Mampu bekerja secara mandiri maupun dalam tim.</li>
                  {detailedJob.skills && detailedJob.skills.length > 0 && (
                    <li>
                      Keterampilan: {detailedJob.skills.map(skill => <Badge key={skill} variant="secondary" className="mr-1 mb-1">{skill}</Badge>)}
                    </li>
                  )}
                  <li>Detail kualifikasi lebih lanjut tersedia di tautan lamaran.</li>
                </ul>
              </div>

              <div className="pt-6 border-t mt-6">
                <a href={detailedJob.link} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full">
                    <Briefcase className="mr-2 h-5 w-5" /> Lamar Sekarang
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar for additional info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Job Suitability / Match */}
          {(detailedJob.salaryMatch || detailedJob.applicantCount || detailedJob.skillMatch) && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Lihat peluang & kecocokan kamu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {detailedJob.salaryMatch && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    <span>Kesesuaian gaji: {detailedJob.salaryMatch}</span>
                  </div>
                )}
                {detailedJob.applicantCount && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{detailedJob.applicantCount}</span>
                  </div>
                )}
                {detailedJob.skillMatch && (
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                    <span>{detailedJob.skillMatch}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Application Questions */}
          {detailedJob.applicationQuestions && detailedJob.applicationQuestions.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Pertanyaan dari perusahaan</CardTitle>
                <CardDescription>Lamaran kamu akan mencakup pertanyaan-pertanyaan berikut:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {detailedJob.applicationQuestions.map((q, index) => (
                  <div key={index} className="flex items-start">
                    <MessageCircleQuestion className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                    <span>{q.question}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Company Profile */}
          {detailedJob.companyDescription && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Profil perusahaan</CardTitle>
                {detailedJob.company && (
                  <CardDescription className="flex items-center gap-2">
                    {/* Assuming a company logo URL could be added here */}
                    {/* <img src="/path/to/company-logo.png" alt={detailedJob.company} className="h-6 w-6 rounded-full" /> */}
                    <span className="font-medium text-foreground">{detailedJob.company}</span>
                    {detailedJob.companyIndustry && <Badge variant="secondary">{detailedJob.companyIndustry}</Badge>}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {detailedJob.companyDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
                {detailedJob.companySize && <p>Ukuran Perusahaan: {detailedJob.companySize}</p>}
                <Button variant="link" className="p-0 h-auto">Tampilkan selengkapnya &rarr;</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Related Jobs Section (Carousel) */}
      {relatedJobs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Lowongan Serupa</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {relatedJobs.map((relatedJob) => (
                <CarouselItem key={relatedJob.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <JobCard
                    key={relatedJob.id}
                    id={relatedJob.id}
                    title={relatedJob.title}
                    company={relatedJob.company}
                    location={relatedJob.location}
                    source={relatedJob.source}
                    date_posted={relatedJob.date_posted}
                    link={`/jobs/${relatedJob.id}`} // Link to its own detail page
                    salaryRange={relatedJob.salaryRange}
                    experience={relatedJob.experience}
                    education={relatedJob.education}
                    skills={relatedJob.skills}
                    isPremium={relatedJob.isPremium}
                    isHot={relatedJob.isHot}
                    isActiveRecruiting={relatedJob.isActiveRecruiting}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      )}
    </div>
  );
};

export default JobDetailPage;