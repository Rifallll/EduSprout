import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Eye, MessageSquare, ArrowLeft, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin, Whatsapp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import NewsListItem from "@/components/NewsListItem"; // Re-use NewsListItem for related news
import scrapedNewsAndTips from "@/data/scrapedNewsAndTips.json";
import { calculateReadingTime } from "@/utils/readingTime"; // Import the utility function

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
  tags?: string[]; // Added for future use
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

  const contentToDisplay = news.fullContent || news.description;
  const readingTime = calculateReadingTime(contentToDisplay);

  // Filter for related news (excluding the current news)
  const relatedNews = scrapedNewsAndTips.filter(n => n.id !== news.id).slice(0, 5); // Get up to 5 related news

  const currentUrl = window.location.href;
  const shareText = `Baca artikel menarik ini: ${news.title}`;

  return (
    <div className="container py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/news-and-tips" className="hover:underline">Berita & Tips</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground line-clamp-1">{news.title}</span>
      </nav>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200">
              {news.category}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Simpan Artikel</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Bagikan Artikel</span>
              </Button>
            </div>
          </div>

          <CardTitle className="text-4xl font-bold mb-4 leading-tight">{news.title}</CardTitle>
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
              <Clock className="h-4 w-4 mr-1" /> {readingTime}
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

          <Separator />

          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="text-lg font-semibold text-foreground">Bagikan:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="hover:bg-blue-600 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </Button>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="hover:bg-blue-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </Button>
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="hover:bg-blue-700 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="hover:bg-green-500 hover:text-white transition-colors duration-200">
                <Whatsapp className="h-5 w-5" />
              </Button>
            </a>
          </div>

          <Separator />

          {/* Comments Section Placeholder */}
          <div className="py-6">
            <h3 className="text-2xl font-bold mb-4">Komentar ({news.comments?.toLocaleString() || '0'})</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Bagian komentar akan segera hadir! Anda dapat meninggalkan komentar dan berinteraksi dengan pembaca lain di sini.
              </p>
              {/* Placeholder for comment input */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://api.dicebear.com/8.x/initials/svg?seed=Guest" alt="Guest" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[80px]"
                    placeholder="Tulis komentar Anda..."
                  ></textarea>
                  <Button className="mt-2">Kirim Komentar</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related News Section (Carousel) */}
      {relatedNews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Berita Serupa</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {relatedNews.map((relatedNewsItem) => (
                <CarouselItem key={relatedNewsItem.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <NewsListItem
                    key={relatedNewsItem.id}
                    id={relatedNewsItem.id}
                    title={relatedNewsItem.title}
                    description={relatedNewsItem.description}
                    date={relatedNewsItem.date}
                    link={relatedNewsItem.link}
                    imageUrl={relatedNewsItem.imageUrl}
                    author={relatedNewsItem.author}
                    authorAvatarUrl={relatedNewsItem.authorAvatarUrl}
                    views={relatedNewsItem.views}
                    comments={relatedNewsItem.comments}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      )}
    </div>
  );
};

export default NewsDetailPage;