import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SliderInner from "../components/sliderInner"
import Contact from "../components/contact"
import Testimonials from "../components/testimonials"
import CarCardTradeOwn from "./../components/carCardTradeOwn"
import uuidv1 from "uuid/v1"
// import emailjs from "emailjs-com"
// import ConfirmationModal from "./confirmationModal"
import LoginDialog from "./../components/loginDialog"
import { Formik } from "formik"
import { tabReservationSchema } from "./../components/formsValidationSchema"

const defaultValues = {
  formValues: {
    name: "",
    email: "",
  },
}
const { API } = process.env
class VehicleBuy extends React.Component {
  state = {
    userDetail: {},
    error: null,
    step: 0,
    showRegisterServiceDialog: false,
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

  handleFetchUserDetails = async () => {
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    try {
      const response = await fetch(`${API}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userLoggedIn}`,
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
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
  componentWillUnmount() {
    document.body.classList.remove("vehicleBuy")
  }
  // handleSubmitSelectCar = async () => {
  //   const {
  //     location: { state },
  //   } = this.props
  //   const { userDetail } = this.state
  //   const templateId = "template_sVNqLTt7"
  //   const user_id = "user_NNcdtpFlqSPWXejWWE015"
  //   if (state.tabActive === "trade") {
  //     try {
  //       const response = await fetch(`${API}/Trade/TradeInDetails`, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ...state.tradeFormValues,
  //           tradeToOwnJointId: uuidv1(),
  //         }),
  //       })
  //       const json = await response.json()
  //       const { data, status } = json
  //       if (status === "Success") {
  //         const {
  //           tradeFormValues: { email },
  //         } = state
  //         const payload = `
  //         Hello ${email},<br/>
  //         Thank you for using our trade service. Your trade-In amount is $${state.selectVehicle.rate}`
  //         const templateParams = {
  //           from_name: "Car RTO",
  //           to_name: email,
  //           message_html: payload,
  //         }
  //         emailjs.send("gmail", templateId, templateParams, user_id).then(
  //           response => {
  //             if (response.status === 200) {
  //               navigate(`${state.tabActive}/#${state.tabActive}`)
  //             }
  //           },
  //           error => {
  //             console.log("FAILED...", error)
  //           }
  //         )
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else if (state.tabActive === "own") {
  //     try {
  //       const response = await fetch(`${API}/Own/CarOwnDetails`, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ClientDetail: { ...this.state.userDetail },
  //           vehicleDetail: { ...state.selectVehicle },
  //           tabActive: state.tabActive,
  //           tradeToOwnJointId: null,
  //         }),
  //       })
  //       const json = await response.json()
  //       const { data, status } = json
  //       if (status === "Success") {
  //         const payload = `
  //         Hello ${userDetail.username},<br/>
  //         Thank you for using our Own service. Your vehicle amount is $${state.selectVehicle.rate}`
  //         const templateParams = {
  //           from_name: "Car RTO",
  //           to_name: userDetail.email,
  //           //   subject: payload,
  //           message_html: payload,
  //         }
  //         emailjs.send("gmail", templateId, templateParams, user_id).then(
  //           response => {
  //             if (response.status === 200) {
  //               navigate(`${state.tabActive}/#${state.tabActive}`)
  //             }
  //           },
  //           error => {
  //             console.log("FAILED...", error)
  //           }
  //         )
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     throw new Error("Something went wrong ...")
  //   }
  // }
  handleRegisterWithService = () => {
    this.setState({ showRegisterServiceDialog: true })
  }
  callbackFireAfterLogin = () => {
    this.setState({
      showRegisterServiceDialog: false,
      step: this.state.step + 1,
    })
  }
  sendEmail = values => {
    const { name, email } = values
    const templateId = "template_sVNqLTt7"
    const payload = `
    Hello ${name},<br/>
    Thank you for using our trade service.<br/>
    Our representative will contact you within 24 hours.
    `
    const templateParams = {
      from_name: "Car RTO",
      to_name: `${email}, ${"mail@carrto.com"}`,
      //   subject: payload,
      message_html: payload,
    }
    const user_id = "user_NNcdtpFlqSPWXejWWE015"
    // emailjs.send("gmail", templateId, templateParams, user_id).then(
    //   response => {
    //     if (response.status === 200) {
    //       this.setState({
    //         step: this.state.step + 1,
    //       })
    //     }
    //   },
    //   error => {
    //     console.log("FAILED...", error)
    //   }
    // )
  }
  render() {
    const {
      location: { state },
    } = this.props
    const { showRegisterServiceDialog } = this.state
    return (
      <>
        {state && (
          <Layout tabActiveSelect={state.tabActive}>
            <SEO title="Rent" />
            <SliderInner></SliderInner>
            <div className="homeRtoCalloutSp">
              <div className="tabRtoContainer">
                <div className="container">
                  <div className="tabRtoSec" id={"vehicleBuy"}>
                    <div className={"tabRtoHolder " + state.tabActive}>
                      <div className="tab-content">
                        <div
                          className={`tab-pane ${state.tabActive} fade`}
                          style={{ padding: "1.125rem 0 0" }}
                        >
                          {(() => {
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
                                          {state.selectVehicle &&
                                            Object.keys(state.selectVehicle)
                                              .length && (
                                              <CarCardTradeOwn
                                                color={"#979797"}
                                                vehicle={state.selectVehicle}
                                                isSelectVehicle={true}
                                                tabActive={state.tabActive}
                                              />
                                            )}
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group text-center">
                                          <button
                                            className="btn btn-light"
                                            onClick={() => {
                                              navigate(
                                                `/${state.tabActive}/#${state.tabActive}`,
                                                {
                                                  state: {
                                                    tradeFormValues:
                                                      state.tradeFormValues,
                                                  },
                                                }
                                              )
                                            }}
                                          >
                                            Go Back
                                          </button>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="form-group text-center">
                                          <button
                                            className="btn btn-light"
                                            onClick={() =>
                                              this.setState({
                                                step: this.state.step + 1,
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
                                      initialValues={defaultValues.formValues}
                                      validationSchema={tabReservationSchema}
                                      onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                          setSubmitting(true)
                                          this.sendEmail(values)
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
                                              open={showRegisterServiceDialog}
                                              handleToggle={() => {
                                                this.setState({
                                                  showRegisterServiceDialog: !showRegisterServiceDialog,
                                                })
                                              }}
                                              tabActive={state.tabActive}
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
                                                <div className="col-sm-12">
                                                  <div className="form-group text-center">
                                                    <button
                                                      className="btn btn-light"
                                                      type="submit"
                                                      disabled={isSubmitting}
                                                    >
                                                      Submit
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="col-sm-12">
                                                  <div className="text-center">
                                                    <h4
                                                      style={{ color: "#fff" }}
                                                    >
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
                                                          .handleRegisterWithService
                                                      }
                                                    >
                                                      Register with service
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </form>
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
                                        Thank you for using our{" "}
                                        {state.tabActive} service.
                                        <br />
                                        Our representative will contact you
                                        within 24 hours.
                                      </p>
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
            </div>
            <Testimonials></Testimonials>
            <Contact></Contact>
          </Layout>
        )}
      </>
    )
  }
}

export default VehicleBuy
