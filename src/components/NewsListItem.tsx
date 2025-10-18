import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Eye, MessageSquare, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Import Card and CardContent

interface NewsListItemProps {
  id: string;
  title: string;
  description: string;
  date: string;
  link: string;
  imageUrl?: string;
  author?: string;
  authorAvatarUrl?: string;
  views?: number;
  comments?: number;
}

const NewsListItem: React.FC<NewsListItemProps> = ({
  id,
  title,
  description,
  date,
  link,
  imageUrl = "/placeholder.svg",
  author = "EduSprout Team",
  authorAvatarUrl = "https://api.dicebear.com/8.x/initials/svg?seed=ES",
  views = Math.floor(Math.random() * 10000) + 100,
  comments = Math.floor(Math.random() * 500) + 10,
}) => {
  return (
    <Card className="flex flex-col md:flex-row items-start gap-4 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {imageUrl && (
        <Link to={link} className="flex-shrink-0 w-full md:w-40 h-32 md:h-28 overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <CardContent className="flex-1 p-0 space-y-2">
        {/* Author Info */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={authorAvatarUrl} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{author}</span>
        </div>

        {/* Title */}
        <Link to={link} className="block">
          <h3 className="text-xl md:text-2xl font-bold leading-tight hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-3 text-sm md:text-base"> {/* Changed from line-clamp-2 to line-clamp-3 */}
          {description}
        </p>

        {/* Metadata and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <span className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" /> {date}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" /> {views.toLocaleString()}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" /> {comments.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsListItem;