import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'

export default function DoctorSorting({
    fields = [],
    value,
    onChange,
    orderValue,
    onOrderChange,
}: {
    fields: string[]
    value: string
    onChange: (value: string) => void
    orderValue: string
    onOrderChange: (value: string) => void
}) {
    console.log(value)
    return (
        <Box display='flex' alignItems='center' gap={2}>
            <FormControl variant='outlined' size='small'>
                <InputLabel id='sort-by-label'>Sort By Name</InputLabel>
                <Select
                    labelId='sort-by-label'
                    id='sortBy'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    label='Sort By'
                >
                    {fields.map((field) => (
                        <MenuItem key={field} value={field}>
                            {field}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography>/</Typography>

            <FormControl variant='outlined' size='small'>
                <InputLabel id='sort-order-label'>Sort Order Name</InputLabel>
                <Select
                    labelId='sort-order-label'
                    id='sortOrder'
                    value={orderValue}
                    onChange={(e) => onOrderChange(e.target.value)}
                    label='Sort Order'
                >
                    <MenuItem value='ascending'>ascending</MenuItem>
                    <MenuItem value='descending'>descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
