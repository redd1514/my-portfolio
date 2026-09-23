import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import chatHandler from './api/chat.js'

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        let rawBody = ''
        let bodyTooLarge = false

        req.on('data', (chunk) => {
          rawBody += chunk
          if (rawBody.length > 1_000_000) bodyTooLarge = true
        })

        req.on('end', async () => {
          if (bodyTooLarge) {
            res.statusCode = 413
            res.end(JSON.stringify({ error: 'Request body is too large.' }))
            return
          }

          try {
            req.body = rawBody ? JSON.parse(rawBody) : {}
            await chatHandler(req, {
              statusCode: 200,
              status(code) {
                this.statusCode = code
                return this
              },
              setHeader(name, value) {
                res.setHeader(name, value)
                return this
              },
              json(payload) {
                res.statusCode = this.statusCode
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(payload))
                return this
              },
            })
          } catch (error) {
            next(error)
          }
        })
      })
    },
  }
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const env = loadEnv(mode, process.cwd(), '')
    if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
      process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
    }
  }

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      localApiPlugin(),
    ],
  }
})
