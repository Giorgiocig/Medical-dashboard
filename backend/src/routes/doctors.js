import {
  listAllDoctors,
  listDoctorByName,
  listDoctorBySpeciality,
  getDoctorById,
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
        return res.json(listAllDoctors(options))
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
}
