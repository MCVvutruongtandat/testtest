"use strict";

/* Package System */
import React from "react";
import Link from "next/link";

import Image from "next/image";
import errorpage from "@public/images/errorpage.png";

/* Package style */
import comingsoon from "@public/scss/pages/comingsoon.scss";

class Page404 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <section className="page-reparing">
          <div className="container">
            <figure>
              <Image src={errorpage} alt="errorpage" />
            </figure>
            <h2 className="comingsoon-text">Page Not Found</h2>
            <p className="text">
              Hmm. We’re having trouble finding that page.
              <br />
              Please{" "}
              <Link href="./">
                <a className="linkpage">Back to Home</a>
              </Link>
            </p>
          </div>
        </section>
        <style jsx global>
          {comingsoon}
        </style>
      </>
    );
  }
}

export default Page404;
