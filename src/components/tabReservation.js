import React, { Component } from "react"
import CarCardRent from "./carCardRent"
// import emailjs from "emailjs-com"
import { navigate } from "gatsby"
import { Formik } from "formik"
import { tabReservationSchema } from "./formsValidationSchema"

const { API } = process.env
const defaultValues = {
  formValues: {
    name: "",
    email: "",
    phone: "",
    licenseNo: "",
  },
}
class TabReservation extends Component {
  state = {}
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
  render() {
    const { tabActive, selectVehicle } = this.props
    return (
      <div>
        <Formik
          initialValues={defaultValues.formValues}
          validationSchema={tabReservationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // console.log(values, "values")
              setSubmitting(true)
              const {
                selectVehicle: { vehicleType, rate, seats },
              } = this.props
              const { name, email } = values
              const templateId = "template_sVNqLTt7"
              const payload = `
              Hello ${name},<br/> 
              Thank you for your reservation on CarRTO. Please check your booking details below.<br/>
              Car:<br/>
              Pick up Date & Time: ${"02/17/2020 19:22"}<br/>
              Return Date & Time: ${"04/17/2020 19:22"}<br/>
              Amount: ${rate}<br/>
              `
              const templateParams = {
                from_name: "mail@carrto.com",
                to_name: `${email}, ${"mail@carrto.com"}`,
                //   subject: payload,
                message_html: payload,
              }
              const user_id = "user_NNcdtpFlqSPWXejWWE015"
              ;(async () => {
                try {
                  const response = await fetch(`${API}/Reservation/Create`, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      clientDetails: { ...this.state.formValues },
                      vehicleDetails: { ...this.props.selectVehicle },
                    }),
                  })
                  const json = await response.json()
                  const { data, status } = json
                  if (status === "Success") {
                    // emailjs
                    //   .send("gmail", templateId, templateParams, user_id)
                    //   .then(
                    //     response => {
                    //       if (response.status === 200) {
                    //         navigate("rent/#rent")
                    //       }
                    //     },
                    //     error => {
                    //       console.log("FAILED...", error)
                    //     }
                    //   )
                  }
                } catch (error) {
                  console.log(error)
                }
              })()
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
              <div className="tabRtoContainer">
                <div className="container">
                  <div className="tabRtoSec" id={"reservation"}>
                    <div className={"tabRtoHolder " + tabActive}>
                      {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item trade">
                                <a className="nav-link" href="/reservation">
                                  Reservation
                                </a>
                              </li>
                            </ul> */}
                      <div className="tab-content">
                        <div
                          className="tab-pane rent fade"
                          style={{ padding: "1.125rem 0 0" }}
                        >
                          <div
                            className="car-menu-container"
                            style={{ paddingBottom: "4%" }}
                          >
                            {selectVehicle &&
                              Object.keys(selectVehicle).length && (
                                <CarCardRent
                                  color={"#979797"}
                                  vehicle={selectVehicle}
                                  isSelectVehicle={true}
                                />
                              )}
                          </div>
                          <div className="tabFormHolder">
                            <div className="descriptionSec">
                              <p>
                                Reservation of our fully serviced, fully
                                reconditioned fleet cars
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
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        </Formik>
      </div>
    )
  }
}
export default TabReservation
