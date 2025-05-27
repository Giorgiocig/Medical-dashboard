import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { IDoctor } from '../utilities/interfaces'
import { Button } from '@mui/material'
import { deleteDoctor } from '../api/doctors'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function DoctorCard({
    name,
    surname,
    speciality,
    availableForOperatingRoom,
    availableForClinic,
    _id,
}: IDoctor) {
    const queryClient = useQueryClient()
    const deleteDoctorMutation = useMutation({
        mutationFn: (id: string) => deleteDoctor(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctors'] }),
        onError: (error) => {
            console.error('Doctor creation failed:', error)
        },
    })
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
                <Button
                    variant='text'
                    sx={{ color: 'white', backgroundColor: 'red' }}
                    onClick={() => _id && deleteDoctorMutation.mutate(_id)}
                >
                    Delete
                </Button>
            </Card>
        </Box>
    )
}
