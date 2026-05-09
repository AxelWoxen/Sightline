"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const heroImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1200&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80",
]

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images with crossfade */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <motion.div
            key={img}
            initial={false}
            animate={{ 
              opacity: i === currentImage ? 0.4 : 0,
              scale: i === currentImage ? 1.05 : 1,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-foreground" />
              </div>
              <span className="text-lg font-medium tracking-tight">Sightline</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]"
            >
              <span className="gradient-text">Learn to see</span>
              <br />
              <span className="text-muted-foreground">like a master</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Your AI-powered photography mentor. Build technical mastery, 
              develop your unique vision, and join a community of visual storytellers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={onNext}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium text-base hover:bg-foreground/90 transition-all duration-300"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-subtle rounded-full font-medium text-base hover:bg-white/5 transition-all duration-300">
                Watch Preview
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 flex items-center gap-8"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=80&h=80&fit=crop&crop=face`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-medium">12,000+ photographers</div>
                <div className="text-muted-foreground">are on their journey</div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { value: "6 mo", label: "Personalized journey", desc: "Tailored to your goals" },
              { value: "50+", label: "Master studies", desc: "Learn from legends" },
              { value: "Weekly", label: "AI critiques", desc: "Detailed feedback" },
              { value: "Daily", label: "Vision exercises", desc: "Train your eye" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="text-3xl font-medium gradient-text">{stat.value}</div>
                <div className="mt-2 font-medium text-sm">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === currentImage ? "w-8 bg-foreground" : "w-2 bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
