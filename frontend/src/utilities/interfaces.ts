export interface IDoctor {
  name: string
  surname: string
  speciality: string
  availableForOperatingRoom: boolean
  availableForClinic: boolean
  email: string
  _id?: string
}

export interface IListDoctorsOptions {
  sortBy: string
  sortOrder: string
}

export interface IDoctorCardList {
  doctors: IDoctor[]
}

export interface ICreateDoctorProps {
  dialogAction: () => void
  setSuccessMessage: (message: string) => void
  setIsSuccessSubmit: (value: boolean) => void
  setErrorMessage: (message: string) => void
  setIsError: (value: boolean) => void
}

export interface IAlertDialog {
  setSuccessMessage: (message: string) => void
  setIsSuccessSubmit: (value: boolean) => void
  setErrorMessage: (message: string) => void
  setIsError: (value: boolean) => void
}
