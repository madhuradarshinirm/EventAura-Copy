import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 8080
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'EventAura', version: '2.2.0', mode: 'demo' })
})

app.get('/api/event-categories', (_req, res) => {
  res.json([
    { id: 'wedding', name: 'Weddings' },
    { id: 'birthday', name: 'Birthdays' },
    { id: 'anniversary', name: 'Anniversaries' },
    { id: 'community', name: 'Community events' },
    { id: 'halloween', name: 'Theme parties' }
  ])
})

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '../dist')
  app.use(express.static(dist))
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`EventAura API ready on http://localhost:${PORT}`))
