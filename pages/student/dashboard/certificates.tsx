import { DashboardLayout } from "../../../src/layout/DashboardLayout";
import { Card, CardContent } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { Award, Download, Share2, ExternalLink } from "lucide-react";

export default function CertificatesPage() {
  const certificates = [
    {
      title: "Python for Data Science",
      issuedOn: "Oct 24, 2026",
      id: "BB-PDS-2026-8942",
      image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&q=80",
    },
    {
      title: "Advanced JavaScript Concepts",
      issuedOn: "Sep 15, 2026",
      id: "BB-AJS-2026-3319",
      image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&q=80",
    },
    {
      title: "HTML & CSS Fundamentals",
      issuedOn: "Jul 10, 2026",
      id: "BB-HCF-2026-1102",
      image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&q=80",
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">My Certificates</h1>
          <p className="text-slate-500 text-sm">View, download, and share your earned certificates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <Card key={i} className="hover:border-slate-300 transition-all overflow-hidden group">
              <div className="aspect-[1.4] bg-slate-100 relative overflow-hidden border-b border-slate-100">
                <img src={cert.image} alt="Certificate" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{cert.title}</h3>
                  <p className="text-white/80 text-xs font-semibold">Issued on {cert.issuedOn}</p>
                </div>
              </div>
              <CardContent className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Credential ID</div>
                    <div className="text-sm font-mono text-slate-700 font-semibold">{cert.id}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Award size={16} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-xs h-9 px-2 gap-1.5"><Download size={14}/> PDF</Button>
                  <Button variant="outline" className="flex-1 text-xs h-9 px-2 gap-1.5"><Share2 size={14}/> Share</Button>
                  <Button variant="secondary" className="w-9 h-9 px-0 shrink-0 flex items-center justify-center"><ExternalLink size={14}/></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
