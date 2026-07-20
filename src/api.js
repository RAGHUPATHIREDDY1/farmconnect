const API_BASE_URL =
  "https://farmconnectbackend.onrender.com"

export const apiFetch = async (
  endpoint,
  options = {}
) => {
  const token =
    localStorage.getItem("accessToken")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers.Authorization =
      `Bearer ${token}`
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  )

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      "Something went wrong"
    )
  }

  return data
}

export default API_BASE_URL