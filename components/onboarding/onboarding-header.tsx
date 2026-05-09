"use client"

import { ArrowLeft } from "lucide-react"

type Props = {
  step: number
  totalSteps: number
  onBack: () => void
}

export function OnboardingHeader({ step, totalSteps, onBack }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-foreground" />
            </div>
            <span className="text-sm font-medium">Sightline</span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {step} of {totalSteps}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i < step 
                      ? "w-6 bg-foreground" 
                      : i === step 
                        ? "w-6 bg-foreground/40"
                        : "w-3 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Skip */}
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Skip for now
          </button>
        </div>
      </div>
    </header>
  )
}
