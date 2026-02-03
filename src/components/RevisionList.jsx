import React from 'react'
import './RevisionList.css'

export default function RevisionList({ revisions, onSelectRevision, selectedRevisionId }) {
  if (!revisions || revisions.length === 0) {
    return <div className="revision-list empty">No revisions yet.</div>
  }

  // Sort by date descending (newest first)
  const sortedRevisions = [...revisions].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="revision-list">
      <h2>Revision History</h2>
      <div className="revisions">
        {sortedRevisions.map(revision => (
          <div
            key={revision.id}
            className={`revision-item ${selectedRevisionId === revision.id ? 'selected' : ''}`}
            onClick={() => onSelectRevision(revision)}
          >
            <div className="revision-date">
              {new Date(revision.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="revision-title">{revision.title}</div>
            <div className="revision-summary">{revision.summary}</div>
            <div className="revision-tags">
              {revision.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
