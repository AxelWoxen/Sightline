"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Camera, Check } from "lucide-react"
import { OnboardingHeader } from "./onboarding-header"
import { OnboardingData } from "@/app/page"

const cameras = [
  { id: "sony-a7iv", brand: "Sony", model: "A7 IV", type: "Full Frame" },
  { id: "sony-a7rv", brand: "Sony", model: "A7R V", type: "Full Frame" },
  { id: "canon-r5", brand: "Canon", model: "EOS R5", type: "Full Frame" },
  { id: "canon-r6ii", brand: "Canon", model: "EOS R6 II", type: "Full Frame" },
  { id: "nikon-z8", brand: "Nikon", model: "Z8", type: "Full Frame" },
  { id: "nikon-z6iii", brand: "Nikon", model: "Z6 III", type: "Full Frame" },
  { id: "fuji-xh2", brand: "Fujifilm", model: "X-H2", type: "APS-C" },
  { id: "fuji-xt5", brand: "Fujifilm", model: "X-T5", type: "APS-C" },
  { id: "leica-m11", brand: "Leica", model: "M11", type: "Full Frame" },
  { id: "hasselblad-x2d", brand: "Hasselblad", model: "X2D 100C", type: "Medium Format" },
  { id: "phone", brand: "Smartphone", model: "Any", type: "Mobile" },
  { id: "film", brand: "Film Camera", model: "Various", type: "Analog" },
]

const lenses = [
  { id: "24mm", name: "24mm", type: "Wide" },
  { id: "35mm", name: "35mm", type: "Classic" },
  { id: "50mm", name: "50mm", type: "Standard" },
  { id: "85mm", name: "85mm", type: "Portrait" },
  { id: "24-70mm", name: "24-70mm", type: "Zoom" },
  { id: "70-200mm", name: "70-200mm", type: "Telephoto" },
]

const experienceLevels = [
  { id: "beginner", label: "Beginner", description: "Just starting out with photography" },
  { id: "intermediate", label: "Intermediate", description: "Comfortable with basics, ready to grow" },
  { id: "advanced", label: "Advanced", description: "Strong foundation, refining my craft" },
  { id: "professional", label: "Professional", description: "Working photographer seeking mastery" },
]

type Props = {
  camera: string
  lenses: string[]
  experience: string
  onUpdate: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function CameraStep({ camera, lenses: selectedLenses, experience, onUpdate, onNext, onBack }: Props) {
  const toggleLens = (id: string) => {
    if (selectedLenses.includes(id)) {
      onUpdate({ lenses: selectedLenses.filter((l) => l !== id) })
    } else {
      onUpdate({ lenses: [...selectedLenses, id] })
    }
  }

  const isComplete = camera && selectedLenses.length > 0 && experience

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader step={3} totalSteps={4} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full space-y-16"
        >
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-balance">
              Your gear & experience
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Help us tailor lessons to your setup
            </p>
          </div>

          {/* Camera Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-muted-foreground" />
              Camera Body
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {cameras.map((cam, index) => (
                <motion.button
                  key={cam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => onUpdate({ camera: cam.id })}
                  className={`group relative p-4 rounded-xl border text-left transition-all duration-300 ${
                    camera === cam.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  {camera === cam.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-4 h-4 bg-foreground rounded-full flex items-center justify-center"
                    >
                      <Check className="w-2.5 h-2.5 text-background" />
                    </motion.div>
                  )}
                  <div className="text-xs text-muted-foreground mb-1">{cam.brand}</div>
                  <div className="font-medium text-sm">{cam.model}</div>
                  <div className="text-xs text-muted-foreground/70 mt-1">{cam.type}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Lens Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Favorite Focal Lengths</h3>
            <div className="flex flex-wrap gap-3">
              {lenses.map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => toggleLens(lens.id)}
                  className={`px-5 py-3 rounded-xl border transition-all duration-300 ${
                    selectedLenses.includes(lens.id)
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="font-medium text-sm">{lens.name}</div>
                  <div className="text-xs text-muted-foreground">{lens.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <h3 className="text-lg font-medium mb-4">Experience Level</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => onUpdate({ experience: level.id })}
                  className={`p-5 rounded-xl border text-left transition-all duration-300 ${
                    experience === level.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={onNext}
            disabled={!isComplete}
            className="group flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create My Journey
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
