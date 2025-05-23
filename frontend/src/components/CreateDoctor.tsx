import { TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function CreateDoctor({ }: {}) {
    return (
        <div>
            <FormControl>
                <FormLabel id='demo-radio-buttons-group-label'>
                    Insert new doctor
                </FormLabel>
                <TextField id='outlined-basic' label='Name' variant='outlined' />
                <TextField id='outlined-basic' label='Surname' variant='outlined' />
                <TextField id='outlined-basic' label='Speciality' variant='outlined' />
                <Typography>available for operating room</Typography>
                <RadioGroup
                    aria-labelledby='"available for operating room"'
                    defaultValue={true}
                    name='radio-buttons-group'
                >
                    <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label='available'
                    />
                    <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label='not available'
                    />
                </RadioGroup>
                <Typography>available for operating room</Typography>
                <RadioGroup
                    aria-labelledby='"available for clinic"'
                    defaultValue={true}
                    name='radio-buttons-group'
                >
                    <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label='available'
                    />
                    <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label='not available'
                    />
                </RadioGroup>
            </FormControl>
        </div>
    )
}
