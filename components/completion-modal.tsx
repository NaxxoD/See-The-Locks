"use client"

import React, { useEffect, useCallback } from "react"

interface CompletionModalProps {
  open: boolean
  onClose: () => void
  onFeedback: () => void
}

const levels = [
  "Entropie",
  "Attaques",
  "Hash",
  "Salt/Pepper",
  "Chiffrement",
  "KDF",
]

export function CompletionModal({
  open,
  onClose,
  onFeedback,
}: CompletionModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose()
    },
    [open, onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Parcours termine"
    >
      <div className="bg-bg-secondary rounded-2xl border border-border-light p-6 w-full max-w-md flex flex-col gap-5 animate-in zoom-in-95 duration-200">
        <h3 className="text-2xl font-bold text-accent-green">
          {"🎉"} Parcours termine !
        </h3>
        <p className="text-text-secondary text-sm">
          Tu as complete les 6 niveaux !
        </p>

        <div className="flex flex-col gap-2">
          {levels.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-accent-green"
            >
              <span>{"✅"}</span>
              <span>
                Niveau {i + 1} — {name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-border-light rounded-lg"
          >
            Fermer
          </button>
          <button
            onClick={onFeedback}
            className="px-6 py-3 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50"
            autoFocus
          >
            Partager ton feedback
          </button>
        </div>
      </div>
    </div>
  )
}
