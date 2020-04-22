import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SliderInner from "../components/sliderInner"
import SnackbarNotify from "./../components/snackbar"
import TabRto from "../components/tabRto"
const { API } = process.env

class OwnPage extends React.Component {
  state = {
    buyVehicles: [],
    rideDetails: {},
    isSearchEnable: false,
    isLoading: false,
    error: null,
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchBuyVehicles().then(data => {
      this.setState({ buyVehicles: data, isLoading: false })
    })

    document.body.classList.add("own")
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (userLoggedIn) {
      // navigate("/login/")
    }
  }
  componentWillUnmount() {
    document.body.classList.remove("own")
  }
  fetchBuyVehicles = async () => {
    try {
      const response = await fetch(`${API}/Vehicle/GetAllVehicles`)
      if (response.ok) {
        const json = await response.json()
        const { data } = json
        return data
      } else {
        throw new Error("Something went wrong ...")
      }
    } catch (error) {
      this.setState({ error, isLoading: false }, () => {
        this.child.handleClick(
          "<div>Failed to fetch data from server...</br>Try again later</div>",
          "error"
        )
      })
    }
  }
  render() {
    const { buyVehicles, isSearchEnable, isLoading, error } = this.state
    return (
      <Layout tabActiveSelect="own">
        {error && <SnackbarNotify onRef={ref => (this.child = ref)} />}
        <SEO title="Rent" />
        <SliderInner></SliderInner>
        <div className="homeRtoCalloutSp">
          <TabRto
            tabActive="own"
            buyVehicles={buyVehicles}
            isSearchEnable={isSearchEnable}
            isLoading={isLoading}
            error={error}
          ></TabRto>
        </div>
      </Layout>
    )
  }
}

export default OwnPage
