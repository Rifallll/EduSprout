import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-4">Hubungi Kami</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui salah satu cara di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Mail className="h-6 w-6 text-primary" />
            <p className="text-lg">info@edusprout.com</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Phone className="h-6 w-6 text-primary" />
            <p className="text-lg">+62 812-3456-7890</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <MapPin className="h-6 w-6 text-primary" />
            <p className="text-lg">Jakarta, Indonesia</p>
          </div>
          <Link to="/" className="block mt-8">
            <Button size="lg">Kembali ke Beranda</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;