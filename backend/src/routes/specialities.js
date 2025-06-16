import { Speciality } from '../db/models/speciality.js'
import {
  createSpeciality,
  listAllSpecialities,
  updateSpeciality,
  deleteSpeciality,
} from '../services/specialities.js'

export function specialitiesRoutes(app) {
  app.get('/api/v1/specialities', async (_, res) => {
    try {
      return res.json(await listAllSpecialities())
    } catch (error) {
      console.error('error listing specialities', error)
      return res.status(500).end()
    }
  })
  app.post('/api/v1/specialities/', async (req, res) => {
    const { specialityName } = req.body
    const existingSpeciality = await Speciality.findOne({ specialityName })
    if (existingSpeciality) {
      return res
        .status(400)
        .json({ message: 'Speciality already exists with this name.' })
    }
    const speciality = await createSpeciality(req.body)
    return res
      .status(201)
      .json({ message: 'Speciality created successfully', speciality })
  })
  app.patch('/api/v1/specialities/:id', async (req, res) => {
    try {
      const speciality = await updateSpeciality(req.params.id, req.body)
      return res.status(200).json(speciality)
    } catch (error) {
      'error while updating', console.error(error)
      res.status(500).end()
    }
  })
  app.delete('/api/v1/specialities/:id', async (req, res) => {
    try {
      const { deleteCount } = await deleteSpeciality(req.params.id)
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
