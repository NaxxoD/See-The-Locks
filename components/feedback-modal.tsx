"use client"

import React, { useState, useEffect, useCallback } from "react"

interface FeedbackModalProps {
  open: boolean
  demoMode: boolean
  onClose: () => void
}

const levels = [
  "Niveau 1 — Entropie",
  "Niveau 2 — Attaques",
  "Niveau 3 — Hash",
  "Niveau 4 — Salt/Pepper",
  "Niveau 5 — Chiffrement",
  "Niveau 6 — KDF",
]

const comprehensionOptions = [
  "Oui, facilement",
  "Oui, avec hesitation",
  "Pas vraiment",
  "Non, encore confus",
]

const timeOptions = ["< 30 min", "30-45 min", "45-60 min", "> 1h"]

export function FeedbackModal({ open, demoMode, onClose }: FeedbackModalProps) {
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("")
  const [q3, setQ3] = useState("")
  const [q4, setQ4] = useState("")
  const [q5, setQ5] = useState(7)
  const [q6, setQ6] = useState("")
  const [copied, setCopied] = useState(false)

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

  const handleCopy = async () => {
    const now = new Date()
    const date = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    const text = `═══════════════════════════════════════════
FEEDBACK SEE THE LOCKS V1
Date : ${date}
═══════════════════════════════════════════
1. Hash vs chiffrement : ${q1 || "Non repondu"}
2. Niveau le plus clair : ${q2 || "Non repondu"}
3. Niveau le plus confus : ${q3 || "Non repondu"}
4. Temps : ${q4 || "Non repondu"}
5. Recommandation : ${q5}/10
6. Commentaires : ${q6 || "Aucun"}
═══════════════════════════════════════════`

    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Formulaire de feedback"
    >
      <div className="bg-bg-secondary rounded-2xl border border-border-light p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-5 animate-in zoom-in-95 duration-200">
        {copied ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <span className="text-4xl">{"✅"}</span>
            <p className="text-accent-green font-semibold text-lg">
              Reponses copiees !
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-text-primary">
              {"💬"} Aide-nous a ameliorer See The Locks
            </h3>

            {demoMode && (
              <div className="bg-accent-warning/10 text-accent-warning p-3 rounded-lg text-xs">
                {"⚠️"} Ne saisis JAMAIS de vraies donnees
              </div>
            )}

            {/* Q1 */}
            <fieldset className="flex flex-col gap-2">
              <legend className="text-text-secondary text-sm font-medium">
                1. Peux-tu expliquer la difference hash vs chiffrement ?
              </legend>
              <div className="flex flex-col gap-1">
                {comprehensionOptions.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-sm text-text-primary cursor-pointer hover:text-accent-green transition-colors"
                  >
                    <input
                      type="radio"
                      name="q1"
                      value={opt}
                      checked={q1 === opt}
                      onChange={() => setQ1(opt)}
                      className="accent-[#4ade80]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Q2 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="q2"
                className="text-text-secondary text-sm font-medium"
              >
                2. Quel niveau etait le plus clair ?
              </label>
              <select
                id="q2"
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
                className="w-full px-4 py-2 bg-bg-primary border border-border-light rounded-lg text-text-primary text-sm focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
              >
                <option value="">Choisir...</option>
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Q3 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="q3"
                className="text-text-secondary text-sm font-medium"
              >
                3. Quel niveau etait le plus confus ?
              </label>
              <select
                id="q3"
                value={q3}
                onChange={(e) => setQ3(e.target.value)}
                className="w-full px-4 py-2 bg-bg-primary border border-border-light rounded-lg text-text-primary text-sm focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
              >
                <option value="">Choisir...</option>
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
                <option value="Aucun">Aucun</option>
              </select>
            </div>

            {/* Q4 */}
            <fieldset className="flex flex-col gap-2">
              <legend className="text-text-secondary text-sm font-medium">
                4. Le parcours t{"'"}a pris combien de temps ?
              </legend>
              <div className="flex flex-col gap-1">
                {timeOptions.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-sm text-text-primary cursor-pointer hover:text-accent-green transition-colors"
                  >
                    <input
                      type="radio"
                      name="q4"
                      value={opt}
                      checked={q4 === opt}
                      onChange={() => setQ4(opt)}
                      className="accent-[#4ade80]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Q5 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="q5"
                className="text-text-secondary text-sm font-medium"
              >
                5. Tu recommanderais See The Locks ?
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="q5"
                  type="range"
                  min="0"
                  max="10"
                  value={q5}
                  onChange={(e) => setQ5(Number(e.target.value))}
                  className="flex-1 accent-[#4ade80]"
                />
                <span className="text-accent-green font-mono font-bold text-lg min-w-[3rem] text-center">
                  {q5}/10
                </span>
              </div>
            </div>

            {/* Q6 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="q6"
                className="text-text-secondary text-sm font-medium"
              >
                6. Commentaires additionnels (optionnel)
              </label>
              <textarea
                id="q6"
                value={q6}
                onChange={(e) => setQ6(e.target.value)}
                className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary text-sm focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors resize-none"
                rows={3}
                placeholder="Ton avis..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-border-light rounded-lg"
              >
                Passer
              </button>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50"
              >
                {"📋"} Copier les reponses
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
