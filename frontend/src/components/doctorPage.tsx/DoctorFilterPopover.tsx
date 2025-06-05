import * as React from 'react'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

interface DoctorFilterPopoverProps {
    title: string,
    children: React.ReactNode
}

export default function DoctorFilterPopover({
    title,
    children,
}: DoctorFilterPopoverProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <div>
            <Button aria-describedby={id} variant='contained' onClick={handleClick}>
                {title}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ padding: 3 }}>{children}</Box>
            </Popover>
        </div>
    )
}
