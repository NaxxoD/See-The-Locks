"use client"

import React, { useState, useCallback } from "react"
import { LevelStepper } from "@/components/level-stepper"
import { Level0 } from "@/components/levels/level-0"
import { Level1 } from "@/components/levels/level-1"
import { Level2 } from "@/components/levels/level-2"
import { Level3 } from "@/components/levels/level-3"
import { Level4 } from "@/components/levels/level-4"
import { Level5 } from "@/components/levels/level-5"
import { Level6 } from "@/components/levels/level-6"
import { ValidationModal } from "@/components/validation-modal"
import { CompletionModal } from "@/components/completion-modal"
import { FeedbackModal } from "@/components/feedback-modal"
import { RotateCcw } from "lucide-react"

export function SeeTheLocks() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [completedLevels, setCompletedLevels] = useState<number[]>([0])
  const [demoMode, setDemoMode] = useState(false)

  const [validationOpen, setValidationOpen] = useState(false)
  const [validationLevel, setValidationLevel] = useState(1)

  const [completionOpen, setCompletionOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const handleValidate = useCallback((level: number) => {
    setValidationLevel(level)
    setValidationOpen(true)
  }, [])

  const handleValidationSuccess = useCallback(() => {
    setValidationOpen(false)
    const nextLevel = validationLevel + 1

    setCompletedLevels((prev) => {
      const updated = [...new Set([...prev, validationLevel])]
      if (nextLevel <= 6) {
        updated.push(nextLevel)
      }
      return [...new Set(updated)]
    })

    if (validationLevel === 6) {
      setCompletionOpen(true)
    } else {
      setCurrentLevel(nextLevel)
    }
  }, [validationLevel])

  const handleReset = () => {
    if (window.confirm("Recommencer depuis le debut ?")) {
      setCurrentLevel(0)
      setCompletedLevels([0])
      setDemoMode(false)
      setValidationOpen(false)
      setCompletionOpen(false)
      setFeedbackOpen(false)
    }
  }

  const handleCompletionClose = () => {
    setCompletionOpen(false)
    setCurrentLevel(0)
    setCompletedLevels([0])
  }

  const handleFeedbackOpen = () => {
    setCompletionOpen(false)
    setFeedbackOpen(true)
  }

  const handleFeedbackClose = () => {
    setFeedbackOpen(false)
    setCurrentLevel(0)
    setCompletedLevels([0])
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border-light bg-bg-secondary/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1
            className="text-xl font-bold text-text-primary tracking-tight cursor-pointer"
            onClick={() => setCurrentLevel(0)}
          >
            See The Locks
          </h1>

          <div className="flex items-center gap-4">
            {/* Demo Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-text-muted hidden sm:inline">
                Demo
              </span>
              <button
                role="switch"
                aria-checked={demoMode}
                onClick={() => setDemoMode(!demoMode)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-green/50 ${
                  demoMode ? "bg-accent-warning" : "bg-bg-tertiary"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-text-primary transition-transform duration-200 ${
                    demoMode ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </label>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-2 text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-border-light rounded-lg"
              aria-label="Reset session"
              title="Reset session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security warning */}
        <div className="bg-accent-warning/5 border-t border-accent-warning/10 px-4 py-1.5 text-center">
          <p className="text-accent-warning text-[11px]">
            {"⚠️"} Outil pedagogique — Cesar/ROT13 non securises
          </p>
        </div>
      </header>

      {/* Demo mode banner */}
      {demoMode && (
        <div className="bg-accent-warning/10 border-b border-accent-warning/20 px-4 py-2 text-center">
          <p className="text-accent-warning text-sm font-semibold">
            {"⚠️"} MODE DEMO ACTIF
          </p>
        </div>
      )}

      {/* Level Stepper */}
      <div className="border-b border-border-light bg-bg-secondary/30 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <LevelStepper
            currentLevel={currentLevel}
            completedLevels={completedLevels}
            onNavigate={setCurrentLevel}
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {currentLevel === 0 && (
          <Level0 onStart={() => setCurrentLevel(1)} />
        )}
        {currentLevel === 1 && (
          <Level1
            demoMode={demoMode}
            onValidate={() => handleValidate(1)}
          />
        )}
        {currentLevel === 2 && (
          <Level2
            demoMode={demoMode}
            onValidate={() => handleValidate(2)}
          />
        )}
        {currentLevel === 3 && (
          <Level3
            demoMode={demoMode}
            onValidate={() => handleValidate(3)}
          />
        )}
        {currentLevel === 4 && (
          <Level4 onValidate={() => handleValidate(4)} />
        )}
        {currentLevel === 5 && (
          <Level5
            demoMode={demoMode}
            onValidate={() => handleValidate(5)}
          />
        )}
        {currentLevel === 6 && (
          <Level6 onValidate={() => handleValidate(6)} />
        )}
      </main>

      {/* Modals */}
      <ValidationModal
        level={validationLevel}
        open={validationOpen}
        onClose={() => setValidationOpen(false)}
        onSuccess={handleValidationSuccess}
      />
      <CompletionModal
        open={completionOpen}
        onClose={handleCompletionClose}
        onFeedback={handleFeedbackOpen}
      />
      <FeedbackModal
        open={feedbackOpen}
        demoMode={demoMode}
        onClose={handleFeedbackClose}
      />
    </div>
  )
}
