import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle, PauseCircle, CheckCircle2, Lock,
  ChevronLeft, ChevronDown, ChevronUp,
  MessageSquare, FileText, Download, Settings,
  Share2, ThumbsUp, BookOpen, StickyNote,
  Volume2, VolumeX, Maximize, SkipForward,
  Clock, Award, BarChart3, Send, Trash2
} from "lucide-react";
import { MOCK_COURSES } from "../../../src/data/mockData";

// ─── Types ──────────────────────────────────────────────────────────
type Note = {
  id: number;
  timestamp: string;
  text: string;
  createdAt: string;
};

type QAPost = {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  replies: number;
};

// ─── Extended Curriculum Data ──────────────────────────────────────
const FULL_CURRICULUM = [
  {
    module: "Module 1: Frontend Fundamentals",
    lessons: [
      { title: "HTML5 & Semantic Web", duration: "45 min", isFree: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Advanced CSS3 & Tailwind", duration: "1h 20m", isFree: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "JavaScript ES6+ Deep Dive", duration: "2h 30m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    module: "Module 2: React Ecosystem",
    lessons: [
      { title: "React Fundamentals: Components & JSX", duration: "2h", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "State Management with Redux Toolkit", duration: "1h 45m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Next.js & Server-Side Rendering", duration: "3h 10m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    module: "Module 3: Backend & APIs",
    lessons: [
      { title: "Node.js & Express.js Fundamentals", duration: "2h 15m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "REST API Design & Authentication", duration: "1h 50m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "MongoDB & Mongoose ORM", duration: "2h", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    module: "Module 4: Deployment & DevOps",
    lessons: [
      { title: "Docker & Containerization", duration: "1h 30m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "CI/CD Pipelines & GitHub Actions", duration: "1h 15m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "AWS Deployment & Scaling", duration: "2h 45m", isFree: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
];

const INITIAL_QA: QAPost[] = [
  {
    id: 1,
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=student1",
    text: "Can someone explain why we shouldn't mutate state directly in React?",
    time: "2 days ago",
    likes: 12,
    replies: 3,
  },
  {
    id: 2,
    user: "Karan Desai",
    avatar: "https://i.pravatar.cc/150?u=student2",
    text: "What's the difference between useMemo and useCallback?",
    time: "5 hours ago",
    likes: 8,
    replies: 1,
  },
];

// ─── Component ─────────────────────────────────────────────────────
export default function LMSPlayerPage() {
  const router = useRouter();
  const { id } = router.query;
  const course = MOCK_COURSES.find((c) => c.slug === id) || MOCK_COURSES[0];

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Curriculum state
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(["0-0"]);

  // Tabs
  const [activeTab, setActiveTab] = useState("overview");

  // Notes
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, timestamp: "2:30", text: "Important: React uses a virtual DOM for efficient rendering", createdAt: "Just now" },
  ]);
  const [noteInput, setNoteInput] = useState("");

  // Q&A
  const [qaList, setQaList] = useState<QAPost[]>(INITIAL_QA);
  const [qaInput, setQaInput] = useState("");

  // Sidebar collapse
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ─── Video Helpers ───────────────────────────────────────────────
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100);
    setCurrentTime(formatTime(video.currentTime));
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(formatTime(video.duration));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // ─── Curriculum Helpers ──────────────────────────────────────────
  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectLesson = (mIdx: number, lIdx: number) => {
    setActiveModuleIdx(mIdx);
    setActiveLessonIdx(lIdx);
    if (!expandedModules.includes(mIdx)) {
      setExpandedModules((prev) => [...prev, mIdx]);
    }
    // Reset video
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
      video.pause();
    }
  };

  const handleNextLesson = () => {
    const currentModule = FULL_CURRICULUM[activeModuleIdx];
    if (activeLessonIdx < currentModule.lessons.length - 1) {
      selectLesson(activeModuleIdx, activeLessonIdx + 1);
    } else if (activeModuleIdx < FULL_CURRICULUM.length - 1) {
      selectLesson(activeModuleIdx + 1, 0);
    }
    // Mark current as completed
    const key = `${activeModuleIdx}-${activeLessonIdx}`;
    if (!completedLessons.includes(key)) {
      setCompletedLessons((prev) => [...prev, key]);
    }
  };

  const totalLessons = FULL_CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
  const completionPercent = Math.round((completedLessons.length / totalLessons) * 100);
  const currentLesson = FULL_CURRICULUM[activeModuleIdx]?.lessons[activeLessonIdx];

  // ─── Notes Helpers ───────────────────────────────────────────────
  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    const newNote: Note = {
      id: Date.now(),
      timestamp: currentTime,
      text: noteInput,
      createdAt: "Just now",
    };
    setNotes((prev) => [newNote, ...prev]);
    setNoteInput("");
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // ─── Q&A Helpers ─────────────────────────────────────────────────
  const postQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim()) return;
    const newPost: QAPost = {
      id: Date.now(),
      user: "Arjun Reddy",
      avatar: "https://i.pravatar.cc/150?u=arjun",
      text: qaInput,
      time: "Just now",
      likes: 0,
      replies: 0,
    };
    setQaList((prev) => [newPost, ...prev]);
    setQaInput("");
  };

  const likePost = (id: number) => {
    setQaList((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  // ─── Keyboard Shortcuts ──────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "KeyM") toggleMute();
      if (e.code === "KeyF") handleFullscreen();
      if (e.code === "ArrowRight") { const v = videoRef.current; if (v) v.currentTime += 10; }
      if (e.code === "ArrowLeft") { const v = videoRef.current; if (v) v.currentTime -= 10; }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [togglePlay]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex flex-col font-inter">

      {/* ─── Top Navigation ───────────────────────────────────────── */}
      <header className="h-14 bg-[#0d1228] border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/student/courses" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-semibold">
            <ChevronLeft size={16} /> My Courses
          </Link>
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <h1 className="text-white font-bold text-sm line-clamp-1 hidden sm:block max-w-md">
            {course?.title || "Loading..."}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Progress badge */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] font-bold text-emerald-400">{completionPercent}%</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
            <Share2 size={16} />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
            <Settings size={16} />
          </button>
        </div>
      </header>

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Left: Video + Tabs */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

          {/* ─── Premium Video Player ─────────────────────────────── */}
          <div
            className="w-full bg-black aspect-video relative group cursor-pointer select-none"
            onClick={togglePlay}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
          >
            <video
              ref={videoRef}
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleNextLesson}
              poster={course?.image}
            />

            {/* Play overlay (when paused) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#C9A227]/90 hover:bg-[#C9A227] rounded-full flex items-center justify-center text-[#0d1635] backdrop-blur-sm transition-transform hover:scale-110 shadow-[0_0_40px_rgba(201,162,39,0.4)]">
                    <PlayCircle size={36} className="ml-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Controls */}
            <motion.div
              initial={false}
              animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
              className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12 pb-3 px-4 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bar */}
              <div
                className="w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer group/bar relative"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-[#C9A227] rounded-full relative transition-all"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#C9A227] rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="text-white hover:text-[#C9A227] transition-colors">
                    {isPlaying ? <PauseCircle size={22} /> : <PlayCircle size={22} />}
                  </button>
                  <button onClick={handleNextLesson} className="text-white/70 hover:text-white transition-colors">
                    <SkipForward size={18} />
                  </button>
                  <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <span className="text-xs text-white/70 font-mono font-medium tabular-nums">
                    {currentTime} / {duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/50 font-bold hidden sm:inline">
                    {currentLesson?.title}
                  </span>
                  <button onClick={handleFullscreen} className="text-white/70 hover:text-white transition-colors">
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Content Tabs ────────────────────────────────────── */}
          <div className="flex-1 flex flex-col bg-[#0d1228]">
            <div className="flex items-center gap-0 border-b border-white/5 px-4 sm:px-6 overflow-x-auto hide-scrollbar shrink-0 bg-[#0d1228]">
              {[
                { key: "overview", label: "Overview", icon: BookOpen },
                { key: "notes", label: "Notes", icon: StickyNote },
                { key: "resources", label: "Resources", icon: FileText },
                { key: "discussion", label: "Q&A", icon: MessageSquare },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold capitalize whitespace-nowrap border-b-2 transition-all ${
                    activeTab === key
                      ? "border-[#C9A227] text-[#C9A227]"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            <div className="flex-1 p-4 sm:p-6 max-w-4xl w-full overflow-y-auto">

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-3">
                      {currentLesson?.title || "Select a Lesson"}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {course?.description || "Master modern web development by building real-world projects."}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 py-5 border-y border-white/10">
                    <img src="https://i.pravatar.cc/150?u=ankit" alt="Instructor" className="w-12 h-12 rounded-full object-cover border-2 border-[#C9A227]/30" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A227] mb-0.5">Instructor</p>
                      <p className="text-sm font-bold text-white">{course?.instructor}</p>
                      <p className="text-xs text-slate-500">Senior Software Engineer</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Clock, label: "Duration", value: course?.duration },
                      { icon: BookOpen, label: "Lessons", value: `${totalLessons} Lessons` },
                      { icon: BarChart3, label: "Level", value: course?.level },
                      { icon: Award, label: "Certificate", value: "Yes" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-white/5 border border-white/5 rounded-xl p-3.5 text-center">
                        <Icon size={16} className="text-[#C9A227] mx-auto mb-2" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                        <p className="text-xs font-bold text-white mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Notes Tab */}
              {activeTab === "notes" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <form onSubmit={addNote} className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder={`Add note at ${currentTime}...`}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-20 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30 transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#C9A227] bg-[#C9A227]/10 px-2 py-0.5 rounded-md">
                        {currentTime}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-3 bg-[#C9A227] text-[#0d1635] rounded-xl font-bold text-sm hover:bg-[#b08d20] transition-colors shrink-0"
                    >
                      <StickyNote size={16} />
                    </button>
                  </form>

                  {notes.length === 0 ? (
                    <div className="text-center py-12">
                      <StickyNote size={32} className="text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-500 font-medium">No notes yet. Start taking notes while watching!</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {notes.map((note) => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl p-4 group hover:border-[#C9A227]/20 transition-all"
                        >
                          <button className="text-[10px] font-bold text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded-md mt-0.5 shrink-0 hover:bg-[#C9A227]/20 transition-colors">
                            {note.timestamp}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-300 font-medium leading-relaxed">{note.text}</p>
                            <p className="text-[10px] text-slate-600 mt-1 font-semibold">{note.createdAt}</p>
                          </div>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Resources Tab */}
              {activeTab === "resources" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <h3 className="text-base font-bold text-white mb-4">Downloadable Resources</h3>
                  {[
                    { name: "Lesson Slides & Source Code.zip", size: "2.4 MB" },
                    { name: "React Cheatsheet.pdf", size: "1.1 MB" },
                    { name: "Practice Problems Set.pdf", size: "890 KB" },
                  ].map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[#C9A227]/20 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A227]/10 text-[#C9A227] rounded-lg flex items-center justify-center">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-[#C9A227] transition-colors">{file.name}</p>
                          <p className="text-xs text-slate-500">{file.size}</p>
                        </div>
                      </div>
                      <button className="text-slate-500 group-hover:text-[#C9A227] transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Q&A Tab */}
              {activeTab === "discussion" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <form onSubmit={postQuestion} className="flex gap-3">
                    <img src="https://i.pravatar.cc/150?u=arjun" alt="You" className="w-9 h-9 rounded-full object-cover shrink-0 mt-1" />
                    <div className="flex-1">
                      <textarea
                        value={qaInput}
                        onChange={(e) => setQaInput(e.target.value)}
                        placeholder="Ask a question or share your thoughts..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30 resize-none min-h-[80px] transition-all"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#C9A227] text-[#0d1635] font-bold text-xs rounded-lg hover:bg-[#b08d20] transition-colors flex items-center gap-1.5"
                        >
                          <Send size={12} /> Post
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-4">
                    {qaList.map((post) => (
                      <div key={post.id} className="flex gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4">
                        <img src={post.avatar} alt={post.user} className="w-9 h-9 rounded-full shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white text-sm">{post.user}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{post.time}</span>
                          </div>
                          <p className="text-sm text-slate-300 mb-2.5 leading-relaxed">{post.text}</p>
                          <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold">
                            <button onClick={() => likePost(post.id)} className="flex items-center gap-1 hover:text-[#C9A227] transition-colors">
                              <ThumbsUp size={13} /> {post.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:text-[#C9A227] transition-colors">
                              <MessageSquare size={13} /> {post.replies} Replies
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Right Sidebar: Curriculum ──────────────────────────── */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:flex flex-col bg-[#0d1228] border-l border-white/5 shrink-0 overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-white/5 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-white">Course Content</h2>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-2">
                  <span>{completedLessons.length} / {totalLessons} Lessons</span>
                  <span className="text-emerald-400">{completionPercent}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Modules list */}
              <div className="flex-1 overflow-y-auto admin-scrollbar">
                {FULL_CURRICULUM.map((module, mIdx) => {
                  const moduleLessonsCompleted = module.lessons.filter((_, lIdx) =>
                    completedLessons.includes(`${mIdx}-${lIdx}`)
                  ).length;

                  return (
                    <div key={mIdx} className="border-b border-white/5">
                      <button
                        onClick={() => toggleModule(mIdx)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-white leading-tight mb-1 truncate">{module.module}</h3>
                          <p className="text-[10px] text-slate-500 font-semibold">
                            {moduleLessonsCompleted} / {module.lessons.length} • {module.lessons.length * 15} min
                          </p>
                        </div>
                        {expandedModules.includes(mIdx) ? (
                          <ChevronUp size={14} className="text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown size={14} className="text-slate-500 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedModules.includes(mIdx) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {module.lessons.map((lesson, lIdx) => {
                              const isCurrent = mIdx === activeModuleIdx && lIdx === activeLessonIdx;
                              const isCompleted = completedLessons.includes(`${mIdx}-${lIdx}`);
                              const isLocked = !lesson.isFree && mIdx > 1;

                              return (
                                <button
                                  key={lIdx}
                                  onClick={() => !isLocked && selectLesson(mIdx, lIdx)}
                                  disabled={isLocked}
                                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all ${
                                    isCurrent
                                      ? "bg-[#C9A227]/10 border-l-2 border-[#C9A227]"
                                      : isLocked
                                      ? "opacity-40 cursor-not-allowed"
                                      : "hover:bg-white/[0.03] border-l-2 border-transparent"
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle2 size={14} className="text-emerald-500" />
                                    ) : isLocked ? (
                                      <Lock size={14} className="text-slate-600" />
                                    ) : isCurrent ? (
                                      <PlayCircle size={14} className="text-[#C9A227]" />
                                    ) : (
                                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <p className={`text-xs font-semibold leading-snug mb-0.5 ${
                                      isCurrent ? "text-[#C9A227]" : isLocked ? "text-slate-600" : "text-slate-300"
                                    }`}>
                                      {lesson.title}
                                    </p>
                                    <p className="text-[10px] text-slate-600 flex items-center gap-1">
                                      <PlayCircle size={9} /> {lesson.duration}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar toggle (when closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="hidden lg:flex fixed right-4 top-20 bg-[#C9A227] text-[#0d1635] w-8 h-8 rounded-full items-center justify-center shadow-lg z-40 hover:scale-110 transition-transform"
          >
            <BookOpen size={14} />
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-scrollbar::-webkit-scrollbar { width: 4px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .admin-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
