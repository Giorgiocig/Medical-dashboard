import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import type { IRadioButtonGroupProps } from "../../utilities/interfaces";


export default function RadioButtonGroup({ options }: IRadioButtonGroupProps) {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {options.map(((options, indx) => (
                <FormControl key={indx}>
                    <FormLabel id="buttons-group-label">{options.formLabel}</FormLabel>
                    <RadioGroup
                        value={options.value}
                        onChange={options.onChange}
                    >{options.radioOptions.map(((radioOption, indx) => (
                        <FormControlLabel key={indx} value={radioOption.value} control={<Radio />} label={radioOption.radioOptionLabel} />
                    )))}
                    </RadioGroup>
                </FormControl>
            )))}
        </Box>
    )
}