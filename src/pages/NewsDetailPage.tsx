import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Eye, MessageSquare, ArrowLeft, Clock, Facebook, Twitter, Linkedin, Phone } from "lucide-react";
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
  const relatedNews = scrapedNewsAndTips.filter(n => n.id !== news.id).slice(0, 5); // Get up to 5 related jobs

  const currentUrl = window.location.href;
  const shareText = `Baca artikel menarik ini: ${news.title}`;

  return (
    <div className="container py-16"> {/* Increased vertical padding */}
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8"> {/* Increased bottom margin */}
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/news-and-tips" className="hover:underline">Berita & Tips</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground line-clamp-1">{news.title}</span>
      </nav>

      <Card className="shadow-lg border border-border rounded-lg"> {/* Added border and rounded-lg */}
        <CardHeader className="pb-6 px-6 pt-6"> {/* Adjusted padding */}
          <div className="flex items-center justify-between mb-4"> {/* Increased bottom margin */}
            <Badge className="bg-primary/10 text-primary font-semibold text-sm px-3 py-1 hover:bg-primary/20 transition-colors duration-200"> {/* Enhanced badge styling */}
              {news.category}
            </Badge>            
          </div>

          <CardTitle className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-foreground">{news.title}</CardTitle> {/* Larger, bolder title */}
          <CardDescription className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-base"> {/* Increased gap */}
            <div className="flex items-center text-sm font-medium text-foreground"> {/* Author info more prominent */}
              <Avatar className="h-7 w-7 mr-2"> {/* Larger avatar */}
                <AvatarImage src={news.authorAvatarUrl || "https://api.dicebear.com/8.x/initials/svg?seed=ES"} alt={news.author || "EduSprout Team"} />
                <AvatarFallback>{(news.author || "ES").charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{news.author || "EduSprout Team"}</span>
            </div>
            <span className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" /> {news.date}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" /> {readingTime}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" /> {news.views?.toLocaleString() || '0'} views
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" /> {news.comments?.toLocaleString() || '0'} comments
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6"> {/* Increased spacing and padding */}
          {news.imageUrl && (
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-6 shadow-md" // Slightly larger max-height, added shadow
            />
          )}

          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-foreground"> {/* Larger text, better line height */}
            {contentToDisplay.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph.trim()}</p>
            ))}
            <p className="mt-8 text-muted-foreground italic text-base"> {/* Adjusted margin and text size */}
              Untuk informasi lebih lanjut, silakan kunjungi sumber asli.
            </p>
          </div>

          <Separator className="my-8" /> {/* Increased margin for separator */}

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
            <span className="text-lg font-semibold text-foreground mb-2 sm:mb-0">Bagikan:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-blue-600 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </Button>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-blue-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </Button>
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-blue-700 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-10 w-10 hover:bg-green-500 hover:text-white transition-colors duration-200">
                <Phone className="h-5 w-5" />
              </Button>
            </a>
          </div>

          <Separator className="my-8" /> {/* Increased margin for separator */}

          {/* Comments Section Placeholder */}
          <div className="py-6">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Komentar ({news.comments?.toLocaleString() || '0'})</h3> {/* Bolder, more space */}
            <div className="space-y-6"> {/* Increased spacing */}
              <p className="text-muted-foreground text-base">
                Bagian komentar akan segera hadir! Anda dapat meninggalkan komentar dan berinteraksi dengan pembaca lain di sini.
              </p>
              {/* Placeholder for comment input */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12"> {/* Larger avatar */}
                  <AvatarImage src="https://api.dicebear.com/8.x/initials/svg?seed=Guest" alt="Guest" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    className="w-full p-4 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[100px] text-base bg-background text-foreground placeholder:text-muted-foreground" // Enhanced styling
                    placeholder="Tulis komentar Anda..."
                  ></textarea>
                  <Button className="mt-3 px-6 py-3 text-base">Kirim Komentar</Button> {/* Larger button */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related News Section (Carousel) */}
      {relatedNews.length > 0 && (
        <section className="mt-20"> {/* Increased top margin */}
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left text-foreground">Berita Serupa</h2>
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