import React, { Component } from "react"
import { Link } from "gatsby"
import CarCardRent from "./carCardRent"
import CarCardTradeOwn from "./carCardTradeOwn"
import DatePickerBar from "./datePicker"
import TimePicker from "./timePicker"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Formik } from "formik"
import { tabRtoValidationSchema } from "./formsValidationSchema"
import ConfirmationModal from "./confirmationModal"
import TabDialogTradeOwn from "./tabDialogTradeOwn"
import { miscutils } from "./../utils/miscutils"
import SnackbarNotify from "./../components/snackbar"
const { API } = process.env

const defaultValues = {
  tradeFormValues: {
    tradeOpt: "",
    make: "",
    model: "",
    year: "",
    miles: "",
    phone: "",
    email: "",
    vin: "",
  },
}
class TabRto extends Component {
  state = {
    tradeFormValues: defaultValues.tradeFormValues,
    openConfirmationModal: false,
    stepTrade: 0,
    isConfirmVehicleDialog: false,
    inventoryVehicle: [],
    vehicleListUnique: [],
    isFormSubmit: false,
  }
  static defaultProps = {
    listVehicles: [],
    buyVehicles: [],
    tradeFormValues: null,
    rideDetails: {},
  }

  componentDidMount() {
    if (this.props.tradeFormValues) {
      this.setState({ tradeFormValues: this.props.tradeFormValues })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.tradeFormValues !== this.props.tradeFormValues) {
      this.setState({ tradeFormValues: this.props.tradeFormValues })
    }
    if (prevProps.buyVehicles !== this.props.buyVehicles) {
      let updateBuyVehicleList = []
      this.props.buyVehicles.forEach(item => {
        updateBuyVehicleList = [
          ...updateBuyVehicleList,
          {
            ...item,
            Value:
              typeof item.Value === "string"
                ? item.Value.toString()
                    .split("$")
                    .join("")
                    .split(",")
                    .join("")
                : item.Value,
          },
        ]
        // item.Value= item.Value.replace(",", "").replace("$", "")
      })
      let filterBuyVehicle = updateBuyVehicleList.filter(item => {
        return item.Status === "Service" || item.Status === "Available"
      })
      this.setState({ inventoryVehicle: filterBuyVehicle })
    }

    if (prevProps.listVehicles !== this.props.listVehicles) {
      let uniqueArray = miscutils.removeDuplicates(
        this.props.listVehicles,
        "Size"
      )
      this.setState({ vehicleListUnique: uniqueArray })
    }
  }

  handleStepIncrement = () => {
    this.setState({ stepTrade: this.state.stepTrade + 1 })
  }

  handleStepDecrement = () => {
    this.setState({ stepTrade: this.state.stepTrade - 1 })
  }

