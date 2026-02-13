import React, { useState, useMemo, useEffect } from "react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, MapPin, X, RotateCcw, Briefcase, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json";

// Define JobItem type
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

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedSource, setSelectedSource] = useState("all");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [workPolicies, setWorkPolicies] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [allJobs, setAllJobs] = useState<JobItem[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  useEffect(() => {
    const userPostedJobs: JobItem[] = JSON.parse(localStorage.getItem("userPostedJobs") || "[]");
    const combinedJobs = [...scrapedJobsFromDB, ...userPostedJobs];
    setAllJobs(combinedJobs);
  }, []);

  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    allJobs.forEach(job => {
      if (job.location) {
        locations.add(job.location);
      }
    });
    return Array.from(locations).sort();
  }, [allJobs]);

  const handleJobTypeChange = (type: string, checked: boolean) => {
    setJobTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
    setCurrentPage(1);
  };

  const handleWorkPolicyChange = (policy: string, checked: boolean) => {
    setWorkPolicies((prev) =>
      checked ? [...prev, policy] : prev.filter((p) => p !== policy)
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortBy("date-desc");
    setSelectedSource("all");
    setJobTypes([]);
    setWorkPolicies([]);
    setSelectedLocation("all");
    setCurrentPage(1);
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filtered: JobItem[] = allJobs;

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

    if (selectedSource !== "all") {
      filtered = filtered.filter(job => job.source === selectedSource);
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    if (jobTypes.length > 0) {
      filtered = filtered.filter(job => job.jobType && jobTypes.some(type => job.jobType?.includes(type)));
    }

    if (workPolicies.length > 0) {
      filtered = filtered.filter(job => job.workPolicy && workPolicies.some(policy => job.workPolicy?.includes(policy)));
    }

    const parseDate = (dateString: string | undefined) => {
      if (dateString) {
        return new Date(dateString);
      }
      return new Date(0);
    };

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
  }, [searchTerm, sortBy, selectedSource, selectedLocation, jobTypes, workPolicies, allJobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredAndSortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredAndSortedJobs.length / jobsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-background bg-pattern text-foreground selection:bg-violet-400/30 selection:text-white overflow-hidden">
      {/* Header Section */}
      <div className="pt-32 pb-12 overflow-hidden relative">
        <div className="container px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="display-title mb-6 reveal">
              Peluang <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 animate-pulse-slow">Karir</span>
            </h1>
            <p className="text-xl text-zinc-400 font-light reveal leading-relaxed">
              Temukan lowongan kerja, magang, dan freelance terbaik untuk mengawali perjalanan profesionalmu.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="max-w-4xl mx-auto glass p-3 rounded-2xl flex flex-col md:flex-row gap-3 shadow-2xl shadow-black/50 reveal delay-100">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <Input
                type="text"
                placeholder="Cari posisi, skill, atau perusahaan..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-violet-400/50 rounded-xl"
              />
            </div>
            <div className="relative md:w-[250px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <Select onValueChange={(value) => {
                setSelectedLocation(value);
                setCurrentPage(1);
              }} defaultValue="all">
                <SelectTrigger className="pl-12 h-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-violet-400/50">
                  <SelectValue placeholder="Semua Lokasi" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white max-h-[300px]">
                  <SelectItem value="all">Semua Lokasi</SelectItem>
                  {allLocations.map(loc => (
                    <SelectItem key={loc} value={loc} className="focus:bg-white/10 focus:text-violet-400 cursor-pointer">{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="h-12 px-8 bg-white text-black hover:bg-violet-400 hover:text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-violet-400/20">
              Cari
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 self-start space-y-8">
          <div className="glass-dark p-6 rounded-3xl border border-white/5 sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Filter className="w-4 h-4 text-violet-400" /> Filter
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-zinc-400 hover:text-violet-400 hover:bg-transparent h-auto p-0"
              >
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
            </div>

            <Accordion type="multiple" defaultValue={["prioritas", "tipe", "kebijakan"]} className="space-y-4">
              <AccordionItem value="prioritas" className="border-white/5">
                <AccordionTrigger className="text-white hover:text-violet-400 hover:no-underline py-3">Prioritas</AccordionTrigger>
                <AccordionContent className="pt-2 flex gap-2">
                  <Button
                    variant={sortBy === "date-desc" ? "default" : "outline"}
                    onClick={() => { setSortBy("date-desc"); setCurrentPage(1); }}
                    className={`flex-grow h-9 text-xs ${sortBy === "date-desc" ? "bg-violet-400 text-white border-violet-400" : "bg-transparent border-white/10 text-zinc-400 hover:text-white"}`}
                  >
                    Terbaru
                  </Button>
                  <Button
                    variant={sortBy === "title-asc" ? "default" : "outline"}
                    onClick={() => { setSortBy("title-asc"); setCurrentPage(1); }}
                    className={`flex-grow h-9 text-xs ${sortBy === "title-asc" ? "bg-violet-400 text-white border-violet-400" : "bg-transparent border-white/10 text-zinc-400 hover:text-white"}`}
                  >
                    A-Z
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tipe" className="border-white/5">
                <AccordionTrigger className="text-white hover:text-violet-400 hover:no-underline py-3">Tipe Pekerjaan</AccordionTrigger>
                <AccordionContent className="pt-2 space-y-3">
                  {["Penuh Waktu", "Kontrak", "Magang", "Paruh Waktu", "Freelance"].map((type) => (
                    <div key={type} className="flex items-center space-x-3 group">
                      <Checkbox
                        id={type}
                        checked={jobTypes.includes(type)}
                        onCheckedChange={(checked: boolean) => handleJobTypeChange(type, checked)}
                        className="border-white/20 data-[state=checked]:bg-violet-400 data-[state=checked]:text-white data-[state=checked]:border-violet-400"
                      />
                      <Label htmlFor={type} className="text-zinc-400 cursor-pointer group-hover:text-violet-300 transition-colors">{type}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kebijakan" className="border-none">
                <AccordionTrigger className="text-white hover:text-violet-400 hover:no-underline py-3">Kebijakan Kerja</AccordionTrigger>
                <AccordionContent className="pt-2 space-y-3">
                  {[
                    { id: "office", label: "Work From Office", val: "Kerja di kantor" },
                    { id: "hybrid", label: "Hybrid", val: "Kerja di kantor / rumah" },
                    { id: "remote", label: "Remote", val: "Kerja Remote/dari rumah" }
                  ].map((policy) => (
                    <div key={policy.id} className="flex items-center space-x-3 group">
                      <Checkbox
                        id={policy.id}
                        checked={workPolicies.includes(policy.val)}
                        onCheckedChange={(checked: boolean) => handleWorkPolicyChange(policy.val, checked)}
                        className="border-white/20 data-[state=checked]:bg-violet-400 data-[state=checked]:text-white data-[state=checked]:border-violet-400"
                      />
                      <Label htmlFor={policy.id} className="text-zinc-400 cursor-pointer group-hover:text-violet-300 transition-colors">{policy.label}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Promo Card */}
            <div className="mt-8 p-5 bg-gradient-to-br from-violet-400/10 to-transparent rounded-2xl border border-violet-400/20 text-center">
              <Briefcase className="w-8 h-8 text-violet-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-white mb-1">Upload CV Anda</p>
              <p className="text-xs text-zinc-500 mb-3">Dapatkan tawaran kerja yang sesuai dengan profil Anda.</p>
              <Button size="sm" className="w-full bg-white text-black hover:bg-violet-400 hover:text-white font-bold text-xs h-8">Upload Sekarang</Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map((jobItem) => (
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
                  companyLogoUrl={jobItem.companyLogoUrl}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass-dark rounded-3xl border border-white/5">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tidak ada lowongan ditemukan</h3>
                <p className="text-zinc-500 mb-6">Coba ubah kata kunci atau filter pencarian Anda.</p>
                <Button onClick={handleResetFilters} variant="outline" className="border-white/10 text-white hover:bg-white/5">
                  Reset Filter
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      className={`text-white hover:text-violet-400 hover:bg-white/5 ${currentPage === 1 ? "pointer-events-none opacity-30" : "cursor-pointer"}`}
                    />
                  </PaginationItem>
                  {pageNumbers.map((number) => (
                    <PaginationItem key={number} className="hidden sm:inline-block">
                      <PaginationLink
                        onClick={() => paginate(number)}
                        isActive={number === currentPage}
                        className={`cursor-pointer ${number === currentPage ? "bg-violet-400 text-white border-violet-400 font-bold hover:bg-violet-500 hover:text-white" : "text-white hover:bg-white/5 hover:text-violet-400 border-transparent"}`}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      className={`text-white hover:text-violet-400 hover:bg-white/5 ${currentPage === totalPages ? "pointer-events-none opacity-30" : "cursor-pointer"}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;