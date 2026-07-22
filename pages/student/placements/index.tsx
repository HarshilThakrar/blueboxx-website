import { useState } from "react";
import useSWR from "swr";
import api from "../../../src/lib/axios";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Briefcase, Building, MapPin, Calendar, CheckCircle2, XCircle, Clock, Search, Filter } from "lucide-react";
import { Card, CardContent } from "../../../src/components/ui/Card";
import { Badge } from "../../../src/components/ui/Badge";
import Link from "next/link";

const fetcher = (url: string) => api.get(url).then(res => res.data.data);

export default function PlacementsPage() {
  const [filter, setFilter] = useState("All");
  
  const { data: jobApps = [] } = useSWR("/public/jobs/my-applications", fetcher);
  const { data: internshipApps = [] } = useSWR("/public/internships/my-applications", fetcher);

  // Normalize data and merge
  const allApplications = [
    ...jobApps.map((a: any) => ({
      id: `job-${a.id}`,
      jobTitle: a.job_title || a.title,
      company: a.company || a.company_name,
      logo: (a.company || a.company_name || 'C').charAt(0).toUpperCase(),
      type: "Full-time",
      dateApplied: a.applied_at,
      status: a.status,
      statusColor: getStatusColor(a.status),
    })),
    ...internshipApps.map((a: any) => ({
      id: `intern-${a.id}`,
      jobTitle: a.internship_title || a.title,
      company: a.company || a.company_name,
      logo: (a.company || a.company_name || 'C').charAt(0).toUpperCase(),
      type: "Internship",
      dateApplied: a.applied_at,
      status: a.status,
      statusColor: getStatusColor(a.status),
    }))
  ].sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());

  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case 'applied': return "text-blue-700 bg-blue-100";
      case 'in review': return "text-amber-700 bg-amber-100";
      case 'interview': return "text-purple-700 bg-purple-100";
      case 'offered': return "text-emerald-700 bg-emerald-100";
      case 'rejected': return "text-red-700 bg-red-100";
      default: return "text-slate-700 bg-slate-100";
    }
  }
  
  const filteredApps = allApplications.filter(app => filter === "All" || app.status === filter);

  // Stats calculation
  const totalApplied = allApplications.length;
  const inReview = allApplications.filter(a => a.status.toLowerCase() === 'in review').length;
  const interviews = allApplications.filter(a => a.status.toLowerCase() === 'interview').length;
  const offers = allApplications.filter(a => a.status.toLowerCase() === 'offered').length;

  return (
    <StudentDashboardLayout>
      <div className="max-w-5xl mx-auto">
        <AnimatedContent direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Applications</h1>
              <p className="text-slate-500">Track your job and internship applications</p>
            </div>
            <Link href="/jobs" className="px-6 py-2.5 bg-[#1B2A6B] text-white font-bold rounded-xl hover:bg-[#0d1635] transition-colors shadow-md">
              Find More Jobs
            </Link>
          </div>
        </AnimatedContent>

        {/* Stats */}
        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applied", value: totalApplied, color: "text-blue-600" },
            { label: "In Review", value: inReview, color: "text-amber-500" },
            { label: "Interviews", value: interviews, color: "text-purple-500" },
            { label: "Offers", value: offers, color: "text-emerald-500" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{stat.label}</p>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </AnimatedContent>

        {/* Filters & Board */}
        <AnimatedContent direction="up" delay={0.3}>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center gap-4 justify-between">
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                {["All", "Applied", "In Review", "Interview", "Offered", "Rejected"].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === status ? 'bg-[#1B2A6B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search companies..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none" />
              </div>
            </div>

            <div className="p-6">
              {filteredApps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredApps.map((app) => (
                    <Card key={app.id} className="hover:border-slate-300 transition-colors cursor-pointer group">
                      <CardContent className="p-5 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 font-bold text-xl flex items-center justify-center border border-slate-200 group-hover:bg-white transition-colors">
                              {app.logo}
                            </div>
                            <span className={`px-3 py-1 rounded-md text-xs font-bold ${app.statusColor}`}>
                              {app.status}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{app.jobTitle}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium mb-4">
                            <Building size={16} /> {app.company}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
                          <div className="flex items-center gap-1.5"><Briefcase size={14} /> {app.type}</div>
                          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                          <div className="flex items-center gap-1.5"><Calendar size={14} /> Applied {app.dateApplied}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No applications found</h3>
                  <p className="text-slate-500">You haven't applied to any roles in this category yet.</p>
                </div>
              )}
            </div>

          </div>
        </AnimatedContent>

      </div>
    </StudentDashboardLayout>
  );
}
