"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Briefcase } from "lucide-react";

// Define the schema for job posting form
const jobPostingSchema = z.object({
  jobTitle: z.string().min(5, "Judul lowongan minimal 5 karakter."),
  companyName: z.string().min(3, "Nama perusahaan minimal 3 karakter."),
  location: z.string().min(2, "Lokasi minimal 2 karakter."),
  salaryRange: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(), // comma-separated string
  jobType: z.array(z.string()).optional(),
  workPolicy: z.array(z.string()).optional(),
  descriptionDetail: z.string().min(50, "Deskripsi pekerjaan minimal 50 karakter."),
  companyDescription: z.string().min(50, "Deskripsi perusahaan minimal 50 karakter.").optional().or(z.literal('')),
  companyIndustry: z.string().optional(),
  companySize: z.string().optional(),
  companyLogoUrl: z.string().url("URL logo perusahaan tidak valid.").optional().or(z.literal('')),
});

type JobPostingFormValues = z.infer<typeof jobPostingSchema>;

const experienceOptions = [
  "0-1 tahun", "1-3 tahun", "3-5 tahun", "5+ tahun", "Tidak ada pengalaman"
];
const educationOptions = [
  "Minimal SMA/SMK", "Minimal Diploma", "Minimal Sarjana (S1)", "Minimal Magister (S2)", "Tidak wajib"
];
const jobTypeOptions = [
  "Penuh Waktu", "Kontrak", "Magang", "Paruh Waktu", "Freelance", "Harian"
];
const workPolicyOptions = [
  "Kerja di kantor", "Kerja di kantor / rumah", "Kerja Remote/dari rumah"
];

const JobPostingForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      location: "",
      salaryRange: "",
      experience: "",
      education: "",
      skills: "",
      jobType: [],
      workPolicy: [],
      descriptionDetail: "",
      companyDescription: "",
      companyIndustry: "",
      companySize: "",
      companyLogoUrl: "",
    },
  });

  const onSubmit = (values: JobPostingFormValues) => {
    setIsLoading(true);
    console.log("Form submitted with values:", values);

    // Simulate API call
    setTimeout(() => {
      // Generate a unique ID for the new job
      const newJobId = `user_posted_${Date.now()}`;
      const datePosted = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      const newJob = {
        id: newJobId,
        source: "user-posted", // Custom source for user-posted jobs
        title: values.jobTitle,
        company: values.companyName,
        location: values.location,
        link: `/jobs/${newJobId}`, // Link to its own detail page
        date_posted: datePosted,
        salaryRange: values.salaryRange || "Negosiasi",
        experience: values.experience || "Tidak disebutkan",
        education: values.education || "Tidak disebutkan",
        skills: values.skills ? values.skills.split(',').map(s => s.trim()) : [],
        isPremium: false, // Default to false for user-posted
        isHot: false,     // Default to false for user-posted
        isActiveRecruiting: true, // Assume active
        jobType: values.jobType?.join(', ') || "Penuh Waktu", // Join array to string for display
        workPolicy: values.workPolicy?.join(', ') || "Kerja di kantor", // Join array to string for display
        descriptionDetail: values.descriptionDetail,
        companyDescription: values.companyDescription,
        companyIndustry: values.companyIndustry,
        companySize: values.companySize,
        companyLogoUrl: values.companyLogoUrl,
        applicationQuestions: [
          { question: "Mengapa Anda tertarik dengan posisi ini?", type: "text" },
          { question: "Apa yang Anda ketahui tentang perusahaan kami?", type: "text" },
        ],
        salaryMatch: "N/A",
        applicantCount: "0",
        skillMatch: "N/A",
      };

      // Retrieve existing jobs from localStorage or initialize an empty array
      const existingPostedJobs = JSON.parse(localStorage.getItem("userPostedJobs") || "[]");
      existingPostedJobs.push(newJob);
      localStorage.setItem("userPostedJobs", JSON.stringify(existingPostedJobs));

      toast.success("Lowongan kerja berhasil diposting!");
      setIsLoading(false);
      navigate("/jobs"); // Redirect to jobs page to see the new listing
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Lowongan</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Software Engineer" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                Judul yang jelas dan menarik akan menarik lebih banyak pelamar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Perusahaan</FormLabel>
              <FormControl>
                <Input placeholder="PT EduSprout Indonesia" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lokasi</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Jakarta, Remote" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                Sertakan kota, provinsi, atau 'Remote' jika pekerjaan bisa dilakukan dari mana saja.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="salaryRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rentang Gaji (Opsional)</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Rp 5jt - 8jt" {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  Berikan perkiraan rentang gaji.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengalaman yang Dibutuhkan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat pengalaman" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pendidikan Minimal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pendidikan minimal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterampilan (Pisahkan dengan koma)</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: React, Node.js, SQL" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                Sebutkan keterampilan kunci yang dibutuhkan untuk posisi ini.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="jobType"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Tipe Pekerjaan</FormLabel>
                  <FormDescription>
                    Pilih tipe pekerjaan yang sesuai.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {jobTypeOptions.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="jobType"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workPolicy"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Kebijakan Kerja</FormLabel>
                  <FormDescription>
                    Pilih kebijakan kerja untuk lowongan ini.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {workPolicyOptions.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="workPolicy"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descriptionDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Pekerjaan Detail</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jelaskan tanggung jawab, kualifikasi, dan manfaat..."
                  rows={8}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Berikan deskripsi yang komprehensif tentang peran ini.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Perusahaan (Opsional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ceritakan tentang perusahaan Anda..."
                  rows={4}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Bantu pelamar mengenal perusahaan Anda lebih baik.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyIndustry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industri Perusahaan (Opsional)</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Teknologi Informasi, Edukasi" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ukuran Perusahaan (Opsional)</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: 1-10 karyawan, 51-200 karyawan" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="companyLogoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Logo Perusahaan (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/logo.png" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                URL gambar logo perusahaan Anda.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Briefcase className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Memposting..." : "Pasang Lowongan Sekarang"}
        </Button>
      </form>
    </Form>
  );
};

export default JobPostingForm;