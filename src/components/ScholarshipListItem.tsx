import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

interface ScholarshipListItemProps {
  id: string;
  title: string;
  organizer?: string; // Institution/Company
  location?: string; // Country/City
  startDate?: string; // "Mulai"
  deadline: string; // "Deadline"
  link: string; // External link to the scholarship website (now used in detail page)
  degreeLevels?: string[]; // e.g., ["SMA", "S1", "S2"]
  fundingType?: string; // e.g., "Fully Funded"
}

const ScholarshipListItem: React.FC<ScholarshipListItemProps> = ({
  id,
  title,
  organizer,
  location,
  startDate,
  deadline,
  link, // Keep link prop for passing to detail page
  degreeLevels,
  fundingType,
}) => {
  return (
    <Card className="flex flex-col p-4 rounded-lg shadow-sm border border-border transition-all duration-200 hover:shadow-md hover:border-primary/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-wrap gap-1">
          {degreeLevels && degreeLevels.map((level, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary font-medium px-2 py-0.5 text-xs">
              {level}
            </Badge>
          ))}
          {fundingType && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 text-xs">
              {fundingType}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
      {/* Link to the internal ScholarshipDetailPage */}
      <Link to={`/scholarships/${id}`} className="block flex-grow">
        <h3 className="text-lg font-semibold leading-snug text-foreground hover:text-primary transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        {organizer && <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{organizer}</p>}
        {location && (
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}
      </Link>
      <CardContent className="flex flex-col space-y-1 text-xs text-muted-foreground p-0 pt-3 mt-3 border-t border-border">
        {startDate && (
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>Mulai: {startDate}</span>
          </div>
        )}
        {/* Deadline is now displayed on the detail page */}
      </CardContent>
    </Card>
  );
};

export default ScholarshipListItem;