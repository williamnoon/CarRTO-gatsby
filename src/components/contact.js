import React, { Component } from "react"

class Contact extends Component {
  render() {
    return (
      <div className="contactContainer">
        <div className="container">
          <div className="headingSec text-center">
            <small>Feel Free to Say Hello</small>
            <h3>
              GET IN <b>touch with us</b>
            </h3>
          </div>
          <div className="contactFormSec">
            <form>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="11"
                      placeholder="Message"
                    ></textarea>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group text-center">
                    <button className="btn btn-default">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Contact
