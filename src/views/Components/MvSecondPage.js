"use strict";

/* Package System */
import React from "react";
import Image from "next/image";

/* Package style */
import banner from "@public/images/about/banner_about.png";

class MvSecondPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <section className="mv">
          <Image
            alt="MCV Networks"
            src={banner}
          />
        </section>
      </>
    );
  }
}

export default MvSecondPage;
