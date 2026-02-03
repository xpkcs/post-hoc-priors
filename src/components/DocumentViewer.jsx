import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './DocumentViewer.css'

export default function DocumentViewer({ content, loading, error }) {
  if (loading) {
    return <div className="document-viewer loading">Loading document...</div>
  }

  if (error) {
    return <div className="document-viewer error">Error: {error}</div>
  }

  return (
    <div className="document-viewer">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || ''}
      </ReactMarkdown>
    </div>
  )
}
