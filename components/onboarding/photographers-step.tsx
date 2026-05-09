"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Plus, Search } from "lucide-react"
import { useState } from "react"
import { OnboardingHeader } from "./onboarding-header"

const photographers = [
  {
    id: "fan-ho",
    name: "Fan Ho",
    era: "1931–2016",
    style: "Hong Kong street poetry",
    image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&q=80"
  },
  {
    id: "vivian-maier",
    name: "Vivian Maier",
    era: "1926–2009",
    style: "Street photography",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
  },
  {
    id: "ansel-adams",
    name: "Ansel Adams",
    era: "1902–1984",
    style: "Landscape master",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80"
  },
  {
    id: "henri-cartier",
    name: "Henri Cartier-Bresson",
    era: "1908–2004",
    style: "Decisive moment",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80"
  },
  {
    id: "dorothea-lange",
    name: "Dorothea Lange",
    era: "1895–1965",
    style: "Documentary",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
  },
  {
    id: "sebastiao-salgado",
    name: "Sebastiao Salgado",
    era: "1944–present",
    style: "Social documentary",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    id: "annie-leibovitz",
    name: "Annie Leibovitz",
    era: "1949–present",
    style: "Portrait & celebrity",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
  },
  {
    id: "hiroshi-sugimoto",
    name: "Hiroshi Sugimoto",
    era: "1948–present",
    style: "Conceptual & minimal",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&q=80"
  },
]

type Props = {
  selected: string[]
  onUpdate: (photographers: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function PhotographersStep({ selected, onUpdate, onNext, onBack }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const togglePhotographer = (id: string) => {
    if (selected.includes(id)) {
      onUpdate(selected.filter((p) => p !== id))
    } else {
      onUpdate([...selected, id])
    }
  }

  const filteredPhotographers = photographers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.style.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader step={3} totalSteps={4} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl w-full"
        >
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-medium tracking-tight"
            >
              <span className="gradient-text">Who moves you?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-muted-foreground text-lg"
            >
              Choose the masters whose work speaks to your soul
            </motion.p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search photographers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl glass-subtle text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotographers.map((photographer, index) => (
              <motion.button
                key={photographer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 + 0.3 }}
                onClick={() => togglePhotographer(photographer.id)}
                className={`group relative flex flex-col items-center p-6 rounded-2xl transition-all duration-500 ${
                  selected.includes(photographer.id)
                    ? "glass-card glow-sm border-foreground/20"
                    : "glass-subtle hover:bg-white/5"
                }`}
              >
                {selected.includes(photographer.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-background" />
                  </motion.div>
                )}

                <div className={`w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 transition-all duration-500 ${
                  selected.includes(photographer.id) ? "ring-foreground/50" : "ring-border"
                }`}>
                  <img
                    src={photographer.image}
                    alt={photographer.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      selected.includes(photographer.id) ? "grayscale-0 scale-110" : "grayscale group-hover:grayscale-0"
                    }`}
                  />
                </div>
                
                <h3 className="font-medium text-sm text-center">{photographer.name}</h3>
                <p className="text-muted-foreground text-xs mt-1">{photographer.era}</p>
                <p className="text-muted-foreground/70 text-xs mt-1 text-center">{photographer.style}</p>
              </motion.button>
            ))}

            {/* Add custom photographer */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: photographers.length * 0.04 + 0.3 }}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl glass-subtle hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                <Plus className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Add your own
              </h3>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Someone we missed?
              </p>
            </motion.button>
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
