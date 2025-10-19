import React, { useState, useMemo } from "react";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// Import the new modular scholarship data
import dummyScholarships from "@/data/scholarships";

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
    // Use dummyScholarships directly and enrich them
    return dummyScholarships.map(enrichScholarshipData);
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

    // Helper function to parse date strings
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
        return parseDate(b.deadline).getTime() - parseDate(a.deadline).getTime();
      } else if (sortBy === "date-asc") {
        return parseDate(a.deadline).getTime() - parseDate(b.deadline).getTime();
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
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination component
  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Search Bar */}
      <div className="sticky top-14 z-40 bg-background border-b py-4 shadow-lg rounded-b-lg">
        <div className="container flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari Beasiswa, Institusi, atau Negara"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-8 w-full"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="relative w-full md:w-[200px]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Select onValueChange={(value) => {
              setSelectedCountry(value);
              setCurrentPage(1);
            }} defaultValue="all">
              <SelectTrigger className="pl-9 w-full">
                <SelectValue placeholder="Semua Negara" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Negara</SelectItem>
                {allCountries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto">Cari</Button>
        </div>
      </div>

      <div className="container flex flex-col lg:flex-row gap-8 py-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 p-6 bg-card rounded-lg shadow-lg border border-border lg:sticky lg:top-[120px] self-start">
          <h2 className="text-2xl font-bold mb-6">Filter Beasiswa</h2>

          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="w-full mb-6 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Reset Filter
          </Button>

          <Accordion type="multiple" defaultValue={["jenjang", "tipe", "sumber", "kategori"]}>
            {/* Jenjang Filter */}
            <AccordionItem value="jenjang" className="border-b pb-4 mb-4">
              <AccordionTrigger className="text-lg font-semibold">Jenjang</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                {degreeLevelOptions.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`degree-${level}`}
                      checked={selectedDegreeLevels.includes(level)}
                      onCheckedChange={(checked: boolean) => handleDegreeLevelChange(level, checked)}
                    />
                    <Label htmlFor={`degree-${level}`}>{level}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Tipe Filter */}
            <AccordionItem value="tipe" className="border-b pb-4 mb-4">
              <AccordionTrigger className="text-lg font-semibold">Tipe</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                {fundingTypeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`funding-${type}`}
                      checked={selectedFundingTypes.includes(type)}
                      onCheckedChange={(checked: boolean) => handleFundingTypeChange(type, checked)}
                    />
                    <Label htmlFor={`funding-${type}`}>{type}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Sumber Filter */}
            <AccordionItem value="sumber" className="border-b pb-4 mb-4">
              <AccordionTrigger className="text-lg font-semibold">Sumber</AccordionTrigger>
              <AccordionContent className="pt-2">
                <Select onValueChange={(value) => {
                  setSelectedSource(value);
                  setCurrentPage(1);
                }} defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Semua Sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Sumber</SelectItem>
                    <SelectItem value="dummy">Dummy Data</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            {/* Kategori Filter (Lokal/Internasional) */}
            <AccordionItem value="kategori" className="pb-4">
              <AccordionTrigger className="text-lg font-semibold">Kategori</AccordionTrigger>
              <AccordionContent className="pt-2">
                <Select onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }} defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="Lokal">Lokal</SelectItem>
                    <SelectItem value="Internasional">Internasional</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow lg:w-3/4">
          <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">Info Beasiswa EduSprout</h1>
          <p className="text-lg text-center lg:text-left text-muted-foreground mb-8">
            Temukan berbagai beasiswa lokal dan internasional untuk mendukung pendidikan Anda.
          </p>

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
              <p className="col-span-full text-center text-muted-foreground py-12">Tidak ada beasiswa yang ditemukan.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {startPage > 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {pageNumbers.map((number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      onClick={() => paginate(number)}
                      isActive={number === currentPage}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {endPage < totalPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
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