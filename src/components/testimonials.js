import React, { Component } from 'react'
import SliderSlick from 'react-slick'
import dummy from '../images/dummy-user.png'

class Testimonials extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className="testimonialsContainer">
        <div className="container">
          <div className="testimonialSec">
          <div className="headingSec text-center">
            <small>Latest Testimonials</small>
            <h3>What <b>they say</b> about us</h3>
          </div>
          <div className="testimonialSliderHolder">
            <SliderSlick {...settings}>
            <div className="slide-item">
              <div className="testimonialsContent">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <i><img src={dummy} alt="user"/></i>
                <small>James Bond</small>
              </div>
            </div>
            <div className="slide-item">
              <div className="testimonialsContent">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <i><img src={dummy} alt="user"/></i>
                <small>James Bond</small>
              </div>
            </div>
            <div className="slide-item">
              <div className="testimonialsContent">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <i><img src={dummy} alt="user"/></i>
                <small>James Bond</small>
              </div>
            </div>
            </SliderSlick>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Testimonials
