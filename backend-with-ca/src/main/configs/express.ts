import express from 'express'

import { routerConfig } from './express-routes'

const app = express()

app.use(express.json())
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  return res.json(healthcheck)
})
routerConfig(app)

export default app
