import React from "react";

const Jobs = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Info Lowongan & Karir</h1>
      <p className="text-lg text-center text-muted-foreground">
        Dapatkan informasi lowongan pekerjaan dan peluang karir terbaru.
      </p>
      {/* Placeholder for job list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-muted rounded w-full mb-2"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;