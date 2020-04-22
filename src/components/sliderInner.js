import React, { Component } from 'react'
import SliderSlick from 'react-slick'
import slide1 from '../images/slide-1.jpg'

class SliderInner extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className="sliderSec">
        <SliderSlick {...settings}>
          <div className="slide-item">
            <img src={slide1} alt="slide"/>
            <div className="sliderCaption">
              <div className="container">
                <div className="sliderCaptionHolder">
                  <h2>Services we provide</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
              </div>
            </div>
          </div>
           </SliderSlick>
      </div>
    );
  }
}
export default SliderInner
