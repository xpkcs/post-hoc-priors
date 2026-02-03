# Living Document Journal

A personal website for maintaining and exploring a living document - a philosophical/intellectual text that evolves over time, with full revision history and explanatory essays for each change.

## What This Is

This is not a blog. It's a **living document** that represents my current thinking on understanding, knowledge, and how ideas evolve. When my understanding evolves, I revise the document itself. Each revision is accompanied by an essay explaining what changed and why.

See the full concept explanation in [docs/concept-overview.md](docs/concept-overview.md).

## Live Site

Once deployed, the site will be live at: `https://[username].github.io/journal/`

## Technical Implementation

Built with:
- React + Vite for the frontend
- GitHub API for accessing version history
- GitHub Pages for hosting
- Git for version control

See the full technical plan in [docs/technical-plan-1.md](docs/technical-plan-1.md).

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Configuration

Before deploying, update `src/config.js` with your GitHub username and repository name:

```javascript
export const config = {
  github: {
    owner: 'YOUR_GITHUB_USERNAME',  // <-- Change this
    repo: 'journal',                 // <-- Change this if different
    // ...
  }
}
```

Also update the `base` path in `vite.config.js` to match your repository name.

## Adding a Revision

1. Edit `documents/main.md` with your changes
2. Write an essay in `revisions/YYYY-MM-DD-title.md` explaining the revision
3. Commit both files: `git add documents/main.md revisions/YYYY-MM-DD-title.md && git commit -m "Revision: [description]"`
4. Get the commit SHA: `git log -1 --format="%H"`
5. Update `revisions/manifest.json` with the new revision entry (include the commit SHA)
6. Commit and push the manifest: `git add revisions/manifest.json && git commit -m "Add revision to manifest" && git push`
7. GitHub Actions will automatically deploy the updated site

## Project Structure

```
journal/
├── documents/          # The living document
│   └── main.md
├── revisions/          # Revision essays and metadata
│   ├── manifest.json
│   └── *.md
├── src/                # React application
│   ├── components/
│   ├── api/
│   ├── utils/
│   └── ...
├── docs/               # Planning and documentation
└── .github/workflows/  # CI/CD configuration
```

## License

MIT License - feel free to use this as a template for your own living journal.
