# Setup Instructions

## ✅ What's Been Implemented

The MVP1 has been fully implemented according to the technical plan. Here's what's ready:

### Project Structure
- ✅ Vite + React project initialized
- ✅ All React components created (DocumentViewer, RevisionList, RevisionView, DiffViewer)
- ✅ GitHub API integration module
- ✅ Diff computation utilities
- ✅ Initial content files (main document + first revision)
- ✅ GitHub Actions deployment workflow
- ✅ Complete styling (CSS)

### Files Created
```
journal/
├── src/
│   ├── components/
│   │   ├── DocumentViewer.jsx + .css
│   │   ├── DiffViewer.jsx + .css
│   │   ├── RevisionList.jsx + .css
│   │   └── RevisionView.jsx + .css
│   ├── api/github.js
│   ├── utils/diff.js
│   ├── App.jsx + .css
│   ├── main.jsx
│   ├── index.css
│   └── config.js
├── documents/main.md
├── revisions/
│   ├── manifest.json
│   └── 2024-02-03-initial.md
├── .github/workflows/deploy.yml
├── package.json
├── vite.config.js
└── index.html
```

## 🔧 Required Configuration (Before Deployment)

### Step 1: Update GitHub Configuration

Edit `src/config.js` and replace the placeholder values:

```javascript
export const config = {
  github: {
    owner: 'YOUR_GITHUB_USERNAME',  // ← Replace with your GitHub username
    repo: 'journal',                 // ← Replace with your repo name (if different)
    // ... rest stays the same
  }
}
```

### Step 2: Update Vite Base Path (if needed)

If your repository name is NOT "journal", edit `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',  // ← Replace with your actual repo name
})
```

## 🚀 Deployment Steps

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Living document journal MVP"
```

### 2. Create GitHub Repository

1. Go to GitHub.com
2. Create a new repository named "journal" (or whatever you chose)
3. Make it **public** (required for GitHub Pages with free account)
4. Don't initialize with README (we already have one)

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/journal.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
4. Save

### 5. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Your site will be live at: `https://YOUR_USERNAME.github.io/journal/`

### 6. Update Manifest with Commit SHA

After the first deployment, you need to update the manifest with the actual commit SHA:

```bash
# Get the commit SHA for the first commit that created main.md
git log --oneline documents/main.md

# Copy the SHA (the first part of the line)
# Edit revisions/manifest.json and replace "REPLACE_WITH_ACTUAL_COMMIT_SHA" with the real SHA

# Commit and push
git add revisions/manifest.json
git commit -m "Update manifest with actual commit SHA"
git push
```

## 🧪 Local Development

To run the site locally:

```bash
# Start development server
npm run dev

# Open http://localhost:5173/journal/ in your browser
```

Note: Local development will show errors when trying to fetch from GitHub API because the files aren't on GitHub yet. This is expected. Once deployed, the GitHub API calls will work.

## 📝 Adding Your First Real Revision

Once the site is working, try adding a revision:

### 1. Edit the Document

```bash
vim documents/main.md
# Make your changes
```

### 2. Write a Revision Essay

```bash
vim revisions/2024-02-XX-my-revision.md
```

Example content:
```markdown
# Revision: [Title]

**Date:** February X, 2024
**Type:** Major/Minor revision

## What Changed
[Describe what changed]

## Why
[Explain your reasoning]

## Previous Thinking
[What you thought before]

## Open Questions
[New questions this raises]
```

### 3. Commit Both Files

```bash
git add documents/main.md revisions/2024-02-XX-my-revision.md
git commit -m "Revision: [brief description]"
git push
```

### 4. Get the Commit SHA

```bash
git log -1 --format="%H"
```

### 5. Update Manifest

Edit `revisions/manifest.json` and add a new entry:

```json
{
  "revisions": [
    {
      "id": "rev-001",
      "commitSha": "...",
      "date": "2024-02-03T10:00:00Z",
      "title": "Initial document creation",
      "summary": "First complete draft",
      "essayFile": "revisions/2024-02-03-initial.md",
      "tags": ["initial", "foundation"]
    },
    {
      "id": "rev-002",
      "commitSha": "PASTE_SHA_HERE",
      "date": "2024-02-XX...Z",
      "title": "Your revision title",
      "summary": "Brief summary",
      "essayFile": "revisions/2024-02-XX-my-revision.md",
      "tags": ["your", "tags"]
    }
  ]
}
```

### 6. Commit and Push Manifest

```bash
git add revisions/manifest.json
git commit -m "Add rev-002 to manifest"
git push
```

The site will automatically rebuild and deploy!

## 🔍 Verification Checklist

Once deployed, verify:

- [ ] Site loads at `https://USERNAME.github.io/journal/`
- [ ] "Current Document" tab shows the living document
- [ ] "Revision History" tab shows the revision list
- [ ] Clicking a revision shows:
  - [ ] The revision essay
  - [ ] A diff of what changed
  - [ ] Metadata (date, tags, etc.)
- [ ] No console errors in browser DevTools
- [ ] Navigation between views works

## 🐛 Troubleshooting

### Site shows 404

- Check that GitHub Pages is enabled in Settings → Pages
- Verify the `base` path in `vite.config.js` matches your repo name
- Wait a few minutes for GitHub to deploy

### "Failed to fetch" errors

- Verify `src/config.js` has the correct GitHub username and repo name
- Check that the repository is public
- Verify the files exist in the repository

### Diff shows entire document as new

- Make sure you updated the manifest with the correct commit SHA
- The SHA should be from the commit that modified `documents/main.md`
- Use `git log documents/main.md` to find the right commit

## 📚 Next Steps

Once the MVP is working:

1. Add more revisions as your thinking evolves
2. Experiment with different tags for organization
3. Consider enhancements:
   - Search/filter by tags
   - Dark mode
   - Better mobile layout
   - Compare any two revisions
   - Export to PDF

See the technical plan for more post-MVP ideas!
