const BACKEND_EFFORT_PATTERN = /^\d+\s*(Hour|Hours)$/i

export function isValidBackendEffort(value) {
  return BACKEND_EFFORT_PATTERN.test(value?.trim() ?? '')
}

/**
 * Converts AI effort strings (e.g. "10 days") into backend format ("80 Hours").
 * Returns null when the value cannot be converted.
 */
export function normalizeEstimatedEffort(raw) {
  const trimmed = raw?.trim()
  if (!trimmed) return null

  if (isValidBackendEffort(trimmed)) {
    const hours = trimmed.match(/^(\d+)/i)[1]
    return `${hours} Hours`
  }

  const lower = trimmed.toLowerCase()

  const hoursMatch = lower.match(/^(\d+)\s*hours?$/)
  if (hoursMatch) return `${hoursMatch[1]} Hours`

  const daysMatch = lower.match(/^(\d+)\s*days?$/)
  if (daysMatch) return `${parseInt(daysMatch[1], 10) * 8} Hours`

  const weeksMatch = lower.match(/^(\d+)\s*weeks?$/)
  if (weeksMatch) return `${parseInt(weeksMatch[1], 10) * 40} Hours`

  const monthsMatch = lower.match(/^(\d+)\s*months?$/)
  if (monthsMatch) return `${parseInt(monthsMatch[1], 10) * 160} Hours`

  return null
}

export function applyEstimatedEffortSuggestion(raw) {
  const normalized = normalizeEstimatedEffort(raw)
  return {
    value: normalized,
    converted: Boolean(normalized && raw?.trim() && normalized !== raw.trim()),
    original: raw?.trim() ?? '',
  }
}
