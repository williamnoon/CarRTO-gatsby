import React, { Component } from 'react'
import SliderSlick from 'react-slick'
import slide1 from '../images/slide-1.jpg'

class Slider extends Component {
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
                  <h2>Make an Impression Cars for every budget</h2>
                  {/* {captionTitle && <h2>{captionTitle}</h2>}
                  {content && <p>{content}</p>}
                  {button && <a href={link}>{button}</a>} */}
                  <p>We have a dedicated procurement team working around the clock to make sure you always get the best deals.</p>
                  <a className="btn btn-default btn-lg" href="/#">Ride Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <img src={slide1} alt="slide"/>
            <div className="sliderCaption">
              <div className="container">
                <div className="sliderCaptionHolder">
                  <h2>Make an Impression Cars for every budget</h2>
                  <p>We have a dedicated procurement team working around the clock to make sure you always get the best deals.</p>
                  <a className="btn btn-default btn-lg" href="/#">Ride Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <img src={slide1} alt="slide"/>
            <div className="sliderCaption">
              <div className="container">
                <div className="sliderCaptionHolder">
                  <h2>Make an Impression Cars for every budget</h2>
                  <p>We have a dedicated procurement team working around the clock to make sure you always get the best deals.</p>
                  <a className="btn btn-default btn-lg" href="/#">Ride Now</a>
                </div>
              </div>
            </div>
          </div>
        </SliderSlick>
      </div>
    );
  }
}
export default Slider
