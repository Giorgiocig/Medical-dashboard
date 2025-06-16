import mongoose, { Schema } from 'mongoose'

const specialitySchema = new Schema({
  specialityName: {
    type: String,
    required: [true, '`speciality name` is required'],
  },
})

export const Speciality = mongoose.model('speciality', specialitySchema)
