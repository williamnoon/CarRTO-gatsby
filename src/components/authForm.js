import React, { Component } from "react"
import { navigate } from "gatsby"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import GoogleLogin from "react-google-login"
import scrollTo from "gatsby-plugin-smoothscroll"
import { Link } from "gatsby"
const { API } = process.env
class AuthForm extends Component {
  state = {
    phone: "",
    verificationCode: "",
    isContinueBtnShow: false,
    data: {},
    scrollToIdState: "",
  }
  componentDidMount() {
    this.setState({ scrollToIdState: this.props.scrollToId }, () => {
      scrollTo(this.state.scrollToIdState)
    })
  }
  responseFacebook = res => {
    const { handleUpdateUserInfo, stepIncrement } = this.props
    if (!res.status && !("status" in res) && res.name) {
      const { name, email } = res
      handleUpdateUserInfo({ username: name, email, password: "changeme" })
      this.setState({ isContinueBtnShow: true })
    }
  }
  handleGmailAuth = res => {
    const { handleUpdateUserInfo, stepIncrement } = this.props
    if (!res.error) {
      const {
        profileObj: { name, email },
      } = res
      handleUpdateUserInfo({ username: name, email, password: "changeme" })
      this.setState({ isContinueBtnShow: true })
    }
  }
  componentClicked = e => {
    console.log(e, "e")
  }

  handleFormSubmit = async () => {
    const { verificationCode, phone } = this.state
    const response = await fetch(`${API}/verification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationCode, phone_number: `+92${phone}` }),
    })
    const json = await response.json()
    if (json.status === "approved") {
      this.props.handleUpdateUserInfo({ phone: `+92${phone}` })
      this.setState({ verificationCode: "", phone: "" })
    }
  }

  handleRequestPhoneVerify = async () => {
    const { stepIncrement } = this.props
    const { phone } = this.state
    const url = new URL(`${API}/verification`)
    const user = { phone_number: `+92${phone}` }
    Object.keys(user).forEach(key => url.searchParams.append(key, user[key]))
    const response = await fetch(url)
    const json = await response.json()
    stepIncrement()
  }
  handleGoBack = () => {
    const { step, stepDecrement } = this.props
    if (step === 0) navigate("/")
    else if (step === 1) {
      this.setState({ isContinueBtnShow: false })
      stepDecrement()
    } else if (step === 2) {
      stepDecrement()
      this.setState({ verificationCode: "", phone: "" })
    }
  }
  render() {
    const { tabActive, navigateTo, step } = this.props
    const { phone, verificationCode, isContinueBtnShow } = this.state
    return (
      <div className="tabRtoContainer">
        <div className="container">
          <div className="tabRtoSec" id="login">
            <div className={"tabRtoHolder " + tabActive}>
              <ul
                className="nav nav-tabs"
                id="myTab"
                //  role="tablist"
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
                    <div className="descriptionSec">
                      <p>
                        Verify your Identity<br></br>
                        {/* <b>Uber</b>, <b>lyft</b>, <b>postmates</b>,{" "}
                        <b>door dash</b> & <b>grubhub</b> */}
                      </p>
                    </div>
                    {(() => {
                      switch (this.props.step) {
                        case 0:
                          return (
                            <div className="row fb-gmail-parent">
                              <FacebookLogin
                                appId={process.env.FB_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                                onFailure={this.responseFacebook}
                                render={renderProps => (
                                  <div className="col-sm-6 facebook-parent">
                                    <button
                                      className="facebook"
                                      onClick={renderProps.onClick}
                                    >
                                      <b>facebook</b>
                                    </button>
                                  </div>
                                )}
                              />
                              <GoogleLogin
                                clientId={process.env.GOOGLE_CLIENT_ID}
                                buttonText="LOGIN WITH GOOGLE"
                                onSuccess={this.handleGmailAuth}
                                onFailure={this.handleGmailAuth}
                                className="gmail"
                                render={renderProps => (
                                  <div className="col-sm-6 gmail-parent">
                                    <button
                                      onClick={renderProps.onClick}
                                      disabled={renderProps.disabled}
                                      className="gmail"
                                    >
                                      <b>Gmail</b>
                                    </button>
                                  </div>
                                )}
                              />
                            </div>
                          )
                        case 1:
                          return (
                            <div className="row identity-row">
                              <div className="col-sm-2">
                                <div className="descriptionSecPhone">
                                  Phone #
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="3102255661"
                                    maxLength="10"
                                    name="phone"
                                    value={phone}
                                    onChange={event => {
                                      this.setState({
                                        [event.target.name]: event.target.value,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        case 2:
                          return (
                            <div className="row identity-row">
                              <div className="col-sm-4">
                                <div className="descriptionSecPhone">
                                  Verification Code #
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    placeholder="Enter verification code"
                                    maxLength="6"
                                    className="form-control"
                                    name="verificationCode"
                                    value={verificationCode}
                                    onChange={event => {
                                      this.setState({
                                        [event.target.name]: event.target.value,
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        default:
                          return
                      }
                    })()}
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group text-center">
                          <button
                            className="btn btn-light"
                            onClick={this.handleGoBack}
                          >
                            Go Back
                          </button>
                        </div>
                      </div>
                      <div className="descriptionSecFooter col-sm-4">
                        <p>
                          We dont share your info without your permissions...
                          <br></br>
                        </p>
                      </div>
                      {isContinueBtnShow && (
                        <div className="col-sm-4">
                          <div className="form-group text-center">
                            {step === 1 ? (
                              <button
                                className="btn btn-light"
                                onClick={this.handleRequestPhoneVerify}
                              >
                                Continue
                              </button>
                            ) : navigateTo === "reservation" ? (
                              <button
                                className="btn btn-light"
                                onClick={this.handleFormSubmit}
                              >
                                Continue
                              </button>
                            ) : (
                              <button
                                className="btn btn-light"
                                onClick={this.handleFormSubmit}
                              >
                                Finish
                              </button>
                            )}
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
      </div>
    )
  }
}
export default AuthForm
