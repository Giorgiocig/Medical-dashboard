import { Alert, Button, Snackbar, TextField, Typography, type SnackbarCloseReason } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDoctor } from '../../api/doctors'
import { useState } from 'react'

export default function CreateDoctor({
    dialogAction,
    setSuccessMessage,
    setIsSuccessSubmit
}: any) {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [speciality, setSpeciality] = useState<string>('')
    const [availableForOperatingRoom, setAvailableForOperatingRoom] =
        useState<boolean>(false)
    const [availableForClinic, setAvailableForClinic] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [messageError, setMessageError] = useState<null | string>(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const queryClient = useQueryClient()

    const createDoctorMutation = useMutation({
        mutationFn: () =>
            createDoctor({
                name,
                surname,
                speciality,
                availableForOperatingRoom,
                availableForClinic,
                email,
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] }),
                setSuccessMessage(data.message),
                setIsSuccessSubmit(true),
                dialogAction()
        },
        onError: (error) => {
            console.error('Doctor creation failed:', error)
            setMessageError(error.message)
            setSnackbarOpen(true)
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('Creating doctor with:')
        e.preventDefault()
        createDoctorMutation.mutate()
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel id='demo-radio-buttons-group-label'>
                    Insert new doctor
                </FormLabel>
                <TextField
                    id='outlined-basic'
                    label='Name'
                    variant='outlined'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id='outlined-basic'
                    label='Surname'
                    variant='outlined'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                    id='outlined-basic'
                    label='Speciality'
                    variant='outlined'
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                />
                <TextField
                    id='outlined-basic'
                    label='email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Typography>available for operating room</Typography>
                <RadioGroup
                    name='radio-buttons-group'
                    value={availableForOperatingRoom.toString()}
                    onChange={(e) =>
                        setAvailableForOperatingRoom(e.target.value === 'true')
                    }
                >
                    <FormControlLabel
                        value='true'
                        control={<Radio />}
                        label='Available'
                    />
                    <FormControlLabel
                        value='false'
                        control={<Radio />}
                        label='Not Available'
                    />
                </RadioGroup>
                <Typography>available for clinic </Typography>
                <RadioGroup
                    aria-labelledby='"available for clinic"'
                    value={availableForClinic.toString()}
                    name='radio-buttons-group'
                    onChange={(e) => setAvailableForClinic(e.target.value === 'true')}
                >
                    <FormControlLabel
                        value='true'
                        control={<Radio />}
                        label='Available'
                    />
                    <FormControlLabel
                        value='false'
                        control={<Radio />}
                        label='Not Available'
                    />
                </RadioGroup>
                <Button
                    type='submit'
                    variant='contained'
                    value={createDoctorMutation.isPending ? 'creating...' : 'Create'}
                    disabled={
                        !name ||
                        !surname ||
                        !speciality ||
                        !email ||
                        createDoctorMutation.isPending
                    }
                >
                    Create
                </Button>
            </FormControl>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                message={messageError}
                onClose={() => setSnackbarOpen(false)}
            />
        </form>
    )
}
