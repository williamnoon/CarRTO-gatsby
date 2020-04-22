import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/loginAdmin`) {
    navigate("/app/loginAdmin")
    return null
  }
  return <Component {...rest} location={location} />
}
export default PrivateRoute
