import { Box } from '@mui/material'
import type { IDoctor, IDoctorCardList } from '../utilities/interfaces'
import DoctorCard from './DoctorCard'

export default function DoctorCardList({ doctors = [] }: IDoctorCardList) {
  return (
    <Box>
      {doctors.map((doctor: IDoctor, index: number) => (
        <DoctorCard
          key={index}
          {...doctor}
        />
      ))}
    </Box>
  )
}
