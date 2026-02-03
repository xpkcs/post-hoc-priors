import React from 'react'
import { computeDiff, formatDiffForDisplay } from '../utils/diff'
import './DiffViewer.css'

export default function DiffViewer({ oldContent, newContent }) {
  const diff = computeDiff(oldContent, newContent)
  const formattedDiff = formatDiffForDisplay(diff)

  return (
    <div className="diff-viewer">
      <div className="diff-header">
        <h3>Changes</h3>
        <div className="diff-legend">
          <span className="legend-item added">+ Added</span>
          <span className="legend-item removed">- Removed</span>
        </div>
      </div>
      <pre className="diff-content">
        {formattedDiff.map(part => (
          <div
            key={part.id}
            className={`diff-line ${
              part.added ? 'added' : part.removed ? 'removed' : 'unchanged'
            }`}
          >
            {part.value}
          </div>
        ))}
      </pre>
    </div>
  )
}
