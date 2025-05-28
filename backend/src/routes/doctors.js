import { Doctor } from '../db/models/doctors.js'
import {
  listAllDoctors,
  listDoctorByName,
  listDoctorBySpeciality,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../services/doctors.js'

export function doctorsRoutes(app) {
  app.get('/api/v1/doctors', async (req, res) => {
    const { sortBy, sortOrder, name, speciality } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (name && speciality) {
        return res
          .status(400)
          .json({ error: 'Query by either name or speciality not both' })
      } else if (name) {
        return res.json(await listDoctorByName(name, options))
      } else if (speciality) {
        return res.json(await listDoctorBySpeciality(speciality, options))
      } else {
        return res.json(await listAllDoctors(options))
      }
    } catch (error) {
      console.error('error listing doctors', error)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/doctors/:id', async (req, res) => {
    const { id } = req.params
    try {
      const doctor = await getDoctorById(id)
      if (doctor === null) return res.status(404).end()
      return res.json(doctor)
    } catch (error) {
      console.error('error getting post', error)
      return res.status(500).end()
    }
  })
  app.post('/api/v1/doctors/', async (req, res) => {
    try {
      const { email } = req.body
      const existingDoctor = await Doctor.findOne({ email })
      if (existingDoctor) {
        return res
          .status(400)
          .json({ message: 'Doctor already exists with this email.' })
      }
      const doctor = await createDoctor(req.body)
      return res.json(doctor)
    } catch (error) {
      console.log('error while creating', error)
      return res.status(500).end()
    }
  })
  app.patch('/api/v1/doctors/:id', async (req, res) => {
    try {
      const doctor = await updateDoctor(req.params.id, req.body)
      return res.status(200).json(doctor)
    } catch (error) {
      'error while updating', console.error(error)
      res.status(500).end()
    }
  })
  app.delete('/api/v1/doctors/:id', async (req, res) => {
    try {
      const { deleteCount } = await deleteDoctor(req.params.id)
      if (deleteCount === 0) {
        return res.status(404)
      }
      return res.status(200).json({ success: true })
    } catch (error) {
      'error while deleting', console.error(error)
      res.status(500).end()
    }
  })
}
