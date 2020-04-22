import React, { Component } from 'react'
import car from '../images/car.png'

class Membership extends Component {
  render() {
    return (
      <div className="membershipContainer">
        <div className="membershipHolder">
          <div className="container">
            <div className="membershipSec">
              <div className="row">
              <div className="membershipContentSec">
                <div className="headingSec">
                  <small>Select What You Want</small>
                  <h3>our <b>membership</b></h3>
                </div>
                <div className="membershipContent">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                  <ul>
                    <li>Lorem Ipsum is simply dummy text of the printing.</li>
                    <li>Lorem Ipsum is simply dummy text of the printing.</li>
                    <li>Lorem Ipsum is simply dummy text of the printing.</li>
                    <li>Lorem Ipsum is simply dummy text of the printing.</li>
                  </ul>
                </div>
              </div>
              <div className="membershipImgSec">
                <img src={car} alt="car"/>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
export default Membership
