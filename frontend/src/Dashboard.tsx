import { Typography } from '@mui/material'
import CreateDoctor from './components/CreateDoctor'
import DoctorCardList from './components/DoctorCardList'
import DoctorFilter from './components/DoctorFilter'
import DoctorSorting from './components/DoctorSorting'
import { useQuery } from '@tanstack/react-query'
import { getDoctors } from './api/doctors'
import { useEffect, useState } from 'react'
import SpecialityFilter from './components/SpecialityFilter'
import type { IDoctor } from './utilities/interfaces'

export function Dashboard() {
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [sortBy, setSortBy] = useState('speciality')
  const [sortOrder, setSortOrder] = useState('descending')
  const [allSpecialities, setAllSpecialities] = useState<string[]>([])

  const doctorsQuery = useQuery({
    queryKey: ['doctors', { name, speciality, sortBy, sortOrder }],
    queryFn: () => getDoctors({ name, speciality, sortBy, sortOrder }),
  })
  const doctors = doctorsQuery.data ?? []

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const doctors = await getDoctors({})
        const specialities = (doctors.map((doctor: IDoctor) => doctor.speciality)
        ).sort()
        setAllSpecialities(specialities)
      } catch (error) {
        console.error('Errore nel fetch delle specialità:', error)
      }
    }
    fetchSpecialities()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <DoctorCardList doctors={doctors} />
      <Typography>NAME</Typography>
      <DoctorFilter
        field='name'
        value={name}
        onChange={(value) => setName(value)}
      />
      {/* <Typography>SPECIALITY</Typography>
      <DoctorFilter
        field='speciality'
        value={speciality}
        onChange={(value) => setSpeciality(value)}
      /> */}
      <DoctorSorting
        fields={['speciality']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <Typography>Speciality Filter</Typography>
      <SpecialityFilter value={speciality}
        onChange={(value) => setSpeciality(value)}
        options={allSpecialities} />
      <Typography>CREATE DOCTOR</Typography>
      <CreateDoctor />
    </div>
  )
}
