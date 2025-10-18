import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface NewsSidebarCardProps {
  title: string;
  items: {
    id: string;
    label: string;
    link: string;
    metadata?: string; // e.g., date, views, count
  }[];
  viewAllLink?: string;
}

const NewsSidebarCard: React.FC<NewsSidebarCardProps> = ({ title, items, viewAllLink }) => {
  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl"> {/* Added hover effect */}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Link to={item.link} key={item.id} className="block group p-2 -mx-2 rounded-md hover:bg-muted transition-colors duration-200"> {/* Added hover background */}
              <div className="flex flex-col">
                <p className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {item.label}
                </p>
                {item.metadata && (
                  <p className="text-xs text-muted-foreground mt-1">{item.metadata}</p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">Tidak ada item yang tersedia.</p>
        )}
        {viewAllLink && (
          <div className="pt-4 border-t border-border mt-4">
            <Link to={viewAllLink} className="inline-flex items-center text-primary hover:underline text-sm font-medium">
              Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsSidebarCard;