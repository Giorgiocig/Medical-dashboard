import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateDoctor from './doctorPage.tsx/CreateDoctor'
import type { IFormDialog } from '../utilities/interfaces'

export default function FormDialog({
    setSuccessMessage,
    setIsSuccessSubmit,
    setErrorMessage,
    setIsError,
    handleClose,
    openFormDialog,
    selectedDoctor,
}: IFormDialog) {
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
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
