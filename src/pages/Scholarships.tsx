import React, { useState, useMemo } from "react";
import InfoCard from "@/components/InfoCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  source?: string; // Added source field
}

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all"); // New state for source filter

  const allScholarships: ScholarshipItem[] = useMemo(() => {
    // Add a 'source' property to each scholarship from different files
    const dummy = dummyScholarshipsData.map(s => ({ ...s, source: "manual" }));
    const beasiswaId = scrapedScholarshipsBeasiswaId.map(s => ({ ...s, source: "beasiswa.id" }));
    const indbeasiswa = scrapedScholarshipsIndbeasiswa.map(s => ({ ...s, source: "indbeasiswa.com" }));
    return [...dummy, ...beasiswaId, ...indbeasiswa];
  }, []);

  const filteredAndSortedScholarships = useMemo(() => {
    let filtered = allScholarships;

    // 1. Filter by Source
    if (selectedSource !== "all") {
      filtered = filtered.filter(scholarship => scholarship.source === selectedSource);
    }

    // 2. Filter by Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(scholarship => scholarship.category === selectedCategory);
    }

    // 3. Filter by Search Term
    filtered = filtered.filter((scholarship) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        scholarship.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        scholarship.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        scholarship.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        (scholarship.date && scholarship.date.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (scholarship.location && scholarship.location.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });

    // Helper function to parse date strings
    const parseDate = (dateString: string) => {
      // This parsing logic needs to be robust for various date formats.
      // For now, assuming "Deadline: DD Month YYYY" or "YYYY-MM-DD"
      const deadlineMatch = dateString.match(/Deadline:\s*(\d{1,2})\s*(\w+)\s*(\d{4})/i);
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
      // Try parsing as YYYY-MM-DD
      const isoDate = new Date(dateString);
      if (!isNaN(isoDate.getTime())) {
        return isoDate;
      }
      return new Date(0); // Return a very old date if parsing fails
    };

    // 4. Sort
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
  }, [searchTerm, sortBy, selectedCategory, selectedSource, allScholarships]);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Info Beasiswa EduSprout</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Temukan berbagai beasiswa lokal dan internasional untuk mendukung pendidikan Anda.
      </p>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-8 justify-center">
        <Input
          type="text"
          placeholder="Cari beasiswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:flex-grow md:max-w-xs lg:max-w-md"
        />
        <Select onValueChange={setSelectedCategory} defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Lokal">Lokal</SelectItem>
            <SelectItem value="Internasional">Internasional</SelectItem>
          </SelectContent>
        </Select>
        {/* New Select for Source Filter */}
        <Select onValueChange={setSelectedSource} defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter Sumber" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Sumber</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="beasiswa.id">Beasiswa.id</SelectItem>
            <SelectItem value="indbeasiswa.com">Indbeasiswa.com</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSortBy} defaultValue="date-desc">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Tanggal Terbaru</SelectItem>
            <SelectItem value="date-asc">Tanggal Terlama</SelectItem>
            <SelectItem value="title-asc">Judul (A-Z)</SelectItem>
            <SelectItem value="title-desc">Judul (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredAndSortedScholarships.length > 0 ? (
          filteredAndSortedScholarships.map((scholarshipItem) => (
            <InfoCard
              key={scholarshipItem.id}
              title={scholarshipItem.title}
              description={scholarshipItem.description}
              category={scholarshipItem.category}
              date={scholarshipItem.date}
              location={scholarshipItem.location}
              link={scholarshipItem.link}
              linkText="Lihat Beasiswa"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">Tidak ada beasiswa yang ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default Scholarships;