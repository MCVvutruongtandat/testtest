"use strict";

/* Package System */
import React from "react";
import Link from "next/link";
import Image from "next/image";

/* Package style */
import comingsoon from "@public/scss/pages/comingsoon.scss";
import { FadeIn } from "@views/Components/Animation";
import waitingpage from "@public/images/waitingpage.png";
import { connect } from "react-redux";
import { setContent } from "@features/Language";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {},
    }
  }
  componentDidMount(){
    this.props.setContent(this.state.content);
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.content !== this.state.content){
      this.props.setContent(this.state.content);
    }
  }
  render() {
    return (
      <>
        <FadeIn>
          <section className="page-reparing">
            <div className="container">
              <figure>
                <Image src={waitingpage} alt="waitingpage" />
              </figure>
              <h2 className="comingsoon-text">Coming soon</h2>
              <Link href="/">
                <a className="btn-common">
                  <span>Go Back Home</span>
                </a>
              </Link>
            </div>
          </section>
        </FadeIn>
        <style jsx global>
          {comingsoon}
        </style>
      </>
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

export default connect(null,mapDispatchToProps)(Card);
