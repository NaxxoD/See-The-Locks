"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { validationQuestions, type ValidationQuestion } from "@/lib/validation-data"

interface ValidationModalProps {
  level: number
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ValidationModal({
  level,
  open,
  onClose,
  onSuccess,
}: ValidationModalProps) {
  const [answer, setAnswer] = useState("")
  const [failed, setFailed] = useState(false)
  const [success, setSuccess] = useState(false)
  const [question, setQuestion] = useState<ValidationQuestion | null>(null)
  const wasOpen = useRef(false)

  // Lock question on first open; keep the same question on retry
  useEffect(() => {
    if (open && !wasOpen.current) {
      const questions = validationQuestions[level]
      if (questions && questions.length > 0) {
        setQuestion(questions[Math.floor(Math.random() * questions.length)])
      }
      setAnswer("")
      setFailed(false)
      setSuccess(false)
    }
    if (!open) {
      setQuestion(null)
    }
    wasOpen.current = open
  }, [open, level])

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

  if (!open || !question) return null

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const handleValidate = () => {
    if (answer.trim().length === 0) return
    const normalizedAnswer = normalize(answer)

    const found = question.keywords.some((kw) =>
      normalizedAnswer.includes(normalize(kw))
    )

    if (found) {
      setSuccess(true)
      setFailed(false)
    } else {
      setFailed(true)
    }
  }

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleValidate()
    }
  }

  if (success) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Niveau valide"
      >
        <div className="bg-bg-secondary rounded-2xl border border-border-light p-6 w-full max-w-md flex flex-col gap-4 animate-in zoom-in-95 duration-200">
          <h3 className="text-2xl font-bold text-accent-green">
            {"🎉"} Bravo !
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {question.successExplanation}
          </p>
          <p className="text-accent-green font-semibold">
            {"✅"} Niveau {level + 1 <= 6 ? level + 1 : ""} debloque
          </p>
          <button
            onClick={onSuccess}
            className="px-6 py-3 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50"
            autoFocus
          >
            {"Continuer →"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Validation niveau ${level}`}
    >
      <div className="bg-bg-secondary rounded-2xl border border-border-light p-6 w-full max-w-md flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-text-primary">
          {"✅"} Validation — Niveau {level}
        </h3>

        <div className="flex flex-col gap-2">
          <p className="text-text-secondary text-sm">
            {"💡"} Question :
          </p>
          <p className="text-text-primary text-sm leading-relaxed">
            {question.question}
          </p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          className="w-full px-4 py-3 bg-bg-primary border border-border-light rounded-lg text-text-primary text-sm focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:outline-none transition-colors resize-none"
          rows={3}
          placeholder="Votre reponse..."
          aria-label="Reponse a la question de validation"
          autoFocus
        />

        {failed && (
          <div className="bg-accent-warning/10 text-accent-warning p-3 rounded-lg text-sm animate-in fade-in duration-200">
            <p className="font-medium">Indice :</p>
            <p>{question.hint}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-border-light rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={handleValidate}
            disabled={answer.trim().length === 0}
            className="px-6 py-2 bg-accent-green text-bg-primary font-semibold rounded-lg transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-green/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {failed ? "Reessayer" : "Valider ✓"}
          </button>
        </div>
      </div>
    </div>
  )
}
