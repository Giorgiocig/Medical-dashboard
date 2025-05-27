import type { IDoctor } from '../utilities/interfaces'

export const getDoctors = async (queryParams: { [key: string]: any }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/doctors?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const createDoctor = async (doctor: IDoctor) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doctor),
  })
  return await res.json()
}
