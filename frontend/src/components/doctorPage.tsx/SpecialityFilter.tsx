import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { IDoctor } from '../../utilities/interfaces';


export default function SpecialityFilter({
    value,
    onChange,
    doctors
}: {
    value: string
    onChange: (value: string) => void
    doctors: IDoctor[]
}) {
    const specialities = Array.from(new Set(doctors.map(doctor => doctor.speciality)))

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ paddingBottom: 1 }}>FILTER SPECIALITY</Typography>
            <Autocomplete
                value={value}
                onChange={(_, newValue) => onChange(newValue ?? '')}
                options={specialities}
                renderInput={(params) => (
                    <TextField {...params} label="Speciality" variant="outlined" />
                )}
                clearOnEscape
                isOptionEqualToValue={(option, value) => option === value}
            />
        </Box>
    );
}