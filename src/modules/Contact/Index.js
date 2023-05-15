"use strict";

/* Package System */
import React from "react";
/* Package style */
import contact from "@public/scss/pages/contact.scss";
import Image from "next/future/image";
import { FadeIn } from "@views/Components/Animation";
import { connect } from "react-redux";
import { setContent } from "@features/Language";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isFlipped: false,
      view: 1,
      content: {},
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.setContent(this.state.content);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.content !== this.state.content){
      this.props.setContent(this.state.content);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        <FadeIn>
          <section className="contact">
              <Image src='/images/contact/map.png' alt="" width={1920} height={720} />
              <div className="container">
                  <div className="contact-left">
                      <p>{this.props.lang['information']}</p>
                      <p>{this.props.lang['register']}</p>
                      <p>{this.props.lang['cooperation']}</p>
                  </div>
                  <div className="contact-right">
                      <div className="contact-phone">
                          <span>Phone Number</span>
                          <h1 className="contact-info">1 (949) 531-2292</h1>
                      </div>
                      <div className="contact-line"></div>
                      <div className="contact-email">
                          <span>Email</span>
                          <h1 className="contact-info">info@mcv.com.vn</h1>
                      </div>
                  </div>
              </div>
          </section>
        </FadeIn>
        <style jsx global>
          {contact}
        </style>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setContent: (content) => {
      dispatch(setContent(content));
    },
  }
}

export default connect(null,mapDispatchToProps)(Contact);
