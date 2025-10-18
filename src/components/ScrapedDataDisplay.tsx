import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ScrapedDataItem {
  id: number;
  title: string;
  source: string;
  url: string;
  date: string;
}

interface ScrapedDataDisplayProps {
  data: ScrapedDataItem[];
  title: string;
  description: string;
}

const ScrapedDataDisplay: React.FC<ScrapedDataDisplayProps> = ({ data, title, description }) => {
  return (
    <section className="container py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">{title}</h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <Card key={item.id} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl font-semibold line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-2">
                Sumber: {item.source} - Tanggal: {item.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-center p-6 pt-0">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Baca Selengkapnya</Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ScrapedDataDisplay;