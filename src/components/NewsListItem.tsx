import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Eye, MessageSquare, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  authorAvatarUrl = "https://api.dicebear.com/8.x/initials/svg?seed=ES", // Default avatar if not provided
  views = Math.floor(Math.random() * 10000) + 100, // Dummy views if not provided
  comments = Math.floor(Math.random() * 500) + 10, // Dummy comments if not provided
}) => {
  return (
    <div className="flex items-start justify-between gap-4 py-6 border-b border-border last:border-b-0">
      <div className="flex-1 space-y-2">
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
          <h3 className="text-xl md:text-2xl font-bold leading-tight hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-2 text-sm md:text-base">
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
      </div>

      {/* Image Thumbnail */}
      {imageUrl && (
        <Link to={link} className="flex-shrink-0 ml-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-32 h-24 md:w-40 md:h-28 object-cover rounded-md"
          />
        </Link>
      )}
    </div>
  );
};

export default NewsListItem;