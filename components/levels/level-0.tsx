"use client"

import React from "react"
import { FileText, Hash, Lock } from "lucide-react"

interface Level0Props {
  onStart: () => void
}

const cards = [
  {
    icon: FileText,
    title: "Encodage",
    text: "Transformer des donnees en autre format lisible — pas de secret",
    example: "Base64 : Bonjour → Qm9uam91cg==",
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/20",
  },
  {
    icon: Hash,
    title: "Hashage",
    text: "Empreinte unique et irreversible d'un message",
    example: "SHA-256 : Bonjour → b1946ac9...",
    color: "text-accent-green",
    bg: "bg-accent-green/10",
    border: "border-accent-green/20",
  },
  {
    icon: Lock,
    title: "Chiffrement",
    text: "Proteger un message de facon reversible avec une cle",
    example: "Cesar (+3) : ABC → DEF",
    color: "text-accent-warning",
    bg: "bg-accent-warning/10",
    border: "border-accent-warning/20",
  },
]

export function Level0({ onStart }: Level0Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-12 px-4">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight text-balance">
          See The Locks
        </h1>
        <p className="text-lg text-text-secondary max-w-lg mx-auto text-pretty">
          Apprenez la cryptographie de maniere interactive
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex flex-col gap-4 p-6 rounded-xl border ${card.border} ${card.bg} transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className={`${card.color}`}>
              <card.icon className="w-8 h-8" />
            </div>
            <h2 className={`text-xl font-semibold ${card.color}`}>
              {card.title}
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              {card.text}
            </p>
            <code className="text-xs font-mono bg-bg-primary/50 text-text-muted px-3 py-2 rounded-lg">
              {card.example}
            </code>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="px-8 py-4 bg-accent-green text-bg-primary font-semibold rounded-xl text-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-green/50"
        aria-label="Commencer le Niveau 1"
      >
        {"Commencer le Niveau 1 →"}
      </button>
    </div>
  )
}
