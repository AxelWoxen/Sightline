"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { 
  Eye, 
  Clock, 
  CheckCircle2, 
  Play,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  Target,
  Shuffle,
  Sparkles,
  Zap,
  Camera,
  Sun,
  Layers,
  Frame,
  Grid3X3
} from "lucide-react"

const todayExercise = {
  id: 1,
  title: "Find the Frame",
  subtitle: "Compositional Vision",
  description: "Look at the image below. Before revealing the master&apos;s crop, decide where you would place your frame. Consider the rule of thirds, leading lines, and what story you want to tell.",
  duration: "5 min",
  image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&q=80",
  masterCrop: { x: 20, y: 15, width: 60, height: 70 },
  explanation: "The master chose to emphasize the diagonal leading line while eliminating distracting elements on the edges. The crop creates tension by placing the subject slightly off-center.",
  tips: [
    "Look for natural frames within the scene",
    "Consider what to exclude, not just include",
    "Think about the emotional weight of each area"
  ]
}

const exerciseTypes = [
  {
    id: "composition",
    name: "Composition",
    description: "Frame, balance, and visual flow",
    icon: Frame,
    exercises: 12,
    completed: 8,
    color: "blue"
  },
  {
    id: "light",
    name: "Light Reading",
    description: "Understand quality and direction",
    icon: Sun,
    exercises: 10,
    completed: 5,
    color: "amber"
  },
  {
    id: "story",
    name: "Storytelling",
    description: "Capture the decisive moment",
    icon: Camera,
    exercises: 8,
    completed: 3,
    color: "purple"
  },
  {
    id: "layers",
    name: "Visual Layers",
    description: "Create depth and dimension",
    icon: Layers,
    exercises: 6,
    completed: 2,
    color: "teal"
  },
]

const pastExercises = [
  {
    id: 1,
    title: "Spot the Light",
    type: "Light Reading",
    completed: true,
    score: 85,
    date: "Yesterday",
    color: "amber"
  },
  {
    id: 2,
    title: "Decisive Moment",
    type: "Storytelling",
    completed: true,
    score: 72,
    date: "2 days ago",
    color: "purple"
  },
  {
    id: 3,
    title: "Balance Point",
    type: "Composition",
    completed: true,
    score: 90,
    date: "3 days ago",
    color: "blue"
  },
]

const dailyDrills = [
  { id: 1, title: "Identify the light source", completed: true },
  { id: 2, title: "Find 3 leading lines around you", completed: true },
  { id: 3, title: "Spot natural frames in your environment", completed: false },
]

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  teal: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
}

