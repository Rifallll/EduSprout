import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Eye, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
}) => {
  return (
    <Card className="flex flex-col md:flex-row h-full min-h-[380px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"> {/* Added min-h for consistent card height */}
      {imageUrl && (
        <Link to={link} className="flex-shrink-0 w-full h-48 md:w-56 md:h-full overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none"> {/* Adjusted image sizing and border radius for responsiveness */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <CardContent className="flex-1 p-4 space-y-2 flex flex-col justify-between"> {/* Added flex-col justify-between to push metadata to bottom */}
        <div> {/* Group top content */}
          {/* Author Info */}
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={authorAvatarUrl} alt={author} />
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">{author}</span>
          </div>

          {/* Title */}
          <Link to={link} className="block">
            <h3 className="text-xl md:text-2xl font-bold leading-tight hover:text-primary transition-colors duration-200 line-clamp-3">
              {title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-muted-foreground line-clamp-4 text-sm md:text-base mt-2">
            {description}
          </p>
        </div>

        {/* Metadata and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <span className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" /> {date}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" /> 0
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" /> 0
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsListItem;