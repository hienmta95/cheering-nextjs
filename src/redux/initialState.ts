// import { parseCookies } from "nookies"

// const cookies = parseCookies()
// const userCookie = cookies.cheeringAuth ? JSON.parse(cookies.cheeringAuth) : {}

// let currentUser = null
// let isAuthenticated = false

// if (userCookie) {
//   const now = new Date()
//   const loginPlus = new Date(new Date(userCookie.login_at).getTime() + 1000 * 3600)
//   if (loginPlus >= now) {
//     currentUser = userCookie
//     isAuthenticated = true
//   }
// }

const initialState = {
  isLoading: false,
  currentUser: null,
  isAuthenticated: false,
}

export default initialState
