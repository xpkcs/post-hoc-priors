export const config = {
  github: {
    owner: 'YOUR_GITHUB_USERNAME',      // Replace with your GitHub username
    repo: 'post-hoc-priors',                    // Replace with your repo name
    branch: 'main',
    documentPath: 'documents/main.md',
    manifestPath: 'revisions/manifest.json',
    revisionsPath: 'revisions/'
  },
  ui: {
    title: 'Post Hoc Priors',
    subtitle: 'A living journal of working ideas'
  }
}

// GitHub API base URL
export const GITHUB_API_BASE = 'https://api.github.com'

// Helper to build content URLs
export const getContentUrl = (path, ref = null) => {
  const { owner, repo } = config.github
  const refParam = ref ? `?ref=${ref}` : ''
  return `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}${refParam}`
}

// Helper to build raw content URLs (faster, no API rate limits for public repos)
export const getRawUrl = (path, ref = 'main') => {
  const { owner, repo } = config.github
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`
}
