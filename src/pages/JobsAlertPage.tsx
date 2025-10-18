import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BellRing } from "lucide-react";

const JobsAlertPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <BellRing className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Jobs Alert</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Dapatkan notifikasi lowongan kerja terbaru langsung ke email Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-foreground">
            Daftar untuk Jobs Alert kami dan jangan lewatkan peluang karir impian Anda!
            Kami akan mengirimkan lowongan yang sesuai dengan preferensi Anda.
          </p>
          {/* Placeholder for a subscription form */}
          <div className="flex flex-col items-center space-y-4">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="w-full max-w-sm p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="w-full max-w-sm">Aktifkan Jobs Alert</Button>
          </div>
          <Link to="/jobs" className="block mt-4">
            <Button variant="outline">Lihat Lowongan Lain</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsAlertPage;