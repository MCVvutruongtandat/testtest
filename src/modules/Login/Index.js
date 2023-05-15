"use strict";

/* Package System */
import React from "react";
import Link from "next/link";

import Image from "next/image";
import waitingpage from "@public/images/waitingpage.png";

/* Package style */
import comingsoon from "@public/scss/pages/comingsoon.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
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
        <style jsx global>
          {comingsoon}
        </style>
      </>
    );
  }
}

export default Login;