export default function LearnPage() {
  const [showMasterCrop, setShowMasterCrop] = useState(false)
  const [exerciseComplete, setExerciseComplete] = useState(false)
  const [userCrop, setUserCrop] = useState<{x: number, y: number} | null>(null)

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (exerciseComplete) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setUserCrop({ x, y })
  }

  const revealMaster = () => {
    setShowMasterCrop(true)
    setTimeout(() => setExerciseComplete(true), 1000)
  }

  const resetExercise = () => {
    setShowMasterCrop(false)
    setExerciseComplete(false)
    setUserCrop(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Learn to See</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Daily exercises to train your photographic eye
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">16 exercises done</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Daily Drills Quick View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Today&apos;s Quick Drills</h3>
                  <p className="text-sm text-muted-foreground">Train your eye in the real world</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {dailyDrills.filter(d => d.completed).length}/{dailyDrills.length} done
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {dailyDrills.map((drill, i) => (
                <motion.button
                  key={drill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                    drill.completed 
                      ? "bg-green-500/20 border border-green-500/30 text-green-400" 
                      : "glass-subtle hover:bg-secondary"
                  }`}
                >
                  {drill.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/40" />
                  )}
                  <span className="text-sm font-medium">{drill.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Today's Exercise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl overflow-hidden"
          >
            <div className="p-6 sm:p-8 border-b border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-accent text-background text-xs font-semibold uppercase tracking-wider">
                    Today&apos;s Exercise
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle text-sm">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    {todayExercise.duration}
                  </div>
                </div>
                
                <button
                  onClick={resetExercise}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {todayExercise.title}
              </h2>
              <p className="text-muted-foreground mt-2 text-lg">{todayExercise.subtitle}</p>
              
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                {todayExercise.description}
              </p>
            </div>

            {/* Interactive Image */}
            <div className="p-6 sm:p-8">
              <div 
                className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-crosshair ring-1 ring-border"
                onClick={handleImageClick}
              >
                <img
                  src={todayExercise.image}
                  alt="Exercise image"
                  className="w-full h-full object-cover"
                />
                
                {/* Grid overlay */}
                {!showMasterCrop && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
                  </div>
                )}
                
                {/* User click indicator */}
                {userCrop && !showMasterCrop && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-accent border-2 border-background shadow-lg"
                    style={{ left: `${userCrop.x}%`, top: `${userCrop.y}%` }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-50" />
                  </motion.div>
                )}

                {/* Master crop overlay */}
                <AnimatePresence>
                  {showMasterCrop && (
                    <>
                      {/* Darkened areas */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/70"
                      />
                      
                      {/* Highlighted crop area */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute border-4 border-accent rounded-xl shadow-2xl shadow-accent/30"
                        style={{
                          left: `${todayExercise.masterCrop.x}%`,
                          top: `${todayExercise.masterCrop.y}%`,
                          width: `${todayExercise.masterCrop.width}%`,
                          height: `${todayExercise.masterCrop.height}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-transparent" />
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass text-sm font-semibold whitespace-nowrap"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent" />
                            Master&apos;s Crop
                          </span>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Instructions */}
              {!exerciseComplete && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {userCrop 
                      ? "Good choice! Now reveal the master&apos;s perspective" 
                      : "Click on the image to mark your frame center"
                    }
                  </p>
                  
                  <button
                    onClick={revealMaster}
                    disabled={!userCrop}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover:bg-foreground/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-foreground/10"
                  >
                    <Eye className="w-4 h-4" />
                    Reveal Master
                  </button>
                </div>
              )}

              {/* Explanation */}
              <AnimatePresence>
                {exerciseComplete && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Master&apos;s Insight</h3>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                          {todayExercise.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-accent/20">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Key takeaways</p>
                      <ul className="space-y-3">
                        {todayExercise.tips.map((tip, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 text-sm p-3 rounded-lg bg-background/50"
                          >
                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            {tip}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <button className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/90 transition-all shadow-lg">
                      <Shuffle className="w-5 h-5" />
                      Next Exercise
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Exercise Categories & History */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg mb-6">Exercise Types</h3>
              
              <div className="space-y-4">
                {exerciseTypes.map((type, i) => {
                  const colors = colorClasses[type.color]
                  return (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.25 }}
                      className="w-full flex items-center gap-4 p-4 rounded-xl glass-subtle hover:bg-secondary/50 transition-all text-left group"
                    >
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <type.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{type.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(type.completed / type.exercises) * 100}%` }}
                              transition={{ delay: i * 0.1 + 0.3 }}
                              className={`h-full rounded-full`}
                              style={{ backgroundColor: `var(--${type.color}-500, currentColor)` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">
                            {type.completed}/{type.exercises}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {/* Recent Exercises */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Recent Exercises</h3>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  View all <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="space-y-4">
                {pastExercises.map((exercise, i) => {
                  const colors = colorClasses[exercise.color]
                  return (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.35 }}
                      className="flex items-center gap-4 p-4 rounded-xl glass-subtle hover:bg-secondary/50 transition-all cursor-pointer group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0`}>
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold group-hover:text-foreground transition-colors">{exercise.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                            {exercise.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{exercise.date}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-2xl font-bold">{exercise.score}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Score</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-xl glass-subtle hover:bg-secondary transition-colors font-medium">
                <Play className="w-5 h-5" />
                Practice More
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
