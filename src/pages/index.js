import React, { useEffect } from "react"
import "../assets/scss/main.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slider from "../components/slider"
import CalloutRto from "../components/calloutRto"
import Contact from "../components/contact"
import CalloutWave from "../components/calloutWave"
import Testimonials from "../components/testimonials"
import Membership from "../components/membership"

const { API } = process.env
const IndexPage = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(`${API}/API/TOKEN`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: new Date() }),
        })
        if (response.ok) {
          const json = await response.json()
          // const { data } = json
        } else {
          throw new Error("Something went wrong ...")
        }
      } catch (error) {
        // this.setState({ error, isLoading: false })
      }
    })()
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (userLoggedIn) {
    }
  }, [])
  return (
    <Layout tabActiveSelect={"home"}>
      <SEO title="Home" />
      <Slider></Slider>
      <div className="homeRtoCalloutSp">
        <CalloutRto></CalloutRto>
      </div>
      <Membership></Membership>
      <CalloutWave></CalloutWave>
      <Testimonials></Testimonials>
      <Contact></Contact>
    </Layout>
  )
}
export default IndexPage
