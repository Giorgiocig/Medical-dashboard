import express from 'express'
import { doctorsRoutes } from './routes/doctors.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())
doctorsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from express')
})

export { app }
