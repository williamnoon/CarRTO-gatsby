import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SliderInner from "../components/sliderInner"
import TabRto from "../components/tabRto"
import moment from "moment"
import SnackbarNotify from "./../components/snackbar"
import { miscutils } from "./../utils/miscutils"
import { rentalRates } from "./../utils/rentalrates"

const { API } = process.env

class RentPage extends React.Component {
  state = {
    listVehicles: [],
    rideDetails: {
      pickupDate: "",
      pickupTime: "",
      returnDate: "",
      returnTime: "",
      error: null,
    },
    isSearchEnable: false,
    isLoading: false,
    error: null,
    countDays: null,
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    document.body.classList.add("rent")
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (userLoggedIn) {
    }
    this.searchVehiclesFor2DaysWithTime(new Date(), new Date())
  }

  searchVehiclesFor2DaysWithTime = (Date1, Date2) => {
    let dt1 = new Date(Date1)
    let dt2 = new Date(Date2)
    let pickupDate = new Date(miscutils.roundedDate(dt1))
    let returnDate = new Date(miscutils.roundedDate(dt2))
    returnDate.setDate(returnDate.getDate() + 2)
    let pickupTime = miscutils.roundedDate(dt1)
    pickupTime = miscutils.formatTimeInAMPM(pickupTime)

    let returnTime = miscutils.roundedDate(dt2)
    returnTime = miscutils.formatTimeInAMPM(returnTime)

    this.setState(
      {
        rideDetails: {
          ...this.state.rideDetails,
          pickupDate: pickupDate.toLocaleDateString(),
          pickupTime,
          returnDate: returnDate.toLocaleDateString(),
          returnTime,
        },
      },
      () => {
        this.handleSearchVehicles()
      }
    )
  }
  componentWillUnmount() {
    document.body.classList.remove("rent")
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.rideDetails !== prevState.rideDetails) {
      const {
        rideDetails: { pickupDate, returnDate, pickupTime, returnTime },
      } = this.state
      if (pickupDate && returnDate && pickupTime && returnTime) {
        this.setState({ isSearchEnable: true })
      } else {
        this.setState({ isSearchEnable: false })
      }
    }
  }

  fetchRentalReservationVehicles = async () => {
    try {
      const response = await fetch(`${API}/Reservation/GetReservation`)
      if (response.ok) {
        const json = await response.json()
        const { data } = json
        return data
      } else {
        throw new Error("Something went wrong ...")
      }
    } catch (error) {
      this.setState({ error, isLoading: false }, () => {
        this.child.handleClick(
          "<div>Failed to fetch data from server...</br>Try again later</div>",
          "error"
        )
      })
    }
  }
  handleBookingDateTime = (date, identifier) => {
    if (identifier === "pickupDate" || identifier === "returnDate") {
      this.setState(
        {
          rideDetails: {
            ...this.state.rideDetails,
            [identifier]: new Date(date).toLocaleDateString(),
          },
        },
        () => {
          let startDt = new Date(
            `${this.state.rideDetails.pickupDate} ${this.state.rideDetails.pickupTime}`
          )
          let endDt = new Date(
            `${this.state.rideDetails.returnDate} ${this.state.rideDetails.returnTime}`
          )
          if (startDt > endDt) {
            this.handleSearchVehiclesForTwoDays(startDt, startDt)
          } else {
            this.handleSearchVehicles()
          }
        }
      )
    } else if (identifier === "pickupTime" || identifier === "returnTime") {
      this.setState(
        {
          rideDetails: {
            ...this.state.rideDetails,
            [identifier]: date,
          },
        },
        () => {
          this.handleSearchVehicles()
        }
      )
    }
  }
  handleSearchVehiclesForTwoDays = (Date1, Date2) => {
    let pickupDate = new Date(Date1)
    let returnDate = new Date(moment(Date2).add(2, "days"))
    // returnDate.setDate(returnDate.getDate() + 2)
    this.setState(
      {
        rideDetails: {
          ...this.state.rideDetails,
          pickupDate: pickupDate.toLocaleDateString(),
          returnDate: returnDate.toLocaleDateString(),
        },
      },
      () => {
        this.handleSearchVehicles()
      }
    )
  }

  validateDateTimeSelect = () => {
    this.setState({ isLoading: true })
    const {
      rideDetails: { pickupDate, pickupTime, returnDate, returnTime, error },
    } = this.state
    let pickupDt = moment(`${pickupDate} ${pickupTime}`) //todays date
    let returnDt = moment(`${returnDate} ${returnTime}`) // another date
    let duration = moment.duration(returnDt.diff(pickupDt))
    let hours = duration.asHours()
    if (hours === 0 || (hours > 0 && hours < 1)) {
      this.setState({
        rideDetails: {
          ...this.state.rideDetails,
          error: "There must be at least one hour between pick up and drop off",
        },
      })
      return false
    } else if (hours < 0) {
      this.setState({
        rideDetails: {
          ...this.state.rideDetails,
          error: "Pick-up must be before drop-off",
        },
      })
      return false
    } else {
      this.setState({
        rideDetails: {
          ...this.state.rideDetails,
          error: null,
        },
      })
      return true
    }
  }

  handleSearchVehicles = async () => {
    if (await this.validateDateTimeSelect()) {
      if (this.state.rideDetails.error === null) {
        const {
          rideDetails: { pickupDate, pickupTime, returnDate, returnTime },
        } = this.state
        let countDays = miscutils.calculateTimeDifferenceInDays(
          `${pickupDate} ${pickupTime}`,
          `${returnDate} ${returnTime}`
        )
        let startDt = new Date(`${pickupDate} ${pickupTime}`)
        let endDt = new Date(`${returnDate} ${returnTime}`)

        this.fetchRentalAllVehicles().then(data => {
          if (data) {
            let rentalNewCar = data.filter(item => {
              return (
                item.Rental === "TRUE" &&
                (item.Status === "Service" || item.Status === "Available")
              )
            })
            this.fetchRentalReservationVehicles().then(vehicle => {
              let rentalActiveCars = []
              let filterRentalCarWithReserveCar = []
              if (vehicle && vehicle.length && rentalNewCar.length) {
                rentalNewCar.forEach(rentalCar => {
                  vehicle.forEach(reservedVehicle => {
                    const { vehicleDetails } = reservedVehicle
                    if (rentalCar.VIN === vehicleDetails.VIN) {
                      if (
                        (startDt >= new Date(vehicleDetails.startDate) &&
                          startDt <= new Date(vehicleDetails.endDate)) ||
                        (endDt >= new Date(vehicleDetails.startDate) &&
                          endDt <= new Date(vehicleDetails.endDate))
                      ) {
                        rentalActiveCars = [
                          ...rentalActiveCars,
                          reservedVehicle,
                        ]
                      }
                    }
                  })
                })
              } else {
                filterRentalCarWithReserveCar = [...rentalNewCar]
              }
              if (rentalActiveCars.length) {
                filterRentalCarWithReserveCar = rentalNewCar.filter(
                  rentalCar =>
                    !rentalActiveCars.find(
                      ({ vehicleDetails }) =>
                        rentalCar.VIN === vehicleDetails.VIN
                    )
                )
              } else filterRentalCarWithReserveCar = [...rentalNewCar]

              let listVehicleWithRates = []
              filterRentalCarWithReserveCar.forEach(vehicle => {
                rentalRates().forEach(type => {
                  if (
                    miscutils.convertIntoLowercase(vehicle.Size) ===
                    miscutils.convertIntoLowercase(type.Rental_size)
                  ) {
                    if (vehicle.Premium === "FALSE") {
                      listVehicleWithRates = [
                        ...listVehicleWithRates,
                        {
                          ...vehicle,
                          rate: type.Base_Rate,
                          totalRateCharge: countDays * type.Base_Rate,
                          Size: `${
                            vehicle.Size
                          } ${miscutils.addSizeKeywordVehicle(vehicle.Size)}`,
                        },
                      ]
                    } else if (vehicle.Premium === "TRUE") {
                      listVehicleWithRates = [
                        ...listVehicleWithRates,
                        {
                          ...vehicle,
                          rate: type.Premium_Rate,
                          totalRateCharge: countDays * type.Premium_Rate,
                          Size: `${
                            vehicle.Size
                          } ${miscutils.addSizeKeywordVehicle(
                            vehicle.Size
                          )} Premium`,
                        },
                      ]
                    }
                  } else {
                    listVehicleWithRates = [...listVehicleWithRates]
                  }
                })
              })
              this.setState({
                listVehicles: listVehicleWithRates,
                isLoading: false,
                countDays,
              })
            })
          }
        })
      }
    } else {
      setTimeout(() => {
        this.setState({ isLoading: false, listVehicles: null })
      }, 1000)
    }
  }
  fetchRentalAllVehicles = async () => {
    try {
      const response = await fetch(`${API}/Vehicle/GetAllVehicles`)
      if (response.ok) {
        const json = await response.json()
        const { data } = json
        return data
      } else {
        throw new Error("Something went wrong ...")
      }
    } catch (error) {
      this.setState({ error, isLoading: false }, () => {
        this.child.handleClick(
          "<div>Failed to fetch data from server...</br>Try again later</div>",
          "error"
        )
      })
    }
  }
  render() {
    const { listVehicles, isSearchEnable, isLoading, error } = this.state
    return (
      <Layout tabActiveSelect="rent">
        {error && <SnackbarNotify onRef={ref => (this.child = ref)} />}
        <SEO title="Rent" />
        <SliderInner></SliderInner>
        <div className="homeRtoCalloutSp">
          <TabRto
            tabActive="rent"
            listVehicles={listVehicles}
            rideDetails={this.state.rideDetails}
            bookingDateTime={this.handleBookingDateTime}
            searchVehiclesByRate={this.handleSearchVehicles}
            isSearchEnable={isSearchEnable}
            isLoading={isLoading}
            error={error}
            countDays={this.state.countDays}
          />
        </div>
      </Layout>
    )
  }
}

export default RentPage
