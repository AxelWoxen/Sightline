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
  Upload
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

export default function DashboardPage() {
  const completedGoals = weeklyGoals.filter(g => g.done).length
  const totalGoals = weeklyGoals.length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium">Good morning</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Week 3 of your photography journey
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium">12 day streak</span>
              </div>
              
              <Link
                href="/critique"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
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
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1200&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
            </div>
            
            <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  Continue where you left off
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium">
                  The Rule of Thirds, Reimagined
                </h2>
                <p className="mt-2 text-muted-foreground max-w-md">
                  Move beyond basic composition and discover how masters break the rules intentionally.
                </p>
                
                {/* Progress bar */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-foreground rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
              </div>
              
              <button className="flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors shrink-0">
                <Play className="w-4 h-4" />
                Continue
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { label: "Photos Critiqued", value: "24", icon: Camera, trend: "+3 this week" },
              { label: "Exercises Done", value: "47", icon: Eye, trend: "+8 this week" },
              { label: "Lessons Complete", value: "12", icon: Sparkles, trend: "of 48 total" },
              { label: "Skill Score", value: "72", icon: TrendingUp, trend: "+5 this month" },
            ].map((stat, i) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{stat.trend}</span>
                </div>
                <div className="text-3xl font-medium gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
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
                  <h3 className="font-medium">Weekly Goals</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {completedGoals} of {totalGoals} complete
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-foreground rounded-full transition-all"
                      style={{ width: `${(completedGoals / totalGoals) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {weeklyGoals.map((goal) => (
                  <li 
                    key={goal.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      goal.done ? "bg-secondary/50" : "glass-subtle"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      goal.done ? "bg-foreground" : "border border-border"
                    }`}>
                      {goal.done && <CheckCircle2 className="w-3.5 h-3.5 text-background" />}
                    </div>
                    <span className={`flex-1 text-sm ${goal.done ? "text-muted-foreground line-through" : ""}`}>
                      {goal.title}
                    </span>
                    {!goal.done && goal.progress > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {goal.progress}/{goal.total}
                      </span>
                    )}
                  </li>
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
                <h3 className="font-medium">Continue Learning</h3>
                <Link 
                  href="/lessons"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="group flex items-center gap-4 p-3 rounded-xl glass-subtle hover:bg-white/5 transition-all"
                  >
                    <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{lesson.module}</p>
                      
                      {lesson.progress > 0 && lesson.progress < 100 && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-foreground rounded-full"
                              style={{ width: `${lesson.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{lesson.progress}%</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      {lesson.progress === 100 ? (
                        <CheckCircle2 className="w-4 h-4 text-foreground" />
                      ) : (
                        <Play className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                    </div>
                  </Link>
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
              className="group glass-card rounded-2xl p-6 hover:glow-sm transition-all"
            >
              <Upload className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h3 className="mt-4 font-medium">Get AI Critique</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload a photo for instant feedback
              </p>
            </Link>
            
            <Link
              href="/learn"
              className="group glass-card rounded-2xl p-6 hover:glow-sm transition-all"
            >
              <Eye className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h3 className="mt-4 font-medium">Daily Exercise</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Train your eye with today&apos;s challenge
              </p>
            </Link>
            
            <Link
              href="/challenges"
              className="group glass-card rounded-2xl p-6 hover:glow-sm transition-all"
            >
              <Camera className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h3 className="mt-4 font-medium">Weekly Challenge</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                5 days left to submit
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
