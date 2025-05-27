import { Typography } from '@mui/material'
import CreateDoctor from './components/CreateDoctor'
import DoctorCardList from './components/DoctorCardList'
import DoctorFilter from './components/DoctorFilter'
import DoctorSorting from './components/DoctorSorting'
import { useQuery } from '@tanstack/react-query'
import { getDoctors } from './api/doctors'
import { useState } from 'react'

export function Dashboard() {
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [sortBy, setSortBy] = useState('speciality')
  const [sortOrder, setSortOrder] = useState('descending')

  const doctorsQuery = useQuery({
    queryKey: ['doctors', { name, speciality, sortBy, sortOrder }],
    queryFn: () => getDoctors({ name, sortBy, sortOrder }),
  })
  console.log(doctorsQuery.error)
  const doctors = doctorsQuery.data ?? []

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
      <Typography>CREATE DOCTOR</Typography>
      <CreateDoctor />
    </div>
  )
}
