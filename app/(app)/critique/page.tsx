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
  Loader2
} from "lucide-react"

type CritiqueCategory = {
  id: string
  title: string
  icon: React.ElementType
  score: number
  feedback: string
  suggestions: string[]
}

const mockCritique: CritiqueCategory[] = [
  {
    id: "composition",
    title: "Composition",
    icon: Camera,
    score: 78,
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
    feedback: "There is genuine feeling in this image. The viewer can sense the atmosphere. The subtle expression and body language communicate effectively.",
    suggestions: [
      "Wait for peak emotional moments",
      "Build rapport with subjects",
      "Trust your instincts on timing"
    ]
  },
]

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
    // Simulate AI analysis
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium">AI Critique</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Get detailed feedback on your photographs
              </p>
            </div>
            
            {image && (
              <button
                onClick={resetUpload}
                className="flex items-center gap-2 px-4 py-2 glass-subtle rounded-full text-sm font-medium hover:bg-white/5 transition-colors"
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
                  className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                    isDragging 
                      ? "border-foreground bg-foreground/5" 
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="w-16 h-16 mx-auto rounded-full glass-card flex items-center justify-center mb-6">
                    <ImageIcon className="w-7 h-7 text-muted-foreground" />
                  </div>
                  
                  <h2 className="text-2xl font-medium">
                    Drop your photo here
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    or click to browse your files
                  </p>
                  
                  <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <span>JPG, PNG, HEIC</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>Max 20MB</span>
                  </div>
                </div>

                {/* Recent critiques */}
                <div className="mt-12">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Critiques</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <button
                        key={i}
                        className="aspect-square rounded-xl overflow-hidden glass-subtle hover:ring-1 hover:ring-foreground/20 transition-all"
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=200&h=200&fit=crop`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
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
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card">
                    <img
                      src={image}
                      alt="Uploaded photo"
                      className="w-full h-full object-contain"
                    />
                    
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto rounded-full glass-card flex items-center justify-center mb-4">
                            <Loader2 className="w-6 h-6 animate-spin" />
                          </div>
                          <p className="font-medium">Analyzing your image...</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            This usually takes a few seconds
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={resetUpload}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Overall Score */}
                  {critique && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Overall Score</p>
                          <p className="text-4xl font-medium gradient-text mt-1">{overallScore}</p>
                        </div>
                        
                        <div className="w-20 h-20 relative">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="40"
                              cy="40"
                              r="36"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="text-secondary"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="36"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeDasharray={`${(overallScore / 100) * 226} 226`}
                              strokeLinecap="round"
                              className="text-foreground"
                            />
                          </svg>
                          <Sparkles className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      
                      <p className="mt-4 text-sm text-muted-foreground">
                        This is a strong photograph with excellent lighting. Focus on storytelling 
                        to take your work to the next level.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Critique Categories */}
                {critique && (
                  <div className="space-y-3">
                    <h2 className="font-medium mb-4">Detailed Feedback</h2>
                    
                    {critique.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedCategory(
                            expandedCategory === category.id ? null : category.id
                          )}
                          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center">
                              <category.icon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium text-sm">{category.title}</h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-foreground rounded-full"
                                    style={{ width: `${category.score}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{category.score}</span>
                              </div>
                            </div>
                          </div>
                          
                          {expandedCategory === category.id ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                              <div className="p-4 pt-0 border-t border-border/50">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {category.feedback}
                                </p>
                                
                                <div className="mt-4">
                                  <p className="text-xs font-medium text-muted-foreground mb-2">
                                    Suggestions
                                  </p>
                                  <ul className="space-y-2">
                                    {category.suggestions.map((suggestion, i) => (
                                      <li 
                                        key={i}
                                        className="flex items-start gap-2 text-sm"
                                      >
                                        <span className="text-foreground/60 mt-1">-</span>
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
                    ))}
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
