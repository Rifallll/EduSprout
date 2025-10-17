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

const dummyScholarships = [
  {
    id: "s1",
    title: "Beasiswa Unggulan Dalam Negeri 2025",
    description: "Beasiswa penuh untuk mahasiswa berprestasi di berbagai universitas terbaik di Indonesia.",
    category: "Lokal",
    date: "Deadline: 31 Januari 2025",
    link: "/scholarships/unggulan-dalam-negeri",
  },
  {
    id: "s2",
    title: "Global Leaders Scholarship (USA)",
    description: "Kesempatan studi S2/S3 di universitas terkemuka di Amerika Serikat dengan pendanaan penuh.",
    category: "Internasional",
    date: "Deadline: 15 Februari 2025",
    link: "/scholarships/global-leaders-usa",
  },
  {
    id: "s3",
    title: "Beasiswa Riset Inovasi (Lokal)",
    description: "Dukungan dana untuk proyek penelitian inovatif mahasiswa di bidang sains dan teknologi.",
    category: "Lokal",
    date: "Deadline: 28 Februari 2025",
    link: "/scholarships/riset-inovasi",
  },
  {
    id: "s4",
    title: "Erasmus Mundus Scholarship (Europe)",
    description: "Beasiswa bergengsi untuk program master bersama di berbagai negara Eropa.",
    category: "Internasional",
    date: "Deadline: 10 Maret 2025",
    link: "/scholarships/erasmus-mundus",
  },
  {
    id: "s5",
    title: "Beasiswa Pendidikan Guru (Lokal)",
    description: "Program beasiswa khusus bagi calon guru yang berkomitmen untuk memajukan pendidikan di daerah terpencil.",
    category: "Lokal",
    date: "Deadline: 20 Maret 2025",
    link: "/scholarships/pendidikan-guru",
  },
  {
    id: "s6",
    title: "Chevening Scholarship (UK)",
    description: "Beasiswa penuh untuk studi pascasarjana di universitas-universitas di Inggris.",
    category: "Internasional",
    date: "Deadline: 05 April 2025",
    link: "/scholarships/chevening",
  },
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // Default sort by date descending
  const [selectedCategory, setSelectedCategory] = useState("all"); // New state for category filter

  const filteredAndSortedScholarships = useMemo(() => {
    let filtered = dummyScholarships;

    // 1. Filter by Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(scholarship => scholarship.category === selectedCategory);
    }

    // 2. Filter by Search Term
    filtered = filtered.filter((scholarship) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        scholarship.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        scholarship.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        scholarship.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        (scholarship.date && scholarship.date.toLowerCase().includes(lowerCaseSearchTerm))
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
      <h1 className="text-4xl font-bold mb-6 text-center">Info Beasiswa EduSprout</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Temukan berbagai beasiswa lokal dan internasional untuk mendukung pendidikan Anda.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Cari beasiswa..."
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
            <SelectItem value="Lokal">Lokal</SelectItem>
            <SelectItem value="Internasional">Internasional</SelectItem>
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
        {filteredAndSortedScholarships.length > 0 ? (
          filteredAndSortedScholarships.map((scholarshipItem) => (
            <InfoCard
              key={scholarshipItem.id}
              title={scholarshipItem.title}
              description={scholarshipItem.description}
              category={scholarshipItem.category}
              date={scholarshipItem.date}
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