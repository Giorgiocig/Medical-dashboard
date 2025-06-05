import mongoose, { Schema } from 'mongoose'

const doctorSchema = new Schema({
  name: { type: String, required: [true, '`name` is required'] },
  surname: { type: String, required: [true, '`surname` is required'] },
  speciality: { type: String, required: true },
  availableForOperatingRoom: { type: Boolean, required: true },
  availableForClinic: { type: Boolean, required: true },
  email: {
    type: String,
    required: true,
    match: [/@/, "Not valid email.'@' is missing"],
  },
})

export const Doctor = mongoose.model('doctor', doctorSchema)
