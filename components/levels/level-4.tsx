"use client"

import React, { useState, useEffect } from "react"
import { sha256 } from "@/lib/crypto"

interface Level4Props {
  onValidate: () => void
}

export function Level4({ onValidate }: Level4Props) {
  const [showComparison, setShowComparison] = useState(false)
  const [hashes, setHashes] = useState({
    plain: "",
    salted: "",
    peppered: "",
  })

  useEffect(() => {
    if (showComparison) {
      async function computeHashes() {
        const plain = await sha256("password")
        const salted = await sha256("password" + "x9k2")
        const peppered = await sha256("password" + "x9k2" + "SECRET_PEPPER")
        setHashes({ plain, salted, peppered })
      }
      computeHashes()
    }
  }, [showComparison])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Lesson */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-accent-green flex items-center gap-2">
          <span className="text-lg">{"📖"}</span> Pourquoi un hash simple ne
          suffit pas
        </h2>
        <div className="flex flex-col gap-4 text-text-secondary text-sm leading-relaxed">
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-error font-semibold">
              PROBLEME : Rainbow Tables
            </p>
            <p className="text-text-muted">
              L{"'"}attaquant precalcule le hash de millions de MDP
            </p>
            <code className="text-xs font-mono text-text-muted">
              {"'"}password{"'"} → 5e884898da...
            </code>
          </div>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-accent-green font-semibold">
              SOLUTION 1 : Salt (unique/user)
            </p>
            <code className="text-xs font-mono text-text-muted">
              hash({"'"}password{"'"} + {"'"}a7f3k9{"'"})
            </code>
            <p className="text-text-muted">
              Chaque utilisateur a un hash different
            </p>
          </div>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-accent-blue font-semibold">
              SOLUTION 2 : Pepper (secret serveur)
            </p>
            <code className="text-xs font-mono text-text-muted">
              hash({"'"}password{"'"} + salt + pepper)
            </code>
            <p className="text-text-muted">
              Protection supplementaire meme si BDD fuit
            </p>
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        {!showComparison ? (
          <button
            onClick={() => setShowComparison(true)}
            className="px-6 py-3 bg-accent-blue text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
          >
            Comparer les protections
          </button>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sans salt */}
              <div className="bg-bg-primary/50 p-4 rounded-xl border border-border-light flex flex-col gap-3">
                <h3 className="text-error font-semibold text-sm uppercase tracking-wider">
                  Sans Salt
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-text-primary font-mono">password</p>
                  <p className="text-text-muted text-xs">Hash direct</p>
                  <p className="text-text-muted font-mono text-xs break-all">
                    {hashes.plain.slice(0, 20)}...
                  </p>
                </div>
                <div className="py-2 px-3 bg-error/10 text-error rounded-lg text-center text-xs font-semibold">
                  {"❌"} Rainbow table
                </div>
              </div>

              {/* Avec salt */}
              <div className="bg-bg-primary/50 p-4 rounded-xl border border-border-light flex flex-col gap-3">
                <h3 className="text-accent-green font-semibold text-sm uppercase tracking-wider">
                  Avec Salt
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-text-primary font-mono">password</p>
                  <p className="text-text-muted text-xs">+ Salt: x9k2</p>
                  <p className="text-accent-green font-mono text-xs break-all">
                    {hashes.salted.slice(0, 20)}...
                  </p>
                </div>
                <div className="py-2 px-3 bg-accent-green/10 text-accent-green rounded-lg text-center text-xs font-semibold">
                  {"✅"} Unique
                </div>
              </div>

              {/* Salt + Pepper */}
              <div className="bg-bg-primary/50 p-4 rounded-xl border border-border-light flex flex-col gap-3">
                <h3 className="text-accent-blue font-semibold text-sm uppercase tracking-wider">
                  Salt + Pepper
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-text-primary font-mono">password</p>
                  <p className="text-text-muted text-xs">+ Salt + Pepper</p>
                  <p className="text-accent-blue font-mono text-xs break-all">
                    {hashes.peppered.slice(0, 20)}...
                  </p>
                </div>
                <div className="py-2 px-3 bg-accent-blue/10 text-accent-blue rounded-lg text-center text-xs font-semibold">
                  {"✅"} Unique + secret
                </div>
              </div>
            </div>

            <button
              onClick={onValidate}
              className="self-end px-6 py-3 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50"
            >
              Valider ce niveau
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
