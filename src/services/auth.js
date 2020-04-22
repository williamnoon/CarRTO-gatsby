export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("adminAuthToken")
    ? JSON.parse(window.localStorage.getItem("adminAuthToken"))
    : {}

const setUser = user =>
  window.localStorage.setItem("adminAuthToken", JSON.stringify(user))

export const handleLogin = ({ email, password }) => {
  if (email === `will@carrto.com` && password === `12345678`) {
    return setUser({
      email: `will@carrto.com`,
    })
  }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

export const logout = callback => {
  setUser({})
  callback()
}
