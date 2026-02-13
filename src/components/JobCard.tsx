import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, CalendarDays, ArrowRight, Briefcase, GraduationCap, Zap, CheckCircle, Star } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company?: string;
  location?: string;
  source: string;
  date_posted?: string;
  link: string; // This link will be for the internal detail page
  salaryRange?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  isPremium?: boolean;
  isHot?: boolean;
  isActiveRecruiting?: boolean;
  companyLogoUrl?: string; // Optional: for company logo
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  source,
  date_posted,
  link,
  salaryRange,
  experience,
  education,
  skills,
  isPremium,
  isHot,
  isActiveRecruiting,
  companyLogoUrl,
}) => {
  return (
    <Card className="group flex flex-col h-full glass border-white/5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:-translate-y-1 hover:border-violet-400/30 bg-transparent">
      <CardHeader className="pb-2 px-6 pt-6">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-bold leading-tight line-clamp-2 text-white group-hover:text-violet-400 transition-colors duration-200">{title}</CardTitle>
          {salaryRange && (
            <Badge className="bg-white/5 text-violet-300 border-violet-400/20 font-semibold whitespace-nowrap px-3 py-1">
              {salaryRange}
            </Badge>
          )}
        </div>

        {/* Badges for Experience, Education, Skills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {experience && <Badge variant="secondary" className="bg-muted text-muted-foreground">{experience}</Badge>}
          {education && <Badge variant="secondary" className="bg-muted text-muted-foreground">{education}</Badge>}
          {skills && skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">{skill}</Badge>
          ))}
        </div>

        {/* Company, Location, Date Posted */}
        <div className="space-y-1 text-sm text-muted-foreground">
          {company && (
            <div className="flex items-center">
              {companyLogoUrl && <img src={companyLogoUrl} alt={company} className="h-5 w-5 mr-2 rounded-sm object-contain" />}
              {!companyLogoUrl && <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />}
              <span>{company}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
          {date_posted && (
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{date_posted}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-4 px-6 flex flex-wrap gap-2 items-center"> {/* Adjusted padding */}
        {/* Source Badge */}
        <Badge variant="secondary" className="capitalize bg-muted text-muted-foreground">
          {source.replace(/-/g, " ")} {/* Format source name */}
        </Badge>

        {/* Status Badges */}
        {isPremium && <Badge className="bg-yellow-500 text-white hover:bg-yellow-600"><Star className="h-3 w-3 mr-1" /> Premium</Badge>}
        {isHot && (
          <Badge className="bg-red-500 text-white hover:bg-red-600">
            <Zap className="h-3 w-3 mr-1" /> HOT
          </Badge>
        )}
        {isActiveRecruiting && (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Aktif Merekrut
          </Badge>
        )}
      </CardContent>

      <CardFooter className="pt-0 px-6 pb-6"> {/* Adjusted padding */}
        <Link to={link} className="w-full">
          <Button variant="secondary" className="w-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground"> {/* Changed to variant="secondary" and adjusted hover */}
            Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;