"use client"

import React, { useState, useEffect } from "react"
import { sha256 } from "@/lib/crypto"

interface Level3Props {
  demoMode: boolean
  onValidate: () => void
}

export function Level3({ demoMode, onValidate }: Level3Props) {
  const [input, setInput] = useState("")
  const [hash, setHash] = useState<string | null>(null)
  const [isHashing, setIsHashing] = useState(false)

  useEffect(() => {
    if (demoMode) setInput("Bonjour")
    else setInput("")
    setHash(null)
  }, [demoMode])

  const handleHash = async () => {
    if (input.length === 0) return
    setIsHashing(true)
    const result = await sha256(input)
    setHash(result)
    setIsHashing(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Lesson */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-accent-green flex items-center gap-2">
          <span className="text-lg">{"📖"}</span> Pourquoi on ne stocke JAMAIS
          un MDP en clair
        </h2>
        <div className="flex flex-col gap-3 text-text-secondary text-sm leading-relaxed">
          <p>
            Le hash est une{" "}
            <span className="text-accent-green font-semibold">
              EMPREINTE a sens unique
            </span>
            .
          </p>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-text-primary font-medium">Proprietes :</p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>{"•"} Toujours la meme sortie pour la meme entree</li>
              <li>{"•"} Impossible de retrouver l{"'"}entree</li>
              <li>
                {"•"} Le moindre changement = empreinte differente
              </li>
            </ul>
          </div>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-text-primary font-medium">Exemple :</p>
            <div className="flex flex-col gap-1 text-text-muted font-mono text-xs">
              <p>
                {"'"}Bonjour{"'"} → b1946ac9...
              </p>
              <p>
                {"'"}bonjour{"'"} → c89a5c6f...{" "}
                <span className="text-accent-warning">(totalement different)</span>
              </p>
            </div>
          </div>
          <p>
            Le hash protege les MDP stockes : si la base fuit, l{"'"}attaquant a
            les hashs mais pas les MDP originaux.
          </p>
        </div>
      </div>

      {/* Interaction */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        <div>
          <label
            htmlFor="hash-input"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Entrez un texte
          </label>
          <input
            id="hash-input"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setHash(null)
            }}
            className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary font-mono text-lg focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
            placeholder="Tapez du texte..."
            aria-label="Texte a hasher"
          />
        </div>

        <button
          onClick={handleHash}
          disabled={input.length === 0 || isHashing}
          className="px-6 py-3 bg-accent-blue text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isHashing ? "Hashage..." : "Hasher avec SHA-256"}
        </button>

        {hash && (
          <div className="bg-bg-primary/50 p-5 rounded-xl border border-border-light flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-text-muted text-xs uppercase tracking-wider">
                Texte original
              </span>
              <span className="text-text-primary font-mono">{input}</span>
            </div>
            <div className="h-px bg-border-light" />
            <div className="flex flex-col gap-2">
              <span className="text-text-muted text-xs uppercase tracking-wider">
                Hash SHA-256
              </span>
              <span className="text-accent-green font-mono text-sm break-all leading-relaxed">
                {hash}
              </span>
            </div>
            <p className="text-text-muted text-xs">
              64 caracteres hexadecimaux
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
