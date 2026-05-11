"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Camera, 
  Eye, 
  Sun, 
  Palette, 
  MessageSquare,
  Calendar,
  Award,
  ArrowUp,
  ChevronRight,
  Sparkles,
  Target,
  Zap
} from "lucide-react"

const skillProgress = [
  { id: "composition", name: "Composition", score: 78, change: 12, icon: Camera, color: "blue" },
  { id: "lighting", name: "Lighting", score: 85, change: 8, icon: Sun, color: "amber" },
  { id: "color", name: "Color & Editing", score: 72, change: 15, icon: Palette, color: "purple" },
  { id: "story", name: "Storytelling", score: 68, change: 5, icon: MessageSquare, color: "teal" },
  { id: "vision", name: "Creative Vision", score: 74, change: 10, icon: Eye, color: "rose" },
]

const monthlyData = [
  { month: "Jan", score: 45 },
  { month: "Feb", score: 52 },
  { month: "Mar", score: 61 },
  { month: "Apr", score: 68 },
  { month: "May", score: 76 },
]

const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first lesson", earned: true, date: "Mar 12", icon: Sparkles },
  { id: 2, name: "Consistent Creator", description: "7-day streak", earned: true, date: "Mar 20", icon: Zap },
  { id: 3, name: "Light Master", description: "Score 80+ in lighting", earned: true, date: "Apr 2", icon: Sun },
  { id: 4, name: "Critic Approved", description: "Submit 10 photos for critique", earned: false, progress: 8, icon: Target },
  { id: 5, name: "Visionary", description: "Complete Month 4", earned: false, progress: 0, icon: Eye },
]

const recentSubmissions = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    score: 82,
    date: "2 days ago",
    highlight: "Excellent composition",
    color: "blue"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&q=80",
    score: 76,
    date: "5 days ago",
    highlight: "Strong lighting",
    color: "amber"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    score: 79,
    date: "1 week ago",
    highlight: "Emotional impact",
    color: "rose"
  },
]

const styleEvolution = [
  { period: "Week 1", style: "Documentary", confidence: 45 },
  { period: "Week 2", style: "Street", confidence: 62 },
  { period: "Week 3", style: "Cinematic", confidence: 78 },
]

const colorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
  teal: { bg: "bg-teal-500/20", text: "text-teal-400" },
  rose: { bg: "bg-rose-500/20", text: "text-rose-400" },
}

export default function ProgressPage() {
  const maxScore = Math.max(...monthlyData.map(d => d.score))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Your Progress</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track your photography journey
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Week 3, Month 1</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground font-medium">Overall Score</span>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                    <ArrowUp className="w-3 h-3" />
                    +10
                  </div>
                </div>
                <div className="text-5xl font-bold">76</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Up from 66 last month
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground font-medium">Photos Critiqued</span>
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-5xl font-bold">24</div>
                <p className="text-sm text-muted-foreground mt-2">
                  8 this month
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground font-medium">Best Category</span>
                  <Sun className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-5xl font-bold">85</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Lighting
                </p>
              </div>
            </div>
          </motion.div>

          {/* Style Evolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-lg">Your Photography Style Evolution</h2>
                <p className="text-sm text-muted-foreground mt-1">How your creative identity is developing</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                Trending: Cinematic
              </span>
            </div>

            <div className="flex items-center gap-4">
              {styleEvolution.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 glass-subtle rounded-xl p-4 text-center"
                >
                  <p className="text-xs text-muted-foreground mb-2">{item.period}</p>
                  <p className="font-semibold text-lg">{item.style}</p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.confidence}%` }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.confidence}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Score Over Time</h2>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
                <button className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors">Week</button>
                <button className="px-3 py-1.5 rounded-md text-sm bg-foreground text-background font-medium">Month</button>
                <button className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors">Year</button>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-6 h-56 pt-8">
              {monthlyData.map((data, i) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-3">
                  <div className="relative w-full flex justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.score / maxScore) * 180}px` }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-16 rounded-t-xl bg-gradient-to-t from-accent/60 via-accent/80 to-accent relative group cursor-pointer"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-3 py-1.5 rounded-lg glass text-sm font-semibold whitespace-nowrap shadow-lg">
                          {data.score}
                        </span>
                      </div>
                      <div className="absolute inset-0 rounded-t-xl bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                    </motion.div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{data.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Skills Breakdown</h2>
              <span className="text-sm text-muted-foreground">All improving this month</span>
            </div>
            
            <div className="space-y-5">
              {skillProgress.map((skill, index) => {
                const colors = colorClasses[skill.color]
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                      <skill.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold">{skill.score}</span>
                          <span className="flex items-center gap-1 text-xs text-green-400 font-semibold px-2 py-0.5 rounded-full bg-green-500/20">
                            <ArrowUp className="w-3 h-3" />
                            {skill.change}
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.score}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                          className={`h-full rounded-full ${colors.bg.replace('/20', '')}`}
                          style={{ 
                            background: `linear-gradient(90deg, var(--${skill.color}-500), var(--${skill.color}-400))`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Two columns */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Achievements</h2>
                <span className="text-sm text-muted-foreground font-medium">
                  {achievements.filter(a => a.earned).length}/{achievements.length} earned
                </span>
              </div>

              <div className="space-y-3">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      achievement.earned 
                        ? "bg-gradient-to-r from-accent/10 to-transparent border border-accent/20" 
                        : "glass-subtle opacity-60"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      achievement.earned 
                        ? "bg-accent text-background" 
                        : "bg-secondary"
                    }`}>
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>

                    {achievement.earned ? (
                      <span className="text-xs text-accent font-medium shrink-0">{achievement.date}</span>
                    ) : achievement.progress !== undefined && achievement.progress > 0 ? (
                      <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary shrink-0">
                        {achievement.progress}/10
                      </span>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Submissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Recent Submissions</h2>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  View all <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="space-y-4">
                {recentSubmissions.map((submission, i) => {
                  const colors = colorClasses[submission.color]
                  return (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.4 }}
                      className="flex items-center gap-4 p-3 rounded-xl glass-subtle hover:bg-secondary/50 transition-colors cursor-pointer group"
                    >
                      <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 ring-1 ring-border">
                        <img
                          src={submission.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${colors.bg.replace('/20', '')}`} 
                            style={{ backgroundColor: `var(--${submission.color}-400)` }} />
                          <p className="font-medium">{submission.highlight}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{submission.date}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-2xl font-bold">{submission.score}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Score</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
