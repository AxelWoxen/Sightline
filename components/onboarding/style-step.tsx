"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { OnboardingHeader } from "./onboarding-header"

const styles = [
  {
    id: "street",
    name: "Street",
    description: "Urban life & candid moments",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=600&q=80"
  },
  {
    id: "portrait",
    name: "Portrait",
    description: "Human expression & emotion",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
  },
  {
    id: "landscape",
    name: "Landscape",
    description: "Natural world & vistas",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
  },
  {
    id: "documentary",
    name: "Documentary",
    description: "Stories & truth-telling",
    image: "https://images.unsplash.com/photo-1509027572446-af8401acfdc3?w=600&q=80"
  },
  {
    id: "architecture",
    name: "Architecture",
    description: "Form, light & structure",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80"
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Style & editorial vision",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80"
  },
  {
    id: "fine-art",
    name: "Fine Art",
    description: "Conceptual & expressive",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simplicity & negative space",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
  },
]

type Props = {
  selected: string[]
  onUpdate: (styles: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function StyleStep({ selected, onUpdate, onNext, onBack }: Props) {
  const toggleStyle = (id: string) => {
    if (selected.includes(id)) {
      onUpdate(selected.filter((s) => s !== id))
    } else {
      onUpdate([...selected, id])
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader step={2} totalSteps={4} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full"
        >
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-medium tracking-tight"
            >
              <span className="gradient-text">What draws your eye?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-muted-foreground text-lg"
            >
              Select the styles that speak to your creative soul
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((style, index) => (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                onClick={() => toggleStyle(style.id)}
                className={`group relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 ${
                  selected.includes(style.id)
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-[0.98]"
                    : "hover:scale-[1.02]"
                }`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    selected.includes(style.id) ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <div className={`absolute inset-0 transition-all duration-500 ${
                  selected.includes(style.id)
                    ? "bg-gradient-to-t from-black/90 via-black/40 to-black/20"
                    : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                }`} />
                
                {selected.includes(style.id) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-foreground rounded-full flex items-center justify-center glow-sm"
                  >
                    <Check className="w-4 h-4 text-background" />
                  </motion.div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-medium text-lg">{style.name}</h3>
                  <p className="text-white/60 text-sm mt-1">{style.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="sticky bottom-0 glass px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {selected.length} selected
            </span>
            <button
              onClick={onNext}
              disabled={selected.length === 0}
              className="group flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
