import React, { useState, useMemo } from "react";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, MapPin, X, MessageSquare } from "lucide-react"; // Menambahkan MessageSquare
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedSource, setSelectedSource] = useState("all");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [workPolicies, setWorkPolicies] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("all");

  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    scrapedJobsFromDB.forEach(job => {
      if (job.location) {
        locations.add(job.location);
      }
    });
    return Array.from(locations).sort();
  }, []);

  const handleJobTypeChange = (type: string, checked: boolean) => {
    setJobTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const handleWorkPolicyChange = (policy: string, checked: boolean) => {
    setWorkPolicies((prev) =>
      checked ? [...prev, policy] : prev.filter((p) => p !== policy)
    );
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = scrapedJobsFromDB;

    // 1. Filter by Search Term (Title, Company, Location, Source)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((job) => {
        return (
          job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          (job.company && job.company.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (job.location && job.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
          job.source.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    }

    // 2. Filter by Source
    if (selectedSource !== "all") {
      filtered = filtered.filter(job => job.source === selectedSource);
    }

    // 3. Filter by Location
    if (selectedLocation !== "all") {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Placeholder for Job Type and Work Policy filters (not implemented in dummy data yet)
    // if (jobTypes.length > 0) {
    //   filtered = filtered.filter(job => job.jobType && jobTypes.includes(job.jobType));
    // }
    // if (workPolicies.length > 0) {
    //   filtered = filtered.filter(job => job.workPolicy && workPolicies.includes(job.workPolicy));
    // }

    // Helper function to parse date strings (assuming YYYY-MM-DD format from scraper)
    const parseDate = (dateString: string | undefined) => {
      if (dateString) {
        return new Date(dateString);
      }
      return new Date(0); // Return a very old date if parsing fails
    };

    // 4. Sort
    filtered.sort((a, b) => {
      if (sortBy === "date-desc") {
        return parseDate(b.date_posted).getTime() - parseDate(a.date_posted).getTime();
      } else if (sortBy === "date-asc") {
        return parseDate(a.date_posted).getTime() - parseDate(b.date_posted).getTime();
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, sortBy, selectedSource, selectedLocation, jobTypes, workPolicies]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Search Bar */}
      <div className="sticky top-14 z-40 bg-background border-b py-3 shadow-sm">
        <div className="container flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-8 w-full"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="relative w-full md:w-[200px]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Select onValueChange={setSelectedLocation} defaultValue="all">
              <SelectTrigger className="pl-9 w-full">
                <SelectValue placeholder="Semua Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                {allLocations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto">Cari</Button>
        </div>
      </div>

      <div className="container flex flex-col lg:flex-row gap-8 py-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 p-4 bg-card rounded-lg shadow-sm border border-border lg:sticky lg:top-[120px] self-start">
          <h2 className="text-2xl font-bold mb-6">Filter Lowongan</h2>

          {/* QR Code Section */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
            <img src="/placeholder.svg" alt="QR Code" className="w-24 h-24 mx-auto mb-3" />
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">Dapatkan notifikasi lokermu secara langsung di Aplikasi EduSprout</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Scan kode QR untuk download</p>
          </div>

          <Accordion type="multiple" defaultValue={["prioritas", "tipe-pekerjaan", "kebijakan-kerja", "sumber"]}>
            {/* Prioritas Filter */}
            <AccordionItem value="prioritas">
              <AccordionTrigger className="text-lg font-semibold">Prioritas</AccordionTrigger>
              <AccordionContent className="flex gap-2 pt-2">
                <Button
                  variant={sortBy === "date-desc" ? "default" : "outline"}
                  onClick={() => setSortBy("date-desc")}
                  className="flex-grow"
                >
                  Terbaru
                </Button>
                <Button
                  variant={sortBy === "title-asc" ? "default" : "outline"}
                  onClick={() => setSortBy("title-asc")}
                  className="flex-grow"
                >
                  Judul (A-Z)
                </Button>
              </AccordionContent>
            </AccordionItem>
            <Separator className="my-4" />

            {/* Tipe Pekerjaan Filter (Placeholder) */}
            <AccordionItem value="tipe-pekerjaan">
              <AccordionTrigger className="text-lg font-semibold">Tipe Pekerjaan</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="full-time" checked={jobTypes.includes("Penuh Waktu")} onCheckedChange={(checked: boolean) => handleJobTypeChange("Penuh Waktu", checked)} />
                  <Label htmlFor="full-time">Penuh Waktu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="contract" checked={jobTypes.includes("Kontrak")} onCheckedChange={(checked: boolean) => handleJobTypeChange("Kontrak", checked)} />
                  <Label htmlFor="contract">Kontrak</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="internship" checked={jobTypes.includes("Magang")} onCheckedChange={(checked: boolean) => handleJobTypeChange("Magang", checked)} />
                  <Label htmlFor="internship">Magang</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="part-time" checked={jobTypes.includes("Paruh Waktu")} onCheckedChange={(checked: boolean) => handleJobTypeChange("Paruh Waktu", checked)} />
                  <Label htmlFor="part-time">Paruh Waktu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="freelance" checked={jobTypes.includes("Freelance")} onCheckedChange={(checked: boolean) => handleJobTypeChange("Freelance", checked)} />
                  <Label htmlFor="freelance">Freelance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="daily" checked={jobTypes.includes("Harian")} onCheckedChange={(checked: boolean) => handleJobTypeChange("Harian", checked)} />
                  <Label htmlFor="daily">Harian</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <Separator className="my-4" />

            {/* Kebijakan Kerja Filter (Placeholder) */}
            <AccordionItem value="kebijakan-kerja">
              <AccordionTrigger className="text-lg font-semibold">Kebijakan Kerja</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="office" checked={workPolicies.includes("Kerja di kantor")} onCheckedChange={(checked: boolean) => handleWorkPolicyChange("Kerja di kantor", checked)} />
                  <Label htmlFor="office">Kerja di kantor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hybrid" checked={workPolicies.includes("Kerja di kantor / rumah")} onCheckedChange={(checked: boolean) => handleWorkPolicyChange("Kerja di kantor / rumah", checked)} />
                  <Label htmlFor="hybrid">Kerja di kantor / rumah</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remote" checked={workPolicies.includes("Kerja Remote/dari rumah")} onCheckedChange={(checked: boolean) => handleWorkPolicyChange("Kerja Remote/dari rumah", checked)} />
                  <Label htmlFor="remote">Kerja Remote/dari rumah</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <Separator className="my-4" />

            {/* Sumber Filter */}
            <AccordionItem value="sumber">
              <AccordionTrigger className="text-lg font-semibold">Sumber Lowongan</AccordionTrigger>
              <AccordionContent className="pt-2">
                <Select onValueChange={setSelectedSource} defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter Sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Sumber</SelectItem>
                    <SelectItem value="lokerbandung">Loker Bandung</SelectItem>
                    <SelectItem value="getredy">GetRedy</SelectItem>
                    <SelectItem value="jooble">Jooble</SelectItem>
                    <SelectItem value="jobstreet">JobStreet</SelectItem>
                    <SelectItem value="lokerid">Loker.id</SelectItem>
                    {/* Add other sources as needed */}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Job Listings */}
        <main className="flex-grow lg:w-3/4">
          <h1 className="text-4xl font-bold mb-6 text-center lg:text-left">Lowongan Kerja di Indonesia</h1>
          <p className="text-lg text-center lg:text-left text-muted-foreground mb-8">
            Dapatkan informasi lowongan pekerjaan dan peluang karir terbaru dari berbagai perusahaan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedJobs.length > 0 ? (
              filteredAndSortedJobs.map((jobItem) => (
                <JobCard
                  key={jobItem.id}
                  id={jobItem.id}
                  title={jobItem.title}
                  company={jobItem.company}
                  location={jobItem.location}
                  source={jobItem.source}
                  date_posted={jobItem.date_posted}
                  link={`/jobs/${jobItem.id}`}
                  salaryRange={jobItem.salaryRange}
                  experience={jobItem.experience}
                  education={jobItem.education}
                  skills={jobItem.skills}
                  isPremium={jobItem.isPremium}
                  isHot={jobItem.isHot}
                  isActiveRecruiting={jobItem.isActiveRecruiting}
                  // companyLogoUrl="/path/to/company-logo.png" // Add actual logo URL if available
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">Tidak ada lowongan yang ditemukan.</p>
            )}
          </div>
        </main>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp yang benar
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center"
        aria-label="Hubungi kami via WhatsApp"
      >
        <MessageSquare className="h-7 w-7" />
      </a>
    </div>
  );
};

export default Jobs;