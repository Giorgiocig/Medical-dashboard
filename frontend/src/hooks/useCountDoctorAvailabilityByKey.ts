import { useMemo } from 'react'
import type { IDoctor } from '../utilities/interfaces'
import { countDoctorAvailabilityByKey } from '../utilities/helpers'

export const useCountDoctorAvailabilityByKey = (
  doctors: IDoctor[],
  key: keyof IDoctor,
) => {
  return useMemo(() => countDoctorAvailabilityByKey(doctors, key), [doctors])
}
