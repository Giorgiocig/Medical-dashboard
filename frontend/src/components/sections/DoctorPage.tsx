import {
    Box,
    Button,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDoctors } from '../../api/doctors'
import type { IDoctor } from '../../utilities/interfaces'
import DoctorCardList from '../doctorPage.tsx/DoctorCardList'
import FormDialog from '../FormDialalog'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import VerticalBarChart from '../doctorPage.tsx/VerticalBarsChart'
import { extractSpecialityRecurrence } from '../../utilities/helpers'
import { useCountDoctorAvailabilityByKey } from '../../hooks/useCountDoctorAvailabilityByKey'
import { createSpeciality, getSpecialities } from '../../api/specialities'
import DoctorFiltersSection from '../doctorPage.tsx/DoctorFiltersSection'

export default function DoctorPage() {
    const [name, setName] = useState('')
    const [speciality, setSpeciality] = useState("")
    const [specialities, setSpecialities] = useState<any>('')
    const [sortBy, setSortBy] = useState('speciality')
    const [sortOrder, setSortOrder] = useState('descending')
    const [selectedDoctor, setSelectedDoctor] = useState<null | IDoctor>(null)
    const [openFormDialog, setOpenFormDialog] = useState(false)
    const [specialityTextField, setSpecialityTextField] = useState<string>('')
    //message
    const [successMessage, setSuccessMessage] = useState<null | string>(null)
    const [isSuccessSubmit, setIsSuccessSubmit] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [isError, setIsError] = useState<boolean>(false)
    // debounce
    const debouncedName = useDebounce(name, 500)

    const queryOptions = {
        queryKey: [
            'doctors',
            { name: debouncedName, speciality, sortBy, sortOrder },
        ],
        queryFn: () =>
            getDoctors({ name: debouncedName, speciality, sortBy, sortOrder }),
        keepPreviousData: true,
    }
    const doctorsQuery = useQuery(queryOptions)
    const doctors = doctorsQuery.data ?? []

    const handleClickOpen = (doctor: IDoctor | null) => {
        setOpenFormDialog(true)
        setSelectedDoctor(doctor)
    }

    const handleClose = () => {
        setOpenFormDialog(false)
    }

    const extractedSpecialities = extractSpecialityRecurrence(doctors)
    const extractedAvailableForClinic = useCountDoctorAvailabilityByKey(doctors, "availableForClinic")
    const extractedAvailableForOperatingRoom = useCountDoctorAvailabilityByKey(doctors, "availableForOperatingRoom")

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSpecialities()
            setSpecialities(response)
        }
        fetchData()
    }, [])


    return (
        <Box>
            <Typography sx={{ paddingBottom: 6 }}>
                Numbers of Doctors in the building: {doctors.length}
            </Typography>
            <Box sx={{ display: "flex", gap: 6 }}>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingBottom: 2,
                            gap: 2,
                        }}
                    >
                        <DoctorCardList doctors={doctors} handleClickOpen={handleClickOpen} />
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="add new speciality"
                                variant='outlined'
                                onChange={(e) => setSpecialityTextField(e.target.value)}
                            />
                            <Button type='submit'>Add specialities</Button>
                        </form>
                        <DoctorFiltersSection options={[{
                            title: "filter by name",
                            type: "text",
                            field: "name",
                            value: name,
                            onChange: (value: string) => setName(value),
                            action: () => setName(""),
                            showClearButton: name,
                        },
                        {
                            title: "ascending / descending",
                            type: "sorting",
                            fields: ['speciality'],
                            value: sortBy,
                            onChange: (value: string) => setSortBy(value),
                            orderValue: sortOrder,
                            onOrderChange: (value: string) => setSortOrder(value),
                            action: () => setSortOrder('descending'),
                            showClearButton: sortOrder !== 'descending',
                        },
                        {
                            title: "filter by speciality",
                            type: "speciality",
                            value: speciality,
                            onChange: (value: string) => setSpeciality(value),
                            action: () => setSpeciality(""),
                            doctors,
                            showClearButton: speciality,
                        }]} />


                    </Box>
                    <Button
                        sx={{ width: '100%' }}
                        variant='outlined'
                        onClick={() => handleClickOpen(null)}
                        endIcon={<ArrowCircleRightIcon />}
                    >
                        Create a new doctor
                    </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <VerticalBarChart text={"specialities"} sampleData={extractedSpecialities} />
                    <VerticalBarChart text={"available For Clinic"} sampleData={extractedAvailableForClinic} />
                    <VerticalBarChart text={"available For OperatingRoom"} sampleData={extractedAvailableForOperatingRoom} />
                </Box>
            </Box>
            <FormDialog
                setSuccessMessage={setSuccessMessage}
                setIsSuccessSubmit={setIsSuccessSubmit}
                setErrorMessage={setErrorMessage}
                setIsError={setIsError}
                openFormDialog={openFormDialog}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                selectedDoctor={selectedDoctor}
                specialities={specialities}
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
