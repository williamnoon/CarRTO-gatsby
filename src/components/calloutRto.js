import React, { Component } from "react"
// import SliderSlick from 'react-slick'
import { Link } from "gatsby"
import rent from "../images/rent-icon.png"
import trade from "../images/trade-icon.png"
import own from "../images/own-icon.png"

class CalloutRto extends Component {
  render() {
    return (
      <div className="rtoCalloutContainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="rtoCalloutBlock rent">
                <i>
                  <img src={rent} alt="rent" />
                </i>
                <h4>Rent</h4>
                <p>
                  Rent a car to drive for<br></br>
                  <b>Uber</b>, <b>lyft</b>, <b>postmates</b>, <b>door dash</b> &{" "}
                  <b>grubhub</b>
                </p>
                <Link className="btn btn-light" to="/rent/#rent">
                  Join
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="rtoCalloutBlock trade">
                <i>
                  <img src={trade} alt="rent" />
                </i>
                <h4>Trade</h4>
                <p>
                  Lorem Ipsum is simply<br></br>dummy text of the printing and
                  typesetting industry
                </p>
                <Link className="btn btn-light" to="/trade/#trade">
                  Join
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="rtoCalloutBlock own">
                <i>
                  <img src={own} alt="rent" />
                </i>
                <h4>Own</h4>
                <p>
                  3 ways to access<br></br>our fleet of fully inspected, Fully
                  Reconditioned rentals
                </p>
                <Link className="btn btn-light" to="/own/#own">
                  Pre-qualify
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default CalloutRto
