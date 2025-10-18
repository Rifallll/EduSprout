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
import scrapedJobs from "@/data/scrapedJobs.json"; // Import the scraped job data

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // Default sort by date descending
  const [selectedCategory, setSelectedCategory] = useState("all"); // New state for category filter

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = scrapedJobs; // Use scrapedJobs instead of dummyJobs

    // 1. Filter by Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // 2. Filter by Search Term
    filtered = filtered.filter((job) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        job.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        job.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        (job.location && job.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (job.date && job.date.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });

    // Helper function to parse date strings
    const parseDate = (dateString: string) => {
      const match = dateString.match(/(\d{1,2})\s(\w+)\s(\d{4})/);
      if (match) {
        const [_, day, monthName, year] = match;
        const monthMap: { [key: string]: number } = {
          "januari": 0, "februari": 1, "maret": 2, "april": 3, "mei": 4, "juni": 5,
          "juli": 6, "agustus": 7, "september": 8, "oktober": 9, "november": 10, "desember": 11
        };
        const month = monthMap[monthName.toLowerCase()];
        if (month !== undefined) {
          return new Date(parseInt(year), month, parseInt(day));
        }
      }
      return new Date(0); // Return a very old date if parsing fails
    };

    // 3. Sort
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
  }, [searchTerm, sortBy, selectedCategory]);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Info Lowongan & Karir EduSprout</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Dapatkan informasi lowongan pekerjaan dan peluang karir terbaru dari berbagai perusahaan.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Cari lowongan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={setSelectedCategory} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Job Fair">Job Fair</SelectItem>
            <SelectItem value="Career Day">Career Day</SelectItem>
            {/* Add other job categories if needed, e.g., "Full-time", "Internship", "Part-time" */}
          </SelectContent>
        </Select>
        <Select onValueChange={setSortBy} defaultValue="date-desc">
          <SelectTrigger className="w-[180px]">
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
        {filteredAndSortedJobs.length > 0 ? (
          filteredAndSortedJobs.map((jobItem) => (
            <InfoCard
              key={jobItem.id}
              title={jobItem.title}
              description={jobItem.description}
              category={jobItem.category}
              location={jobItem.location}
              date={jobItem.date}
              link={jobItem.link}
              linkText="Lihat Detail"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">Tidak ada lowongan yang ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;