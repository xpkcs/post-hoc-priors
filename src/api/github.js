import { config, getRawUrl, GITHUB_API_BASE } from '../config'

/**
 * Fetch file content from GitHub (uses raw.githubusercontent.com for speed)
 */
export async function fetchFileContent(path, ref = 'main') {
  const url = getRawUrl(path, ref)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`)
  }

  return await response.text()
}

/**
 * Fetch commit history for a specific file
 */
export async function fetchCommitHistory(path) {
  const { owner, repo } = config.github
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?path=${path}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch commits: ${response.statusText}`)
  }

  const commits = await response.json()

  // Transform to simpler format
  return commits.map(commit => ({
    sha: commit.sha,
    message: commit.commit.message,
    date: commit.commit.author.date,
    author: commit.commit.author.name
  }))
}

/**
 * Fetch and parse the manifest
 */
export async function fetchManifest() {
  const content = await fetchFileContent(config.github.manifestPath)
  return JSON.parse(content)
}

/**
 * Fetch a revision essay
 */
export async function fetchRevisionEssay(essayFile) {
  return await fetchFileContent(essayFile)
}

/**
 * Compare two commits and get diff
 */
export async function fetchDiff(baseSha, headSha) {
  const { owner, repo } = config.github
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/compare/${baseSha}...${headSha}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch diff: ${response.statusText}`)
  }

  return await response.json()
}
