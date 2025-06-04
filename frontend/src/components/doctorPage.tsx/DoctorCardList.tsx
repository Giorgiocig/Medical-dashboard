import { Box } from '@mui/material'
import type { IDoctor, IDoctorCardList } from '../../utilities/interfaces'
import DoctorCard from './DoctorCard'

export default function DoctorCardList({ doctors = [], handleClickOpen }: IDoctorCardList) {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3,
      maxHeight: "400px",
      overflowY: "auto",
      paddingRight: 1,
    }}>
      {doctors.map((doctor: IDoctor, index: number) => (
        <DoctorCard
          key={index}
          {...doctor}
          handleClickOpen={handleClickOpen}
        />
      ))}
    </Box>
  )
}
