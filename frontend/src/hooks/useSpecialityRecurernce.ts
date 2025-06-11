import { useMemo } from 'react'
import { extractSpecialityRecurrence } from '../utilities/helpers'
import type { IDoctor } from '../utilities/interfaces'

export const useSpecialityRecurrence = (doctors: IDoctor[]) => {
  return useMemo(() => extractSpecialityRecurrence(doctors), [doctors])
}
