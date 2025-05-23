import { initDatabase } from './db/init.js'
import { Doctor } from './db/models/doctors.js'
initDatabase()

const doctor = new Doctor({
  name: 'Gianni',
  surname: 'Bello',
  speciality: 'Cardiologia',
  availableForOperatingRoom: true,
  availableForClinic: true,
})

await doctor.save()

const doctors = await Doctor.find()
console.log(doctors)
