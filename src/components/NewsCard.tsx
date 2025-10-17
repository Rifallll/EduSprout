import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  link: string;
  imageUrl?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  category,
  date,
  link,
  imageUrl = "/placeholder.svg", // Default placeholder image
}) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold line-clamp-2">{title}</CardTitle>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            {category}
          </span>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 pt-0">
        <p>{date}</p>
        <Link to={link}>
          <Button variant="link" className="p-0 h-auto">Baca Selengkapnya &rarr;</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;