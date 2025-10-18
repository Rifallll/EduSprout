import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Building2, MapPin, CalendarDays } from "lucide-react";
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

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">{job.title}</CardTitle>
          <CardDescription className="flex items-center text-muted-foreground text-base">
            {job.company && (
              <span className="flex items-center mr-4">
                <Building2 className="h-4 w-4 mr-1" /> {job.company}
              </span>
            )}
            {job.location && (
              <span className="flex items-center mr-4">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </span>
            )}
            {job.date_posted && (
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" /> {job.date_posted}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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