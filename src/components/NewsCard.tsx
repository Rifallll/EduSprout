import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For author avatar
import { CalendarDays, Eye, MessageSquare, Bookmark, MoreHorizontal, FileText } from "lucide-react"; // New icons

interface NewsCardProps {
  title: string;
  description: string;
  date: string;
  link: string;
  imageUrl?: string; // This will now be the small icon/thumbnail
  author?: string;
  authorAvatarUrl?: string;
  views?: number; // Keep prop for type safety, but will display 0
  comments?: number; // Keep prop for type safety, but will display 0
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  date,
  link,
  imageUrl, // Now used for the small icon/thumbnail
  author = "EduSprout Team",
  authorAvatarUrl = "https://api.dicebear.com/8.x/initials/svg?seed=ES",
  // Removed default random generation for views and comments
}) => {
  return (
    <Card className="flex flex-col h-full min-h-[320px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-4"> {/* Added min-h for consistent card height, added padding to card */}
      <CardHeader className="flex-grow p-0 mb-4"> {/* Adjusted padding and margin */}
        <div className="flex items-center mb-4"> {/* Container for small icon and author */}
          {imageUrl ? (
            <img src={imageUrl} alt="News Icon" className="w-8 h-8 object-cover rounded-md mr-3" /> // Small image
          ) : (
            <FileText className="w-8 h-8 text-primary mr-3" /> // Placeholder icon
          )}
          <Avatar className="h-7 w-7 mr-2"> {/* Author Avatar */}
            <AvatarImage src={authorAvatarUrl} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{author}</span>
        </div>

        <Link to={link} className="block">
          <CardTitle className="text-xl font-bold leading-tight line-clamp-3 mb-2 hover:text-primary transition-colors duration-200">
            {title}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground line-clamp-4">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 p-0 pt-4 border-t border-border mt-auto"> {/* Adjusted padding, added border-top */}
        <div className="flex items-center space-x-3">
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
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;