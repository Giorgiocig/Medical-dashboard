import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createSpeciality,
  listAllSpecialities,
  updateSpeciality,
  deleteSpeciality,
} from '../services/specialities.js'

import { Speciality } from '../db/models/speciality'

describe('creating speciality', () => {
  test('with all parameters should succeed', async () => {
    const speciality = { specialityName: 'Med' }
    const createdSpeciality = await createSpeciality(speciality)
    expect(createdSpeciality._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundSpeciality = await Speciality.findOne(createdSpeciality._id)
    expect(foundSpeciality).toEqual(expect.objectContaining(speciality))
    expect(typeof foundSpeciality.specialityName).toBe('string')
  })
  test('without specialityName should fail', async () => {
    const speciality = {}
    try {
      await createSpeciality(speciality)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain('`speciality name` is required')
    }
  })
})

// list specialities
let sampleData = [{ specialityName: 'Cardiology' }]
let createdSampleSpecialities = []

beforeEach(async () => {
  await Speciality.deleteMany({})
  createdSampleSpecialities = []

  for (const speciality of sampleData) {
    const createdSpeciality = new Speciality(speciality)
    createdSampleSpecialities.push(await createdSpeciality.save())
  }
})

describe('get all specialities', () => {
  test('should return all specialities', async () => {
    const specialities = await listAllSpecialities()
    expect(specialities.length).toEqual(createdSampleSpecialities.length)
  })
})

describe('update specialities', () => {
  test('should update the speciality', async () => {
    await updateSpeciality(createdSampleSpecialities[0]._id, {
      specialityName: 'test spec',
    })
    const updatedSpeciality = await Speciality.findById(
      createdSampleSpecialities[0]._id,
    )
    expect(updatedSpeciality.specialityName).toEqual('test spec')
  })

  test('should throw error if the id is invalid', async () => {
    await expect(
      updateSpeciality('0000000000000000', { name: 'test' }),
    ).rejects.toThrow('Invalid speciality ID')
  })
})

describe('delete speciality', () => {
  test('should remove one speciality from the db', async () => {
    const result = await deleteSpeciality(createdSampleSpecialities[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedSpeciality = await Speciality.findById(
      createdSampleSpecialities[0]._id,
    )
    expect(deletedSpeciality).toBeNull()
  })
  test('should fail if the id does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString() // valid but non-existent ID
    const result = await deleteSpeciality(fakeId)
    expect(result.deletedCount).toEqual(0)
  })
})
