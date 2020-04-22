import React from "react"
import Dialog from "@material-ui/core/Dialog"
import { Formik } from "formik"
import { tabReservationSchema } from "./formsValidationSchema"
import CarCardRent from "./carCardRent"
import { withStyles } from "@material-ui/core/styles"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { miscutils } from "../utils/miscutils"
import moment from "moment"
import CircularProgress from "@material-ui/core/CircularProgress"
import LoginDialog from "./loginDialog"
import SnackbarNotify from "./../components/snackbar"
import { handleFetchUserDetails } from "./../utils/miscutils"
const { API } = process.env
const defaultValues = {
  formValues: {
    name: "",
    email: "",
    phone: "",
    licenseNo: "",
  },
}
const DialogTitle = withStyles()(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "4px 11px",
      }}
    >
      {onClose ? (
        <IconButton
          aria-label="close"
          className={"closeButton"}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})
export default class TabReservationDialog extends React.Component {
  state = {
    stepInit: 0,
    isLoginPopupOpen: false,
    formValues: defaultValues.formValues,
    loader: false,
    submitReservation: false,
    isFormSubmit: false,
  }

  static defaultProps = {
    rideDetails: {},
    selectVehicle: {},
  }
  componentDidMount() {
    if (typeof window !== "undefined") {
      require("smooth-scroll")('a[href*="#"]')
    }
  }
  handleChangeField = event => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value,
      },
    })
  }

  callbackFireAfterLogin = val => {
    this.setState({ isLoginPopupOpen: false })
    this.setState({
      formValues: {
        ...this.state.formValues,
        email: val.email,
        name: val.username,
      },
    })
  }
  handleClose = () => {
    this.props.handleToggle(false)
    this.setState({ formValues: defaultValues.formValues })
  }
  makeDateFormat(date) {
    return new Date(date).toLocaleDateString()
  }
  makeTimeFormat(date) {
    return new Date(date).toLocaleTimeString()
  }
  handleReservedCarSendEmail = async values => {
    this.setState({ isFormSubmit: true })
    const {
      selectVehicle: { totalRateCharge, Make, Size, Seats },
      rideDetails: { pickupDate, pickupTime, returnDate, returnTime },
    } = this.props

    const { name, email } = values
    const msg = {
      to: [{ email: `${email}` }, { email: "mail@carrto.com" }],
      from: "will@carrto.com",
      subject: "CarRTO Services",
      text: "and easy to do anywhere, even with Node.js",
      html: `
      Hello ${name},<br/> 
      Thank you for your reservation on CarRTO. Please check your booking details below.<br/>
      Car:<br/>
      Type: ${Make + " " + Size}<br/>
      Size: ${Size}<br/>
      Seats: ${Seats}<br/>
      Pickup Date & Time: ${moment(`${pickupDate} ${pickupTime}`).format(
        "LLLL"
      )}<br/>
      Return Date & Time: ${moment(`${returnDate} ${returnTime}`).format(
        "LLLL"
      )}<br/>
      Amount: $${miscutils.Rental_Total(totalRateCharge)}<br/>
      `,
    }
    // from_name: "mail@carrto.com",
    try {
      const response = await fetch(`${API}/Reservation/Create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientDetails: { ...values },
          vehicleDetails: {
            ...this.props.selectVehicle,
            startDate: new Date(`${pickupDate} ${pickupTime}`),
            endDate: new Date(`${returnDate} ${returnTime}`),
            totalRateCharge: miscutils.Rental_Total(totalRateCharge),
          },
        }),
      })
      const json = await response.json()
      const { data, status } = json
      if (status === "Success") {
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
              stepInit: this.state.stepInit + 1,
              isFormSubmit: false,
              submitReservation: true,
            })
          } else if (message === "Unauthorized" && json.code === 401) {
            this.setState({ isFormSubmit: false })
            this.child.handleClick(
              json.response?.body?.errors[0]?.message ||
                "Something get wrong... Try again later",
              "error"
            )
          }
        } catch (error) {
          this.setState({ isFormSubmit: false })
          this.child.handleClick(
            "Something get wrong... Try again later",
            "error"
          )
          console.log(error, "error")
        }
      }
    } catch (error) {
      this.setState({ isFormSubmit: false })
      this.child.handleClick("Something get wrong... Try again later", "error")
      console.log(error)
    }
  }
  handleRegisterWithServices = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (userLoggedIn) {
      this.setState({ loader: true })
      handleFetchUserDetails()
        .then(res => {
          this.setState({
            formValues: {
              ...this.state.formValues,
              email: res.email,
              name: res.username,
            },
            loader: false,
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({
            loader: false,
          })
        })
    } else {
      this.setState({
        isLoginPopupOpen: true,
      })
    }
  }
  render() {
    const { open, tabActive, selectVehicle, color } = this.props
    const { isLoginPopupOpen } = this.state
    return (
      <div>
        <SnackbarNotify onRef={ref => (this.child = ref)} />
        <Dialog
          disableBackdropClick
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="confirmVehicleDialog"
          onExiting={() => {
            this.setState({ stepInit: 0 })
          }}
        >
          <LoginDialog
            open={isLoginPopupOpen}
            handleToggle={() => {
              this.setState({ isLoginPopupOpen: false })
            }}
            tabActive={tabActive}
            callbackFireAfterLogin={this.callbackFireAfterLogin}
          />
          <div>
            <div className="tabRtoContainer tabReservation">
              <div className="container">
                <div className="tabRtoSec" id={"reservation"}>
                  <div className={"tabRtoHolder " + tabActive}>
                    <div className="tab-content">
                      <div
                        className="tab-pane rent fade"
                        style={{ padding: "0.125rem 0px 0px" }}
                      >
                        {!this.state.submitReservation && (
                          <DialogTitle
                            id="customized-dialog-title"
                            onClose={this.handleClose}
                          ></DialogTitle>
                        )}
                        {(() => {
                          switch (this.state.stepInit) {
                            case 0:
                              return (
                                <div className="tabFormHolder">
                                  <div className="descriptionSec">
                                    <p>
                                      Reservation of our fully serviced, fully
                                      reconditioned fleet cars
                                    </p>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-12">
                                      <div style={{ paddingBottom: "4%" }}>
                                        {selectVehicle &&
                                          Object.keys(selectVehicle).length && (
                                            <CarCardRent
                                              color={color}
                                              vehicle={selectVehicle}
                                              isSelectVehicle={true}
                                              tabActive={tabActive}
                                              countDays={this.props.countDays}
                                            />
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-sm-12">
                                      <div className="form-group text-center">
                                        <button
                                          className="btn btn-light"
                                          onClick={() =>
                                            this.setState({
                                              stepInit: this.state.stepInit + 1,
                                            })
                                          }
                                        >
                                          Confirm
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            case 1:
                              return (
                                <>
                                  <Formik
                                    initialValues={this.state.formValues}
                                    validationSchema={tabReservationSchema}
                                    enableReinitialize
                                    onSubmit={(values, { setSubmitting }) => {
                                      setTimeout(() => {
                                        this.handleReservedCarSendEmail(values)
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
                                      return (
                                        <div className="tabFormHolder">
                                          <div className="descriptionSec">
                                            <p>
                                              Reservation of our fully serviced,
                                              fully reconditioned fleet cars
                                            </p>
                                          </div>
                                          <form
                                            className="trade-form"
                                            onSubmit={handleSubmit}
                                          >
                                            <div className="row">
                                              <div className="col-sm-6">
                                                <div className="row">
                                                  <div className="col-md-12">
                                                    <div className="well">
                                                      <input
                                                        type="text"
                                                        name="name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.name}
                                                        className="form-control"
                                                        placeholder="NAME:"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                    <div className="form-group error">
                                                      {errors.name &&
                                                        touched.name &&
                                                        errors.name}
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
                                                    <div className="form-group error">
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
                                                        name="phone"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                        className="form-control"
                                                        placeholder="PHONE:"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                    <div className="form-group error">
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
                                                        type="text"
                                                        name="licenseNo"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.licenseNo}
                                                        className="form-control"
                                                        placeholder="LICENSE NO:"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                    <div className="form-group error">
                                                      {errors.licenseNo &&
                                                        touched.licenseNo &&
                                                        errors.licenseNo}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-sm-12 text-center">
                                                <div className="form-group">
                                                  <button
                                                    className="btn btn-light"
                                                    type="submit"
                                                    disabled={
                                                      isSubmitting ||
                                                      this.state.isFormSubmit
                                                    }
                                                  >
                                                    Submit
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                          <div className="col-sm-12">
                                            <div className="text-center">
                                              <h4 style={{ color: "#fff" }}>
                                                Or
                                              </h4>
                                            </div>
                                          </div>
                                          <div className="col-sm-12">
                                            <div className="form-group text-center">
                                              <button
                                                className="btn btn-light"
                                                onClick={
                                                  this
                                                    .handleRegisterWithServices
                                                }
                                              >
                                                {this.state.loader ? (
                                                  <CircularProgress
                                                    disableShrink
                                                  />
                                                ) : (
                                                  "Register with service"
                                                )}
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }}
                                  </Formik>
                                </>
                              )
                            case 2:
                              return (
                                <div className="tabFormHolder">
                                  <div
                                    className="descriptionSec"
                                    style={{ padding: 18 }}
                                  >
                                    <p>
                                      Thank you for using our rental service.
                                      <br />
                                      Our representative will contact you within
                                      24 hours.
                                    </p>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group text-center">
                                      <button
                                        className="btn btn-light"
                                        onClick={() => {
                                          this.handleClose()
                                          this.props.handleResolved()
                                          this.setState({
                                            submitReservation: false,
                                          })
                                        }}
                                      >
                                        Return
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          </div>
        </Dialog>
      </div>
    )
  }
}
