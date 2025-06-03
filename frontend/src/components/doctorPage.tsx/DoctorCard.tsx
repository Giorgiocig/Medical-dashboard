import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { IDoctor } from '../../utilities/interfaces'
import { Button } from '@mui/material'
import { deleteDoctor } from '../../api/doctors'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function DoctorCard({
    name,
    surname,
    speciality,
    availableForOperatingRoom,
    availableForClinic,
    _id,
    email,
    handleClickOpen
}: any) {
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
            <Card variant='outlined' sx={{ padding: "1rem" }}>
                <CardContent>
                    <Typography component="div" sx={{ paddingBottom: ".5rem" }}>
                        {name} {surname}
                    </Typography>

                    <Typography component="div" sx={{ color: 'text.secondary', fontSize: 14, paddingBottom: ".2rem" }}>
                        {speciality}
                    </Typography>

                    <Typography component="div" sx={{ paddingBottom: ".2rem" }}>
                        Available for operating room {availableForOperatingRoom ? 'YES' : 'NO'}
                    </Typography>

                    <Typography component="div" sx={{ paddingBottom: ".2rem" }}>
                        Available for clinic {availableForClinic ? 'YES' : 'NO'}
                    </Typography>

                    <Typography component="div">
                        {email}
                    </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        variant="outlined"
                        color='primary'
                        sx={{ width: "30%" }}
                        onClick={() => _id && deleteDoctorMutation.mutate(_id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color='primary'
                        sx={{ width: "30%" }}
                        onClick={handleClickOpen}
                    >
                        Edit
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}
