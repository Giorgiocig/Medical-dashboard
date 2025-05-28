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
