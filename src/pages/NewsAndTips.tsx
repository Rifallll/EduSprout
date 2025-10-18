import React, { useState, useMemo } from "react";
import NewsListItem from "@/components/NewsListItem";
import NewsSidebarCard from "@/components/NewsSidebarCard"; // Import the new sidebar component
import InfoCard from "@/components/InfoCard"; // Re-use InfoCard for events and scholarships
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json"; // Import the scraped data
import dummyEvents from "@/data/dummyEvents.json"; // Import dummy events
import dummyScholarships from "@/pages/Scholarships"; // Import dummy scholarships (assuming it exports the array directly or has a similar structure)

// Re-import dummyScholarships data directly if it's not exported as default array
// For now, I'll assume dummyScholarships is an array from the Scholarships page context.
// If not, you might need to create a separate JSON for it like dummyEvents.
const dummyScholarshipsData = [
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
];


const NewsAndTips = () => {
  const featuredNews = scrapedNewsAndTips.filter((_, index) => index % 2 === 0); // Example: every other news item

  // Dummy data for sidebars
  const popularNews = useMemo(() => {
    // Sort by views for popular news
    return [...scrapedNewsAndTips]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(news => ({
        id: news.id,
        label: news.title,
        link: news.link,
        metadata: `${news.views?.toLocaleString()} views`,
      }));
  }, []);

  const newsCategories = useMemo(() => {
    const categories = new Set<string>();
    scrapedNewsAndTips.forEach(news => categories.add(news.category));
    return Array.from(categories).map((cat, index) => ({
      id: `cat-${index}`,
      label: cat,
      link: `/news-and-tips?category=${encodeURIComponent(cat)}`, // Example link for category filter
      metadata: `${scrapedNewsAndTips.filter(n => n.category === cat).length} artikel`,
    }));
  }, []);

  const featuredEvents = useMemo(() => {
    return dummyEvents.slice(0, 2); // Get top 2 events
  }, []);

  const featuredScholarships = useMemo(() => {
    return dummyScholarshipsData.slice(0, 2); // Get top 2 scholarships
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Berita & Tips Edukasi</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Dapatkan informasi terbaru, panduan, dan tips untuk mendukung perjalanan pendidikan dan karir Anda.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <NewsSidebarCard
            title="Event Pilihan"
            items={featuredEvents.map(event => ({
              id: event.id,
              label: event.title,
              link: event.link,
              metadata: event.date,
            }))}
            viewAllLink="/events"
          />
          <NewsSidebarCard
            title="Beasiswa Unggulan"
            items={featuredScholarships.map(scholarship => ({
              id: scholarship.id,
              label: scholarship.title,
              link: scholarship.link,
              metadata: scholarship.date,
            }))}
            viewAllLink="/scholarships"
          />
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-2">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="for-you">Untuk Anda</TabsTrigger>
              <TabsTrigger value="featured">Pilihan Editor</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <div className="space-y-6">
                {scrapedNewsAndTips.map((newsItem) => (
                  <NewsListItem key={newsItem.id} {...newsItem} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="featured">
              <div className="space-y-6">
                {featuredNews.map((newsItem) => (
                  <NewsListItem key={newsItem.id} {...newsItem} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <NewsSidebarCard
            title="Berita Populer"
            items={popularNews}
            viewAllLink="/news-and-tips" // Link to all news, maybe with a filter for popular
          />
          <NewsSidebarCard
            title="Kategori Berita"
            items={newsCategories}
          />
        </aside>
      </div>
    </div>
  );
};

export default NewsAndTips;