  sendEmail = async tradeFormValues => {
    const msg = {
      to: [{ email: `${tradeFormValues.email}` }, { email: "mail@carrto.com" }],
      from: "will@carrto.com",
      subject: "CarRTO Services",
      text: "and easy to do anywhere, even with Node.js",
      html: `
      Hello ${tradeFormValues.email},<br/>
      Thank you for using our trade service.<br/>
      Car details:<br/>
      Make: ${tradeFormValues.make},<br/>
      Model: ${tradeFormValues.model},<br/>
      Year: ${tradeFormValues.year},<br/>
      Miles: ${tradeFormValues.miles},<br/>
      vin: ${tradeFormValues.vin}<br/>
      Our representative will contact you within 24 hours.
      `,
    }
    try {
      const response = await fetch(`${API}/EMAIL/SENDEMAIL`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(msg),
      })
      const json = await response.json()
      const { status, message } = json
      if (message === "Accepted" && (status === 202 || status === 201)) {
        this.setState({
          tradeFormValues: defaultValues.tradeFormValues,
          isFormSubmit: false,
          isConfirmVehicleDialog: true,
        })
      } else {
        this.setState({ isFormSubmit: false })
        console.log(json.response?.body?.errors[0]?.message, "-hello-->")
        this.child.handleClick(
          json.response?.body?.errors[0]?.message ||
            "Something get wrong... Try again later",
          "error"
        )
      }
    } catch (error) {
      this.setState({ isFormSubmit: false })
      this.child.handleClick("Something get wrong... Try again later", "error")
      console.log(error)
    }
  }

  handleVerifyResolved = async tradeFormValues => {
    this.setState({ isFormSubmit: true })
    try {
      const response = await fetch(`${API}/Trade/TradeInDetails`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tradeFormValues,
        }),
      })
      const json = await response.json()
      const { data, status } = json
      if (status === "Success") {
        this.sendEmail(tradeFormValues)
      } else {
        this.setState({ isFormSubmit: false })
        this.child.handleClick(
          "Something get wrong... Try again later",
          "error"
        )
      }
    } catch (error) {
      this.setState({ isFormSubmit: false })
      this.child.handleClick("Something get wrong... Try again later", "error")
      console.log(error)
    }
  }
  render() {
    const {
      tabActive,
      isSearchEnable,
      isLoading,
      error,
      rideDetails,
    } = this.props
    const { stepTrade, openConfirmationModal } = this.state
    let count = 0
    return (
      <div className="tabRtoContainer">
        <div className="container">
          <div className="tabRtoSec" id={tabActive}>
            <div className={"tabRtoHolder " + tabActive}>
              <ul
                className="nav nav-tabs"
                id="myTab"
                // role="tablist"
              >
                <li className="nav-item rent">
                  <Link className="nav-link" to="/rent/#rent">
                    Rent
                  </Link>
                </li>
                <li className="nav-item trade">
                  <Link className="nav-link" to="/trade/#trade">
                    Trade
                  </Link>
                </li>
                <li className="nav-item own">
                  <Link className="nav-link" to="/own/#own">
                    Own
                  </Link>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane rent fade">
                  <div className="tabFormHolder">
                    {/* <div className="descriptionSec">
                      <p>
                        Rent a car to drive for<br></br>
                        <b>Uber</b>, <b>lyft</b>, <b>postmates</b>,{" "}
                        <b>door dash</b> & <b>grubhub</b>
                      </p>
                    </div> */}
                    <div
                      className="row align-items-center justify-content-center"
                      style={{ color: "#fff" }}
                    >
                      <div className="col-xl-4 col-md-6">
                        <div>Select your pick-up date and time:</div>
                        <div className="row">
                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <DatePickerBar
                                bookingDateTime={(date, identifier) => {
                                  console.log(date, "pickupdate")
                                  this.props.bookingDateTime(date, identifier)
                                }}
                                defaultDateTime={rideDetails.pickupDate}
                                identifier={"pickupDate"}
                                placeholder={"MM/DD/YYYY"}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <TimePicker
                                defaultDateTime={rideDetails.pickupTime}
                                bookingDateTime={this.props.bookingDateTime}
                                placeholder={"HH:MM"}
                                identifier={"pickupTime"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6">
                        <div>Select your return date and time:</div>
                        <div className="row">
                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <DatePickerBar
                                defaultDateTime={rideDetails.returnDate}
                                bookingDateTime={(date, identifier) => {
                                  console.log(date, "returndate")
                                  this.props.bookingDateTime(date, identifier)
                                }}
                                identifier={"returnDate"}
                                placeholder={"MM/DD/YYYY"}
                                minDate={rideDetails.pickupDate}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <TimePicker
                                defaultDateTime={rideDetails.returnTime}
                                bookingDateTime={this.props.bookingDateTime}
                                placeholder={"HH:MM"}
                                identifier={"returnTime"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-4 rent-search-btn mb-md-0 mb-3">
                        <Button
                          variant="contained"
                          color="inherit"
                          disabled={!isSearchEnable}
                          onClick={this.props.searchVehiclesByRate}
                          className={
                            !isSearchEnable
                              ? "disable-search-btn"
                              : "search-btn"
                          }
                          fullWidth
                        >
                          SEARCH
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="car-menu-container">
                          {error ? (
                            <div
                              className="heading"
                              style={{ textAlign: "center", marginTop: "2%" }}
                            >
                              Failed to fetch data...
                            </div>
                          ) : isLoading ? (
                            <div
                              style={{ textAlign: "center", marginTop: "2%" }}
                            >
                              <CircularProgress disableShrink />
                            </div>
                          ) : (
                            <div>
                              {this.state.vehicleListUnique.length !== 0 ? (
                                this.state.vehicleListUnique.map(vehicle => {
                                  count = count + 1
                                  return (
                                    <div key={vehicle.VIN}>
                                      <CarCardRent
                                        color={"#b4371e"}
                                        vehicle={vehicle}
                                        tabActive="rent"
                                        rideDetails={rideDetails}
                                        countDays={this.props.countDays}
                                        handleSearchVehicle={
                                          this.props.searchVehiclesByRate
                                        }
                                      />
                                      {count % 3 === 0 && (
                                        <div
                                          className="display-jumbotron"
                                          style={{ background: "#b4371e" }}
                                        >
                                          <a className="link" href="/#">
                                            Need a Rental you can use for Uber
                                            or Lyft?
                                          </a>
                                          <div className="start-here-div">
                                            <button className="start-here start-here-rent">
                                              Start Here
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )
                                })
                              ) : (
                                <div className="heading">
                                  {rideDetails.error}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane trade fade">
                  <SnackbarNotify onRef={ref => (this.child = ref)} />

                  <div className="tabFormHolder">
                    <div className="descriptionSec">
                      <p>
                        Request Option out of your vehicle and Into one of our
                        fully serviced, fully reconditioned fleet cars
                      </p>
                    </div>
                    <Formik
                      initialValues={this.state.tradeFormValues}
                      enableReinitialize
                      validationSchema={tabRtoValidationSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          if (values.tradeOpt === "byCheque") {
                            this.setState({
                              openConfirmationModal: true,
                              tradeFormValues: values,
                            })
                          } else if (values.tradeOpt === "byVehicle") {
                            this.handleStepIncrement()
                            this.setState({ tradeFormValues: values })
                          }
                          setSubmitting(false)
                        }, 400)
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => {
                        return (() => {
                          switch (stepTrade) {
                            case 0:
                              return (
                                <form
                                  className="trade-form"
                                  onSubmit={handleSubmit}
                                >
                                  <ConfirmationModal
                                    open={openConfirmationModal}
                                    handleToggle={() => {
                                      this.setState({
                                        openConfirmationModal: !openConfirmationModal,
                                      })
                                    }}
                                    handleVerifyResolved={() => {
                                      this.handleVerifyResolved(values)
                                    }}
                                  />
                                  <TabDialogTradeOwn
                                    open={this.state.isConfirmVehicleDialog}
                                    handleToggle={() => {
                                      this.setState({
                                        isConfirmVehicleDialog: !this.state
                                          .isConfirmVehicleDialog,
                                      })
                                    }}
                                    tabActive={tabActive}
                                    handleResolved={() => {}}
                                    tradeOptByCheque={
                                      this.state.isConfirmVehicleDialog
                                    }
                                  />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="text"
                                              name="make"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.make}
                                              className="form-control"
                                              placeholder="MAKE:"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.make &&
                                              touched.make &&
                                              errors.make}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="text"
                                              name="model"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.model}
                                              className="form-control"
                                              placeholder="MODEL:"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.model &&
                                              touched.model &&
                                              errors.model}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="text"
                                              name="year"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.year}
                                              className="form-control"
                                              placeholder="YEAR:"
                                              maxLength={4}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.year &&
                                              touched.year &&
                                              errors.year}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="text"
                                              name="miles"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.miles}
                                              className="form-control"
                                              placeholder="MILES:"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.miles &&
                                              touched.miles &&
                                              errors.miles}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="text"
                                              name="phone"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.phone}
                                              className="form-control"
                                              placeholder="PHONE:"
                                              maxLength={11}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.phone &&
                                              touched.phone &&
                                              errors.phone}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="email"
                                              name="email"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.email}
                                              className="form-control"
                                              placeholder="EMAIL:"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.email &&
                                              touched.email &&
                                              errors.email}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="well">
                                            <input
                                              type="text"
                                              name="vin"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.vin}
                                              className="form-control"
                                              placeholder="VIN:"
                                              maxLength={17}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.vin &&
                                              touched.vin &&
                                              errors.vin}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6 trade-for">
                                      <div className="row">
                                        <div className="container">
                                          <div className="row align-items-center">
                                            <div className="col-md-4">
                                              TRADE FOR:
                                            </div>
                                            <div className="col-md-8 p-0">
                                              <RadioGroup
                                                style={{ width: "100%" }}
                                                aria-label="position"
                                                name="tradeOpt"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.tradeOpt}
                                                row
                                              >
                                                <div className="col-6">
                                                  <FormControlLabel
                                                    value="byCheque"
                                                    style={{
                                                      marginBottom: "0px",
                                                      marginRight: "0px",
                                                    }}
                                                    control={
                                                      <Radio color="primary" />
                                                    }
                                                    label="Cheque $$"
                                                    labelPlacement="end"
                                                  />
                                                </div>
                                                <div className="col-6">
                                                  <FormControlLabel
                                                    value="byVehicle"
                                                    style={{
                                                      marginBottom: "0px",
                                                      marginRight: "0px",
                                                    }}
                                                    control={
                                                      <Radio color="primary" />
                                                    }
                                                    label="Vehicle"
                                                    labelPlacement="end"
                                                  />
                                                </div>
                                              </RadioGroup>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group highlight-error">
                                            {errors.tradeOpt &&
                                              touched.tradeOpt &&
                                              errors.tradeOpt}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="col-lg-4 col-md-6 text-left"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <a href="/#" style={{ color: "#fff" }}>
                                        Why Vin Required Now?
                                      </a>
                                    </div>
                                    <div className="col-lg-4 col-md-6 text-center">
                                      <button
                                        className="btn btn-light"
                                        type="submit"
                                        disabled={
                                          isSubmitting ||
                                          this.state.isFormSubmit
                                        }
                                      >
                                        REQUEST TRADE OPTION
                                      </button>
                                    </div>
                                    <div className="col-sm-4"></div>
                                  </div>
                                </form>
                              )
                            case 1:
                              return (
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="car-menu-container">
                                      {error ? (
                                        <div
                                          style={{
                                            textAlign: "center",
                                            marginTop: "2%",
                                          }}
                                        >
                                          <h4>Failed to fetch data...</h4>
                                        </div>
                                      ) : isLoading ? (
                                        <div
                                          style={{
                                            textAlign: "center",
                                            marginTop: "2%",
                                          }}
                                        >
                                          <CircularProgress disableShrink />
                                        </div>
                                      ) : (
                                        <div>
                                          {this.state.inventoryVehicle &&
                                            this.state.inventoryVehicle.map(
                                              vehicle => (
                                                <div key={vehicle.VIN}>
                                                  <CarCardTradeOwn
                                                    color={"#979797"}
                                                    vehicle={vehicle}
                                                    tabActive="trade"
                                                    tradeFormValues={values}
                                                  />
                                                </div>
                                              )
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                          }
                        })()
                      }}
                    </Formik>
                  </div>
                </div>

                <div
                  className="tab-pane own fade"
                  // id="own"
                >
                  <div className="tabFormHolder">
                    <div className="descriptionSec">
                      <p>
                        3 ways to access<br></br>our fleet of fully inspected,
                        Fully Reconditioned rentals
                      </p>
                    </div>
                    <div className="car-menu-container">
                      {error ? (
                        <div style={{ textAlign: "center", marginTop: "2%" }}>
                          <h4>Failed to fetch data...</h4>
                        </div>
                      ) : isLoading ? (
                        <div style={{ textAlign: "center", marginTop: "2%" }}>
                          <CircularProgress disableShrink />
                        </div>
                      ) : (
                        <div>
                          {this.state.inventoryVehicle &&
                            this.state.inventoryVehicle.map(
                              (vehicle, index) => (
                                <div key={vehicle.VIN}>
                                  <div>
                                    <CarCardTradeOwn
                                      color={"#efaa52"}
                                      vehicle={vehicle}
                                      tabActive="own"
                                    />
                                  </div>

                                  {(index + 1) % 3 === 0 && (
                                    <div
                                      className="display-jumbotron"
                                      style={{ background: "#efaa52" }}
                                    >
                                      <a className="link" href="/#">
                                        Need more payment Options?
                                      </a>
                                      <div className="link-div">
                                        Apply to our Rent-To-Own Program
                                      </div>
                                      <div className="start-here-div">
                                        <button className="start-here start-here-own">
                                          Start Here
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default TabRto
