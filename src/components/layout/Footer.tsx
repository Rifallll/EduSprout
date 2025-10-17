import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer = () => {
  return (
    <footer className="border-t bg-background py-6 mt-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EduSprout. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary">
            Kebijakan Privasi
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary">
            Syarat & Ketentuan
          </a>
        </nav>
      </div>
      <MadeWithDyad />
    </footer>
  );
};

export default Footer;