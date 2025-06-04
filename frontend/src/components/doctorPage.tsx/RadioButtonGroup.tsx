import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import type { IRadioButtonGroupProps } from "../../utilities/interfaces";


export default function RadioButtonGroup({ options }: IRadioButtonGroupProps) {

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {options.map(((options) => (
                <FormControl>
                    <FormLabel id="buttons-group-label">{options.formLabel}</FormLabel>
                    <RadioGroup
                        value={options.value}
                        onChange={options.onChange}
                    >{options.radioOptions.map(((radioOption) => (
                        <FormControlLabel value={radioOption.value} control={<Radio />} label={radioOption.radioOptionLabel} />
                    )))}
                    </RadioGroup>
                </FormControl>
            )))}
        </Box>
    )
}