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
  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Something went wrong')
  }
  return await res.json()
}

export const deleteDoctor = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctors/${id}`, {
    method: 'DELETE',
  })
  return await res.json()
}

export const updateDoctor = async (id: string, doctor: IDoctor) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctors/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doctor),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update doctor')
  }
  return await res.json()
}
