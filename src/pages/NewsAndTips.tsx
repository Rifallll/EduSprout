import React from "react";
import NewsCard from "@/components/NewsCard";
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json"; // Import the scraped data

const NewsAndTips = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Berita & Tips EduSprout</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Dapatkan informasi terbaru, panduan, dan tips untuk mendukung perjalanan pendidikan dan karir Anda.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {scrapedNewsAndTips.map((newsItem) => (
          <NewsCard key={newsItem.id} {...newsItem} />
        ))}
      </div>
    </div>
  );
};

export default NewsAndTips;