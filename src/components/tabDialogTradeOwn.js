import React from "react"
import Dialog from "@material-ui/core/Dialog"
import LoginDialog from "./loginDialog"
import { Formik } from "formik"
import { tabOwnDetailsSchema } from "./formsValidationSchema"
import CarCardTradeOwn from "./carCardTradeOwn"
import { withStyles } from "@material-ui/core/styles"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import uuidv1 from "uuid/v1"
import SnackbarNotify from "./../components/snackbar"
import { handleFetchUserDetails } from "./../utils/miscutils"
const defaultValues = {
  formValues: {
    name: "",
    email: "",
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
const { API } = process.env
export default class TabDialogTradeOwn extends React.Component {
  state = {
    userDetail: {},
    error: null,
    step: 0,
    isLoginPopupOpen: false,
    formValues: { ...defaultValues.formValues },
    loader: false,
    isFormSubmit: false,
  }
  componentDidMount() {
    document.body.classList.add("vehicleBuy")
    if (typeof window !== "undefined") {
      require("smooth-scroll")('a[href*="#"]')
    }
    // this.handleFetchUserDetails()
    //   .then(data => {
    //     this.setState({ userDetail: data })
    //   })
    //   .catch(error => this.setState({ error }))
  }
  componentWillUnmount() {
    document.body.classList.remove("vehicleBuy")
  }

  handleFetchUserDetails = async () => {
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    try {
      const response = await fetch(`${API}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userLoggedIn}`,
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const json = await response.json()
        return json
      }
    } catch (error) {
      return error
    }
  }

  callbackFireAfterLogin = ({ username, email }) => {
    // if (this.props.tabActive === "trade") {
    //   this.handleSubmitCarTradeWithOwnDetail({ name: username, email })
    // } else if (this.props.tabActive === "own") {
    //   this.handleSubmitCarOwnDetail({ name: username, email })
    // }
    this.setState({ isLoginPopupOpen: false })
    this.setState({
      formValues: {
        ...this.state.formValues,
        email: email,
        name: username,
      },
    })
  }
  sendEmail = async values => {
    const { name, email } = values
    const msg = {
      to: [{ email: `${email}` }, { email: "mail@carrto.com" }],
      from: "will@carrto.com",
      subject: "CarRTO Services",
      text: "and easy to do anywhere, even with Node.js",
      html: `Hello ${name},<br/>
      Thank you for using our ${this.props.tabActive} service.<br/>
      Our representative will contact you within 24 hours.`,
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
          step: this.state.step + 1,
          isFormSubmit: false,
        })
      } else {
        this.setState({ isFormSubmit: false })
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
  handleSubmitCarTradeWithOwnDetail = async clientDetail => {
    this.setState({ isFormSubmit: true })
    try {
      const response = await fetch(`${API}/Trade/TradeInDetails`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...this.props.tradeFormValues,
          tradeToOwnJointId: uuidv1(),
        }),
      })
      const json = await response.json()
      const { data, status } = json
      if (status === "Success") {
        this.handleSubmitCarOwnDetail(clientDetail, data.tradeToOwnJointId)
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
  handleSubmitCarOwnDetail = async (clientDetail, joinId) => {
    this.setState({ isFormSubmit: true })
    try {
      const response = await fetch(`${API}/Own/CarOwnDetails`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tradeToOwnJointId: joinId,
          clientDetail: { ...clientDetail },
          vehicleDetail: { ...this.props.selectVehicle },
        }),
      })
      const json = await response.json()
      const { data, status } = json
      if (status === "Success") {
        this.sendEmail(clientDetail)
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
  handleClose = () => {
    this.props.handleToggle(false)
    this.setState({ formValues: defaultValues.formValues })
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
          this.child.handleClick(
            "Something get wrong... Try again later",
            "error"
          )
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
    const { isLoginPopupOpen, formValues } = this.state
    const { open, tabActive, selectVehicle, color } = this.props

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
            this.setState({ step: 0 })
          }}
        >
          <div className="confirmVehicleDialogMain">
            <div className="tabRtoContainer">
              <div className="container">
                <div className="tabRtoSec" id={"vehicleBuy"}>
                  <div className={"tabRtoHolder " + tabActive}>
                    <div className="tab-content">
                      <div
                        className={`tab-pane ${tabActive} fade`}
                        style={{ padding: "0.125rem 0px 0px" }}
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={this.handleClose}
                        ></DialogTitle>
                        {!this.props.tradeOptByCheque ? (
                          (() => {
                            switch (this.state.step) {
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
                                            Object.keys(selectVehicle)
                                              .length && (
                                              <CarCardTradeOwn
                                                color={color}
                                                vehicle={selectVehicle}
                                                isSelectVehicle={true}
                                                tabActive={tabActive}
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
                                                step: this.state.step + 1,
                                                formValues: {
                                                  ...this.state.formValues,
                                                  ...this.props.tradeFormValues,
                                                },
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
                                  <div>
                                    <Formik
                                      initialValues={this.state.formValues}
                                      validationSchema={tabOwnDetailsSchema}
                                      enableReinitialize
                                      onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                          if (tabActive === "trade") {
                                            this.handleSubmitCarTradeWithOwnDetail(
                                              values
                                            )
                                          } else if (tabActive === "own") {
                                            this.handleSubmitCarOwnDetail(
                                              values
                                            )
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
                                        return (
                                          <div className="tabFormHolder">
                                            <LoginDialog
                                              open={isLoginPopupOpen}
                                              handleToggle={() => {
                                                this.setState({
                                                  isLoginPopupOpen: !isLoginPopupOpen,
                                                })
                                              }}
                                              tabActive={tabActive}
                                              callbackFireAfterLogin={
                                                this.callbackFireAfterLogin
                                              }
                                            />
                                            <div className="descriptionSec">
                                              <p>
                                                Reservation of our fully
                                                serviced, fully reconditioned
                                                fleet cars
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
                                                          onChange={
                                                            handleChange
                                                          }
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
                                                          onChange={
                                                            handleChange
                                                          }
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
                                                <div className="col-sm-12 text-center">
                                                  <div className="form-group">
                                                    <button
                                                      style={{
                                                        fontWeight: "light",
                                                      }}
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
                                                  style={{
                                                    fontWeight: "light",
                                                  }}
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
                                  </div>
                                )
                              case 2:
                                return (
                                  <div className="tabFormHolder">
                                    <div className="descriptionSec">
                                      <p>
                                        Thank you for using our {tabActive}{" "}
                                        service.
                                        <br />
                                        Our representative will contact you
                                        within 24 hours.
                                      </p>
                                    </div>
                                    <div className="col-sm-12">
                                      <div className="form-group text-center">
                                        <button
                                          className="btn btn-light"
                                          onClick={this.handleClose}
                                        >
                                          Return
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                            }
                          })()
                        ) : (
                          <div className="tabFormHolder">
                            <div className="descriptionSec">
                              <p>
                                Thank you for using our {this.props.tabActive}{" "}
                                service.
                                <br />
                                Our representative will contact you within 24
                                hours.
                              </p>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group text-center">
                                <button
                                  className="btn btn-light"
                                  onClick={() => {
                                    this.props.handleToggle(false)
                                  }}
                                >
                                  Return
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
