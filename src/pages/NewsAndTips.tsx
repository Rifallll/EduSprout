import React, { useState } from "react";
import NewsListItem from "@/components/NewsListItem"; // Import the new component
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json"; // Import the scraped data
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components

const NewsAndTips = () => {
  // For demonstration, let's assume "Featured" shows a subset or different ordering
  const featuredNews = scrapedNewsAndTips.filter((_, index) => index % 2 === 0); // Example: every other news item

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Berita & Tips Edukasi</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Dapatkan informasi terbaru, panduan, dan tips untuk mendukung perjalanan pendidikan dan karir Anda.
      </p>

      <Tabs defaultValue="for-you" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="for-you">Untuk Anda</TabsTrigger>
          <TabsTrigger value="featured">Pilihan Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          <div className="space-y-6"> {/* Changed to space-y for vertical list spacing */}
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
    </div>
  );
};

export default NewsAndTips;