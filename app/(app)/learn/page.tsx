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
  Shuffle
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
    icon: Target,
    exercises: 12,
    completed: 8
  },
  {
    id: "light",
    name: "Light Reading",
    icon: Eye,
    exercises: 10,
    completed: 5
  },
  {
    id: "story",
    name: "Storytelling",
    icon: Lightbulb,
    exercises: 8,
    completed: 3
  },
]

const pastExercises = [
  {
    id: 1,
    title: "Spot the Light",
    type: "Light Reading",
    completed: true,
    score: 85,
    date: "Yesterday"
  },
  {
    id: 2,
    title: "Decisive Moment",
    type: "Storytelling",
    completed: true,
    score: 72,
    date: "2 days ago"
  },
  {
    id: 3,
    title: "Balance Point",
    type: "Composition",
    completed: true,
    score: 90,
    date: "3 days ago"
  },
]

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
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium">Learn to See</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Daily exercises to train your photographic eye
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">16 exercises done</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Today's Exercise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl overflow-hidden"
          >
            <div className="p-6 sm:p-8 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-foreground text-background text-xs font-medium">
                    Today&apos;s Exercise
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {todayExercise.duration}
                  </div>
                </div>
                
                <button
                  onClick={resetExercise}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium">
                {todayExercise.title}
              </h2>
              <p className="text-muted-foreground mt-1">{todayExercise.subtitle}</p>
              
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                {todayExercise.description}
              </p>
            </div>

            {/* Interactive Image */}
            <div className="p-6 sm:p-8">
              <div 
                className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-crosshair"
                onClick={handleImageClick}
              >
                <img
                  src={todayExercise.image}
                  alt="Exercise image"
                  className="w-full h-full object-cover"
                />
                
                {/* User click indicator */}
                {userCrop && !showMasterCrop && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-foreground"
                    style={{ left: `${userCrop.x}%`, top: `${userCrop.y}%` }}
                  />
                )}

                {/* Master crop overlay */}
                <AnimatePresence>
                  {showMasterCrop && (
                    <>
                      {/* Darkened areas */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60"
                      />
                      
                      {/* Highlighted crop area */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute border-2 border-foreground rounded-lg"
                        style={{
                          left: `${todayExercise.masterCrop.x}%`,
                          top: `${todayExercise.masterCrop.y}%`,
                          width: `${todayExercise.masterCrop.width}%`,
                          height: `${todayExercise.masterCrop.height}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black/0" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass text-xs font-medium whitespace-nowrap">
                          Master&apos;s Crop
                        </div>
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
                      ? "Good! Now reveal the master&apos;s choice" 
                      : "Click on the image to mark your frame center"
                    }
                  </p>
                  
                  <button
                    onClick={revealMaster}
                    disabled={!userCrop}
                    className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                    className="mt-6 p-6 rounded-2xl glass-subtle"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Master&apos;s Insight</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {todayExercise.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-3">Key takeaways:</p>
                      <ul className="space-y-2">
                        {todayExercise.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors">
                      <Shuffle className="w-4 h-4" />
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
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 glass-card rounded-2xl p-6"
            >
              <h3 className="font-medium mb-4">Exercise Types</h3>
              
              <div className="space-y-3">
                {exerciseTypes.map((type) => (
                  <button
                    key={type.id}
                    className="w-full flex items-center gap-4 p-4 rounded-xl glass-subtle hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0">
                      <type.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{type.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-foreground rounded-full"
                            style={{ width: `${(type.completed / type.exercises) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {type.completed}/{type.exercises}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Recent Exercises */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Exercises</h3>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {pastExercises.map((exercise, i) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    className="flex items-center gap-4 p-4 rounded-xl glass-subtle"
                  >
                    <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{exercise.title}</h4>
                      <p className="text-xs text-muted-foreground">{exercise.type}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-medium">{exercise.score}</div>
                      <div className="text-[10px] text-muted-foreground">{exercise.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl glass-subtle hover:bg-white/5 transition-colors text-sm">
                <Play className="w-4 h-4" />
                Practice More
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
