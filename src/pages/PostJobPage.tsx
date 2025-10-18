import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import JobPostingForm from "@/components/JobPostingForm"; // Import the new form component

const PostJobPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Pasang Lowongan Kerja</CardTitle>
          <CardDescription>
            Isi detail lowongan kerja Anda untuk menjangkau ribuan pencari kerja.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobPostingForm /> {/* Render the new JobPostingForm component */}
          <div className="mt-6 text-center text-sm">
            Butuh bantuan?{" "}
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Hubungi Kami
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJobPage;