import { Box, Button } from '@mui/material'
import FormLabel from '@mui/material/FormLabel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDoctor, updateDoctor } from '../../api/doctors'
import { useCallback, useEffect, useState } from 'react'
import type { ICreateDoctorProps, IDoctor } from '../../utilities/interfaces'
import RadioButtonGroup from './RadioButtonGroup'
import TextFieldGroup from './TextFieldGroup'
import BasicSelect from './SelectSpeciality'

export default function CreateDoctor({
    dialogAction,
    setSuccessMessage,
    setIsSuccessSubmit,
    setErrorMessage,
    setIsError,
    selectedDoctor,
    specialities
}: ICreateDoctorProps) {
    const [formData, setFormData] = useState<IDoctor>({
        name: '',
        surname: '',
        speciality: '',
        email: '',
        availableForOperatingRoom: false,
        availableForClinic: false,
    })

    const queryClient = useQueryClient()

    const createDoctorMutation = useMutation({
        mutationFn: () => createDoctor(formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
            setSuccessMessage(data.message)
            setIsSuccessSubmit(true)
            dialogAction()
        },
        onError: (error) => {
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
            const {
                name,
                surname,
                speciality,
                availableForOperatingRoom,
                availableForClinic,
                email,
            } = selectedDoctor

            setFormData({
                name,
                surname,
                speciality,
                availableForOperatingRoom,
                availableForClinic,
                email,
            })
        } else {
            setFormData({
                name: '',
                surname: '',
                speciality: '',
                email: '',
                availableForOperatingRoom: false,
                availableForClinic: false,
            })
        }
    }, [selectedDoctor])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedDoctor) {
            updateDoctorMutation.mutate({
                id: selectedDoctor._id as string,
                values: formData,
            })
        } else {
            createDoctorMutation.mutate()
        }
    }

    const handleChange = useCallback(
        (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }))
        },
        [],
    )

    const handleRadioChange = useCallback(
        (field: keyof typeof formData) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                    ...prev,
                    [field]: e.target.value === 'true',
                }))
            },
        [],
    )

    return (
        <form onSubmit={handleSubmit} >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormLabel>Insert new doctor</FormLabel>
                <TextFieldGroup options={[{
                    label: 'Name',
                    value: formData.name,
                    onChange: handleChange('name')
                }, {
                    label: 'Surname',
                    value: formData.surname,
                    onChange: handleChange('surname')
                }, {
                    label: 'Email',
                    value: formData.email,
                    onChange: handleChange('email')
                }]}
                />
                <BasicSelect specialities={specialities} value={formData.speciality}
                    onChange={handleChange('speciality')} />
                <RadioButtonGroup
                    options={[
                        {
                            formLabel: 'Available for operating Room',
                            value: formData.availableForOperatingRoom.toString(),
                            onChange: handleRadioChange('availableForOperatingRoom'),
                            radioOptions: [
                                { radioOptionLabel: 'available', value: 'true' },
                                { radioOptionLabel: 'not available', value: 'false' },
                            ],
                        },
                        {
                            formLabel: 'Available for Clinic',
                            value: formData.availableForClinic.toString(),
                            onChange: handleRadioChange('availableForClinic'),
                            radioOptions: [
                                { radioOptionLabel: 'available', value: 'true' },
                                { radioOptionLabel: 'not available', value: 'false' },
                            ],
                        },
                    ]}
                />

                <Button
                    type='submit'
                    variant='contained'
                    disabled={
                        !formData.name ||
                        !formData.surname ||
                        !formData.email ||
                        !formData.speciality ||
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
            </Box>
        </form >
    )
}
