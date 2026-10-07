export async function sha256(text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function calculateEntropy(password: string): number {
  if (password.length === 0) return 0
  let charsetSize = 0
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32
  if (charsetSize === 0) return 0
  return Math.round(password.length * Math.log2(charsetSize) * 10) / 10
}

export function estimateCrackTime(entropy: number): string {
  const seconds = Math.pow(2, entropy) / 100_000_000_000 / 2
  if (seconds < 1) return "< 1 seconde"
  if (seconds < 60) return Math.round(seconds) + " secondes"
  if (seconds < 3600) return Math.round(seconds / 60) + " minutes"
  if (seconds < 86400) return Math.round(seconds / 3600) + " heures"
  if (seconds < 31536000) return Math.round(seconds / 86400) + " jours"
  if (seconds < 31536000000) return Math.round(seconds / 31536000) + " ans"
  return "plusieurs milliards d'annees"
}

export function calculatePasswordScore(password: string): number {
  const entropy = calculateEntropy(password)
  let score = 0
  if (entropy < 20) score = entropy
  else if (entropy < 40) score = 20 + (entropy - 20)
  else if (entropy < 60) score = 40 + (entropy - 40) * 1.5
  else score = 70 + Math.min(30, (entropy - 60) * 0.5)
  return Math.min(100, Math.round(score))
}

export function caesarCipher(text: string, shift: number = 3): string {
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        )
      }
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        )
      }
      return char
    })
    .join("")
}

export function rot13(text: string): string {
  return caesarCipher(text, 13)
}
