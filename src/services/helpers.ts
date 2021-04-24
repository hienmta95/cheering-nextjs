import { parseCookies, setCookie } from 'nookies'
import axios from 'axios'

export function getAuthToken() {
  const cookies = parseCookies()
  const token = cookies.cheeringAuth

  return token || null
}

export function setAuthHeader(clear: boolean, token: string = '') {
  if (!clear) {
    setCookie(null, 'cheeringAuth', '', {
      maxAge: 0,
      path: '/',
    })
    axios.defaults.headers.common['Authorization'] = null
    return
  }

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + (token || getAuthToken())
  return
}
