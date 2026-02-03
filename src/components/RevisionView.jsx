import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DiffViewer from './DiffViewer'
import { fetchFileContent, fetchRevisionEssay } from '../api/github'
import { config } from '../config'
import './RevisionView.css'

export default function RevisionView({ revision, previousRevision, currentContent }) {
  const [essayContent, setEssayContent] = useState('')
  const [revisionContent, setRevisionContent] = useState('')
  const [previousContent, setPreviousContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadRevisionData() {
      setLoading(true)
      setError(null)

      try {
        // Fetch the essay
        const essay = await fetchRevisionEssay(revision.essayFile)
        setEssayContent(essay)

        // Fetch document at this revision
        const revContent = await fetchFileContent(
          config.github.documentPath,
          revision.commitSha
        )
        setRevisionContent(revContent)

        // Fetch previous version for diff
        if (previousRevision) {
          const prevContent = await fetchFileContent(
            config.github.documentPath,
            previousRevision.commitSha
          )
          setPreviousContent(prevContent)
        } else {
          setPreviousContent('') // First revision - no previous content
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRevisionData()
  }, [revision, previousRevision])

  if (loading) {
    return <div className="revision-view loading">Loading revision...</div>
  }

  if (error) {
    return <div className="revision-view error">Error: {error}</div>
  }

  return (
    <div className="revision-view">
      <div className="revision-header">
        <h1>{revision.title}</h1>
        <div className="revision-meta">
          <span className="revision-date">
            {new Date(revision.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="revision-id">Revision {revision.id}</span>
        </div>
      </div>

      <div className="revision-content">
        <section className="essay-section">
          <h2>Commentary</h2>
          <div className="essay-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {essayContent}
            </ReactMarkdown>
          </div>
        </section>

        <section className="diff-section">
          <DiffViewer
            oldContent={previousContent}
            newContent={revisionContent}
          />
        </section>
      </div>
    </div>
  )
}
