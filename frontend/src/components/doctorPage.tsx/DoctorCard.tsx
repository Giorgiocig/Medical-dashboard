import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { IDoctorCardProps } from '../../utilities/interfaces'
import { Button } from '@mui/material'
import { deleteDoctor } from '../../api/doctors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function DoctorCard({
    name,
    surname,
    speciality,
    availableForOperatingRoom,
    availableForClinic,
    _id,
    email,
    handleClickOpen,
}: IDoctorCardProps) {
    const queryClient = useQueryClient()
    const deleteDoctorMutation = useMutation({
        mutationFn: (id: string) => deleteDoctor(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctors'] }),
        onError: (error) => {
            console.error('Doctor creation failed:', error)
        },
    })

    return (
        <Box sx={{ minWidth: 300 }}>
            <Card variant='outlined' sx={{ padding: '1rem' }}>
                <CardContent>
                    <Typography component='div' sx={{ paddingBottom: '.5rem' }}>
                        {name} {surname}
                    </Typography>

                    <Typography
                        component='div'
                        sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            paddingBottom: '.2rem',
                        }}
                    >
                        {speciality}
                    </Typography>

                    <Typography component='div' sx={{ paddingBottom: '.2rem' }}>
                        Available for operating room{' '}
                        {availableForOperatingRoom ? 'YES' : 'NO'}
                    </Typography>

                    <Typography component='div' sx={{ paddingBottom: '.2rem' }}>
                        Available for clinic {availableForClinic ? 'YES' : 'NO'}
                    </Typography>

                    <Typography component='div'>{email}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<DeleteIcon />}
                        variant='outlined'
                        color='primary'
                        sx={{ padding: "0.5em 1em" }}
                        onClick={() => _id && deleteDoctorMutation.mutate(_id)}
                    >
                        Delete
                    </Button>
                    <Button
                        startIcon={<ModeEditIcon />}
                        variant='outlined'
                        color='primary'
                        sx={{ padding: "0.5em 1em" }}
                        onClick={() =>
                            handleClickOpen({
                                _id,
                                name,
                                surname,
                                speciality,
                                availableForOperatingRoom,
                                availableForClinic,
                                email,
                            })
                        }
                    >
                        Edit
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}
