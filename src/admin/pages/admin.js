import React from "react"
import LayoutNavbar from "./../components/layoutNavbar"
import CircularProgress from "@material-ui/core/CircularProgress"

export default class Admin extends React.Component {
  state = { loading: false, error: null }
  componentDidMount() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  }
  render() {
    const { loading } = this.state
    return (
      <LayoutNavbar>
        {loading ? (
          <div style={{ height: "100%", textAlign: "center" }}>
            <CircularProgress disableShrink />
          </div>
        ) : (
          <div>
            <h4>Dashboard</h4>
          </div>
        )}
      </LayoutNavbar>
    )
  }
}
