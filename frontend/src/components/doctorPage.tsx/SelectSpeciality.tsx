import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function BasicSelect({
    specialities,
    value,
    onChange,
}: any) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="speciality-select-label">Speciality</InputLabel>
                <Select
                    labelId="speciality-select-label"
                    id="speciality-select"
                    value={value}
                    label="Speciality"
                    onChange={onChange}
                >
                    {specialities.map((spec: any) => (
                        <MenuItem key={spec.specialityName} value={spec.specialityName}>
                            {spec.specialityName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
