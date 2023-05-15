"use strict";

/* Package System */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { withRouter } from "next/router";
import Router from "next/router";
import _ from "lodash";

/**
 * Package component
 */
import langEn from "@public/images/langEn.svg";
import langVi from "@public/images/langVi.svg";
import langJa from "@public/images/langJa.svg";
import Nav from "./Nav";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      width: 0,
      height: 0,
      showLang: false,
      lang: "English",
      src: langEn,
      toggleMenu: false,
      menuDefault: false,
      languages: [
        {
          name: "English",
          src: langEn,
          locale: "en",
        },
        {
          name: "Vietnam",
          src: langVi,
          locale: "vi",
        },
        {
          name: "Japan",
          src: langJa,
          locale: "jp",
        },
      ],
    };
    this.handleSelectLang = this.handleSelectLang.bind(this);
    this.handleChangeMenu = this.handleChangeMenu.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
  }
  componentDidMount() {
    // use when coponent render
    this._isMounted = true;
    let _findKey = _.findIndex(this.state.languages, {
      locale: this.props.router.locale,
    });
    this.handleSelectLang(this.state.languages[_findKey]);
    //
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    // use when change different page
    this._isMounted = false;
    //
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  handleShowLang = () => {
    this.setState({
      showLang: this.state.showLang === true ? false : true,
    });
  };
  handleSelectLang(e) {
    this.setState({
      showLang: false,
      lang: e.name,
      src: e.src,
    });
    (this.state.width < 1280) && this.closeToggleMenu();
  }
  handleChangeMenu = (e) => {
    this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
  };
  closeToggleMenu = () => {
    this.setState({
      toggleMenu: false,
    });
  };
  callbackFunction = (childData) => {
    this.closeToggleMenu();
  };
  handleContactChange = () => {
    Router.push("/contact");
    this.closeToggleMenu();
  }
  render() {
    return (
      <React.Fragment>
        <header className={`header ${this.state.toggleMenu ? "active" : ""}`}>
          <div className="container">
            <Link href="./">
              <a className="logo-header">
                <Image
                  quality={100}
                  className="logohead"
                  src={"/images/logo.png"}
                  alt="MCV NETWORKS US"
                  width={125}
                  height={60}
                />
              </a>
            </Link>
            <div
              className={
                this.state.toggleMenu
                  ? "headerMidWrapper active"
                  : "headerMidWrapper"
              }
            >
              <div className="headerMiddle">
                <Nav
                  parentCallback={this.callbackFunction}
                  lang={this.props.lang}
                />
                {this.state.width > 1279 && (
                  <div className="languageSelect">
                    <div
                      className={
                        this.state.showLang === true
                          ? "languageDisplay active"
                          : "languageDisplay"
                      }
                      onClick={this.handleShowLang}
                    >
                      <Image
                        src={this.state.src}
                        alt="English"
                        className="langImg"
                      />
                      <span className="langText">{this.state.lang}</span>
                    </div>
                    {this.state.showLang && (
                      <ul className="languageOption">
                        {this.state.languages.map((lang) => (
                          <li
                            key={lang.name}
                            data-slug={lang}
                            onClick={() => this.handleSelectLang(lang)}
                          >
                            <Image src={lang.src} alt={lang.name} />
                            <Link
                              href={this.props.router.asPath}
                              locale={lang.locale}
                            >
                              <span>{lang.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              {this.state.width > 1279 && (
                <button
                  className="primary"
                  onClick={() => Router.push("/contact")}
                >
                  <span>{this.props.lang["getintouch_btn"]}</span>
                </button>
              )}
              {this.state.width < 1280 && (
                <div className="bottom-nav-box">
                  <button
                    className="primary"
                    onClick={this.handleContactChange}
                  >
                    <span>{this.props.lang["getintouch_btn"]}</span>
                  </button>
                  <div className="languageSelect">
                    <div
                      className={
                        this.state.showLang === true
                          ? "languageDisplay active"
                          : "languageDisplay"
                      }
                      onClick={this.handleShowLang}
                    >
                      <Image
                        src={this.state.src}
                        alt="English"
                        className="langImg"
                      />
                      <span className="langText">{this.state.lang}</span>
                    </div>
                    {this.state.showLang && (
                      <ul className="languageOption">
                        {this.state.languages.map((lang) => (
                          <li
                            key={lang.name}
                            data-slug={lang}
                            onClick={() => this.handleSelectLang(lang)}
                          >
                            <Image src={lang.src} alt={lang.name} />
                            <Link
                              href={this.props.router.asPath}
                              locale={lang.locale}
                            >
                              <span>{lang.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            {this.state.width < 1280 && (
              <div className="hamburger">
                <input
                  type="checkbox"
                  className="hamburger-init"
                  defaultChecked={this.props.menuDefault}
                  checked={this.state.toggleMenu}
                  onChange={this.handleChangeMenu}
                />
                <div className="menu">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </div>
              </div>
            )}
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
