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
import { Search, MapPin, X, RotateCcw } from "lucide-react"; // Removed MessageSquare
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json";

// Define JobItem type to include new fields for better type safety
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
  jobType?: string; // New field
  workPolicy?: string; // New field
}

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

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortBy("date-desc");
    setSelectedSource("all");
    setJobTypes([]);
    setWorkPolicies([]);
    setSelectedLocation("all");
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filtered: JobItem[] = scrapedJobsFromDB;

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

    // 4. Filter by Job Type
    if (jobTypes.length > 0) {
      filtered = filtered.filter(job => job.jobType && jobTypes.includes(job.jobType));
    }

    // 5. Filter by Work Policy
    if (workPolicies.length > 0) {
      filtered = filtered.filter(job => job.workPolicy && workPolicies.includes(job.workPolicy));
    }

    // Helper function to parse date strings (assuming YYYY-MM-DD format from scraper)
    const parseDate = (dateString: string | undefined) => {
      if (dateString) {
        return new Date(dateString);
      }
      return new Date(0); // Return a very old date if parsing fails
    };

    // 6. Sort
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
      <div className="sticky top-14 z-40 bg-background border-b py-4 shadow-lg rounded-b-lg"> {/* Added rounded-b-lg and shadow-lg */}
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
        <aside className="w-full lg:w-1/4 p-6 bg-card rounded-lg shadow-lg border border-border lg:sticky lg:top-[120px] self-start"> {/* Changed shadow-md to shadow-lg */}
          <h2 className="text-2xl font-bold mb-6">Filter Lowongan</h2>

          {/* QR Code Section */}
          <div className="mb-8 p-4 bg-muted rounded-lg border border-border text-center shadow-sm"> {/* Changed bg-blue-50 to bg-muted, adjusted border */}
            <img src="/placeholder.svg" alt="QR Code" className="w-24 h-24 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground mb-1">Dapatkan notifikasi lokermu secara langsung di Aplikasi EduSprout</p> {/* Changed text color */}
            <p className="text-xs text-muted-foreground">Scan kode QR untuk download</p>
          </div>

          <Accordion type="multiple" defaultValue={["prioritas", "tipe-pekerjaan", "kebijakan-kerja", "sumber"]}>
            {/* Prioritas Filter */}
            <AccordionItem value="prioritas" className="border-b pb-4 mb-4">
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

            {/* Tipe Pekerjaan Filter */}
            <AccordionItem value="tipe-pekerjaan" className="border-b pb-4 mb-4">
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

            {/* Kebijakan Kerja Filter */}
            <AccordionItem value="kebijakan-kerja" className="border-b pb-4 mb-4">
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

            {/* Sumber Filter */}
            <AccordionItem value="sumber" className="pb-4">
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
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="lokal">Lokal</SelectItem>
                    {/* Add other sources as needed */}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Reset Filters Button */}
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="w-full mt-8 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Reset Filter
          </Button>
        </aside>

        {/* Job Listings */}
        <main className="flex-grow lg:w-3/4">
          <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">Lowongan Kerja di Indonesia</h1>
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
              <p className="col-span-full text-center text-muted-foreground py-12">Tidak ada lowongan yang ditemukan.</p>
            )}
          </div>
        </main>
      </div>

      {/* Floating WhatsApp Button Removed */}
    </div>
  );
};

export default Jobs;