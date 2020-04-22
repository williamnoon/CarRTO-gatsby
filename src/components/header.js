import React from "react"
import { a } from "gatsby"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import logo from "../images/logo.png"
import logoRent from "../images/logo-rent.png"
import logoTrade from "../images/logo-trade.png"
import logoOwn from "../images/logo-own.png"

export default class Header extends React.Component {
  state = {
    isLoginUser: null,
  }
  componentDidMount() {
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (userLoggedIn) {
      // navigate("/login/")
      this.setState({ isLoginUser: userLoggedIn })
    }
  }
  render() {
    const { siteTitle, tabActiveSelect } = this.props
    return (
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">
              <img className="logo rto" src={logo} alt="logo rto" />
              <img className="logo rent" src={logoRent} alt="logo rent" />
              <img className="logo trade" src={logoTrade} alt="logo trade" />
              <img className="logo own" src={logoOwn} alt="logo own" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li
                  className={
                    tabActiveSelect === "home"
                      ? "nav-item active highlight-home"
                      : "nav-item active"
                  }
                >
                  <Link className="nav-link" activeClassName="active" to="/">
                    Home
                  </Link>
                </li>
                <li
                  className={
                    tabActiveSelect === "rent"
                      ? "nav-item active highlight-rent"
                      : "nav-item active"
                  }
                >
                  <Link
                    className="nav-link nav-rent"
                    activeClassName="active"
                    to="/rent/#rent"
                  >
                    Rent
                  </Link>
                </li>
                <li
                  className={
                    tabActiveSelect === "trade"
                      ? "nav-item active highlight-trade"
                      : "nav-item active"
                  }
                >
                  <Link
                    className="nav-link nav-trade"
                    activeClassName="active"
                    to="/trade/#trade"
                  >
                    Trade
                  </Link>
                </li>
                <li
                  className={
                    tabActiveSelect === "own"
                      ? "nav-item active highlight-own"
                      : "nav-item active"
                  }
                >
                  <Link
                    className="nav-link nav-own"
                    activeClassName="active"
                    to="/own/#own"
                  >
                    Own
                  </Link>
                </li>
                <li
                  className={
                    tabActiveSelect === "membership"
                      ? "nav-item active highlight-membership"
                      : "nav-item active"
                  }
                >
                  <Link className="nav-link" to="/#">
                    Membership
                  </Link>
                </li>
                <li
                  className={
                    tabActiveSelect === "testimonials"
                      ? "nav-item active highlight-testimonials"
                      : "nav-item active"
                  }
                >
                  <Link className="nav-link" to="/#">
                    Testimonials
                  </Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link" to="/#">
                  Contact
                </Link>
              </li> */}

                <li
                  className={
                    tabActiveSelect === "login"
                      ? "nav-item active highlight-login"
                      : "nav-item active"
                  }
                >
                  {!this.state.isLoginUser ? (
                    <Link
                      className="nav-link nav-own"
                      activeClassName="active"
                      to="/login/#login"
                    >
                      Login
                    </Link>
                  ) : (
                    <div
                      className="nav-link nav-own"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ isLoginUser: null })
                        localStorage.removeItem("userLoggedIn")
                      }}
                    >
                      Logout
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}
Header.defaultProps = {
  siteTitle: ``,
  tabActiveSelect: "home",
}
