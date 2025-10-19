"use client";

import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CalendarDays, MapPin, Globe, Building2, BookOpen } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import InfoCard from "@/components/InfoCard"; // Re-use InfoCard for related scholarships

// Import all scholarship data sources
import dummyScholarshipsData from "@/data/dummyScholarships.json";
import scrapedScholarshipsBeasiswaId from "@/data/scrapedScholarships.json";
import scrapedScholarshipsIndbeasiswa from "@/data/scrapedIndbeasiswa.json";

// Define ScholarshipItem type to match the structure
interface ScholarshipItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  link: string;
  location?: string;
  source?: string;
  fullContent?: string; // For detailed content
  organizer?: string; // From beasiswa.id scrape
}

const ScholarshipDetailPage = () => {
  const { scholarshipId } = useParams<{ scholarshipId: string }>();

  const allScholarships: ScholarshipItem[] = useMemo(() => {
    const dummy = dummyScholarshipsData.map(s => ({ ...s, source: "manual" }));
    const beasiswaId = scrapedScholarshipsBeasiswaId.map(s => ({ ...s, source: "beasiswa.id" }));
    const indbeasiswa = scrapedScholarshipsIndbeasiswa.map(s => ({ ...s, source: "indbeasiswa.com" }));
    return [...dummy, ...beasiswaId, ...indbeasiswa];
  }, []);

  // Find the scholarship by matching the end of its link with the scholarshipId
  const scholarship: ScholarshipItem | undefined = allScholarships.find((s) => 
    s.link.endsWith(scholarshipId || '') || s.id === scholarshipId
  );

  if (!scholarship) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">
          Maaf, beasiswa yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/scholarships">
          <Button>Kembali ke Daftar Beasiswa</Button>
        </Link>
      </div>
    );
  }

  // Filter for related scholarships (excluding the current one)
  const relatedScholarships = allScholarships.filter(s => s.id !== scholarship.id).slice(0, 5);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/scholarships" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beasiswa
        </Link>
      </div>

      <Card className="shadow-lg border border-border rounded-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-3xl font-bold leading-tight text-foreground">{scholarship.title}</CardTitle>
            <Badge className="bg-primary/10 text-primary font-semibold text-sm px-3 py-1">
              {scholarship.category}
            </Badge>
          </div>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-base">
            {scholarship.date && (
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" /> {scholarship.date}
              </span>
            )}
            {scholarship.location && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {scholarship.location}
              </span>
            )}
            {scholarship.organizer && (
              <span className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" /> {scholarship.organizer}
              </span>
            )}
            {scholarship.source && (
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" /> Sumber: {scholarship.source.replace(/-/g, " ")}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />

          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-foreground">
            <h3 className="text-xl font-semibold mb-3">Deskripsi Beasiswa</h3>
            {scholarship.fullContent ? (
              scholarship.fullContent.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph.trim()}</p>
              ))
            ) : (
              <p className="mb-2">{scholarship.description}</p>
            )}
            <p className="mt-4 text-muted-foreground italic text-base">
              Untuk informasi lebih lanjut dan pendaftaran, silakan kunjungi tautan resmi beasiswa.
            </p>
          </div>

          <div className="pt-6 border-t mt-6">
            <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full">
                <Globe className="mr-2 h-5 w-5" /> Kunjungi Situs Beasiswa
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Related Scholarships Section (Carousel) */}
      {relatedScholarships.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Beasiswa Serupa</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {relatedScholarships.map((relatedScholarship) => (
                <CarouselItem key={relatedScholarship.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <InfoCard
                    key={relatedScholarship.id}
                    title={relatedScholarship.title}
                    description={relatedScholarship.description}
                    category={relatedScholarship.category}
                    date={relatedScholarship.date}
                    location={relatedScholarship.location}
                    link={relatedScholarship.link}
                    linkText="Lihat Beasiswa"
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

export default ScholarshipDetailPage;