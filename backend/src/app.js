import express from 'express'
import { doctorsRoutes } from './routes/doctors.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { specialitiesRoutes } from './routes/specialities.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
doctorsRoutes(app)
specialitiesRoutes(app)
app.get('/', (req, res) => {
  res.send('Hello from express')
})

export { app }
