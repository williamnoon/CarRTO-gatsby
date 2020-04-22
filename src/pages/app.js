import React from "react"
import { Router } from "@reach/router"
import AdminScreen from "../admin/pages/admin"
import LoginAdmin from "../admin/pages/loginAdmin"
import PrivateRoute from "../components/privateRoute"
import Users from "./../admin/pages/users"
import Reservations from "./../admin/pages/reservations"
import RentalVehicles from "./../admin/pages/vehicleManagement/rentalVehicles"
import OwnVehicles from "./../admin/pages/vehicleManagement/ownvehicles"
import PaymentManagement from "./../admin/pages/payments"
import RateManagement from "./../admin/pages/rates"
import SaleManagement from "./../admin/pages/sales"

const App = () => (
  <Router basepath="/app">
    <PrivateRoute path="/admin" component={AdminScreen} />
    <PrivateRoute path="/admin/users" component={Users} />
    <PrivateRoute path="/admin/reservations" component={Reservations} />
    <PrivateRoute path="/admin/rentalCars" component={RentalVehicles} />
    <PrivateRoute path="/admin/ownCars" component={OwnVehicles} />
    <PrivateRoute path="/admin/payments" component={PaymentManagement} />
    <PrivateRoute path="/admin/rates" component={RateManagement} />
    <PrivateRoute path="/admin/sales" component={SaleManagement} />
    <LoginAdmin path="/loginAdmin" />
  </Router>
)
export default App
