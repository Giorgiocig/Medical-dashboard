import { Button, TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDoctor, updateDoctor } from '../../api/doctors'
import { useEffect, useState } from 'react'
import type { ICreateDoctorProps, IDoctor } from '../../utilities/interfaces'

export default function CreateDoctor({
    dialogAction,
    setSuccessMessage,
    setIsSuccessSubmit,
    setErrorMessage,
    setIsError,
    selectedDoctor,
}: ICreateDoctorProps) {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [speciality, setSpeciality] = useState<string>('')
    const [availableForOperatingRoom, setAvailableForOperatingRoom] =
        useState<boolean>(false)
    const [availableForClinic, setAvailableForClinic] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
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
            setErrorMessage(error.message)
            setIsError(true)
        },
    })

    const updateDoctorMutation = useMutation({
        mutationFn: (data: { id: string; values: IDoctor }) =>
            updateDoctor(data.id, data.values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
            setSuccessMessage('Doctor updated successfully!')
            setIsSuccessSubmit(true)
            dialogAction()
        },
        onError: (error) => {
            setErrorMessage(error.message)
            setIsError(true)
        },
    })

    useEffect(() => {
        if (selectedDoctor) {
            setName(selectedDoctor.name)
            setSurname(selectedDoctor.surname)
            setSpeciality(selectedDoctor.speciality)
            setAvailableForOperatingRoom(selectedDoctor.availableForOperatingRoom)
            setAvailableForClinic(selectedDoctor.availableForClinic)
            setEmail(selectedDoctor.email)
        }
        return () => {
            setName('')
            setSurname('')
            setSpeciality('')
            setAvailableForOperatingRoom(false)
            setAvailableForClinic(false)
            setEmail('')
        }
    }, [selectedDoctor])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const values = {
            name,
            surname,
            speciality,
            availableForOperatingRoom,
            availableForClinic,
            email,
        }
        if (selectedDoctor) {
            updateDoctorMutation.mutate({ id: selectedDoctor._id as string, values })
        } else {
            createDoctorMutation.mutate()
        }
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
                    disabled={
                        !name ||
                        !surname ||
                        !speciality ||
                        !email ||
                        createDoctorMutation.isPending ||
                        updateDoctorMutation.isPending
                    }
                >
                    {selectedDoctor
                        ? updateDoctorMutation.isPending
                            ? 'Updating...'
                            : 'Update'
                        : createDoctorMutation.isPending
                            ? 'Creating...'
                            : 'Create'}
                </Button>
            </FormControl>
        </form>
    )
}
