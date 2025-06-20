import React, { useState } from 'react'
import DoctorFilterPopover from './DoctorFilterPopover'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSpeciality, deleteSpeciality } from '../../api/specialities'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export default function SpecialityPopover({ specialities }: any) {
    const [specialityTextField, setSpecialityTextField] = useState<string>('')
    const queryClient = useQueryClient()

    const createSpecialityMutation = useMutation({
        mutationFn: (data: string) => createSpeciality(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['specialities'] })
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createSpecialityMutation.mutate(specialityTextField)
    }

    const deleteSpecialityMutation = useMutation({
        mutationFn: (id: string) => deleteSpeciality(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['specialities'] }),
        onError: (error) => {
            console.error('Speciality creation failed:', error)
        },
    })

    return (
        <DoctorFilterPopover title='Manage speciality'>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        label='add new speciality'
                        variant='outlined'
                        onChange={(e) => setSpecialityTextField(e.target.value)}
                    />
                    <IconButton type='submit'>
                        <AddIcon />
                    </IconButton>
                </Box>
            </form>
            {specialities &&
                specialities.map((el: any, indx: number) => (
                    <Box
                        key={indx}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '30%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>{el.specialityName}</Typography>
                        <IconButton
                            aria-label='delete'
                            onClick={() => deleteSpecialityMutation.mutate(el._id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
        </DoctorFilterPopover>
    )
}
