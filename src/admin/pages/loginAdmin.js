import React from "react"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import logo from "../../images/logo.png"
import TextField from "@material-ui/core/TextField"
import { Formik, Field } from "formik"
import { loginAdminValidationSchema } from "../../components/formsValidationSchema"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../../services/auth"
import SnackbarNotify from "./../../components/snackbar"

const styles = {
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

const defaultValues = {
  loginValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
}
class LoginAdminForm extends React.Component {
  state = {
    values: defaultValues.loginValues,
    isFormSubmit: false,
    error: null,
  }
  render() {
    const { classes } = this.props
    return (
      <div className="login-admin-container">
        {this.state.error && (
          <SnackbarNotify onRef={ref => (this.child = ref)} />
        )}
        <div className="carRto-logo">
          <img className="logo rto" src={logo} alt="logo rto" />
        </div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Formik
              initialValues={this.state.values}
              validationSchema={loginAdminValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false)
                  this.setState({ isFormSubmit: true })
                  handleLogin(values)
                  if (isLoggedIn()) {
                    navigate(`/app/admin`)
                    this.setState({ isFormSubmit: false })
                  } else {
                    this.setState(
                      {
                        isFormSubmit: false,
                        error: "Incorrect Email and password...",
                      },
                      () => {
                        this.child.handleClick(
                          "<div>Invaild Email and password...</div>",
                          "error"
                        )
                      }
                    )
                  }
                }, 2000)
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
                  <form
                    className="login-admin-form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <div className="email-parent">
                      <TextField
                        type="email"
                        className={classes.email}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        label="Email or Username"
                        variant="outlined"
                        fullWidth
                      />
                      <div className="error">
                        {errors.email && touched.email && errors.email}
                      </div>
                    </div>
                    <div className="email-parent">
                      <TextField
                        type="password"
                        name="password"
                        className={classes.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        label="Password"
                        autoComplete="current-password"
                        variant="outlined"
                        fullWidth
                      />
                      <div className="error">
                        {errors.password && touched.password && errors.password}
                      </div>
                    </div>
                    <div className="rememberMe-parent">
                      <Field
                        type="checkbox"
                        className="checkbox"
                        name="rememberMe"
                      />
                      <span>Remember Me</span>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || this.state.isFormSubmit}
                      variant="contained"
                      color="primary"
                      className="submit-button"
                      fullWidth
                    >
                      Log In
                    </Button>
                  </form>
                )
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    )
  }
}
LoginAdminForm.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(LoginAdminForm)
