import express from 'express'
import { doctorsRoutes } from './routes/doctors.js'

const app = express()
doctorsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from express')
})

export { app }
