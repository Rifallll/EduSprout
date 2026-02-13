import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, UploadCloud, FileText, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    companyName: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, jobTitle, companyName }) => {
    const [step, setStep] = useState<"form" | "upload" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        setStep("success");
        toast.success("Lamaran Terkirim!", {
            description: `Lamaranmu untuk ${jobTitle} di ${companyName} telah berhasil dikirim.`,
        });
    };

    const resetModal = () => {
        setStep("form");
        setFile(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && resetModal()}>
            <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-white/10 text-white p-0 overflow-hidden gap-0">

                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-center">
                    <DialogTitle className="text-2xl font-bold text-white mb-1">
                        {step === "success" ? "Lamaran Terkirim!" : "Lamar Pekerjaan"}
                    </DialogTitle>
                    <DialogDescription className="text-violet-100">
                        {step === "success" ? "Semoga sukses!" : `${jobTitle} at ${companyName}`}
                    </DialogDescription>
                </div>

                <div className="p-6">
                    {step === "form" && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nama Depan</Label>
                                    <Input id="firstName" placeholder="John" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nama Belakang</Label>
                                    <Input id="lastName" placeholder="Doe" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Telepon</Label>
                                <Input id="phone" type="tel" placeholder="+62 812..." className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500" />
                            </div>

                            <Button onClick={() => setStep("upload")} className="w-full bg-violet-600 hover:bg-violet-700 font-bold mt-4">
                                Lanjut ke Upload CV
                            </Button>
                        </div>
                    )}

                    {step === "upload" && (
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.02] transition-colors cursor-pointer relative">
                                <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileUpload}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    {file ? (
                                        <>
                                            <FileText className="w-12 h-12 text-violet-400 mb-3" />
                                            <p className="font-medium text-white">{file.name}</p>
                                            <p className="text-sm text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            <Button variant="link" className="text-red-400 mt-2 h-auto p-0" onClick={(e) => {
                                                e.preventDefault();
                                                setFile(null);
                                            }}>Ganti File</Button>
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-12 h-12 text-zinc-600 mb-3" />
                                            <p className="font-medium text-white mb-1">Drag & drop CV atau klik untuk upload</p>
                                            <p className="text-sm text-zinc-500">Format: PDF, DOCX (Max 5MB)</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="motivation">Motivasi (Opsional)</Label>
                                <Textarea id="motivation" placeholder="Mengapa Anda tertarik dengan posisi ini?" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500 min-h-[100px]" />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setStep("form")} className="flex-1 border-white/10 hover:bg-white/5 text-white">
                                    Kembali
                                </Button>
                                <Button onClick={handleSubmit} disabled={!file || isLoading} className="flex-1 bg-violet-600 hover:bg-violet-700 font-bold">
                                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                                    {isLoading ? "Mengirim..." : "Kirim Lamaran"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Lamaran Berhasil Dikirim!</h3>
                            <p className="text-zinc-400 mb-8">
                                Terima kasih telah melamar. Kami akan segera menghubungi Anda jika profil Anda sesuai.
                            </p>
                            <Button onClick={resetModal} className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
                                Tutup
                            </Button>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ApplyModal;
