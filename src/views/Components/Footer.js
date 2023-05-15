"use strict";

const { postApi } = require("@utils/Helper");
import { connect } from "react-redux";

/* Package System */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { withFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText, Snackbar, Alert } from "@mui/material";

import { handleFailure, handleSuccess, resetStatus } from "@features/Status";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.updateEmail = this.updateEmail.bind(this);
    this.myRef = React.createRef();
    this.state = {
      errors: [],
    }
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  async updateEmail() {
    let _url = process.env.API_URL + `/v1/emails`;
    let _data = await postApi(_url, { email: this.props.values.email });
    if (_data === "" || _data.status=='success') {
      this._isMounted && this.setState({ errors: [] });
      this.props.handleSuccess("Send successfully");
    } else {
      this._isMounted &&
        this.setState({ errors: _data?.response?.data?.errors});
      this.props.handleFailure("Send failure");
    }
  }

  handleEmailSubmit = (e) => {
    this.updateEmail();
    this.myRef.current.focus();
    this.props.values.email = "";
  };

  handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		this.props.resetStatus();
	};

  render() {
    return (
      <React.Fragment>
        <footer>
          <div className="f-top">
            <div className="container f-top-content">
              <div className="f-left">
                <Link href="./">
                  <a className="logo-header">
                    <Image
                      src={"/images/logo-f.png"}
                      alt="MCV NETWORKS US"
                      width={178}
                      height={86}
                      priority={true}
                    />
                  </a>
                </Link>
                <div className="info">
                  <p className="address">{this.props.lang["address"]}</p>
                  <p className="tel">
                    Tel:{" "}
                    <a className="linkpage" href="tel:1 (949) 531-2292">
                      {this.props.lang["tel"]}
                    </a>
                  </p>
                  <p className="email">
                    Email:{" "}
                    <a className="linkpage" href="mailto:info@mcv.com.vn">
                      {this.props.lang["email"]}
                    </a>
                  </p>
                </div>
              </div>
              <div className="f-right">
                <div className="item">
                  <h2 className="f-tit">{this.props.lang["ftit1"]}</h2>
                  <div className="social-list">
                    <Link
                      href="https://www.facebook.com/mcvnetworksUS"
                      passHref
                    >
                      <a target="_blank">
                        <Image
                          src={"/images/icon-facebook.svg"}
                          alt="facebook"
                          width={10}
                          height={38}
                        />
                      </a>
                    </Link>
                    <Link href="https://www.youtube.com/c/MCVMedia" passHref>
                      <a target="_blank">
                        <Image
                          src={"/images/icon-youtube.svg"}
                          alt="youtube"
                          width={21}
                          height={15}
                        />
                      </a>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/82546495"
                      passHref
                    >
                      <a target="_blank">
                        <Image
                          src={"/images/icon-linkedin.svg"}
                          alt="linkedin"
                          width={24}
                          height={24}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="item">
                  <h2 className="f-tit">{this.props.lang["ftit3"]}</h2>
                  <div className="search-block">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={this.props.values.email}
                      onChange={this.props.handleChange}
                      ref={this.myRef}
                    />
                    <button
                      className="secondaryBtn"
                      onClick={this.handleEmailSubmit}
                    >
                      <span>{this.props.lang["send_btn"]}</span>
                    </button>
                  </div>
                  <FormHelperText
                    sx={{ color: "#dc3545" }}
                    className="text-error"
                  >
                    {this.props.errors.email ? this.props.errors.email : this.state.errors.length > 0  ? this.state.errors[0].msg : ""}
                  </FormHelperText>
                </div>
                <div className="item">
                  <h2 className="f-tit">{this.props.lang["ftit2"]}</h2>
                  <ul className="f-menu">
                    <li>
                      <Link href="./">
                        <a>{this.props.lang["prod1"]}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="./">
                        <a>{this.props.lang["prod2"]}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="./">
                        <a>{this.props.lang["prod3"]}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="item">
                  <h2 className="f-tit">{this.props.lang["ftit4"]}</h2>
                  <ul className="f-menu">
                    <li>
                      <Link href="./">
                        <a>{this.props.lang["about1"]}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="./">
                        <a>{this.props.lang["about2"]}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="f-bottom container">
            <div className="f-left">
              <ul className="f-menu">
                <li>
                  <Link href="./">
                    <a>{this.props.lang["fbottom1"]}</a>
                  </Link>
                </li>
                <li>
                  <Link href="./">
                    <a>{this.props.lang["fbottom2"]}</a>
                  </Link>
                </li>
                <li>
                  <Link href="./">
                    <a>{this.props.lang["fbottom3"]}</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="f-right">{this.props.lang["fbottom4"]}</div>
          </div>
        </footer>
        <Snackbar
          open={this.props.stateStatus.status.isSuccessful}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity="success">
            {this.props.stateStatus.status.msg.text}
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.props.stateStatus.status.isFailure}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity="error">
            {this.props.stateStatus.status.msg.text}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues() {
    return {
      email: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
  }),
})(Footer);

const mapDispatchToProps = (dispatch) => {
  return {
    handleSuccess: (msg) => {
      dispatch(handleSuccess(msg));
    },
    handleFailure: (msg) => {
      dispatch(handleFailure(msg));
    },
    resetStatus:val=>{dispatch(resetStatus())},
  };
};

export default connect(null, mapDispatchToProps)(FormikForm);
