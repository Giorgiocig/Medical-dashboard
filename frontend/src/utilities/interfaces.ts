export interface IDoctor {
  name: string
  surname: string
  speciality: string
  availableForOperatingRoom: boolean
  availableForClinic: boolean
  email: string
  _id?: string
}

export interface IDoctorCardProps extends IDoctor {
  handleClickOpen: (value: IDoctor) => void
}

export interface IListDoctorsOptions {
  sortBy: string
  sortOrder: string
}

export interface IDoctorCardList {
  doctors: IDoctor[]
  handleClickOpen: (value: IDoctor) => void
}

export interface ICreateDoctorProps {
  dialogAction: () => void
  setSuccessMessage: (message: string) => void
  setIsSuccessSubmit: (value: boolean) => void
  setErrorMessage: (message: string) => void
  setIsError: (value: boolean) => void
  selectedDoctor: IDoctor | null
}

export interface IFormDialog {
  setSuccessMessage: (message: string) => void
  setIsSuccessSubmit: (value: boolean) => void
  setErrorMessage: (message: string) => void
  setIsError: (value: boolean) => void
  handleClose: () => void
  openFormDialog: boolean
  selectedDoctor: IDoctor | null
  handleClickOpen: (doctor: IDoctor) => void
}

type radioOption = {
  radioOptionLabel: string
  value: string
}

type radioButtonGroupOption = {
  formLabel: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  radioOptions: radioOption[]
}

export type availableForClinicObj = {
  available: number
  not_available: number
}

export interface IRadioButtonGroupProps {
  options: radioButtonGroupOption[]
}

type ITextFieldGroupOptions = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ITextFieldGroupProps {
  options: ITextFieldGroupOptions[]
}

export interface DoctorFilterPopoverProps {
  title: string
  children: React.ReactNode
}

export interface TooltipIconBtnProps {
  title: string
  action: () => void
}
