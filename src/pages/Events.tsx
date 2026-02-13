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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import dummyEvents from "@/data/dummyEvents.json"; // Import the new dummy event data

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6); // Display 6 events per page

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = dummyEvents;

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
      return new Date(0);
    };

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

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredAndSortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage);

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
    <div className="min-h-screen pt-28 pb-12 overflow-hidden">
      <div className="container px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="display-title mb-6 reveal">
            Event & Lomba <span className="text-primary italic">Nasional</span>
          </h1>
          <p className="text-xl text-white/50 font-medium reveal">
            Temukan dan ikuti berbagai kompetisi, webinar, dan workshop tingkat nasional terbaik untuk upgrade prestasimu ke level tertinggi.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12 glass p-4 rounded-2xl border-white/5">
          <Input
            type="text"
            placeholder="Cari lomba atau event..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-grow glass border-white/10 h-12"
          />
          <Select onValueChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }} defaultValue="all">
            <SelectTrigger className="w-full md:w-[200px] glass border-white/10 h-12">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent className="glass-dark border-white/10">
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Webinar">Webinar</SelectItem>
              <SelectItem value="Lomba">Lomba Nasional</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Seminar">Seminar</SelectItem>
              <SelectItem value="Volunteering">Volunteering</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }} defaultValue="date-desc">
            <SelectTrigger className="w-full md:w-[200px] glass border-white/10 h-12">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent className="glass-dark border-white/10">
              <SelectItem value="date-desc">Terbaru</SelectItem>
              <SelectItem value="date-asc">Terlama</SelectItem>
              <SelectItem value="title-asc">Judul (A-Z)</SelectItem>
              <SelectItem value="title-desc">Judul (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentEvents.length > 0 ? (
            currentEvents.map((eventItem) => (
              <InfoCard
                key={eventItem.id}
                title={eventItem.title}
                description={eventItem.description}
                category={eventItem.category}
                date={eventItem.date}
                location={eventItem.location}
                link={eventItem.link}
                linkText="Detail Event"
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-muted-foreground">Yah, kategori ini belum ada eventnya. Coba yang lain ya!</p>
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
      </div>
    </div>
  );
};

export default Events;