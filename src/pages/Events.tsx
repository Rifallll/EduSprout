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
import scrapedEvents from "@/data/events.json"; // Import the scraped event data

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // Default sort by date descending
  const [selectedCategory, setSelectedCategory] = useState("all"); // New state for category filter

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = scrapedEvents; // Use scrapedEvents instead of dummyEvents

    // 1. Filter by Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // 2. Filter by Search Term
    filtered = filtered.filter((event) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        event.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        event.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        (event.location && event.location.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });

    // Helper function to parse date strings
    const parseDate = (dateString: string) => {
      // This is a simplified parser. For robust date parsing, consider a library like date-fns or moment.js
      // It tries to extract a date like "DD Month YYYY" or "Deadline: DD Month YYYY"
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
      <h1 className="text-4xl font-bold mb-6 text-center">Event EduSprout</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Jelajahi berbagai event menarik dari kampus dan komunitas di seluruh Indonesia.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Cari event..."
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
            <SelectItem value="Webinar">Webinar</SelectItem>
            <SelectItem value="Lomba">Lomba</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
            <SelectItem value="Seminar">Seminar</SelectItem>
            <SelectItem value="Volunteering">Volunteering</SelectItem>
            <SelectItem value="Job Fair">Job Fair</SelectItem> {/* Added Job Fair category */}
            <SelectItem value="Career Day">Career Day</SelectItem> {/* Added Career Day category */}
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
        {filteredAndSortedEvents.length > 0 ? (
          filteredAndSortedEvents.map((eventItem) => (
            <InfoCard
              key={eventItem.id}
              title={eventItem.title}
              description={eventItem.description}
              category={eventItem.category}
              date={eventItem.date}
              location={eventItem.location}
              link={eventItem.link}
              linkText="Lihat Event"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">Tidak ada event yang ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default Events;