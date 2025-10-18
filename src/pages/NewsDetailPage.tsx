import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Eye, MessageSquare, ArrowLeft } from "lucide-react";
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  link: string;
  imageUrl?: string;
  author?: string;
  authorAvatarUrl?: string;
  views?: number;
  comments?: number;
  fullContent?: string; // Added for more detailed content
}

const NewsDetailPage = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const news: NewsItem | undefined = scrapedNewsAndTips.find((n) => n.link.endsWith(newsId || ''));

  if (!news) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">
          Maaf, artikel berita yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/news-and-tips">
          <Button>Kembali ke Berita & Tips</Button>
        </Link>
      </div>
    );
  }

  // For demonstration, using description as fullContent if fullContent is not available
  const contentToDisplay = news.fullContent || news.description;

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/news-and-tips" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Berita & Tips
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-4xl font-bold mb-4">{news.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-base">
            <div className="flex items-center text-sm text-muted-foreground">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={news.authorAvatarUrl || "https://api.dicebear.com/8.x/initials/svg?seed=ES"} alt={news.author || "EduSprout Team"} />
                <AvatarFallback>{(news.author || "ES").charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{news.author || "EduSprout Team"}</span>
            </div>
            <span className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" /> {news.date}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" /> {news.views?.toLocaleString() || '0'} views
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" /> {news.comments?.toLocaleString() || '0'} comments
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {news.imageUrl && (
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-6"
            />
          )}

          <div className="prose dark:prose-invert max-w-none">
            {contentToDisplay.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph.trim()}</p>
            ))}
            {/* Add more detailed content here if available in your data */}
            <p className="mt-6 text-muted-foreground italic">
              Untuk informasi lebih lanjut, silakan kunjungi sumber asli.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsDetailPage;