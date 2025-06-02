import { Box, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { getDoctors } from '../../api/doctors'
import type { IDoctor } from '../../utilities/interfaces'
import DoctorCardList from '../doctorPage.tsx/DoctorCardList'
import DoctorFilter from '../doctorPage.tsx/DoctorFilter'
import DoctorSorting from '../doctorPage.tsx/DoctorSorting'
import SpecialityFilter from '../doctorPage.tsx/SpecialityFilter'
import DashboardDialog from '../AlertDialalog'

type Props = {}

export default function DoctorPage({ }: Props) {
    const [name, setName] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [sortBy, setSortBy] = useState('speciality')
    const [sortOrder, setSortOrder] = useState('descending')
    const [allSpecialities, setAllSpecialities] = useState<string[]>([])


    //message
    const [successMessage, setSuccessMessage] = useState<null | string>(null)
    const [isSuccessSubmit, setIsSuccessSubmit] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [isError, setIsError] = useState<boolean>(false);

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


    return (
        <Box>
            <Typography sx={{ paddingBottom: 3 }}>
                Numbers of Doctors in the building: {doctors.length}
            </Typography>
            <DoctorCardList doctors={doctors} />
            <Typography>NAME</Typography>
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
            <Typography>Speciality Filter</Typography>
            <SpecialityFilter
                value={speciality}
                onChange={(value) => setSpeciality(value)}
                options={allSpecialities}
            />
            <Typography>CREATE DOCTOR</Typography>
            <DashboardDialog
                setSuccessMessage={setSuccessMessage}
                setIsSuccessSubmit={setIsSuccessSubmit}
                setErrorMessage={setErrorMessage}
                setIsError={setIsError}

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
