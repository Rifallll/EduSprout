import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Briefcase, Building2, MapPin, CalendarDays, DollarSign, GraduationCap, Lightbulb, Zap, CheckCircle, Star, Clock, Home } from "lucide-react";
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json";

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

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/jobs" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Lowongan
        </Link>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg">
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
                <CalendarDays className="h-4 w-4 mr-1" /> {job.date_posted}
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

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Deskripsi Pekerjaan</h3>
            <p>
              Ini adalah contoh deskripsi pekerjaan untuk posisi {job.title} di {job.company || "perusahaan ini"}.
              Detail lengkap mengenai tanggung jawab, kualifikasi, dan manfaat akan ditemukan di tautan lamaran asli.
              Kami mencari individu yang bersemangat dan berkomitmen untuk bergabung dengan tim kami.
            </p>
            <p>
              Posisi ini menawarkan kesempatan untuk berkembang dalam lingkungan yang dinamis dan kolaboratif.
              Jika Anda memiliki kualifikasi yang relevan dan antusias untuk membuat dampak, kami mendorong Anda untuk melamar.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Kualifikasi</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Pendidikan minimal S1 di bidang terkait.</li>
              <li>Pengalaman kerja relevan (jika ada).</li>
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
  );
};

export default JobDetailPage;