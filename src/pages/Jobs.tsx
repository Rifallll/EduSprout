import React, { useState, useMemo } from "react";
import JobCard from "@/components/JobCard"; // Import the new JobCard component
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import scrapedJobsFromDB from "@/data/scrapedJobsFromDB.json"; // Import the new scraped job data

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // Default sort by date descending
  const [selectedSource, setSelectedSource] = useState("all"); // New state for source filter

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = scrapedJobsFromDB;

    // 1. Filter by Source
    if (selectedSource !== "all") {
      filtered = filtered.filter(job => job.source === selectedSource);
    }

    // 2. Filter by Search Term
    filtered = filtered.filter((job) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (job.company && job.company.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (job.location && job.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
        job.source.toLowerCase().includes(lowerCaseSearchTerm) ||
        (job.date_posted && job.date_posted.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });

    // Helper function to parse date strings (assuming YYYY-MM-DD format from scraper)
    const parseDate = (dateString: string) => {
      if (dateString) {
        return new Date(dateString);
      }
      return new Date(0); // Return a very old date if parsing fails
    };

    // 3. Sort
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
  }, [searchTerm, sortBy, selectedSource]);

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
        <Select onValueChange={setSelectedSource} defaultValue="all">
          <SelectTrigger className="w-[180px]">
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
            <JobCard // Using the new JobCard component
              key={jobItem.id}
              id={jobItem.id}
              title={jobItem.title}
              company={jobItem.company}
              location={jobItem.location}
              source={jobItem.source}
              date_posted={jobItem.date_posted}
              link={`/jobs/${jobItem.id}`} // Link to the internal detail page
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