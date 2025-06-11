import { BACKGROUND_COLUMN_GRAPH_COLORS } from './constants'
import type { availableForClinicObj, IDoctor } from './interfaces'

export const extractSpecialityRecurrence = (object: IDoctor[]) => {
  let specialitiesObj: { [key: string]: number } = {}
  for (const doctor of object) {
    if (doctor.speciality in specialitiesObj)
      specialitiesObj[doctor.speciality] += 1
    else {
      specialitiesObj[doctor.speciality] = 1
    }
  }
  return specialitiesObj
}

export const extractAvailableForClinic = (
  object: IDoctor[],
  key: keyof IDoctor,
) => {
  let availableForClinicObj: availableForClinicObj = {
    available: 0,
    not_available: 0,
  }
  for (const doctor of object) {
    if (doctor[key] === true) availableForClinicObj['available'] += 1
    if (doctor[key] === false) availableForClinicObj['not_available'] += 1
  }

  return availableForClinicObj
}

export const graphData = (xAxisLabels: string[], dataValues: number[]) => {
  const xLabels = xAxisLabels.map((label: string) =>
    label === 'not_available' ? 'not available' : label,
  )

  const data = {
    labels: xLabels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: BACKGROUND_COLUMN_GRAPH_COLORS,
        borderWidth: 1,
      },
    ],
  }
  return data
}

export const graphOptions = (text: string) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: text,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }
  return options
}
