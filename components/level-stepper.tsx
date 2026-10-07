"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface LevelStepperProps {
  currentLevel: number
  completedLevels: number[]
  onNavigate: (level: number) => void
}

const levelNames = [
  "Fondations",
  "Entropie",
  "Attaques",
  "Hash",
  "Salt/Pepper",
  "Chiffrement",
  "KDF",
]

export function LevelStepper({
  currentLevel,
  completedLevels,
  onNavigate,
}: LevelStepperProps) {
  return (
    <nav
      className="w-full overflow-x-auto py-2 scrollbar-none"
      aria-label="Progression des niveaux"
    >
      <div className="flex items-center gap-0 min-w-max mx-auto justify-center">
        {levelNames.map((name, i) => {
          const isCompleted = completedLevels.includes(i)
          const isCurrent = currentLevel === i
          const isAccessible =
            i === 0 ||
            completedLevels.includes(i) ||
            completedLevels.includes(i - 1)

          return (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div
                  className={cn(
                    "w-6 md:w-10 h-0.5",
                    isCompleted || isCurrent
                      ? "bg-accent-green"
                      : "bg-border-light"
                  )}
                />
              )}
              <button
                onClick={() => isAccessible && onNavigate(i)}
                disabled={!isAccessible}
                className={cn(
                  "flex flex-col items-center gap-1 group transition-all duration-200",
                  !isAccessible && "opacity-40 cursor-not-allowed"
                )}
                aria-label={`Niveau ${i}: ${name}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    isCurrent
                      ? "bg-accent-green text-bg-primary ring-2 ring-accent-green/30 ring-offset-2 ring-offset-bg-primary scale-110"
                      : isCompleted
                        ? "bg-accent-green/20 text-accent-green"
                        : "bg-bg-tertiary text-text-muted"
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    i
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] md:text-xs whitespace-nowrap transition-colors",
                    isCurrent
                      ? "text-accent-green font-semibold"
                      : "text-text-muted"
                  )}
                >
                  {name}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
