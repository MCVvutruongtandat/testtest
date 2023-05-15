"use strict";

/* Package System */
import React from "react";
/* Package style */
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
class Language extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isFlipped: false,
      view: 1,
      content: "",
      page: "home",
      contentLang: {},
      locale: "en",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.renderLang();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.locale === "en") {
      // console.log(this.state.locale,e.target.value);
      axios
        .put(
          `${process.env.API_URL}/v1/contentstatics/lang/${this.state.page}`,
          {
            content: JSON.stringify(this.state.contentLang),
          }
        )
        .then((result) => {
          alert("Update successful");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //    console.log(this.state.locale,e.target.value);
      axios
        .put(
          `${process.env.API_URL}/v1/contenttranslations/lang/${this.state.locale}/${this.state.page}`,
          {
            content: JSON.stringify(this.state.contentLang),
          }
        )
        .then((result) => {
          alert("Update successful");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  textareaChange = (e) => {
    const obj = { [e.target.name]: e.target.value };
    this.setState((prev) => ({
      ...prev,
      contentLang: {
        ...prev.contentLang,
        ...obj,
      },
    }));
  };
  handleTab = (e) => {
    this.setState({ locale: e.currentTarget.dataset.id });
    // console.log(this.state.locale);
    if (e.currentTarget.dataset.id !== "en") {
      axios
        .get(
          `${process.env.API_URL}/v1/contenttranslations/lang/${e.currentTarget.dataset.id}/${this.state.page}`
        )
        .then((res) => res.data.data)
        .then((listLang) => {
          this.setState({
            content: listLang,
            contentLang: JSON.parse(listLang?.content),
          });
        });
    } else {
      axios
        .get(`${process.env.API_URL}/v1/contentstatics/lang/${this.state.page}`)
        .then((res) => res.data.data)
        .then((listLang) => {
          this.setState({
            content: listLang,
            contentLang: JSON.parse(listLang?.content),
          });
        });
    }
  };
  onChange = (e) => {
    this.setState({ lang: e.target.value });
    if (this.state.locale !== "en") {
      axios
        .get(
          `${process.env.API_URL}/v1/contenttranslations/lang/${this.state.locale}/${e.target.value}`
        )
        .then((res) => res.data.data)
        .then((listLang) => {
          this.setState({
            page: e.target.value,
            content: listLang,
            contentLang: JSON.parse(listLang?.content),
          });
        });
    } else {
      axios
        .get(`${process.env.API_URL}/v1/contentstatics/lang/${e.target.value}`)
        .then((res) => res.data.data)
        .then((listLang) => {
          this.setState({
            page: e.target.value,
            content: listLang,
            contentLang: JSON.parse(listLang?.content),
          });
        });
    }
  };
  renderLang = () => {
    // axios
    //   .get("${process.env.API_URL}/v1/contentstatics")
    //   .then((res) => res.data.data)
    //   .then((listLang) => {
    //     this.setState({
    //       content: listLang.map((partner, i) => (
    //         partner.content
    //       )),
    //     });
    //     console.log(listLang.content);
    //   })
    axios
      .get(`${process.env.API_URL}/v1/contentstatics/lang/${this.state.page}`)
      .then((res) => res.data.data)
      .then((listLang) => {
        this.setState({
          content: listLang,
          contentLang: JSON.parse(listLang?.content),
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <select
          name="lang"
          defaultValue={this.state.page}
          onChange={this.onChange}
        >
          <option value="tech">Select Language</option>
          <option value="home">Home</option>
          <option value="tech">tech</option>
          <option value="about">about</option>
          <option value="show">show</option>
          <option value="marketing">marketing</option>
        </select>

        {/* <h1>{this.state.content.youtubeDescription}</h1> */}
        <div className="container">
          <Tabs>
            <TabList value={this.state.locale}>
              <Tab onClick={this.handleTab} data-id="en">
                EN
              </Tab>
              <Tab onClick={this.handleTab} data-id="vi">
                VI
              </Tab>
              <Tab onClick={this.handleTab} data-id="jp">
                JP
              </Tab>
            </TabList>
            <form onSubmit={this.handleSubmit}>
              <TabPanel>
                <div className="left-title">
                  <div>
                    {Object.keys(this.state.contentLang).map((key, i) => (
                      <div key={i}>
                        <p>{key}</p>
                        <textarea
                          style={{ border: "1px solid #ccc", margin: "10px" }}
                          name={key}
                          value={this.state.contentLang[key]}
                          onChange={this.textareaChange}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>

                <button>
                  <span>Send</span>
                </button>
              </TabPanel>
            </form>
            <form onSubmit={this.handleSubmit}>
              <TabPanel>
                <div className="left-title">
                  <div>
                    {Object.keys(this.state.contentLang).map((key, i) => (
                      <div key={i}>
                        <p>{key}</p>
                        <textarea
                          style={{ border: "1px solid #ccc", margin: "10px" }}
                          name={key}
                          value={this.state.contentLang[key]}
                          onChange={this.textareaChange}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>

                <button>
                  <span>Send</span>
                </button>
              </TabPanel>
            </form>
            <form onSubmit={this.handleSubmit}>
              <TabPanel>
                <div className="left-title">
                  <div>
                    {Object.keys(this.state.contentLang).map((key, i) => (
                      <div key={i}>
                        <p>{key}</p>
                        <textarea
                          style={{ border: "1px solid #ccc", margin: "10px" }}
                          name={key}
                          value={this.state.contentLang[key]}
                          onChange={this.textareaChange}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>

                <button>
                  <span>Send</span>
                </button>
              </TabPanel>
            </form>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default Language;
