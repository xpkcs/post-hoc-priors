import React, { useState, useEffect } from 'react'
import DocumentViewer from './components/DocumentViewer'
import RevisionList from './components/RevisionList'
import RevisionView from './components/RevisionView'
import { fetchFileContent, fetchManifest, fetchCommitHistory } from './api/github'
import { config } from './config'
import './App.css'

export default function App() {
  const [view, setView] = useState('current') // 'current', 'history', 'revision'
  const [currentDocument, setCurrentDocument] = useState('')
  const [manifest, setManifest] = useState(null)
  const [selectedRevision, setSelectedRevision] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load initial data
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        // Fetch current document
        const doc = await fetchFileContent(config.github.documentPath)
        setCurrentDocument(doc)

        // Fetch manifest
        const man = await fetchManifest()
        setManifest(man)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  function handleSelectRevision(revision) {
    setSelectedRevision(revision)
    setView('revision')
  }

  function handleBackToHistory() {
    setView('history')
    setSelectedRevision(null)
  }

  function handleViewCurrent() {
    setView('current')
    setSelectedRevision(null)
  }

  // Get previous revision for diff
  const getPreviousRevision = (currentRev) => {
    if (!manifest) return null
    const sorted = [...manifest.revisions].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    )
    const index = sorted.findIndex(r => r.id === currentRev.id)
    return index > 0 ? sorted[index - 1] : null
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">{config.ui.title}</h1>
        <p className="app-subtitle">{config.ui.subtitle}</p>
        <nav className="app-nav">
          <button
            className={view === 'current' ? 'active' : ''}
            onClick={handleViewCurrent}
          >
            Current Document
          </button>
          <button
            className={view === 'history' || view === 'revision' ? 'active' : ''}
            onClick={handleBackToHistory}
          >
            Revision History
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === 'current' && (
          <DocumentViewer
            content={currentDocument}
            loading={loading}
            error={error}
          />
        )}

        {view === 'history' && manifest && (
          <RevisionList
            revisions={manifest.revisions}
            onSelectRevision={handleSelectRevision}
            selectedRevisionId={selectedRevision?.id}
          />
        )}

        {view === 'revision' && selectedRevision && (
          <div>
            <button className="back-button" onClick={handleBackToHistory}>
              ← Back to History
            </button>
            <RevisionView
              revision={selectedRevision}
              previousRevision={getPreviousRevision(selectedRevision)}
              currentContent={currentDocument}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Git · Hosted on GitHub Pages</p>
      </footer>
    </div>
  )
}
