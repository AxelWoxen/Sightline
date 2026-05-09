"use client"

import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Camera, Eye, Play, Sparkles, Target, Zap } from "lucide-react"
import { OnboardingData } from "@/app/page"

const journeyMonths = [
  {
    month: 1,
    title: "Foundations",
    subtitle: "Light & Composition",
    description: "Master the fundamentals of exposure, understand light quality, and develop compositional instincts.",
    icon: Eye,
    topics: ["Exposure Triangle", "Natural Light", "Rule of Thirds", "Leading Lines"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80"
  },
  {
    month: 2,
    title: "Technical Mastery",
    subtitle: "Your Camera, Your Voice",
    description: "Deep dive into your specific camera system and learn to make technical decisions instinctively.",
    icon: Camera,
    topics: ["Camera Settings", "Focus Systems", "RAW Processing", "Color Science"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
  },
  {
    month: 3,
    title: "Study the Masters",
    subtitle: "Learning from Legends",
    description: "Analyze the techniques and philosophies of photographers who inspire you.",
    icon: BookOpen,
    topics: ["Compositional Analysis", "Lighting Studies", "Personal Projects", "Photo Essays"],
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
  },
  {
    month: 4,
    title: "Finding Your Eye",
    subtitle: "Developing Personal Style",
    description: "Experiment with different approaches and begin developing your unique visual signature.",
    icon: Sparkles,
    topics: ["Style Exploration", "Editing Philosophy", "Visual Consistency", "Portfolio Building"],
    image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80"
  },
  {
    month: 5,
    title: "Advanced Techniques",
    subtitle: "Pushing Boundaries",
    description: "Explore advanced concepts and techniques specific to your chosen genres.",
    icon: Zap,
    topics: ["Genre Deep-Dive", "Complex Lighting", "Post-Processing", "Creative Vision"],
    image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=800&q=80"
  },
  {
    month: 6,
    title: "The Complete Artist",
    subtitle: "Integration & Exhibition",
    description: "Synthesize everything you have learned and present your work to the world.",
    icon: Target,
    topics: ["Portfolio Curation", "Artist Statement", "Exhibition Prep", "Next Steps"],
    image: "https://images.unsplash.com/photo-1513031300226-c8fb12de9ade?w=800&q=80"
  },
]

type Props = {
  data: OnboardingData
  onBack: () => void
  onComplete: () => void
}

export function JourneyStep({ data, onBack, onComplete }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-foreground" />
            </div>
            <span className="text-sm font-medium">Sightline</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <div className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium">Your Personalized Journey</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
              <span className="gradient-text">6 months to</span>
              <br />
              <span className="text-muted-foreground">transform your vision</span>
            </h1>
            
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              Based on your interests in {data.styles.length} styles and {data.photographers.length} master 
              photographers, we&apos;ve crafted a journey uniquely yours.
            </p>
          </motion.div>

          {/* Journey Timeline - Horizontal scroll on mobile, grid on desktop */}
          <div className="relative mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journeyMonths.map((month, index) => (
                <motion.div
                  key={month.month}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden glass-card hover:glow-sm transition-all duration-500"
                >
                  {/* Image header */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={month.image}
                      alt={month.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Month badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium">
                      Month {month.month}
                    </div>
                    
                    {/* Icon */}
                    <div className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index === 0 
                        ? "bg-foreground text-background" 
                        : "glass"
                    }`}>
                      <month.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-medium">{month.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{month.subtitle}</p>
                    <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                      {month.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {month.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                      {month.topics.length > 3 && (
                        <span className="px-2.5 py-1 text-xs text-muted-foreground">
                          +{month.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="relative p-10 sm:p-14 rounded-3xl glass-card glow-accent overflow-hidden">
              {/* Background pattern */}
              <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />
              
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-medium">
                  <span className="gradient-text">Ready to begin?</span>
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                  Your first lesson awaits. Start with the fundamentals and build 
                  towards mastery, one frame at a time.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={onComplete}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    Start Month 1
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-6 py-4 glass-subtle rounded-full font-medium text-sm hover:bg-white/5 transition-all">
                    Preview curriculum
                  </button>
                </div>

                <p className="mt-8 text-xs text-muted-foreground">
                  Cancel or pause anytime. Your progress is always saved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
