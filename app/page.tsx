"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { WelcomeStep } from "@/components/onboarding/welcome-step"
import { VisionStep } from "@/components/onboarding/vision-step"
import { StyleStep } from "@/components/onboarding/style-step"
import { PhotographersStep } from "@/components/onboarding/photographers-step"
import { JourneyStep } from "@/components/onboarding/journey-step"

export type OnboardingData = {
  vision: Record<string, string>
  styles: string[]
  photographers: string[]
  camera: string
  lenses: string[]
  experience: string
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    vision: {},
    styles: [],
    photographers: [],
    camera: "",
    lenses: [],
    experience: "",
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, 4))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const goToDashboard = () => {
    window.location.href = "/dashboard"
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && <WelcomeStep onNext={nextStep} />}
          {step === 1 && (
            <VisionStep
              answers={data.vision}
              onUpdate={(vision) => updateData({ vision })}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 2 && (
            <StyleStep
              selected={data.styles}
              onUpdate={(styles) => updateData({ styles })}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <PhotographersStep
              selected={data.photographers}
              onUpdate={(photographers) => updateData({ photographers })}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && <JourneyStep data={data} onBack={prevStep} onComplete={goToDashboard} />}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
