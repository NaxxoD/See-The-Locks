"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"

interface Level6Props {
  onValidate: () => void
}

const steps = [
  { label: 'MDP: "Bonjour"', color: "text-text-primary" },
  { label: '+ Salt: "k9x2"', color: "text-accent-blue" },
  { label: "+ Pepper: [secret]", color: "text-accent-warning" },
  { label: "Hash 100 000 fois ⟳", color: "text-accent-green" },
  { label: "$2b$12$kF3x...", color: "text-accent-green" },
]

export function Level6({ onValidate }: Level6Props) {
  const [animating, setAnimating] = useState(false)
  const [visibleStep, setVisibleStep] = useState(-1)
  const [showTiming, setShowTiming] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimeouts = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []
  }, [])

  useEffect(() => {
    return () => clearTimeouts()
  }, [clearTimeouts])

  const runAnimation = () => {
    clearTimeouts()
    setAnimating(true)
    setVisibleStep(-1)
    setShowTiming(false)

    steps.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleStep(i)
        if (i === steps.length - 1) {
          const t2 = setTimeout(() => {
            setShowTiming(true)
            setAnimating(false)
          }, 600)
          timeoutRef.current.push(t2)
        }
      }, (i + 1) * 600)
      timeoutRef.current.push(t)
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Lesson */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-accent-green flex items-center gap-2">
          <span className="text-lg">{"📖"}</span> La vraie protection : KDF
        </h2>
        <div className="flex flex-col gap-3 text-text-secondary text-sm leading-relaxed">
          <p>
            <span className="text-text-primary font-medium">
              Key Derivation Function
            </span>{" "}
            combine :
          </p>
          <ul className="flex flex-col gap-1">
            <li>{"✅"} Hash</li>
            <li>{"✅"} Salt</li>
            <li>{"✅"} Pepper</li>
            <li>{"✅"} Lenteur volontaire</li>
          </ul>
          <p>
            Exemples :{" "}
            <span className="text-accent-green font-mono">bcrypt</span>,{" "}
            <span className="text-accent-green font-mono">Argon2</span>
          </p>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-text-primary font-medium">Principe :</p>
            <p className="text-text-muted">Hash 100 000 fois</p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>
                {"•"} Pour toi : +0.1s → invisible
              </li>
              <li>
                {"•"} Pour attaquant : +millions d{"'"}heures
              </li>
            </ul>
          </div>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-text-primary font-medium">Comparaison :</p>
            <ul className="flex flex-col gap-1 text-text-muted text-xs">
              <li>SHA-256 simple : 1 milliard de hashs en 10 secondes</li>
              <li>bcrypt : 1 milliard de hashs en 3 ans</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        <button
          onClick={runAnimation}
          disabled={animating}
          className="px-6 py-3 bg-accent-blue text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {animating ? "Animation en cours..." : "Voir l'animation KDF"}
        </button>

        {visibleStep >= 0 && (
          <div className="bg-bg-primary/50 p-6 rounded-xl border border-border-light flex flex-col items-center gap-0">
            {steps.map((step, i) => {
              if (i > visibleStep) return null
              return (
                <div key={i} className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {i > 0 && (
                    <div className="text-text-muted text-lg my-1">{"↓"}</div>
                  )}
                  <div
                    className={`font-mono text-lg ${step.color} ${
                      i === steps.length - 1 && i === visibleStep
                        ? "text-2xl font-bold"
                        : ""
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {showTiming && (
          <div className="bg-bg-primary/50 p-5 rounded-xl border border-border-light flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Temps pour 1 MDP</span>
              <span className="text-accent-green font-mono font-bold">
                0.1 seconde
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">
                Temps pour 1 milliard
              </span>
              <span className="text-error font-mono font-bold">3 ans</span>
            </div>
          </div>
        )}

        {showTiming && (
          <button
            onClick={onValidate}
            className="self-end px-6 py-3 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50 animate-in fade-in duration-300"
          >
            Valider ce niveau
          </button>
        )}
      </div>
    </div>
  )
}
