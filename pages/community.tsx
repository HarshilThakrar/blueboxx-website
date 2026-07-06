import { MainLayout } from "../src/layout/MainLayout";
import { motion } from "framer-motion";
import { Users, MessageSquare, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "../src/components/ui/Card";
import { Button } from "../src/components/ui/Button";

export default function CommunityPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="pt-24 pb-20 bg-[#0d1635] text-white relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[50%] h-[100%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" 
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight"
          >
            Join the <span className="text-[#C9A227]">BlueBoxx</span> Community
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Connect with thousands of learners, alumni, and mentors. Build your network, share your projects, and grow together.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Button variant="gold" size="lg" className="px-8 font-bold">Join Discord Server</Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-transparent min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Discussion Forums</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Ask questions, share your knowledge, and participate in technical discussions with peers and mentors.
                </p>
                <Button variant="outline">Browse Forums</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Study Groups</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Find a study partner or join a group of students working on the same course or project.
                </p>
                <Button variant="outline">Find a Group</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
