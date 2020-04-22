import React from "react"
import DialogContentText from "@material-ui/core/DialogContentText"
import Slide from "@material-ui/core/Slide"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import GoogleLogin from "react-google-login"
import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import uuidv1 from "uuid/v1"
import "../assets/scss/main.scss"

const { API } = process.env
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const styles = theme => ({
  root: {},
  closeButton: {
    // color: theme.palette.grey[500],
  },
})
const DialogTitle = withStyles(styles)(props => {
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
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export default function LoginDialog({
  tabActive,
  open,
  handleToggle,
  callbackFireAfterLogin,
}) {
  const responseFacebook = res => {
    if (!res.status && !("status" in res) && res.name) {
      const { name, email } = res
      fetchUser({ username: name, email, password: "changeme" })
    }
  }
  const handleGmailAuth = res => {
    if (!res.error) {
      const {
        profileObj: { name, email },
      } = res
      fetchUser({ username: name, email, password: "changeme" })
    }
  }
  const componentClicked = e => {
    // console.log(e, "e")
  }
  const handleClose = () => {
    handleToggle(false)
  }
  const fetchUser = async userInfo => {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
    const json = await response.json()
    if (json.statusCode !== 401 && json.error !== "Unauthorized") {
      localStorage.setItem("userLoggedIn", JSON.stringify(json.access_token))
      callbackFireAfterLogin(userInfo)
    } else {
      // stepIncrement()
      handlePostData(userInfo)
    }
  }
  const handlePostData = async userInfo => {
    const response = await fetch(`${API}/user/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userInfo, userID: uuidv1() }),
    })
    const json = await response.json()
    if (json.statusCode !== 401 && json.error !== "Unauthorized") {
      fetchUser(userInfo)
      // localStorage.setItem("userLoggedIn", JSON.stringify(true))
      // navigate("/")
    }
  }
  return (
    <div>
      <Dialog
        disableBackdropClick
        open={open}
        TransitionComponent={Transition}
        keepMounted
        className="login-dialog-root"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="login-dialog">
          <div className="tabRtoContainer">
            <div className="tabRtoSec" id={tabActive}>
              <div className={"tabRtoHolder " + tabActive}>
                <div className="tab-content" id="myTabContent">
                  <div className={`tab-pane ${tabActive} fade`}>
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    ></DialogTitle>
                    <div className="tabFormHolder">
                      <div className="descriptionSec">
                        <p>
                          Verify your Identity<br></br>
                        </p>
                      </div>
                      <div className="row fb-gmail-parent">
                        <FacebookLogin
                          appId={process.env.FB_APP_ID}
                          autoLoad={false}
                          fields="name,email,picture"
                          onClick={componentClicked}
                          callback={responseFacebook}
                          onFailure={responseFacebook}
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
                          onSuccess={handleGmailAuth}
                          onFailure={handleGmailAuth}
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
                      <div
                        className="row"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className="descriptionSecFooter col-sm-6">
                          <p>
                            We dont share your info without your permissions...
                            <br></br>
                          </p>
                        </div>
                      </div>
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
