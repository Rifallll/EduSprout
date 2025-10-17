"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const NewsletterSignup = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this email to your backend
      console.log("Email subscribed:", email);
      toast.success("Terima kasih telah berlangganan newsletter kami!");
      setEmail("");
    } else {
      toast.error("Mohon masukkan alamat email yang valid.");
    }
  };

  return (
    <section className="container py-16 text-center">
      <Card className="max-w-2xl mx-auto p-6 md:p-8 shadow-lg">
        <CardHeader>
          <Mail className="h-12 w-12 text-primary mb-4 mx-auto" />
          <CardTitle className="text-3xl font-bold mb-2">Dapatkan Update Terbaru!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Jangan lewatkan event, beasiswa, dan berita terbaru dari EduSprout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-4">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-grow p-3 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address for newsletter"
            />
            <Button type="submit" className="px-6 py-3 text-base">
              Berlangganan
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewsletterSignup;