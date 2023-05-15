"use strict";

/* Package System */
import React from "react";
import Image from "next/image";
import { connect } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { withFormik } from "formik";
import * as Yup from "yup";

/* Package style */
import contactform from "@public/scss/pages/contactform.scss";
import close from "@public/images/close.svg";
import { FormHelperText, Snackbar, Alert } from "@mui/material";
import { handleFailure, handleSuccess, resetStatus } from "@features/Status";
import { isEmptyObject } from "@utils/Helper";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      showId: "1",
      name: "",
      phone: "",
      birthday: "",
      gender: "M",
      address: "",
      job: "",
      shows: [],
      errors: [],
      isDisable: true,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.listShows();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this._isMounted = false;
  }

  listShows = () => {
    axios
      .get(`${process.env.API_URL}/v1/shows`)
      .then((response) => response.data.data)
      .then((listShows) => {
        this.setState({ shows: listShows });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}/v1/contacts`, {
        showId: this.state.showId,
        name: this.props.values.name,
        phone: this.props.values.phone,
        birthday: this.props.values.birthday,
        gender: this.state.gender,
        address: this.props.values.address,
        job: this.props.values.job,
      })
      .then((result) => {
        this._isMounted && this.setState({ errors: [] });
        this.props.handleSuccess("Send successfully");
        this.props.close();
      })
      .catch((error) => {
        this._isMounted &&
          this.setState({ errors: error.response.data.errors });
        this.props.handleFailure("Send failure");
      });
  };

  findKey(_errArr, field) {
    if (_errArr?.length > 0) {
      let _findKey = _.findIndex(_errArr, { key: field });
      return _findKey;
    }
  }

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.resetStatus();
  };

  handleKeyDown = () => {
    this.setState({isDisable: false});
  }

  render() {
    let _errArr = this.state.errors;
    return (
      <>
        <div className="modal">
          <div className="beauty-scroll">
            <a className="close" onClick={this.props.close}>
              <Image src={close} />
            </a>
            <h2 className="main-tit">
              <span>{this.props.lang["ct_title"]}</span>
            </h2>
            <form
              onSubmit={this.handleSubmit}
              className="content"
              id="partner-scroll"
            >
              <div>
                <ul>
                  <li>
                    <div className="col">
                      <span>{this.props.lang["ct_question"]}</span>
                      <select
                        name="showId"
                        value={this.state.showId}
                        onChange={this.onChange}
                      >
                        {this.state.shows.map((list) => {
                          return (
                            <option value={list.id} key={list.id}>
                              {list.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="col">
                      <span>{this.props.lang["name"]}</span>
                      <input
                        type="text"
                        name="name"
                        value={this.props.values.name}
                        onChange={this.props.handleChange}
                        onKeyDown={this.handleKeyDown}
                      />
                      <FormHelperText className="text_error">
                        {this.props.errors.name ? this.props.errors.name : this.findKey(_errArr, "name") >= 0
                          ? _errArr[this.findKey(_errArr, "name")].msg
                          : ""}
                      </FormHelperText>
                    </div>
                  </li>
                  <li>
                    <div className="col">
                      <span>{this.props.lang["phone_num"]}</span>
                      <input
                        type="text"
                        name="phone"
                        value={this.props.values.phone}
                        onChange={this.props.handleChange}
                        onKeyDown={this.handleKeyDown}
                      />
                      <FormHelperText className="text_error">
                        {this.props.errors.phone ? this.props.errors.phone : this.findKey(_errArr, "phone") >= 0
                          ? _errArr[this.findKey(_errArr, "phone")].msg
                          : ""}
                      </FormHelperText>
                    </div>
                  </li>
                  <li className="flexbox">
                    <div className="col">
                      <span>{this.props.lang["birthday"]}</span>
                      <input
                        type="text"
                        name="birthday"
                        value={this.props.values.birthday}
                        onChange={this.props.handleChange}
                        onKeyDown={this.handleKeyDown}
                      />
                      <FormHelperText className="text_error">
                        {this.props.errors.birthday ? this.props.errors.birthday : this.findKey(_errArr, "birthday") >= 0
                          ? _errArr[this.findKey(_errArr, "birthday")].msg
                          : ""}
                      </FormHelperText>
                    </div>
                    <div className="col">
                      <span>{this.props.lang["gender"]}</span>
                      <select
                        name="gender"
                        value={this.state.gender}
                        onChange={this.onChange}
                      >
                        <option value="M">
                          {this.props.lang["g_option1"]}
                        </option>
                        <option value="F">
                          {this.props.lang["g_option2"]}
                        </option>
                        <option value="O">
                          {this.props.lang["g_option3"]}
                        </option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="col">
                      <span>{this.props.lang["address"]}</span>
                      <input
                        type="text"
                        name="address"
                        value={this.props.values.address}
                        onChange={this.props.handleChange}
                        onKeyDown={this.handleKeyDown}
                      />
                      <FormHelperText className="text_error">
                        {this.props.errors.address ? this.props.errors.address : this.findKey(_errArr, "address") >= 0
                          ? _errArr[this.findKey(_errArr, "address")].msg
                          : ""}
                      </FormHelperText>
                    </div>
                  </li>
                  <li>
                    <div className="col">
                      <span>{this.props.lang["job"]}</span>
                      <input
                        type="text"
                        name="job"
                        value={this.props.values.job}
                        onChange={this.props.handleChange}
                        onKeyDown={this.handleKeyDown}
                      />
                      <FormHelperText className="text_error">
                        {this.props.errors.job ? this.props.errors.job : this.findKey(_errArr, "job") >= 0
                          ? _errArr[this.findKey(_errArr, "job")].msg
                          : ""}
                      </FormHelperText>
                    </div>
                  </li>
                </ul>
                <div className="text_center">
                  <button className={!this.state.isDisable && isEmptyObject(this.props.errors) ? "" : "btn_disabled"} disabled={!this.state.isDisable && isEmptyObject(this.props.errors) ? false : true}>
                    <span>{this.props.lang["send_btn"]}</span>
                  </button>
                </div>
                <p className="text_center text-bottom">
                  {this.props.lang["text-bottom"]}
                </p>
                <p className="text_center text-contact">
                  {this.props.lang["text-contact"]}
                  <br />
                  Hotline:{" "}
                  <a href="tel:1 (949) 531-2292" className="text_bold">
                    {this.props.tel}
                  </a>
                  <br />
                  Email:{" "}
                  <a href="mailto:information@mcvnetworks.com">
                    {this.props.email}
                  </a>
                  <br />
                  Website:{" "}
                  <a
                    href="https://mcvnetworks.us/"
                    target="_blank"
                    className="linkcolor"
                  >
                    {this.props.website}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <style jsx global>
          {contactform}
        </style>
      </>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues() {
    return {
      phone: "",
      name: "",
      birthday: "",
      address: "",
      job: "",
    };
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
      .required("Phone number is required"),
    name: Yup.string()
      .required("Fullname is required"),
    birthday: Yup.string()
      .matches(/(1|2)+([0-9]{3})\b/, 'Year birthday is not valid')
      .required("Year of birth is required"),
    birthday: Yup.string()
      .matches(/(1|2)+([0-9]{3})\b/, 'Year birthday is not valid')
      .required("Year of birth is required"),
    address: Yup.string()
      .required("Address is required"),
    job: Yup.string()
      .required("Job is required"),
  }),
})(ContactForm);

const mapDispatchToProps = (dispatch) => {
  return {
    handleSuccess: (msg) => {
      dispatch(handleSuccess(msg));
    },
    handleFailure: (msg) => {
      dispatch(handleFailure(msg));
    },
    resetStatus: (val) => {
      dispatch(resetStatus());
    },
  };
};

export default connect(null, mapDispatchToProps)(FormikForm);
