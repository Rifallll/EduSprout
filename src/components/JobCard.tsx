import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, CalendarDays, ArrowRight } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company?: string;
  location?: string;
  source: string;
  date_posted?: string;
  link: string; // This link will be for the internal detail page
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  source,
  date_posted,
  link,
}) => {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex-grow pb-2">
        <CardTitle className="text-xl font-bold line-clamp-2 mb-2">{title}</CardTitle>
        <CardDescription className="space-y-1">
          {company && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{company}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
          {date_posted && (
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{date_posted}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <Badge variant="secondary" className="capitalize">
          {source.replace(/-/g, " ")} {/* Format source name */}
        </Badge>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={link} className="w-full">
          <Button variant="outline" className="w-full">
            Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;