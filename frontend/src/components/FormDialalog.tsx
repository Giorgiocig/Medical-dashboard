import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateDoctor from './doctorPage.tsx/CreateDoctor'
import type { IFormDialog } from '../utilities/interfaces'
import { useState } from 'react'
import { Snackbar } from '@mui/material'

export default function FormDialog({
    handleClose,
    openFormDialog,
    selectedDoctor,
    specialities
}: IFormDialog) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
    const [isError, setIsError] = useState(false)
    return (
        <>
            <Dialog
                open={openFormDialog}
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
                        selectedDoctor={selectedDoctor}
                        specialities={specialities}
                    />
                </DialogContent>
            </Dialog>
            <Snackbar
                open={isSuccessSubmit}
                autoHideDuration={1500}
                message={successMessage}
                onClose={() => setIsSuccessSubmit(false)}
            />
            <Snackbar
                open={isError}
                autoHideDuration={2000}
                message={errorMessage}
                onClose={() => setIsError(false)}
            />
        </>
    )
}
