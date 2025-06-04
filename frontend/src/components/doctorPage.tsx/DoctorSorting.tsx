import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function DoctorSorting({
    orderValue,
    onOrderChange,
}: {
    fields: string[]
    value: string
    onChange: (value: string) => void
    orderValue: string
    onOrderChange: (value: string) => void
}) {
    return (
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
    )
}
