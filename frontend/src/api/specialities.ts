export const getSpecialities = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/specialities`)
  return await res.json()
}

export const createSpeciality = async (specialityName: string) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/specialities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ specialityName }),
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Something went wrong')
  }

  return await res.json()
}

export const deleteSpeciality = async (id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/specialities/${id}`,
    {
      method: 'DELETE',
    },
  )
  return await res.json()
}
