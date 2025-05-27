export const getDoctors = async (queryParams: { [key: string]: any }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/doctors?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}
