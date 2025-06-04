import { Box, Button, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { getDoctors } from '../../api/doctors'
import type { IDoctor } from '../../utilities/interfaces'
import DoctorCardList from '../doctorPage.tsx/DoctorCardList'
import DoctorFilter from '../doctorPage.tsx/DoctorFilter'
import DoctorSorting from '../doctorPage.tsx/DoctorSorting'
import SpecialityFilter from '../doctorPage.tsx/SpecialityFilter'
import FormDialog from '../FormDialalog'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

export default function DoctorPage() {
    const [name, setName] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [sortBy, setSortBy] = useState('speciality')
    const [sortOrder, setSortOrder] = useState('descending')
    const [allSpecialities, setAllSpecialities] = useState<string[]>([])

    const [selectedDoctor, setSelectedDoctor] = useState<null | IDoctor>(null)

    const [openFormDialog, setOpenFormDialog] = useState(false)

    //message
    const [successMessage, setSuccessMessage] = useState<null | string>(null)
    const [isSuccessSubmit, setIsSuccessSubmit] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [isError, setIsError] = useState<boolean>(false)

    // debounce
    const debouncedName = useDebounce(name, 500)

    const doctorsQuery = useQuery({
        queryKey: ['doctors', { name, speciality, sortBy, sortOrder }],
        queryFn: () => getDoctors({ debouncedName, speciality, sortBy, sortOrder }),
    })

    const doctors = doctorsQuery.data ?? []

    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const doctors = await getDoctors({})
                const specialities = doctors
                    .map((doctor: IDoctor) => doctor.speciality)
                    .sort()
                setAllSpecialities(specialities)
            } catch (error) {
                console.error('Errore nel fetch delle specialità:', error)
            }
        }
        fetchSpecialities()
    }, [doctors])

    const handleClickOpen = (doctor: IDoctor | null) => {
        setOpenFormDialog(true)
        setSelectedDoctor(doctor)
    }

    const handleClose = () => {
        setOpenFormDialog(false)
    }

    return (
        <Box>
            <Typography sx={{ paddingBottom: 3 }}>
                Numbers of Doctors in the building: {doctors.length}
            </Typography>
            <Box sx={{ display: 'flex', paddingBottom: 2, gap: 4 }}>
                <DoctorCardList doctors={doctors} handleClickOpen={handleClickOpen} />
                <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <DoctorFilter
                            field='name'
                            value={name}
                            onChange={(value) => setName(value)}
                        />
                        <DoctorSorting
                            fields={['speciality']}
                            value={sortBy}
                            onChange={(value) => setSortBy(value)}
                            orderValue={sortOrder}
                            onOrderChange={(orderValue) => setSortOrder(orderValue)}
                        />
                    </Box>
                    <SpecialityFilter
                        value={speciality}
                        onChange={(value) => setSpeciality(value)}
                        options={allSpecialities}
                    />
                </Box>
            </Box>
            <Button
                sx={{ width: "55%" }}
                variant='outlined'
                onClick={() => handleClickOpen(null)}
                endIcon={<ArrowCircleRightIcon />}
            >
                Create a new doctor
            </Button>
            <FormDialog
                setSuccessMessage={setSuccessMessage}
                setIsSuccessSubmit={setIsSuccessSubmit}
                setErrorMessage={setErrorMessage}
                setIsError={setIsError}
                openFormDialog={openFormDialog}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                selectedDoctor={selectedDoctor}
            />
            <Snackbar
                open={isSuccessSubmit}
                autoHideDuration={1500}
                message={successMessage}
                onClose={() => setIsSuccessSubmit(false)}
            />
            <Snackbar
                open={isError}
                autoHideDuration={2000}
                message={errorMessage}
                onClose={() => setIsError(false)}
            />
        </Box>
    )
}
