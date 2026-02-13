import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, CalendarDays, MapPin, ArrowRight, Wallet, GraduationCap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks, BookmarkedItem } from "@/context/BookmarkContext";

interface ScholarshipListItemProps {
  id: string;
  title: string;
  organizer?: string;
  location?: string;
  startDate?: string;
  deadline: string;
  link: string;
  degreeLevels?: string[];
  fundingType?: string;
}

const ScholarshipListItem: React.FC<ScholarshipListItemProps> = ({
  id,
  title,
  organizer,
  location,
  startDate,
  deadline,
  link,
  degreeLevels,
  fundingType,
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const isSaved = isBookmarked(id, 'scholarship');

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const item: BookmarkedItem = {
      id,
      type: 'scholarship',
      title,
      subtitle: organizer,
      location,
      link,
      date: deadline,
      data: {
        id, title, organizer, location, startDate, deadline, link, degreeLevels, fundingType
      }
    };

    toggleBookmark(item);
  };

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden border-white/5 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:border-violet-500/30 hover:-translate-y-1 rounded-2xl">
      {/* Decorative gradient blob */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-all group-hover:bg-violet-500/20"></div>

      <CardHeader className="p-6 pb-2 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {fundingType && (
              <Badge variant="secondary" className="bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Wallet className="w-3 h-3 mr-1.5" />
                {fundingType}
              </Badge>
            )}
            {degreeLevels && degreeLevels.map((level, index) => (
              <Badge key={index} variant="outline" className="border-white/10 text-zinc-400 px-2.5 py-1 text-xs bg-white/5">
                {level}
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full hover:bg-violet-400/10 -mr-2 ${isSaved ? 'text-violet-400' : 'text-zinc-400 hover:text-violet-400'}`}
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <a href={link} target="_blank" rel="noopener noreferrer" className="group/title block">
          <h3 className="text-xl font-bold leading-tight text-white mb-2 group-hover/title:text-violet-300 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </a>

        {organizer && (
          <div className="flex items-center text-sm text-zinc-400 font-medium">
            <GraduationCap className="h-4 w-4 mr-2 text-violet-400/70" />
            <span className="truncate">{organizer}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow px-6 py-2 relative z-10">
        <div className="grid grid-cols-1 gap-y-2 mt-2">
          {location && (
            <div className="flex items-center text-sm text-zinc-500">
              <Globe className="h-4 w-4 mr-2 text-zinc-600 group-hover:text-violet-500/50 transition-colors" />
              <span>{location}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-zinc-500">
            <CalendarDays className="h-4 w-4 mr-2 text-zinc-600 group-hover:text-violet-500/50 transition-colors" />
            <span>Deadline: <span className="text-zinc-300 font-medium">{deadline || "Segera"}</span></span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-4 relative z-10">
        <a href={link} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-white text-black hover:bg-violet-400 hover:text-white border-none font-bold transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-violet-500/25">
            Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipListItem;