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

// Define JobItem type to match the structure in scrapedJobsFromDB.json
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
  applicationQuestions?: { question: string; type: 'text' | 'number' | 'select' | 'radio'; options?: string[] }[];
  salaryMatch?: string;
  applicantCount?: string;
  skillMatch?: string;
}

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job: JobItem | undefined = scrapedJobsFromDB.find((j) => j.id === jobId);

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
              <CardTitle className="text-3xl font-bold mb-2">{job.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-base">
                {job.company && (
                  <span className="flex items-center">
                    <Building2 className="h-4 w-4 mr-1" /> {job.company}
                  </span>
                )}
                {job.location && (
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location}
                  </span>
                )}
                {job.date_posted && (
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" /> Posted {job.date_posted}
                  </span>
                )}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.isPremium && <Badge className="bg-yellow-500 text-white hover:bg-yellow-600"><Star className="h-3 w-3 mr-1" /> Premium</Badge>}
                {job.isHot && <Badge className="bg-red-500 text-white hover:bg-red-600"><Zap className="h-3 w-3 mr-1" /> HOT</Badge>}
                {job.isActiveRecruiting && <Badge className="bg-green-500 text-white hover:bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Aktif Merekrut</Badge>}
                <Badge variant="secondary" className="capitalize bg-muted text-muted-foreground">
                  Sumber: {job.source.replace(/-/g, " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />

              {/* Quick Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {job.salaryRange && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <DollarSign className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Gaji</p>
                      <p className="text-muted-foreground">{job.salaryRange}</p>
                    </div>
                  </div>
                )}
                {job.experience && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <Briefcase className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Pengalaman</p>
                      <p className="text-muted-foreground">{job.experience}</p>
                    </div>
                  </div>
                )}
                {job.education && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <GraduationCap className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Pendidikan</p>
                      <p className="text-muted-foreground">{job.education}</p>
                    </div>
                  </div>
                )}
                {job.jobType && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Tipe Pekerjaan</p>
                      <p className="text-muted-foreground">{job.jobType}</p>
                    </div>
                  </div>
                )}
                {job.workPolicy && (
                  <div className="flex items-center p-3 bg-muted rounded-md">
                    <Home className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Kebijakan Kerja</p>
                      <p className="text-muted-foreground">{job.workPolicy}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Detailed Job Description */}
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-3">Deskripsi Pekerjaan</h3>
                {job.descriptionDetail ? (
                  job.descriptionDetail.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2">{paragraph.trim()}</p>
                  ))
                ) : (
                  <p>
                    Deskripsi pekerjaan untuk posisi {job.title} di {job.company || "perusahaan ini"} tidak tersedia secara detail.
                    Silakan kunjungi tautan lamaran asli untuk informasi lebih lanjut.
                  </p>
                )}
              </div>

              {/* Qualifications */}
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mt-6 mb-3">Kualifikasi</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pendidikan minimal {job.education || "S1"} di bidang terkait.</li>
                  <li>Pengalaman kerja {job.experience || "relevan"} (jika ada).</li>
                  <li>Kemampuan komunikasi yang baik.</li>
                  <li>Mampu bekerja secara mandiri maupun dalam tim.</li>
                  {job.skills && job.skills.length > 0 && (
                    <li>
                      Keterampilan: {job.skills.map(skill => <Badge key={skill} variant="secondary" className="mr-1 mb-1">{skill}</Badge>)}
                    </li>
                  )}
                  <li>Detail kualifikasi lebih lanjut tersedia di tautan lamaran.</li>
                </ul>
              </div>

              <div className="pt-6 border-t mt-6">
                <a href={job.link} target="_blank" rel="noopener noreferrer">
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
          {(job.salaryMatch || job.applicantCount || job.skillMatch) && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Lihat peluang & kecocokan kamu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {job.salaryMatch && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    <span>Kesesuaian gaji: {job.salaryMatch}</span>
                  </div>
                )}
                {job.applicantCount && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{job.applicantCount}</span>
                  </div>
                )}
                {job.skillMatch && (
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                    <span>{job.skillMatch}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Application Questions */}
          {job.applicationQuestions && job.applicationQuestions.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Pertanyaan dari perusahaan</CardTitle>
                <CardDescription>Lamaran kamu akan mencakup pertanyaan-pertanyaan berikut:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {job.applicationQuestions.map((q, index) => (
                  <div key={index} className="flex items-start">
                    <MessageCircleQuestion className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                    <span>{q.question}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Company Profile */}
          {job.companyDescription && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Profil perusahaan</CardTitle>
                {job.company && (
                  <CardDescription className="flex items-center gap-2">
                    {/* Assuming a company logo URL could be added here */}
                    {/* <img src="/path/to/company-logo.png" alt={job.company} className="h-6 w-6 rounded-full" /> */}
                    <span className="font-medium text-foreground">{job.company}</span>
                    {job.companyIndustry && <Badge variant="secondary">{job.companyIndustry}</Badge>}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {job.companyDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
                {job.companySize && <p>Ukuran Perusahaan: {job.companySize}</p>}
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