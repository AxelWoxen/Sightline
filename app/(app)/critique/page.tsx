"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"
import { 
  Upload, 
  X, 
  Sparkles,
  Camera,
  Sun,
  Palette,
  Heart,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Loader2,
  Zap,
  Settings2
} from "lucide-react"

type CritiqueCategory = {
  id: string
  title: string
  icon: React.ElementType
  score: number
  feedback: string
  suggestions: string[]
  color: string
}

const mockCritique: CritiqueCategory[] = [
  {
    id: "composition",
    title: "Composition",
    icon: Camera,
    score: 78,
    color: "blue",
    feedback: "Strong use of leading lines drawing the eye toward the subject. The placement slightly off-center creates natural tension. Consider exploring negative space more intentionally in future shots.",
    suggestions: [
      "Try positioning the subject at the intersection of thirds",
      "Experiment with more dramatic cropping",
      "Use foreground elements to add depth"
    ]
  },
  {
    id: "lighting",
    title: "Lighting",
    icon: Sun,
    score: 85,
    color: "amber",
    feedback: "Beautiful soft light quality with pleasing shadows. The golden hour timing works exceptionally well here. The subtle rim lighting adds dimension to the subject.",
    suggestions: [
      "Consider fill light for shadow detail",
      "Explore backlighting for silhouette effects",
      "Try shooting in overcast conditions for softer portraits"
    ]
  },
  {
    id: "editing",
    title: "Editing & Color",
    icon: Palette,
    score: 72,
    color: "purple",
    feedback: "Clean editing with a cohesive color palette. The warmth suits the mood. Shadows could use slightly more detail, and highlights are close to clipping in some areas.",
    suggestions: [
      "Pull back highlights by 10-15%",
      "Add subtle luminosity masking",
      "Consider a more intentional color grade"
    ]
  },
  {
    id: "story",
    title: "Storytelling",
    icon: MessageSquare,
    score: 68,
    color: "teal",
    feedback: "The image evokes a contemplative mood but could benefit from more context. The viewer is left wondering about the narrative. Consider what story you want to tell.",
    suggestions: [
      "Include environmental context",
      "Capture decisive moments",
      "Think about the before and after"
    ]
  },
  {
    id: "emotion",
    title: "Emotional Impact",
    icon: Heart,
    score: 81,
    color: "rose",
    feedback: "There is genuine feeling in this image. The viewer can sense the atmosphere. The subtle expression and body language communicate effectively.",
    suggestions: [
      "Wait for peak emotional moments",
      "Build rapport with subjects",
      "Trust your instincts on timing"
    ]
  },
  {
    id: "technical",
    title: "Technical Settings",
    icon: Settings2,
    score: 75,
    color: "slate",
    feedback: "Good exposure and focus. Depth of field choice supports the subject isolation. Consider experimenting with longer exposures or different apertures for creative effects.",
    suggestions: [
      "Try f/2.8 for more subject isolation",
      "Experiment with motion blur at 1/30s",
      "Consider focus stacking for landscapes"
    ]
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  teal: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
  rose: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/30" },
  slate: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30" },
}

export default function CritiquePage() {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [critique, setCritique] = useState<CritiqueCategory[] | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("composition")

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        analyzPhoto()
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        analyzPhoto()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzPhoto = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setCritique(mockCritique)
    }, 3000)
  }

  const resetUpload = () => {
    setImage(null)
    setCritique(null)
    setExpandedCategory("composition")
  }

  const overallScore = critique 
    ? Math.round(critique.reduce((sum, c) => sum + c.score, 0) / critique.length) 
    : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">AI Critique</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Get detailed feedback on your photographs
              </p>
            </div>
            
            {image && (
              <button
                onClick={resetUpload}
                className="flex items-center gap-2 px-5 py-2.5 glass-subtle rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                <Upload className="w-4 h-4" />
                New Upload
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!image ? (
              /* Upload Area */
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
                    isDragging 
                      ? "border-accent bg-accent/5 scale-[1.02]" 
                      : "border-border hover:border-muted-foreground/50 hover:bg-secondary/30"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <motion.div 
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-6"
                  >
                    <ImageIcon className="w-9 h-9 text-accent" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-semibold">
                    Drop your photo here
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    or click to browse your files
                  </p>
                  
                  <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <span className="px-3 py-1 rounded-full bg-secondary">JPG</span>
                    <span className="px-3 py-1 rounded-full bg-secondary">PNG</span>
                    <span className="px-3 py-1 rounded-full bg-secondary">HEIC</span>
                    <span className="text-xs">Max 20MB</span>
                  </div>
                </div>

                {/* Recent critiques */}
                <div className="mt-12">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Critiques</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop"
                    ].map((img, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="aspect-square rounded-xl overflow-hidden ring-1 ring-border hover:ring-2 hover:ring-accent/50 transition-all group"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Analysis View */
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Image Preview */}
                <div className="space-y-6">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card ring-1 ring-border">
                    <img
                      src={image}
                      alt="Uploaded photo"
                      className="w-full h-full object-contain"
                    />
                    
                    {isAnalyzing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                            <Loader2 className="w-7 h-7 animate-spin text-accent" />
                          </div>
                          <p className="font-semibold text-lg">Analyzing your image...</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            AI is examining composition, light, and emotion
                          </p>
                          <div className="mt-4 flex items-center justify-center gap-2">
                            {["Composition", "Light", "Color", "Story"].map((item, i) => (
                              <motion.span
                                key={item}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ delay: i * 0.5, duration: 2, repeat: Infinity }}
                                className="text-xs px-2 py-1 rounded-full bg-secondary"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <button
                      onClick={resetUpload}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Overall Score */}
                  {critique && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card rounded-2xl p-6 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                      <div className="relative flex items-center gap-6">
                        <div className="w-24 h-24 relative">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="42"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="6"
                              className="text-secondary"
                            />
                            <motion.circle
                              cx="48"
                              cy="48"
                              r="42"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="6"
                              strokeLinecap="round"
                              className="text-accent"
                              initial={{ strokeDasharray: "0 264" }}
                              animate={{ strokeDasharray: `${(overallScore / 100) * 264} 264` }}
                              transition={{ delay: 0.5, duration: 1 }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{overallScore}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Overall Score</p>
                          <p className="font-semibold text-lg mt-1">Strong photograph with excellent lighting</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Focus on storytelling to take your work to the next level.
                          </p>
                        </div>

                        <Sparkles className="w-8 h-8 text-accent/50" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Critique Categories */}
                {critique && (
                  <div className="space-y-4">
                    <h2 className="font-semibold text-lg mb-6">Detailed Feedback</h2>
                    
                    {critique.map((category, index) => {
                      const colors = colorClasses[category.color]
                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className={`glass-card rounded-xl overflow-hidden border ${expandedCategory === category.id ? colors.border : "border-transparent"}`}
                        >
                          <button
                            onClick={() => setExpandedCategory(
                              expandedCategory === category.id ? null : category.id
                            )}
                            className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}>
                                <category.icon className={`w-5 h-5 ${colors.text}`} />
                              </div>
                              <div className="text-left">
                                <h3 className="font-medium">{category.title}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${category.score}%` }}
                                      transition={{ delay: index * 0.1 + 0.3 }}
                                      className={`h-full rounded-full ${colors.bg.replace('/20', '')}`}
                                      style={{ backgroundColor: `var(--${category.color}-500)` }}
                                    />
                                  </div>
                                  <span className={`text-sm font-medium ${colors.text}`}>{category.score}</span>
                                </div>
                              </div>
                            </div>
                            
                            {expandedCategory === category.id ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {expandedCategory === category.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-5 pt-0 border-t border-border/50">
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {category.feedback}
                                  </p>
                                  
                                  <div className="mt-5">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                      Suggestions to improve
                                    </p>
                                    <ul className="space-y-2">
                                      {category.suggestions.map((suggestion, i) => (
                                        <li 
                                          key={i}
                                          className="flex items-start gap-3 text-sm p-3 rounded-lg bg-secondary/30"
                                        >
                                          <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${colors.text}`} />
                                          {suggestion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
