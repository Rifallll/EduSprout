import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const JobLocationsPage = () => {
  const popularLocations = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Medan", "Semarang", "Denpasar", "Makassar"];

  return (
    <div className="container py-16 text-center">
      <Card className="max-w-3xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Lokasi Pekerjaan</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Jelajahi lowongan kerja berdasarkan lokasi di seluruh Indonesia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-foreground">
            Temukan peluang karir di kota-kota besar maupun daerah lainnya.
            Pilih lokasi favorit Anda untuk memulai pencarian.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            {popularLocations.map((location) => (
              <Link key={location} to={`/jobs?location=${encodeURIComponent(location)}`}>
                <Button variant="outline" className="w-full">
                  {location}
                </Button>
              </Link>
            ))}
          </div>
          <Link to="/jobs" className="block mt-8">
            <Button size="lg">Lihat Semua Lowongan</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobLocationsPage;