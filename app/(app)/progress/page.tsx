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
  ChevronRight
} from "lucide-react"

const skillProgress = [
  { id: "composition", name: "Composition", score: 78, change: 12, icon: Camera },
  { id: "lighting", name: "Lighting", score: 85, change: 8, icon: Sun },
  { id: "color", name: "Color & Editing", score: 72, change: 15, icon: Palette },
  { id: "story", name: "Storytelling", score: 68, change: 5, icon: MessageSquare },
  { id: "vision", name: "Creative Vision", score: 74, change: 10, icon: Eye },
]

const monthlyData = [
  { month: "Jan", score: 45 },
  { month: "Feb", score: 52 },
  { month: "Mar", score: 61 },
  { month: "Apr", score: 68 },
  { month: "May", score: 76 },
]

const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first lesson", earned: true, date: "Mar 12" },
  { id: 2, name: "Consistent Creator", description: "7-day streak", earned: true, date: "Mar 20" },
  { id: 3, name: "Light Master", description: "Score 80+ in lighting", earned: true, date: "Apr 2" },
  { id: 4, name: "Critic Approved", description: "Submit 10 photos for critique", earned: false, progress: 8 },
  { id: 5, name: "Visionary", description: "Complete Month 4", earned: false, progress: 0 },
]

const recentSubmissions = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    score: 82,
    date: "2 days ago",
    highlight: "Excellent composition"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&q=80",
    score: 76,
    date: "5 days ago",
    highlight: "Strong lighting"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    score: 79,
    date: "1 week ago",
    highlight: "Emotional impact"
  },
]

export default function ProgressPage() {
  const maxScore = Math.max(...monthlyData.map(d => d.score))

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium">Your Progress</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track your photography journey
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Week 3, Month 1</span>
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
            className="grid sm:grid-cols-3 gap-4"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Overall Score</span>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <ArrowUp className="w-3 h-3" />
                  +10
                </div>
              </div>
              <div className="text-4xl font-medium gradient-text">76</div>
              <p className="text-sm text-muted-foreground mt-2">
                Up from 66 last month
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Photos Critiqued</span>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-4xl font-medium gradient-text">24</div>
              <p className="text-sm text-muted-foreground mt-2">
                8 this month
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Best Category</span>
                <Sun className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-4xl font-medium gradient-text">85</div>
              <p className="text-sm text-muted-foreground mt-2">
                Lighting
              </p>
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
              <h2 className="font-medium">Score Over Time</h2>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-muted-foreground hover:text-foreground transition-colors">Week</button>
                <button className="text-foreground font-medium">Month</button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">Year</button>
              </div>
            </div>

            {/* Simple bar chart */}
            <div className="flex items-end justify-between gap-4 h-48">
              {monthlyData.map((data, i) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.score / maxScore) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-foreground/60 to-foreground relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-1 rounded glass text-xs font-medium">
                        {data.score}
                      </span>
                    </div>
                  </motion.div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
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
            <h2 className="font-medium mb-6">Skills Breakdown</h2>
            
            <div className="space-y-4">
              {skillProgress.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center shrink-0">
                    <skill.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{skill.score}</span>
                        <span className="text-xs text-green-400 flex items-center gap-0.5">
                          <ArrowUp className="w-2.5 h-2.5" />
                          {skill.change}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-foreground/60 to-foreground rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
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
                <h2 className="font-medium">Achievements</h2>
                <span className="text-sm text-muted-foreground">
                  {achievements.filter(a => a.earned).length}/{achievements.length}
                </span>
              </div>

              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                      achievement.earned ? "glass-subtle" : "opacity-60"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      achievement.earned ? "bg-foreground text-background" : "glass-subtle"
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{achievement.name}</h3>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>

                    {achievement.earned ? (
                      <span className="text-xs text-muted-foreground shrink-0">{achievement.date}</span>
                    ) : achievement.progress !== undefined && achievement.progress > 0 ? (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {achievement.progress}/10
                      </span>
                    ) : null}
                  </div>
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
                <h2 className="font-medium">Recent Submissions</h2>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center gap-4 p-2 rounded-xl glass-subtle hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={submission.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{submission.highlight}</p>
                      <p className="text-xs text-muted-foreground">{submission.date}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-medium">{submission.score}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
