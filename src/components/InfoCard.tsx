import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface InfoCardProps {
  title: string;
  description: string;
  category: string;
  date?: string;
  location?: string;
  link: string;
  linkText?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  category,
  date,
  location,
  link,
  linkText = "Lihat Detail",
}) => {
  return (
    <Card className="flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {/* Menampilkan kategori sebagai teks biasa */}
          <span className="text-sm text-muted-foreground">{category}</span>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-gray-600 dark:text-gray-400">
        {/* Menampilkan tanggal dan lokasi tanpa label */}
        {date && <p className="mb-1">{date}</p>}
        {location && <p>{location}</p>}
      </CardContent>
      <CardFooter>
        <Link to={link} className="w-full">
          <Button className="w-full">{linkText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InfoCard;