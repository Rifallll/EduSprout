import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CalendarDays, MapPin, Building2, ExternalLink } from "lucide-react";
import scrapedScholarships from "@/data/scrapedScholarships.json"; // Updated import
import { enrichScholarshipData, EnrichedScholarshipItem } from "@/utils/scholarshipUtils";

const ScholarshipDetailPage = () => {
  const { scholarshipId } = useParams<{ scholarshipId: string }>();
  const rawScholarship = scrapedScholarships.find((s) => s.id === scholarshipId); // Updated data source

  if (!rawScholarship) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">
          Maaf, informasi beasiswa yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/scholarships">
          <Button>Kembali ke Daftar Beasiswa</Button>
        </Link>
      </div>
    );
  }

  const scholarship: EnrichedScholarshipItem = enrichScholarshipData(rawScholarship);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/scholarships" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beasiswa
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {scholarship.degreeLevels && scholarship.degreeLevels.map((level, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary font-medium px-2 py-0.5 text-sm">
                {level}
              </Badge>
            ))}
            {scholarship.fundingType && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 text-sm">
                {scholarship.fundingType}
              </Badge>
            )}
            <Badge variant="secondary" className="capitalize bg-muted text-muted-foreground">
              {scholarship.category}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">{scholarship.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-base">
            {scholarship.organizer && (
              <span className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" /> {scholarship.organizer}
              </span>
            )}
            {scholarship.location && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {scholarship.location}
              </span>
            )}
            {scholarship.date && (
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" /> Deadline: {scholarship.date}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />

          {/* Detailed Description */}
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Deskripsi Beasiswa</h3>
            {scholarship.fullContent ? (
              scholarship.fullContent.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph.trim()}</p>
              ))
            ) : (
              <p>
                {scholarship.description || "Deskripsi lengkap untuk beasiswa ini tidak tersedia. Silakan kunjungi situs resmi untuk informasi lebih lanjut."}
              </p>
            )}
          </div>

          <div className="pt-6 border-t mt-6">
            <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full">
                <ExternalLink className="mr-2 h-5 w-5" /> Kunjungi Situs Resmi Beasiswa
              </Button>
            </a>
            <p className="text-sm text-red-500 mt-2 text-center">
              *Tautan ini adalah contoh dari data dummy dan mungkin tidak aktif atau mengarah ke halaman yang berbeda.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScholarshipDetailPage;