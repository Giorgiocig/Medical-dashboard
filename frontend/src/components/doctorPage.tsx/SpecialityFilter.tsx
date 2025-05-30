import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


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
    );
}