import mongoose, { Schema } from 'mongoose'

const doctorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  speciality: { type: String, required: true },
  availableForOperatingRoom: { type: Boolean, required: true },
  availableForClinic: { type: Boolean, required: true },
  email: { type: String, required: true, unique: true },
})

export const Doctor = mongoose.model('doctor', doctorSchema)
