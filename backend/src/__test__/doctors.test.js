import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createDoctor,
  listAllDoctors,
  listDoctorByName,
  listDoctorBySpeciality,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../services/doctors'
import { Doctor } from '../db/models/doctors'
import {
  sampleDoctors,
  sampleDoctorsWithEqualEmail,
} from '../utilities/testData'

describe('creating doctor', () => {
  test('with all parameters should succeed', async () => {
    const doctor = {
      name: 'Alfredo',
      surname: 'Bello',
      speciality: 'Orto',
      availableForOperatingRoom: true,
      availableForClinic: false,
      email: 'gmail@com',
    }
    const createdDoctor = await createDoctor(doctor)
    expect(createdDoctor._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundDoctor = await Doctor.findOne(createdDoctor._id)
    expect(foundDoctor).toEqual(expect.objectContaining(doctor))
    expect(typeof foundDoctor.name).toBe('string')
    expect(typeof foundDoctor.surname).toBe('string')
    expect(typeof foundDoctor.speciality).toBe('string')
    expect(typeof foundDoctor.availableForOperatingRoom).toBe('boolean')
    expect(typeof foundDoctor.availableForClinic).toBe('boolean')
    expect(typeof foundDoctor.email).toBe('string')
  })
  test('without name should fail', async () => {
    const doctor = {
      surname: 'Bello',
      speciality: 'Orto',
      availableForOperatingRoom: true,
      availableForClinic: false,
      email: 'gmail@com',
    }
    try {
      await createDoctor(doctor)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain('`name` is required')
    }
  })
  test('with equal email should fail', async () => {
    try {
      for (const doctor of sampleDoctorsWithEqualEmail) {
        await createDoctor(doctor)
      }
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.name).toBe('MongoServerError')
      expect(error.code).toBe(11000)
    }
  })
})

// list doctors
let createdSampleDoctors = []

beforeEach(async () => {
  await Doctor.deleteMany({})
  createdSampleDoctors = []
  for (const doctor of sampleDoctors) {
    const createdDoctor = new Doctor(doctor)
    createdSampleDoctors.push(await createdDoctor.save())
  }
})

describe('listing doctors', () => {
  test('should return all doctors', async () => {
    const doctors = await listAllDoctors()
    expect(doctors.length).toEqual(createdSampleDoctors.length)
  })
  test('should return posts sorted by name descending', async () => {
    const doctors = await listAllDoctors()
    const sortedSampleDoctors = createdSampleDoctors.sort((a, b) =>
      b.name.localeCompare(a.name),
    )
    expect(doctors.map((doctor) => doctor.name)).toEqual(
      sortedSampleDoctors.map((doctor) => doctor.name),
    )
  })

  test('should return doctors sorted by name ascending taking sorting options', async () => {
    const doctors = await listAllDoctors({
      sortBy: 'name',
      sortOrder: 'ascending',
    })
    const sortedSampleDoctors = createdSampleDoctors.sort((a, b) =>
      a.name.localeCompare(b.name),
    )
    expect(doctors.map((d) => d.name)).toEqual(
      sortedSampleDoctors.map((d) => d.name),
    )
  })
  test('should be able to filter doctors by name', async () => {
    const doctors = await listDoctorByName('mario')
    expect(doctors.length).toBe(1)
  })
  test('should be able to filter doctors by speciality', async () => {
    const doctors = await listDoctorBySpeciality('medicina')
    expect(doctors.length).toBe(2)
  })
})

describe('get doctor by Id', () => {
  test('should return the whole doctor', async () => {
    const doctor = await getDoctorById(createdSampleDoctors[0]._id)
    expect(doctor.toObject()).toEqual(createdSampleDoctors[0].toObject())
  })

  test("should fail if the id doesn't exist", async () => {
    const doctor = await getDoctorById('00000000000000')
    expect(doctor).toBeNull()
  })
})

describe('update doctor', () => {
  test('should update the specified property', async () => {
    await updateDoctor(createdSampleDoctors[0]._id, {
      name: 'test name',
    })
    const updatedDoctor = await Doctor.findById(createdSampleDoctors[0]._id)
    expect(updatedDoctor.name).toEqual('test name')
  })
  test('should not update other properties', async () => {
    await updateDoctor(createdSampleDoctors[0]._id, {
      name: 'test name',
    })
    const updatedDoctor = await Doctor.findById(createdSampleDoctors[0]._id)
    expect(updatedDoctor.surname).toEqual('rossi')
  })
  test('should fail if the id does not exist', async () => {
    const doctor = await updateDoctor('0000000000000000', { name: 'test' })
    expect(doctor).toBeNull()
  })
})

//Per deleteOne(), la funzione restituisce un oggetto risultato che contiene alcune proprietà, tra cui: deletedCount: il numero di documenti eliminati (in questo caso 0 o 1)
describe('delete doctor', () => {
  test('should remove one doctor from the db', async () => {
    const result = await deleteDoctor(createdSampleDoctors[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedDoctor = await Doctor.findById(createdSampleDoctors[0]._id)
    expect(deletedDoctor).toBeNull()
  })
  test('should fail if the id does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString() // valid but non-existent ID
    const result = await deleteDoctor(fakeId)
    expect(result.deletedCount).toEqual(0)
  })
})
