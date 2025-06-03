import mongoose from 'mongoose'
import { Doctor } from '../db/models/doctors.js'

export async function createDoctor({
  name,
  surname,
  speciality,
  availableForOperatingRoom,
  availableForClinic,
  email,
}) {
  const doctor = new Doctor({
    name,
    surname,
    speciality,
    availableForOperatingRoom,
    availableForClinic,
    email,
  })
  return await doctor.save()
}

async function listDoctors(
  query = {},
  { sortBy = 'name', sortOrder = 'descending' } = {},
) {
  const order = sortOrder.toLowerCase() === 'descending' ? 'desc' : 'asc'
  return await Doctor.find(query).sort({ [sortBy]: order })
}

export async function listAllDoctors(options) {
  return await listDoctors({}, options)
}

export async function listDoctorByName(name, options) {
  return await listDoctors({ name }, options)
}

export async function listDoctorBySpeciality(speciality, options) {
  return await listDoctors({ speciality }, options)
}

export async function getDoctorById(doctorId) {
  if (!mongoose.Types.ObjectId.isValid(doctorId)) return null
  return await Doctor.findById(doctorId)
}

// $set è un operatore di aggiornamento di MongoDB. Serve a modificare i campi specificati nel documento senza sovrascrivere l'intero documento. Per aggiornare solo determinati campi invece di sostituire l’intero oggetto. Evita di cancellare accidentalmente altri dati non inclusi nell’oggetto di aggiornamento
// { new: true }, È un'opzione di Mongoose che indica se la funzione deve restituire il documento aggiornato oppure quello prima dell'aggiornamento. Con new: true, ricevi il documento aggiornato.
export async function updateDoctor(
  doctorId,
  { name, surname, speciality, availableForOperatingRoom, availableForClinic },
) {
  if (!mongoose.Types.ObjectId.isValid(doctorId))
    throw new Error('Invalid doctor ID')
  return await Doctor.findOneAndUpdate(
    { _id: doctorId },
    {
      $set: {
        name,
        surname,
        speciality,
        availableForOperatingRoom,
        availableForClinic,
      },
    },
    { new: true },
  )
}

export async function deleteDoctor(doctorId) {
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new Error('Invalid doctor ID')
  }
  return await Doctor.deleteOne({ _id: doctorId })
}
