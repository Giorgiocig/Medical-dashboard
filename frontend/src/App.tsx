import { Typography } from '@mui/material'
import CreateDoctor from './components/CreateDoctor'
import DoctorCardList from './components/DoctorCardList'
import DoctorFilter from './components/DoctorFilter'
import DoctorSorting from './components/DoctorSorting'

const doctors = [
  {
    name: 'gianni',
    surname: 'brear',
    speciality: 'ortopedia',
    availableForOperatingRoom: true,
    availableForClinic: false,
  },
  {
    name: 'alfredo',
    surname: 'nani',
    speciality: 'medicina',
    availableForOperatingRoom: false,
    availableForClinic: false,
  },
]

function App() {
  return (
    <div style={{ padding: 20 }}>
      <DoctorCardList doctors={doctors} />
      <DoctorFilter field="name" />
      <DoctorSorting fields={["speciality"]} />
      <Typography>CREATE DOCTOR</Typography>
      <CreateDoctor />
    </div>
  )
}

export default App
