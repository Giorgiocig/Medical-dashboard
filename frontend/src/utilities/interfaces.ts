export interface IDoctor {
  name: string
  surname: string
  speciality: string
  availableForOperatingRoom: boolean
  availableForClinic: boolean
}

export interface IListDoctorsOptions {
  sortBy: string
  sortOrder: string
}

export interface IDoctorCardList {
  doctors: IDoctor[]
}
