"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { calculateEntropy } from "@/lib/crypto"

interface Level2Props {
  demoMode: boolean
  onValidate: () => void
}

export function Level2({ demoMode, onValidate }: Level2Props) {
  const [password, setPassword] = useState("")
  const [simulating, setSimulating] = useState(false)
  const [simDone, setSimDone] = useState(false)
  const [offlineCount, setOfflineCount] = useState(0)
  const [offlineTime, setOfflineTime] = useState("")
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (demoMode) setPassword("azerty123")
    else setPassword("")
  }, [demoMode])

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [])

  const entropy = calculateEntropy(password)
  const totalCombinations = Math.pow(2, entropy)
  const offlineSpeed = 100_000_000_000
  const offlineTotal = Math.round(totalCombinations / 2)
  const offlineSeconds = offlineTotal / offlineSpeed

  const formatTime = useCallback((seconds: number): string => {
    if (seconds < 1) return "< 1 seconde"
    if (seconds < 60) return Math.round(seconds) + " secondes"
    if (seconds < 3600) return Math.round(seconds / 60) + " minutes"
    if (seconds < 86400) return Math.round(seconds / 3600) + " heures"
    if (seconds < 31536000) return Math.round(seconds / 86400) + " jours"
    return Math.round(seconds / 31536000) + " ans"
  }, [])

  const runSimulation = () => {
    if (password.length === 0) return
    setSimulating(true)
    setSimDone(false)
    setOfflineCount(0)

    if (animRef.current) clearInterval(animRef.current)

    const steps = 60
    const increment = Math.max(1, Math.floor(offlineTotal / steps))
    let current = 0

    animRef.current = setInterval(() => {
      current += increment
      if (current >= offlineTotal) {
        current = offlineTotal
        if (animRef.current) clearInterval(animRef.current)
        setSimulating(false)
        setSimDone(true)
        setOfflineTime(formatTime(offlineSeconds))
      }
      setOfflineCount(current)
    }, 33)
  }

  const formatNumber = (n: number): string => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + " milliards"
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + " millions"
    if (n >= 1_000) return (n / 1_000).toFixed(1) + " milliers"
    return n.toString()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Lesson */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-accent-green flex items-center gap-2">
          <span className="text-lg">{"📖"}</span> Comment un attaquant recupere
          ton mot de passe ?
        </h2>
        <div className="flex flex-col gap-4 text-text-secondary text-sm leading-relaxed">
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-accent-blue font-semibold">
              ONLINE (sur le site)
            </p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>{"•"} L{"'"}attaquant essaie de se connecter directement</li>
              <li>{"•"} Rate limit : 5 tentatives puis blocage</li>
              <li>{"•"} Risque faible si MDP {">"} 30 bits</li>
            </ul>
          </div>
          <div className="bg-bg-primary/50 p-4 rounded-lg flex flex-col gap-2">
            <p className="text-error font-semibold">OFFLINE (base volee)</p>
            <ul className="flex flex-col gap-1 text-text-muted">
              <li>{"•"} L{"'"}attaquant vole le fichier des mots de passe</li>
              <li>
                {"•"} Il teste des milliards de combinaisons chez lui
              </li>
              <li>
                {"•"} Aucun rate limit — course de vitesse
              </li>
              <li>
                {"•"} Risque{" "}
                <span className="text-error font-semibold">CRITIQUE</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        <div>
          <label
            htmlFor="attack-password"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            Mot de passe a tester
          </label>
          <input
            id="attack-password"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setSimDone(false)
              setSimulating(false)
              setOfflineCount(0)
              if (animRef.current) clearInterval(animRef.current)
            }}
            className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary font-mono text-lg focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors"
            placeholder="Tapez un mot de passe..."
            aria-label="Mot de passe a tester"
          />
        </div>

        <button
          onClick={runSimulation}
          disabled={password.length === 0 || simulating}
          className="px-6 py-3 bg-accent-blue text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {simulating ? "Simulation en cours..." : "Lancer la simulation"}
        </button>

        {(simulating || simDone) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
            {/* Online */}
            <div className="bg-bg-primary/50 p-5 rounded-xl border border-border-light flex flex-col gap-3">
              <h3 className="text-accent-blue font-semibold text-sm uppercase tracking-wider">
                Attaque Online
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tentatives</span>
                  <span className="text-text-primary font-mono">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Temps</span>
                  <span className="text-text-primary font-mono">3 sec</span>
                </div>
              </div>
              <div className="mt-2 py-2 px-3 bg-error/10 text-error rounded-lg text-center text-sm font-semibold">
                {"❌"} BLOQUE
              </div>
            </div>

            {/* Offline */}
            <div className="bg-bg-primary/50 p-5 rounded-xl border border-border-light flex flex-col gap-3">
              <h3 className="text-error font-semibold text-sm uppercase tracking-wider">
                Attaque Offline
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tentatives</span>
                  <span className="text-text-primary font-mono text-xs">
                    {formatNumber(offlineCount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Temps</span>
                  <span className="text-text-primary font-mono">
                    {simDone ? offlineTime : "..."}
                  </span>
                </div>
              </div>
              <div
                className={`mt-2 py-2 px-3 rounded-lg text-center text-sm font-semibold ${
                  simDone
                    ? "bg-error/10 text-error"
                    : "bg-accent-warning/10 text-accent-warning"
                }`}
              >
                {simDone ? "❌ CRACKE" : "⚠️ EN COURS"}
              </div>
            </div>
          </div>
        )}

        {simDone && (
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
