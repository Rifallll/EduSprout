// src/utils/scholarshipUtils.ts

interface RawScholarshipItem {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., "Lokal", "Internasional"
  date: string; // This will be the deadline
  link: string;
  location?: string; // Country or city
  source?: string; // e.g., "manual", "beasiswa.id"
  fullContent?: string; // Detailed content (if available)
  organizer?: string; // Institution/Company offering the scholarship
}

export interface EnrichedScholarshipItem extends RawScholarshipItem {
  degreeLevels: string[]; // e.g., ["SMA", "S1", "S2"]
  fundingType?: string; // e.g., "Fully Funded", "Partially Funded"
  institution?: string; // Extracted institution name
  month?: string; // Month of the deadline
}

const degreeKeywords: { [key: string]: string[] } = {
  "SMP": ["smp", "mts", "kelas 7", "kelas 8", "kelas 9"],
  "SMA": ["sma", "smk", "sederajat", "kelas 10", "kelas 11", "kelas 12"],
  "D2": ["d2", "diploma 2"],
  "D3": ["d3", "diploma 3"],
  "D4": ["d4", "diploma 4"],
  "S1": ["s1", "sarjana", "undergraduate"],
  "S2": ["s2", "magister", "pascasarjana"],
  "S3": ["s3", "doktoral", "pascasarjana"],
  "Non-Degree": ["non-degree", "kursus", "pelatihan singkat"],
  "Gap Year": ["gap year"],
  "Profesi": ["profesi", "guru", "dokter", "akuntan"], // Example, can be expanded
};

const fundingKeywords: { [key: string]: string[] } = {
  "Fully Funded": ["full funded", "fully funded", "dibiayai penuh", "beasiswa penuh", "100%"],
  "Partially Funded": ["partially funded", "sebagian", "potongan biaya", "bantuan dana"],
  "Mentoring": ["mentoring", "pembinaan", "bimbingan"],
  "Riset": ["riset", "penelitian"],
  "Exchange": ["exchange", "pertukaran pelajar"],
  "Pelatihan/Studi Singkat": ["pelatihan", "studi singkat", "kursus", "program singkat"],
  "Self Funded": ["self funded", "dana mandiri"],
  "Pendanaan Project": ["pendanaan proyek", "dana proyek"],
  "Internship": ["magang", "internship"],
};

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const enrichScholarshipData = (scholarship: RawScholarshipItem): EnrichedScholarshipItem => {
  const text = (scholarship.title + " " + scholarship.description + " " + (scholarship.fullContent || "")).toLowerCase();
  const enriched: EnrichedScholarshipItem = {
    ...scholarship,
    degreeLevels: [],
    institution: scholarship.organizer || "", // Use organizer if available
  };

  // Infer Degree Levels
  for (const level in degreeKeywords) {
    if (degreeKeywords[level].some(keyword => text.includes(keyword))) {
      enriched.degreeLevels.push(level);
    }
  }
  // If no specific degree level found, try to infer from category
  if (enriched.degreeLevels.length === 0) {
    if (scholarship.category === "Lokal" || scholarship.category === "Internasional") {
      // Default to S1 if no specific level is mentioned for general scholarships
      enriched.degreeLevels.push("S1");
    }
  }
  // Ensure unique degree levels
  enriched.degreeLevels = Array.from(new Set(enriched.degreeLevels));


  // Infer Funding Type
  for (const type in fundingKeywords) {
    if (fundingKeywords[type].some(keyword => text.includes(keyword))) {
      enriched.fundingType = type;
      break; // Take the first match
    }
  }

  // Infer Institution (if not already set by organizer)
  if (!enriched.institution) {
    // Simple heuristic: look for "Universitas X", "PT Y", "Yayasan Z" in title/description
    const institutionMatch = text.match(/(universitas|pt|yayasan|institute|college)\s+([a-z0-9\s&]+)/);
    if (institutionMatch && institutionMatch[2]) {
      enriched.institution = institutionMatch[1].charAt(0).toUpperCase() + institutionMatch[1].slice(1) + " " + institutionMatch[2].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  }

  // Infer Month from deadline
  try {
    const dateMatch = scholarship.date.match(/(\d{1,2})\s*(\w+)\s*(\d{4})/i); // "DD Month YYYY"
    if (dateMatch) {
      const monthName = dateMatch[2].toLowerCase();
      const monthIndex = monthNames.findIndex(name => name.toLowerCase().includes(monthName));
      if (monthIndex !== -1) {
        enriched.month = monthNames[monthIndex];
      }
    } else {
      // Try parsing as YYYY-MM-DD
      const dateObj = new Date(scholarship.date);
      if (!isNaN(dateObj.getTime())) {
        enriched.month = monthNames[dateObj.getMonth()];
      }
    }
  } catch (e) {
    console.warn("Could not parse date for month extraction:", scholarship.date, e);
  }


  return enriched;
};