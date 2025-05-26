import { Box, TextField, Typography } from '@mui/material'

export default function DoctorFilter({ field }: { field: string }) {
    return (
        <Box>
            <Typography>FILTER {field}</Typography>
            <TextField
                id={`filter-${field}`}
                label={`filter-${field}`}
                variant='outlined'
            />
        </Box>
    )
}
