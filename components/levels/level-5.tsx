"use client"

import React, { useState, useEffect } from "react"
import { caesarCipher, rot13 } from "@/lib/crypto"

interface Level5Props {
  demoMode: boolean
  onValidate: () => void
}

export function Level5({ demoMode, onValidate }: Level5Props) {
  const [input, setInput] = useState("")
  const [algorithm, setAlgorithm] = useState<"caesar" | "rot13">("caesar")
  const [encrypted, setEncrypted] = useState<string | null>(null)

  useEffect(() => {
    if (demoMode) setInput("Message secret")
    else setInput("")
    setEncrypted(null)
  }, [demoMode])

  const handleEncrypt = () => {
    if (input.length === 0) return
    const result = algorithm === "caesar" ? caesarCipher(input, 3) : rot13(input)
    setEncrypted(result)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Lesson */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-accent-green flex items-center gap-2">
          <span className="text-lg">{"📖"}</span> Difference Hash vs
          Chiffrement
        </h2>
        <div className="flex flex-col gap-4 text-text-secondary text-sm leading-relaxed">
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-accent-green font-semibold">HASH</p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>{"•"} Sens unique</li>
              <li>{"•"} Pour STOCKER des MDP</li>
            </ul>
          </div>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-accent-blue font-semibold">CHIFFREMENT</p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>{"•"} Reversible avec cle</li>
              <li>{"•"} Pour PROTEGER des donnees a relire</li>
            </ul>
          </div>
          <p>
            Cesar, ROT13 : exemples pedagogiques
          </p>
          <div className="bg-accent-warning/10 text-accent-warning p-3 rounded-lg text-xs">
            {"⚠️"} Non securises en production. Illustrent le principe de
            transformation reversible.
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        <div>
          <label
            htmlFor="algo-select"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Algorithme
          </label>
          <select
            id="algo-select"
            value={algorithm}
            onChange={(e) => {
              setAlgorithm(e.target.value as "caesar" | "rot13")
              setEncrypted(null)
            }}
            className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
            aria-label="Selectionner un algorithme"
          >
            <option value="caesar">Cesar +3</option>
            <option value="rot13">ROT13</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="encrypt-input"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Entrez un texte
          </label>
          <input
            id="encrypt-input"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setEncrypted(null)
            }}
            className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary font-mono text-lg focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
            placeholder="Tapez du texte..."
            aria-label="Texte a chiffrer"
          />
        </div>

        <button
          onClick={handleEncrypt}
          disabled={input.length === 0}
          className="px-6 py-3 bg-accent-blue text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Chiffrer
        </button>

        {encrypted && (
          <div className="bg-bg-primary/50 p-5 rounded-xl border border-border-light animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Texte original
                </span>
                <span className="text-text-primary font-mono text-lg">
                  {input}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Texte chiffre
                </span>
                <span className="text-accent-green font-mono text-lg">
                  {encrypted}
                </span>
              </div>
            </div>
            <p className="text-text-muted text-xs mt-4">
              {algorithm === "caesar"
                ? "Cesar +3 — Decalage de 3 positions"
                : "ROT13 — Decalage de 13 positions"}
            </p>
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
