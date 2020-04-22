import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import uuidv1 from "uuid/v1"
import Layout from "../components/layout"
import "../assets/scss/main.scss"
import SEO from "../components/seo"
import SliderInner from "../components/sliderInner"
import Contact from "../components/contact"
import AuthForm from "../components/authForm"
import Testimonials from "../components/testimonials"

const { API } = process.env
function Login({ location: { state } }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})
  const [scrollToIdState, setScrollToIdState] = useState("#login")
  useEffect(() => {
    if (Object.keys(data).length && step === 0) {
      fetchUser()
    } else if (Object.keys(data).length && step === 2) {
      // handlePostData()
    }
  }, [data])

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (userLoggedIn) navigate("/")
    else {
      if (state) {
        setScrollToIdState(state.scrollToId)
      }
    }
  }, [])
  const fetchUser = async () => {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    if (json.statusCode !== 401 && json.error !== "Unauthorized") {
      localStorage.setItem("userLoggedIn", JSON.stringify(json.access_token))
      if (state.navigateTo) {
        navigate(`/${state.navigateTo}`, {
          state: { ...state },
        })
      } else {
        navigate("/")
      }
    } else {
      // stepIncrement()
      handlePostData()
    }
  }
  const stepIncrement = () => {
    setStep(step + 1)
  }
  const stepDecrement = () => {
    setStep(step - 1)
  }
  const handleUpdateUserInfo = info => {
    setData({ ...data, ...info })
  }

  const handlePostData = async () => {
    const response = await fetch(`${API}/user/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userID: uuidv1() }),
    })
    const json = await response.json()
    if (json.statusCode !== 401 && json.error !== "Unauthorized") {
      fetchUser()
      // localStorage.setItem("userLoggedIn", JSON.stringify(true))
      // navigate("/")
    }
  }
  return (
    <Layout tabActiveSelect={"login"}>
      <SEO title="Rent" />
      <SliderInner></SliderInner>
      <div className="homeRtoCalloutSp">
        {state && (
          <AuthForm
            tabActive="rent"
            scrollToId={scrollToIdState}
            navigateTo={state.navigateTo}
            stepIncrement={stepIncrement}
            stepDecrement={stepDecrement}
            handleUpdateUserInfo={handleUpdateUserInfo}
            step={step}
          />
        )}
      </div>
      <Testimonials></Testimonials>
      <Contact></Contact>
    </Layout>
  )
}

export default Login
