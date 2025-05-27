import { Button, TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDoctor } from '../api/doctors'
import { useState } from 'react'

export default function CreateDoctor({ }: {}) {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [speciality, setSpeciality] = useState<string>('')
    const [availableForOperatingRoom, setAvailableForOperatingRoom] =
        useState<boolean>(false)
    const [availableForClinic, setAvailableForClinic] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const createDoctorMutation = useMutation({
        mutationFn: () =>
            createDoctor({
                name,
                surname,
                speciality,
                availableForOperatingRoom,
                availableForClinic,
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctors'] }),
        onError: (error) => {
            console.error('Doctor creation failed:', error)
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
                        !name || !surname || !speciality || createDoctorMutation.isPending
                    }
                >
                    Create
                </Button>
            </FormControl>
            {createDoctorMutation.isSuccess && (
                <Typography>Doctor create successfully</Typography>
            )}
        </form>
    )
}
