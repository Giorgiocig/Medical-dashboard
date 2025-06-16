import mongoose from 'mongoose'
import { Speciality } from '../db/models/speciality.js'

export async function createSpeciality({ specialityName }) {
  const speciality = new Speciality({
    specialityName,
  })
  return await speciality.save()
}

export async function listAllSpecialities() {
  return await Speciality.find()
}

export async function updateSpeciality(specialityId, { specialityName }) {
  if (!mongoose.Types.ObjectId.isValid(specialityId))
    throw new Error('Invalid speciality ID')
  return await Speciality.findOneAndUpdate(
    { _id: specialityId },
    {
      specialityName,
    },
    { new: true },
  )
}

export async function deleteSpeciality(specialityId) {
  if (!mongoose.Types.ObjectId.isValid(specialityId)) {
    throw new Error('Invalid speciality ID')
  }
  return await Speciality.deleteOne({ _id: specialityId })
}
