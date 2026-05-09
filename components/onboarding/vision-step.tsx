"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { OnboardingHeader } from "./onboarding-header"

const visionQuestions = [
  {
    id: "feeling",
    question: "When you look at a photograph that moves you, what do you feel?",
    subtext: "Choose what resonates most",
    options: [
      { id: "stillness", label: "A sense of stillness", description: "Time seems to pause" },
      { id: "connection", label: "Deep connection", description: "To humanity or nature" },
      { id: "wonder", label: "Wonder", description: "At beauty or mystery" },
      { id: "tension", label: "Creative tension", description: "Conflict or contrast" },
      { id: "nostalgia", label: "Nostalgia", description: "Memory and longing" },
      { id: "energy", label: "Raw energy", description: "Movement and life" },
    ]
  },
  {
    id: "goal",
    question: "What would success look like in 6 months?",
    subtext: "Your personal vision of growth",
    options: [
      { id: "confident", label: "Technical confidence", description: "Know my camera inside out" },
      { id: "style", label: "Recognizable style", description: "People know my work" },
      { id: "stories", label: "Tell better stories", description: "Images that speak" },
      { id: "consistency", label: "Consistent output", description: "Shooting regularly" },
      { id: "exhibit", label: "Ready to exhibit", description: "Portfolio-quality work" },
      { id: "joy", label: "Rediscover joy", description: "Fall in love again" },
    ]
  },
  {
    id: "time",
    question: "How much time can you dedicate weekly?",
    subtext: "Be honest — consistency beats intensity",
    options: [
      { id: "1-2", label: "1-2 hours", description: "Weekend warrior" },
      { id: "3-5", label: "3-5 hours", description: "Dedicated learner" },
      { id: "5-10", label: "5-10 hours", description: "Serious commitment" },
      { id: "10+", label: "10+ hours", description: "All in" },
    ]
  },
]

type Props = {
  answers: Record<string, string>
  onUpdate: (answers: Record<string, string>) => void
  onNext: () => void
  onBack: () => void
}

export function VisionStep({ answers, onUpdate, onNext, onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const question = visionQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === visionQuestions.length - 1
  const currentAnswer = answers[question.id]

  const handleSelect = (optionId: string) => {
    onUpdate({ ...answers, [question.id]: optionId })
    
    // Auto-advance after a short delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
      }, 400)
    }
  }

  const handleContinue = () => {
    if (isLastQuestion) {
      onNext()
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const allAnswered = Object.keys(answers).length === visionQuestions.length

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader 
        step={1} 
        totalSteps={4} 
        onBack={() => currentQuestion > 0 ? setCurrentQuestion(prev => prev - 1) : onBack()} 
      />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-2xl w-full text-center"
          >
            {/* Question counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              {visionQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentQuestion 
                      ? "w-8 bg-foreground" 
                      : i < currentQuestion 
                        ? "w-2 bg-foreground/60" 
                        : "w-2 bg-border"
                  }`}
                />
              ))}
            </motion.div>

            {/* Question */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-balance">
              {question.question}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {question.subtext}
            </p>

            {/* Options */}
            <div className={`mt-12 grid gap-3 ${question.options.length > 4 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
              {question.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  onClick={() => handleSelect(option.id)}
                  className={`group relative p-5 rounded-2xl text-left transition-all duration-300 ${
                    currentAnswer === option.id
                      ? "glass-card border-foreground/30 glow-sm"
                      : "glass-subtle hover:border-foreground/10"
                  }`}
                >
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full transition-all duration-300 ${
                    currentAnswer === option.id ? "bg-foreground scale-100" : "bg-border scale-0"
                  }`} />
                  
                  <h3 className="font-medium text-sm sm:text-base">{option.label}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">{option.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 glass px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {visionQuestions.length}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={!currentAnswer}
            className="group flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLastQuestion && allAnswered ? "Continue" : "Next"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
