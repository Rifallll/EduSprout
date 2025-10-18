import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Import icons
import MapDisplay from "@/components/MapDisplay"; // Import MapDisplay component

const Contact = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const address = "Garden City 2, Cipagalo, Bojongsoang, Kabupaten Bandung, Jawa Barat, Indonesia";
  // API Key Geoapify Anda
  const apiKey = "6c0118d493cb46b99027c584cc5111c9"; 

  useEffect(() => {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(result => {
        if (result.features && result.features.length > 0) {
          const location = result.features[0].properties;
          setLatitude(location.lat);
          setLongitude(location.lon);
        } else {
          console.error("Tidak dapat menemukan koordinat untuk alamat yang diberikan.");
        }
      })
      .catch(error => console.error("Error fetching geocoding data:", error));
  }, [address, apiKey]);

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
      </div>

      {/* Lokasi Kami Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Lokasi Kami</h2>
        <p className="text-muted-foreground text-center mb-6">{address}</p>
        {latitude !== null && longitude !== null ? (
          <MapDisplay latitude={latitude} longitude={longitude} address={address} />
        ) : (
          <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg text-muted-foreground">
            Memuat peta...
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;