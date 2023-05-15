"use strict";

/* Package System */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

/* Package Application */
import Head from "@views/Components/Head";
import globalStyles from "@public/scss/layouts/globalStyles.scss";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {
        asideMinimize: false,
      },
      isAlert: {
        status: false,
      },
    };
  }

  render() {
    let _status = this.props.stateStatus;

    return (
      <React.Fragment>
        <Head {...this.props} />
        <>
          <Header {...this.props} />
          <React.Fragment>
              <main>
                {this.props.children}
              </main>
            </React.Fragment>
          <style jsx global>{globalStyles}</style>
          <Footer {...this.props} />
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateStatus: state.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (val) => {
      dispatch(setDarkMode(val));
    },
    resetStatus: (val) => {
      dispatch(resetStatus());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
