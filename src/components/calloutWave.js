import React, { Component } from 'react'
import TrustedCustomers from '../images/trusted-customer.png'
import GreatWorkers from '../images/great-worker.png'
import BestVehicle from '../images/best-vehicle.png'

class CalloutWave extends Component {
  render() {
    return (
      <div className="waveCalloutContainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
            <div className="waveCalloutBlock blockOne">
                <i><img src={TrustedCustomers} alt="rent"/></i>
                <h4>trusted customers</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              </div>
            </div>
            <div className="col-sm-4">
            <div className="waveCalloutBlock blockTwo">
                <i><img src={GreatWorkers} alt="rent"/></i>
                <h4>great workers</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              </div>
            </div>
            <div className="col-sm-4">
            <div className="waveCalloutBlock blockThree">
                <i><img src={BestVehicle} alt="rent"/></i>
                <h4>best vehicle</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
export default CalloutWave
