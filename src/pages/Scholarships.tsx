import React, { useState, useMemo, useEffect } from "react";
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
import { Search, MapPin, X, RotateCcw } from "lucide-react";
import {
  Pagination, // Pagination component
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// Import the new scraped scholarship data
import scrapedScholarships from "@/data/scrapedScholarships.json";

// Import the new ScholarshipListItem component
import ScholarshipListItem from "@/components/ScholarshipListItem";
// Import the utility for enriching scholarship data
import { enrichScholarshipData, EnrichedScholarshipItem } from "@/utils/scholarshipUtils";

// Define filter options
const degreeLevelOptions = [
  "SMP", "SMA", "D2", "D3", "D4", "S1", "S2", "S3", "Non-Degree", "Gap Year", "Profesi"
];

const fundingTypeOptions = [
  "Fully Funded", "Partially Funded", "Mentoring", "Riset", "Exchange",
  "Pelatihan/Studi Singkat", "Self Funded", "Pendanaan Project", "Internship"
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedCategory, setSelectedCategory] = useState("all"); // Lokal/Internasional
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedDegreeLevels, setSelectedDegreeLevels] = useState<string[]>([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedInstitution, setSelectedInstitution] = useState(""); // For institution search

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarshipsPerPage] = useState(10); // Display 10 scholarships per page

  const allScholarships: EnrichedScholarshipItem[] = useMemo(() => {
    // Use scrapedScholarships directly and enrich them
    return scrapedScholarships.map(enrichScholarshipData);
  }, []);

  const allCountries = useMemo(() => {
    const countries = new Set<string>();
    allScholarships.forEach(s => {
      if (s.location && s.location !== "Tidak diketahui") {
        countries.add(s.location);
      }
    });
    return Array.from(countries).sort();
  }, [allScholarships]);

  const allSources = useMemo(() => {
    const sources = new Set<string>();
    allScholarships.forEach(s => {
      if (s.source) {
        sources.add(s.source);
      }
    });
    return Array.from(sources).sort();
  }, [allScholarships]);

  const handleDegreeLevelChange = (level: string, checked: boolean) => {
    setSelectedDegreeLevels((prev) =>
      checked ? [...prev, level] : prev.filter((l) => l !== level)
    );
    setCurrentPage(1);
  };

  const handleFundingTypeChange = (type: string, checked: boolean) => {
    setSelectedFundingTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortBy("date-desc");
    setSelectedCategory("all");
    setSelectedSource("all");
    setSelectedDegreeLevels([]);
    setSelectedFundingTypes([]);
    setSelectedCountry("all");
    setSelectedInstitution("");
    setCurrentPage(1);
  };

  const filteredAndSortedScholarships = useMemo(() => {
    let filtered = allScholarships;

    // 1. Filter by Search Term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((s) => {
        return (
          s.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          s.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          s.category.toLowerCase().includes(lowerCaseSearchTerm) ||
          (s.location && s.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (s.organizer && s.organizer.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (s.institution && s.institution.toLowerCase().includes(lowerCaseSearchTerm)) ||
          s.degreeLevels.some(level => level.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (s.fundingType && s.fundingType.toLowerCase().includes(lowerCaseSearchTerm))
        );
      });
    }

    // 2. Filter by Source
    if (selectedSource !== "all") {
      filtered = filtered.filter(s => s.source === selectedSource);
    }

    // 3. Filter by Category (Lokal/Internasional)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    // 4. Filter by Degree Levels
    if (selectedDegreeLevels.length > 0) {
      filtered = filtered.filter(s => s.degreeLevels.some(level => selectedDegreeLevels.includes(level)));
    }

    // 5. Filter by Funding Types
    if (selectedFundingTypes.length > 0) {
      filtered = filtered.filter(s => s.fundingType && selectedFundingTypes.includes(s.fundingType));
    }

    // 6. Filter by Country
    if (selectedCountry !== "all") {
      filtered = filtered.filter(s => s.location === selectedCountry);
    }

    // 7. Filter by Institution
    if (selectedInstitution) {
      const lowerCaseInstitution = selectedInstitution.toLowerCase();
      filtered = filtered.filter(s => s.institution?.toLowerCase().includes(lowerCaseInstitution));
    }

    const parseDate = (dateString: string) => {
      const deadlineMatch = dateString.match(/(\d{1,2})\s*(\w+)\s*(\d{4})/i);
      if (deadlineMatch) {
        const [_, day, monthName, year] = deadlineMatch;
        const monthMap: { [key: string]: number } = {
          "januari": 0, "februari": 1, "maret": 2, "april": 3, "mei": 4, "juni": 5,
          "juli": 6, "agustus": 7, "september": 8, "oktober": 9, "november": 10, "desember": 11
        };
        const month = monthMap[monthName.toLowerCase()];
        if (month !== undefined) {
          return new Date(parseInt(year), month, parseInt(day));
        }
      }
      const isoDate = new Date(dateString);
      if (!isNaN(isoDate.getTime())) {
        return isoDate;
      }
      return new Date(0);
    };

    // 8. Sort
    filtered.sort((a, b) => {
      if (sortBy === "date-desc") {
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      } else if (sortBy === "date-asc") {
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return filtered;
  }, [
    searchTerm, sortBy, selectedCategory, selectedSource, selectedDegreeLevels,
    selectedFundingTypes, selectedCountry, selectedInstitution, allScholarships
  ]);

  // Get current scholarships for pagination
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = filteredAndSortedScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedScholarships.length / scholarshipsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination component
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
    <div className="min-h-screen">
      {/* Header Section */}
      {/* Header Section */}
      <div className="pt-32 pb-12 overflow-hidden">
        <div className="container px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="display-title mb-6 reveal">
              Eksplorasi <span className="text-primary italic">Beasiswa</span>
            </h1>
            <p className="text-xl text-white/50 font-medium reveal">
              Daftar beasiswa terlengkap dari dalam dan luar negeri untuk mendukung perjalanan akademikmu meraih mimpi.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container flex flex-col lg:flex-row gap-8 py-12 px-4">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 p-8 glass-dark border-white/5 rounded-3xl lg:sticky lg:top-28 self-start">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Filter Pencarian</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-primary hover:bg-primary/10 h-8 px-2"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
          </div>

          <Accordion type="multiple" defaultValue={["jenjang", "tipe", "negara"]} className="space-y-4">
            <AccordionItem value="jenjang" className="border-none">
              <AccordionTrigger className="text-base font-bold hover:no-underline py-2">Jenjang Pendidikan</AccordionTrigger>
              <AccordionContent className="pt-4 grid grid-cols-2 gap-3">
                {degreeLevelOptions.map((level) => (
                  <div key={level} className="flex items-center space-x-2 group">
                    <Checkbox
                      id={`degree-${level}`}
                      checked={selectedDegreeLevels.includes(level)}
                      onCheckedChange={(checked: boolean) => handleDegreeLevelChange(level, checked)}
                      className="border-white/20 data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor={`degree-${level}`} className="text-sm cursor-pointer group-hover:text-primary transition-colors">{level}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tipe" className="border-none">
              <AccordionTrigger className="text-base font-bold hover:no-underline py-2">Tipe Pendanaan</AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                {fundingTypeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2 group">
                    <Checkbox
                      id={`funding-${type}`}
                      checked={selectedFundingTypes.includes(type)}
                      onCheckedChange={(checked: boolean) => handleFundingTypeChange(type, checked)}
                      className="border-white/20 data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor={`funding-${type}`} className="text-sm cursor-pointer group-hover:text-primary transition-colors">{type}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="negara" className="border-none">
              <AccordionTrigger className="text-base font-bold hover:no-underline py-2">Lokasi Studi</AccordionTrigger>
              <AccordionContent className="pt-4">
                <Select onValueChange={(value) => {
                  setSelectedCountry(value);
                  setCurrentPage(1);
                }} value={selectedCountry}>
                  <SelectTrigger className="glass border-white/10 h-10">
                    <SelectValue placeholder="Semua Negara" />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/10 max-h-60">
                    <SelectItem value="all">Semua Negara</SelectItem>
                    {allCountries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* List of Scholarships */}
        <main className="flex-grow lg:w-3/4">
          <div className="glass p-4 rounded-2xl border-white/5 mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari beasiswa atau universitas..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-11 h-12 glass border-none focus-visible:ring-primary"
              />
            </div>
            <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12 glass border-none">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent className="glass-dark border-white/10">
                <SelectItem value="date-desc">Batas Waktu Terlama</SelectItem>
                <SelectItem value="date-asc">Batas Waktu Terdekat</SelectItem>
                <SelectItem value="title-asc">Nama (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScholarships.length > 0 ? (
              currentScholarships.map((scholarshipItem) => (
                <ScholarshipListItem
                  key={scholarshipItem.id}
                  id={scholarshipItem.id}
                  title={scholarshipItem.title}
                  organizer={scholarshipItem.organizer || scholarshipItem.institution}
                  location={scholarshipItem.location}
                  deadline={scholarshipItem.date}
                  link={scholarshipItem.link}
                  degreeLevels={scholarshipItem.degreeLevels}
                  fundingType={scholarshipItem.fundingType}
                />
              ))
            ) : (
              <div className="col-span-full py-32 text-center glass-dark rounded-3xl">
                <p className="text-xl text-muted-foreground mb-4">Kami belum menemukan beasiswa tersebut.</p>
                <Button onClick={handleResetFilters} variant="outline" className="glass">Reset Filter</Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-30" : "cursor-pointer"}
                  />
                </PaginationItem>
                {pageNumbers.map((number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      onClick={() => paginate(number)}
                      isActive={number === currentPage}
                      className="cursor-pointer"
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-30" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
};

export default Scholarships;