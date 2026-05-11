"use client"

import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Camera, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Flame, 
  Play, 
  Sparkles, 
  Target,
  TrendingUp,
  Upload,
  Zap,
  Calendar,
  ArrowUpRight,
  Quote
} from "lucide-react"
import Link from "next/link"

const weeklyGoals = [
  { id: 1, title: "Complete 3 daily exercises", progress: 2, total: 3, done: false },
  { id: 2, title: "Submit 1 photo for AI critique", progress: 1, total: 1, done: true },
  { id: 3, title: "Study a master photographer", progress: 0, total: 1, done: false },
  { id: 4, title: "Complete weekly challenge", progress: 0, total: 1, done: false },
]

const recentLessons = [
  {
    id: 1,
    title: "Understanding Natural Light",
    module: "Month 1: Foundations",
    duration: "12 min",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
    progress: 100,
  },
  {
    id: 2,
    title: "The Rule of Thirds, Reimagined",
    module: "Month 1: Foundations",
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=400&q=80",
    progress: 60,
  },
  {
    id: 3,
    title: "Leading Lines & Visual Flow",
    module: "Month 1: Foundations",
    duration: "18 min",
    image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&q=80",
    progress: 0,
  },
]

const todayObservation = {
  prompt: "Notice how shadows fall differently throughout the day. Find one shadow that tells a story.",
  category: "Light Awareness"
}

export default function DashboardPage() {
  const completedGoals = weeklyGoals.filter(g => g.done).length
  const totalGoals = weeklyGoals.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Good morning</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Week 3 of your photography journey
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/critique"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-all hover:shadow-lg hover:shadow-foreground/10"
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Card - Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1200&q=80"
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            
            <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/10">
                    <Clock className="w-3.5 h-3.5" />
                    Continue where you left off
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  The Rule of Thirds, Reimagined
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Move beyond basic composition and discover how masters break the rules intentionally.
                </p>
                
                {/* Progress bar */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 max-w-xs h-2 bg-foreground/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-full bg-gradient-to-r from-foreground to-foreground/80 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
              
              <button className="flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all shrink-0 shadow-xl shadow-foreground/10 hover:shadow-2xl hover:shadow-foreground/20 hover:scale-105">
                <Play className="w-5 h-5" />
                Continue
              </button>
            </div>
          </motion.div>

          {/* Today's Observation + This Week's Improvement */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">Today&apos;s Observation</span>
                </div>
                <p className="text-lg font-medium leading-relaxed">{todayObservation.prompt}</p>
                <p className="text-sm text-muted-foreground mt-3">{todayObservation.category}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-xs font-medium text-green-400 uppercase tracking-wider">This Week</span>
                  </div>
                  <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    +8 pts
                  </span>
                </div>
                <p className="text-2xl font-semibold">Your eye is improving in</p>
                <p className="text-lg text-accent font-medium mt-1">Lighting & Color Harmony</p>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { label: "Photos Critiqued", value: "24", icon: Camera, trend: "+3 this week", color: "from-blue-500/20" },
              { label: "Exercises Done", value: "47", icon: Eye, trend: "+8 this week", color: "from-purple-500/20" },
              { label: "Lessons Complete", value: "12", icon: Sparkles, trend: "of 48 total", color: "from-amber-500/20" },
              { label: "Skill Score", value: "72", icon: Zap, trend: "+5 this month", color: "from-green-500/20" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.15 }}
                className="glass-card glass-hover rounded-2xl p-5 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-50`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.trend}</span>
                  </div>
                  <div className="text-3xl font-semibold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-lg">Weekly Goals</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {completedGoals} of {totalGoals} complete
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedGoals / totalGoals) * 100}%` }}
                      transition={{ delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full"
                    />
                  </div>
                  <Target className="w-5 h-5 text-accent" />
                </div>
              </div>

              <ul className="space-y-3">
                {weeklyGoals.map((goal, i) => (
                  <motion.li 
                    key={goal.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      goal.done 
                        ? "bg-green-500/10 border border-green-500/20" 
                        : "glass-subtle hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      goal.done 
                        ? "bg-green-500 text-background" 
                        : "border-2 border-muted-foreground/30"
                    }`}>
                      {goal.done && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={`flex-1 text-sm font-medium ${goal.done ? "text-green-400" : ""}`}>
                      {goal.title}
                    </span>
                    {!goal.done && goal.progress > 0 && (
                      <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                        {goal.progress}/{goal.total}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Recent Lessons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Continue Learning</h3>
                <Link 
                  href="/lessons"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  View all
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentLessons.map((lesson, i) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.35 }}
                  >
                    <Link
                      href={`/lessons/${lesson.id}`}
                      className="group flex items-center gap-4 p-3 rounded-xl glass-subtle hover:bg-secondary/50 transition-all"
                    >
                      <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 ring-1 ring-border">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate group-hover:text-foreground transition-colors">{lesson.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{lesson.module}</p>
                        
                        {lesson.progress > 0 && lesson.progress < 100 && (
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-foreground to-foreground/80 rounded-full"
                                style={{ width: `${lesson.progress}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-muted-foreground font-medium">{lesson.progress}%</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        {lesson.progress === 100 ? (
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                            <Play className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <Link
              href="/critique"
              className="group glass-card glass-hover rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg">Get AI Critique</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Upload a photo for instant feedback on composition, light, and story
                </p>
              </div>
            </Link>
            
            <Link
              href="/learn"
              className="group glass-card glass-hover rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Daily Exercise</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Train your eye with today&apos;s composition challenge
                </p>
              </div>
            </Link>
            
            <Link
              href="/challenges"
              className="group glass-card glass-hover rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg">Weekly Challenge</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Golden Hour Magic — 5 days left to submit
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
