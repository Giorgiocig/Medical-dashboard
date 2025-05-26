import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { IDoctor } from '../utilities/interfaces'

export default function DoctorCard({
    name,
    surname,
    speciality,
    availableForOperatingRoom,
    availableForClinic,
}: IDoctor) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ color: 'text.secondary', fontSize: 14 }}
                    >
                        {name} {surname}
                    </Typography>
                    <Typography>{speciality}</Typography>
                    <Typography>
                        Available for operating room{' '}
                        {availableForOperatingRoom ? 'YES' : 'NO'}
                    </Typography>
                    <Typography>
                        Available for clinic {availableForClinic ? 'YES' : 'NO'}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
