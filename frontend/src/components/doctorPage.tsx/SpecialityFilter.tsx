import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from '@mui/material';


export default function SpecialityFilter({
    value,
    onChange,
    options,
}: {
    value: string
    onChange: (value: string) => void
    options: string[]
}) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ paddingBottom: 1 }}>FILTER SPECIALITY</Typography>
            <Autocomplete
                value={value}
                onChange={(_, newValue) => onChange(newValue ?? '')}
                options={options}
                renderInput={(params) => (
                    <TextField {...params} label="Speciality" variant="outlined" />
                )}
                clearOnEscape
                isOptionEqualToValue={(option, value) => option === value}
            />
        </Box>
    );
}