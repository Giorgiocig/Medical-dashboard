import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateDoctor from './doctorPage.tsx/CreateDoctor'
import type { IAlertDialog } from '../utilities/interfaces'

export default function AlertDialog({
    setSuccessMessage,
    setIsSuccessSubmit,
    setErrorMessage,
    setIsError
}: IAlertDialog) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button variant='outlined' onClick={handleClickOpen}>
                Open Dialog to create a new doctor
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>Create a new Doctor</DialogTitle>
                <DialogContent>
                    <CreateDoctor
                        dialogAction={handleClose}
                        setSuccessMessage={setSuccessMessage}
                        setIsSuccessSubmit={setIsSuccessSubmit}
                        setErrorMessage={setErrorMessage}
                        setIsError={setIsError}

                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
