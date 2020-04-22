import React from "react"
// import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SliderInner from "../components/sliderInner"
import Contact from "../components/contact"
import TabReservation from "../components/tabReservation"
import Testimonials from "../components/testimonials"

class Reservation extends React.Component {
  componentDidMount() {
    document.body.classList.add("reservation")
    // const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    // if (!userLoggedIn) navigate("/login/")
  }
  componentWillUnmount() {
    document.body.classList.remove("reservation")
  }
  render() {
    const {
      location: { state },
    } = this.props
    return (
      <>
        {state && (
          <Layout tabActiveSelect={state.tabActive}>
            <SEO title="Rent" />
            <SliderInner></SliderInner>
            <div className="homeRtoCalloutSp">
              <TabReservation
                tabActive="rent"
                selectVehicle={state.selectVehicle}
              />
            </div>
            <Testimonials></Testimonials>
            <Contact></Contact>
          </Layout>
        )}
      </>
    )
  }
}

export default Reservation
