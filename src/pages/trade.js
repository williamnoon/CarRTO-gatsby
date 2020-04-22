import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SnackbarNotify from "./../components/snackbar"
import SliderInner from "../components/sliderInner"
import TabRto from "../components/tabRto"
const { API } = process.env

class TradePage extends React.Component {
  state = {
    buyVehicles: [],
    rideDetails: {},
    isSearchEnable: false,
    isLoading: false,
    error: null,
    tradeFormValues: null,
  }
  componentDidMount() {
    const {
      location: { state },
    } = this.props

    this.setState({ isLoading: true })
    if (state && state.tradeFormValues) {
      this.setState({ tradeFormValues: state.tradeFormValues })
    }
    this.fetchBuyVehicles().then(data => {
      this.setState({ buyVehicles: data, isLoading: false })
    })
    document.body.classList.add("trade")
  }

  componentWillUnmount() {
    document.body.classList.remove("trade")
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
    const {
      buyVehicles,
      isSearchEnable,
      isLoading,
      error,
      tradeFormValues,
    } = this.state
    return (
      <Layout tabActiveSelect={"trade"}>
        {error && <SnackbarNotify onRef={ref => (this.child = ref)} />}
        <SEO title="Rent" />
        <SliderInner></SliderInner>
        <div className="homeRtoCalloutSp">
          <TabRto
            tabActive="trade"
            buyVehicles={buyVehicles}
            isSearchEnable={isSearchEnable}
            isLoading={isLoading}
            error={error}
            tradeFormValues={tradeFormValues}
          />
        </div>
      </Layout>
    )
  }
}

export default TradePage
