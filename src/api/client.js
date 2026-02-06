const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '')
const AUTH_TOKEN_KEY = 'auth_token'

const buildUrl = (path, params) => {
  const cleanPath = path.replace(/^\/+/, '')
  const url = new URL(`${API_URL}/${cleanPath}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || value === 'all') {
        return
      }
      url.searchParams.set(key, value)
    })
  }

  return url.toString()
}

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  }
}

const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY)

const request = async (path, options = {}) => {
  const { params, body, headers, method = 'GET' } = options
  const url = buildUrl(path, params)
  const authToken = getAuthToken()

  const requestHeaders = {
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    let message = 'Request failed'
    try {
      const payload = await response.json()
      message = payload.detail || payload.error || message
    } catch {
      message = response.statusText || message
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

const api = {
  get: (path, params) => request(path, { params }),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' })
}

export { api, getAuthToken, setAuthToken, clearAuthToken }
