import { diffLines } from 'diff'

/**
 * Compute line-by-line diff between two texts
 * Returns an array of change objects with value and added/removed flags
 */
export function computeDiff(oldText, newText) {
  return diffLines(oldText || '', newText || '')
}

/**
 * Format diff for display
 */
export function formatDiffForDisplay(diff) {
  return diff.map((part, index) => ({
    id: index,
    value: part.value,
    added: part.added || false,
    removed: part.removed || false,
    unchanged: !part.added && !part.removed
  }))
}
