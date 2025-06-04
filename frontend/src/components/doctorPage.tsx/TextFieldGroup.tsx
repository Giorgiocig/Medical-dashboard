import { TextField } from '@mui/material'
import type { ITextFieldGroupProps } from '../../utilities/interfaces'

export default function TextFieldGroup({ options }: ITextFieldGroupProps) {
    return (
        <>
            {options.map((option) => (
                <TextField
                    label={option.label}
                    value={option.value}
                    onChange={option.onChange}
                />
            ))}
        </>
    )
}
