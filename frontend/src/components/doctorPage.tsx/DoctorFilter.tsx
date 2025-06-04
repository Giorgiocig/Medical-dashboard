import { Box, TextField, Typography } from '@mui/material'

export default function DoctorFilter({
    field,
    value,
    onChange,
}: {
    field: string
    value: string
    onChange: (value: string) => void
}) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", }}>
            <Typography sx={{ paddingBottom: 1 }}>FILTER {field}</Typography>
            <TextField
                id={`filter-${field}`}
                label={`filter-${field}`}
                variant='outlined'
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    )
}
