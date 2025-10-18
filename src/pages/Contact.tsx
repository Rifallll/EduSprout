import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, MapPin } from "lucide-react"; // Import icons
import MapDisplay from "@/components/MapDisplay"; // Import the new MapDisplay component

const Contact = () => {
  const apiKey = "6c0118d493cb46b99027c584cc5111c9"; // Your Geoapify API Key
  const address = "Garden City 2, Cipagalo, Bojongsoang, Kabupaten Bandung, Jawa Barat, Indonesia";

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Hubungi Kami</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Kami senang mendengar dari Anda! Kirimkan pesan atau pertanyaan Anda.
      </p>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Kontak</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Nama Anda" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subjek</Label>
                <Input id="subject" placeholder="Subjek pesan Anda" />
              </div>
              <div>
                <Label htmlFor="message">Pesan</Label>
                <Textarea id="message" placeholder="Tulis pesan Anda di sini..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Kirim Pesan</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Informasi Kontak Lainnya</h2>
        <p className="text-muted-foreground">Email: info@edusprout.com</p>
        <p className="text-muted-foreground">Telepon: (123) 456-7890</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground transition-colors">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground transition-colors">
            <Twitter size={24} />
          </a>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Lokasi Kami</h3>
          <p className="text-muted-foreground mb-4">{address}</p>
          <MapDisplay address={address} apiKey={apiKey} />
        </div>
      </div>
    </div>
  );
};

export default Contact;