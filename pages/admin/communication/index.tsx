import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { MessageSquare, MessageCircle, Mail, Send, Users, Search, Info, X } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

const INITIAL_MESSAGES = [
  { id: 1, sender: "System", type: "system", text: "Welcome to the centralized communications hub! Use this channel to blast announcements to all users via email and push notifications simultaneously.", time: "Oct 1, 2026, 09:00 AM" },
  { id: 2, sender: "Admin Root", type: "user", text: "Platform maintenance scheduled for tonight at 2:00 AM UTC. Expect 15 mins of downtime.", time: "10:45 AM" }
];

export default function AdminCommunicationsPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "Admin Root",
      type: "user",
      text: inputValue,
      time: "Just now"
    };
    
    setMessages([...messages, newMsg]);
    setInputValue("");
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "Admin Root (Broadcast)",
      type: "user",
      text: `📢 BROADCAST: ${broadcastMessage}`,
      time: "Just now"
    };
    
    setMessages([...messages, newMsg]);
    setIsModalOpen(false);
    setBroadcastMessage("");
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Communications Hub</h1>
            <p className="text-slate-500 text-sm">Centralized control for platform-wide messaging and announcements.</p>
          </div>
          <Button variant="primary" className="shadow-md gap-2" onClick={() => setIsModalOpen(true)}>
            <Send size={18}/> Send Broadcast
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3"><MessageCircle size={24}/></div>
             <p className="text-3xl font-black text-slate-800 mb-1">1,245</p>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Q&A</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3"><MessageSquare size={24}/></div>
             <p className="text-3xl font-black text-slate-800 mb-1">8,420</p>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Comments</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3"><Mail size={24}/></div>
             <p className="text-3xl font-black text-slate-800 mb-1">15k+</p>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Emails Sent</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-3"><Users size={24}/></div>
             <p className="text-3xl font-black text-slate-800 mb-1">24</p>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reports Pending</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex h-[500px]">
           {/* Sidebar */}
           <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 hidden md:flex">
              <div className="p-4 border-b border-slate-100">
                 <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1B2A6B]" />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                 {/* Thread Items */}
                 <div className="p-4 border-b border-slate-100 bg-white cursor-pointer border-l-4 border-l-[#1B2A6B]">
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="font-bold text-slate-900 text-sm">System Announcements</h4>
                       <span className="text-xs font-semibold text-slate-400">10:45 AM</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 line-clamp-1">Platform maintenance scheduled for tonight...</p>
                 </div>
                 <div className="p-4 border-b border-slate-100 hover:bg-white cursor-pointer transition-colors border-l-4 border-l-transparent">
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="font-bold text-slate-900 text-sm">Instructor Group</h4>
                       <span className="text-xs font-semibold text-slate-400">Yesterday</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 line-clamp-1">Vikram: Please review the new syllabus format.</p>
                 </div>
              </div>
           </div>
           
           {/* Main Chat Area */}
           <div className="flex-1 flex flex-col bg-white">
              <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
                 <h2 className="font-bold text-slate-800">System Announcements</h2>
                 <Button variant="outline" className="text-xs h-8 px-3 gap-1.5"><Info size={14}/> Channel Info</Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                 {messages.map((msg) => (
                   <div key={msg.id} className={`flex gap-4 max-w-2xl ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                      {msg.type === 'system' ? (
                        <div className="w-8 h-8 rounded-full bg-[#1B2A6B] text-white flex items-center justify-center shrink-0 font-bold text-xs">BB</div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
                           <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className={msg.type === 'user' ? 'flex flex-col items-end' : ''}>
                         <div className={`p-4 rounded-2xl text-sm font-medium ${msg.type === 'user' ? 'bg-[#1B2A6B] text-white rounded-tr-sm' : 'bg-slate-100 text-slate-700 rounded-tl-sm'}`}>
                            {msg.text}
                         </div>
                         <span className="text-xs font-semibold text-slate-400 mt-1 block">{msg.time}</span>
                      </div>
                   </div>
                 ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                 <div className="relative">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type an announcement to broadcast..." 
                      className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#1B2A6B] text-white rounded-lg hover:bg-[#0d1635] transition-colors">
                       <Send size={16} />
                    </button>
                 </div>
              </form>
           </div>
        </AnimatedContent>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Send size={20} className="text-[#1B2A6B]" /> Send Broadcast</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSendBroadcast} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recipients</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none">
                  <option>All Users (Students & Instructors)</option>
                  <option>Only Students</option>
                  <option>Only Instructors</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message Content</label>
                <textarea 
                  required
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none" 
                  placeholder="Type your broadcast message here..." 
                ></textarea>
              </div>

              <div className="flex gap-4 items-center">
                 <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#1B2A6B] focus:ring-[#1B2A6B]" /> Send Push Notification
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#1B2A6B] focus:ring-[#1B2A6B]" /> Send Email
                 </label>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 shadow-md gap-2"><Send size={16}/> Broadcast Now</Button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
