import {
    Box,
    Button,
    Snackbar,
    Typography,
} from '@mui/material'
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
import DoctorFilterPopover from '../doctorPage.tsx/DoctorFilterPopover'
import TooltipIconBtn from '../TooltipIconBtn'
import VerticalBarChart from '../doctorPage.tsx/VerticalBarsChart'
import { extractSpecialityRecurrence } from '../../utilities/helpers'
import { useCountDoctorAvailabilityByKey } from '../../hooks/useCountDoctorAvailabilityByKey'

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

    useEffect(() => {
        const specialities = doctors.map((doctor: IDoctor) => doctor.speciality)
        setAllSpecialities(specialities)
    }, [doctors])

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
                        <Box sx={{ display: 'flex', width: '80%' }}>
                            <DoctorFilterPopover title='filter by name'>
                                <DoctorFilter
                                    field='name'
                                    value={name}
                                    onChange={(value) => setName(value)}
                                />
                            </DoctorFilterPopover>
                            {name && (
                                <TooltipIconBtn title='cancel filter' action={() => setName("")} />
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', width: '80%' }}>
                            <DoctorFilterPopover title='ascending / descending'>
                                <DoctorSorting
                                    fields={['speciality']}
                                    value={sortBy}
                                    onChange={(value) => setSortBy(value)}
                                    orderValue={sortOrder}
                                    onOrderChange={(orderValue) => setSortOrder(orderValue)}
                                />
                            </DoctorFilterPopover>
                            {sortOrder === 'ascending' && (
                                <TooltipIconBtn title='cancel filter' action={() => setSortOrder('descending')} />
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', width: '80%' }}>
                            <DoctorFilterPopover title='filter by speciality'>
                                <SpecialityFilter
                                    value={speciality}
                                    onChange={(value) => setSpeciality(value)}
                                    options={allSpecialities}
                                />
                            </DoctorFilterPopover>
                            {speciality && (
                                <TooltipIconBtn title='cancel filter' action={() => setSpeciality('')} />
                            )}
                        </Box>
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
