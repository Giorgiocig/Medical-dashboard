import {
    Box,
    Button,
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
import { getSpecialities } from '../../api/specialities'
import DoctorFiltersSection from '../doctorPage.tsx/DoctorFiltersSection'
import SpecialityPopover from '../doctorPage.tsx/SpecialityPopover'

export default function DoctorPage() {
    const [name, setName] = useState('')
    const [speciality, setSpeciality] = useState("")
    const [sortBy, setSortBy] = useState('speciality')
    const [sortOrder, setSortOrder] = useState('descending')
    const [selectedDoctor, setSelectedDoctor] = useState<null | IDoctor>(null)
    const [openFormDialog, setOpenFormDialog] = useState(false)

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

    const { data: specialities = [] } = useQuery({
        queryKey: ['specialities'],
        queryFn: getSpecialities,
    })


    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ paddingBottom: 6 }}>
                    Numbers of Doctors in the building: {doctors.length}
                </Typography>
                <SpecialityPopover specialities={specialities} />
            </Box>
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
                openFormDialog={openFormDialog}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                selectedDoctor={selectedDoctor}
                specialities={specialities}

            />
        </Box>
    )
}
