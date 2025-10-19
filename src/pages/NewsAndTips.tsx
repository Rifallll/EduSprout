import React, { useState, useMemo } from "react";
import NewsListItem from "@/components/NewsListItem";
import NewsSidebarCard from "@/components/NewsSidebarCard";
import InfoCard from "@/components/InfoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json";
import dummyEvents from "@/data/dummyEvents.json";

const NewsAndTips = () => {
  // Filter out any entries that are actually scholarships (e.g., from beasiswa_id)
  const actualNewsAndTips = scrapedNewsAndTips.filter(item => !item.id.startsWith("beasiswa_id_") && !item.id.startsWith("indbeasiswa_"));

  const featuredNews = actualNewsAndTips.filter((_, index) => index % 2 === 0);

  const popularNews = useMemo(() => {
    return [...actualNewsAndTips]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(news => ({
        id: news.id,
        label: news.title,
        link: news.link,
        metadata: `${news.views?.toLocaleString()} views`,
      }));
  }, [actualNewsAndTips]);

  const newsCategories = useMemo(() => {
    const categories = new Set<string>();
    actualNewsAndTips.forEach(news => categories.add(news.category));
    return Array.from(categories).map((cat, index) => ({
      id: `cat-${index}`,
      label: cat,
      link: `/news-and-tips?category=${encodeURIComponent(cat)}`,
      metadata: `${actualNewsAndTips.filter(n => n.category === cat).length} artikel`,
    }));
  }, [actualNewsAndTips]);

  const featuredEvents = useMemo(() => {
    return dummyEvents.slice(0, 5);
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
          />
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-2">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="for-you" className="text-base">Untuk Anda</TabsTrigger>
              <TabsTrigger value="featured" className="text-base">Pilihan Editor</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you" className="space-y-6">
              {actualNewsAndTips.map((newsItem) => (
                <NewsListItem key={newsItem.id} {...newsItem} />
              ))}
            </TabsContent>
            <TabsContent value="featured" className="space-y-6">
              {featuredNews.map((newsItem) => (
                <NewsListItem key={newsItem.id} {...newsItem} />
              ))}
            </TabsContent>
          </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <NewsSidebarCard
            title="Berita Populer"
            items={popularNews}
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