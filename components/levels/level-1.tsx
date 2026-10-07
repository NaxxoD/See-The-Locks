"use client"

import React, { useState, useEffect } from "react"
import {
  calculateEntropy,
  calculatePasswordScore,
  estimateCrackTime,
} from "@/lib/crypto"

interface Level1Props {
  demoMode: boolean
  onValidate: () => void
}

export function Level1({ demoMode, onValidate }: Level1Props) {
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (demoMode) setPassword("Soleil123")
    else setPassword("")
  }, [demoMode])

  const entropy = calculateEntropy(password)
  const score = calculatePasswordScore(password)
  const crackTime = estimateCrackTime(entropy)
  const lower = (password.match(/[a-z]/g) || []).length
  const upper = (password.match(/[A-Z]/g) || []).length
  const digits = (password.match(/[0-9]/g) || []).length
  const special = (password.match(/[^a-zA-Z0-9]/g) || []).length

  const scoreColor =
    score < 40
      ? "text-error"
      : score < 70
        ? "text-accent-warning"
        : "text-accent-green"
  const scoreBg =
    score < 40
      ? "bg-error"
      : score < 70
        ? "bg-accent-warning"
        : "bg-accent-green"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Lesson */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-accent-green flex items-center gap-2">
          <span className="text-lg">{"📖"}</span> Le probleme : Pourquoi
          {"'"}azerty123{"'"} est nul ?
        </h2>
        <div className="flex flex-col gap-3 text-text-secondary text-sm leading-relaxed">
          <p>
            Un mot de passe n{"'"}est pas fort parce qu{"'"}il contient des
            symboles. Il est fort parce qu{"'"}il est{" "}
            <span className="text-accent-green font-semibold">
              IMPREVISIBLE
            </span>
            .
          </p>
          <p>
            L{"'"}entropie mesure cette imprevisibilite en bits. Plus c{"'"}est
            haut, plus un attaquant doit essayer de combinaisons.
          </p>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-text-primary font-medium">
              Exemples de MDP faibles :
            </p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>
                {"•"} Dictionnaire : password, soleil
              </li>
              <li>
                {"•"} Sequences : 123456, qwerty
              </li>
              <li>
                {"•"} Dates : 15061990
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        <div>
          <label
            htmlFor="password-input"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Entrez un mot de passe
          </label>
          <input
            id="password-input"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary font-mono text-lg focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
            placeholder="Tapez un mot de passe..."
            aria-label="Entrez un mot de passe pour analyser"
          />
        </div>

        {password.length > 0 && (
          <div className="flex flex-col gap-4 bg-bg-primary/50 p-5 rounded-xl border border-border-light animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Longueur</span>
                <span className="text-text-primary font-mono">
                  {password.length} caracteres
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Minuscules</span>
                <span className="text-text-primary font-mono">{lower}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Majuscules</span>
                <span className="text-text-primary font-mono">{upper}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Chiffres</span>
                <span className="text-text-primary font-mono">{digits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Speciaux</span>
                <span className="text-text-primary font-mono">{special}</span>
              </div>
            </div>

            <div className="h-px bg-border-light" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Entropie</span>
                <span className="text-accent-green font-bold text-2xl font-mono">
                  {entropy} bits
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Score</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${scoreBg} rounded-full transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className={`font-bold font-mono ${scoreColor}`}>
                    {score}/100
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">
                  Temps de crack
                </span>
                <span className="text-accent-blue font-medium font-mono text-sm">
                  {crackTime}
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onValidate}
          className="self-end px-6 py-3 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50"
        >
          Valider ce niveau
        </button>
      </div>
    </div>
  )
}
