import React from "react";
import Image from "next/future/image";
import about from "@public/scss/pages/about.scss";
import { FadeIn } from "@views/Components/Animation";
import Router from "next/router";
import PartnerYoutube from "./components/PartnerYoutube";
const { firstSpin, fetchLang, fetchApi } = require("@utils/Helper");
import { connect } from "react-redux";
import { setContent } from "@features/Language";

class About extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.timeLoop = null;
    this.state = {
      deg_bg: 0,
      active: 0,
      type: "youtube",
      // partners: "MC Việt Thảo",
      banner: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firstSpin(this.state.active, this.state.deg_bg);
    this.timeLoop = setInterval(() => this.handleSpin(), 3500);
    this.handlePartner(this.state.type);
    this.handleBanner();
    this.props.setContent(this.state.content);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.content !== this.state.content){
      this.props.setContent(this.state.content);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    firstSpin(this.state.active, this.state.deg_bg);
    clearInterval(this.timeLoop);
    this.handlePartner();
    this.handleBanner();
  }
  handlePartner = (type) => {
    this.setState({ type: type });
  };
  handleContent = (partner) => {
    this.setState({ partners: partner });
  };
  handleSpin = () => {
    var count_group = document.querySelectorAll(".list-left .group").length;
    var deg_bg = 0;
    var list_color = [
      "linear-gradient(79deg, rgba(94,252,232,1) 0%, rgba(64,57,255,1) 100%)", //facebook
      "linear-gradient(120deg, rgba(255,226,183,1) 0%, rgba(255,0,61,1) 100%)", //youtube
      "linear-gradient(42deg, rgba(249,119,148,1) 0%, rgba(98,58,162,1) 100%)", //tiktok
    ];
    document.querySelector(".bg-rotate").style.transition = "2s";
    document.getElementById("group_item_0").classList.add("active");
    document
      .getElementById(
        "group_item_" +
          (this.state.active - 2 == -1
            ? count_group - 1
            : this.state.active - 2 == -2
            ? count_group - 2
            : this.state.active - 2)
      )
      .classList.remove("active");
    document
      .getElementById("group_item_" + this.state.active)
      .classList.add("active");
    document.querySelector("#couch-text_" + this.state.active).style.left =
      "5%";
    document.querySelector(
      "#couch-text_" + this.state.active
    ).style.opacity = 1;
    document.querySelector(
      "#couch-text_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.left = "-50%";
    document.querySelector(
      "#couch-text_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.opacity = 0;
    document.querySelector(
      "#couch-text_" +
        (this.state.active - 2 == -1
          ? count_group - 1
          : this.state.active - 2 == -2
          ? count_group - 2
          : this.state.active - 2)
    ).style.left = "15%";
    if (window.innerWidth <= 1000) {
      document.querySelector("#table_" + this.state.active).style.left = "0";
    } else {
      document.querySelector("#table_" + this.state.active).style.left = "0";
    }
    document.querySelector("#table_" + this.state.active).style.opacity = 1;
    document.querySelector(
      "#table_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.left = "-50%";
    document.querySelector(
      "#table_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.opacity = 0;
    document.querySelector(
      "#table_" +
        (this.state.active - 2 == -1
          ? count_group - 1
          : this.state.active - 2 == -2
          ? count_group - 2
          : this.state.active - 2)
    ).style.left = "15%";
    document.querySelector("#couch-title_" + this.state.active).style.left = 0;
    document.querySelector(
      "#couch-title_" + this.state.active
    ).style.opacity = 1;
    document.querySelector(
      "#couch-title_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.left = "-10%";
    document.querySelector(
      "#couch-title_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.opacity = 0;
    document.querySelector(
      "#couch-title_" +
        (this.state.active - 2 == -1
          ? count_group - 1
          : this.state.active - 2 == -2
          ? count_group - 2
          : this.state.active - 2)
    ).style.left = "15%";
    document.querySelector(
      "#couch-background_" + this.state.active
    ).style.left = 0;
    document.querySelector(
      "#couch-background_" + this.state.active
    ).style.opacity = 1;
    document.querySelector(
      "#couch-background_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.left = "-10%";
    document.querySelector(
      "#couch-background_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.opacity = 0;
    document.querySelector(
      "#couch-background_" +
        (this.state.active - 1 < 0 ? count_group - 1 : this.state.active - 1)
    ).style.background = "#EAECF0";
    document.querySelector(
      "#couch-background_" +
        (this.state.active - 2 == -1
          ? count_group - 1
          : this.state.active - 2 == -2
          ? count_group - 2
          : this.state.active - 2)
    ).style.left = "15%";
    this.state.active - 2 == -1
      ? count_group - 1
      : this.state.active - 2 == -2
      ? count_group - 2
      : this.state.active - 2;
    //tốc độ quay
    deg_bg = this.state.deg_bg += 50;
    this.state.active =
      this.state.active >= count_group - 1 ? 0 : (this.state.active += 1);
    document.querySelector(".bg-rotate").style.transform =
      "rotate(" + deg_bg + "deg)";
    document.querySelector(".bg-rotate").style.background =
      list_color[this.state.active];
  };
  async handleBanner() {
    let asPath = this.props.router.state.asPath;
    let path = asPath.replace('/', '');
    
    let _url = process.env.API_URL + `/v1/banners?fq=slug:${path? path : ""}`;
    let _data = await fetchApi(_url);
    if (_data?.status == "success") {
      var data = _data.data[0]?.image;//
      // console.log(firstPartner);/
      this.setState({ banner: data });
    }
  }
  render() {
    return (
      <React.Fragment>
        <FadeIn>
          <div className="mv">
            <Image
              quality={100}
              alt=""
              src={process.env.CDN_URL+this.state.banner}
              width={1920}
              height={569}
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="couch">
            <div className="couch-main">
              <div className="left">
                <div className="transparent" />
                <div className="background-rotate">
                  <div className="bg-rotate" />
                  {/* <img
                  src="/images/about/bg-rotate.png"
                  style={{ transform: "translate(-20%, 18%)" }}
                /> */}
                  <svg
                    style={{ visibility: "hidden", position: "absolute" }}
                    width={0}
                    height={0}
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                  >
                    <defs>
                      <filter id="round">
                        <feGaussianBlur
                          in="SourceGraphic"
                          stdDeviation={16}
                          result="blur"
                        />
                        <feColorMatrix
                          in="blur"
                          mode="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                          result="goo"
                        />
                        <feComposite
                          in="SourceGraphic"
                          in2="goo"
                          operator="atop"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="couch-feature">
                  <div className="couch-sub">
                    <Image
                      quality={100}
                      alt=""
                      src="/images/about/ic_youtube.png"
                      width={24}
                      height={24}
                    />
                    <div id="couch-background_0" />
                  </div>
                  <div className="couch-line" />
                  <div className="couch-sub">
                    <Image
                      quality={100}
                      alt=""
                      src="/images/about/ic_tiktok.png"
                      width={24}
                      height={24}
                    />
                    <div id="couch-background_1" />
                  </div>
                  <div className="couch-line" />
                  <div className="couch-sub">
                    <Image
                      quality={100}
                      alt=""
                      src="/images/about/ic_facebook.png"
                      width={24}
                      height={24}
                    />
                    <div id="couch-background_2" />
                  </div>
                </div>
                <div style={{ width: 200 }}>
                  <div
                    className="position-text"
                    id="couch-text_0"
                    style={{ left: "5%" }}
                  >
                    YOUTUBE MCN PARTNER
                  </div>
                  <div className="position-text" id="couch-text_1">
                    #1 MCN TIKTOK OF THE YEAR 2020
                  </div>
                  <div className="position-text" id="couch-text_2">
                    FACEBOOK MEDIA PARTNER - VIETNAM
                  </div>
                </div>
                <div className="list-left" style={{ position: "relative" }}>
                  <div className="group" id="group_item_0">
                    <div className={`item tiktok`}>
                      <Image
                        quality={100}
                        alt=""
                        src="/images/about/youtube_like.png"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="item">
                      <div className="couch-main-type">
                        <Image
                          quality={100}
                          alt=""
                          src="/images/about/youtube_icon.png"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="couch-sub-type">
                        <Image
                          quality={100}
                          alt=""
                          src="/images/about/youtube_icon.png"
                          width={200}
                          height={110}
                        />
                      </div>
                      {/*item shadows*/}
                    </div>
                    <div className={`item facebook`}>
                      {/*item main*/}
                      <Image
                        quality={100}
                        alt=""
                        src="/images/about/youtube_star.png"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="group" id="group_item_1">
                    <div className={`item youtube`}>
                      <Image
                        quality={100}
                        alt=""
                        src="/images/about/tiktok_like.png"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="item">
                      <div className="couch-main-type">
                        <Image
                          quality={100}
                          alt=""
                          src="/images/about/tiktok.png"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="couch-sub-type">
                        <Image
                          quality={100}
                          alt=""
                          src="/images/about/tiktok.png"
                          width={200}
                          height={110}
                        />
                      </div>
                      {/*item shadows*/}
                    </div>
                    <div className={`item facebook`}>
                      {/*item main*/}
                      <Image
                        quality={100}
                        alt=""
                        src="/images/about/tiktok_star.png"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="group" id="group_item_2">
                    <div className={`item youtube`}>
                      <Image
                        quality={100}
                        alt=""
                        src="/images/about/facebook_star.png"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="item">
                      <div className="couch-main-type">
                        <Image
                          quality={100}
                          alt=""
                          src="/images/about/face_icon.png"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="couch-sub-type">
                        <Image
                          quality={100}
                          alt=""
                          src="/images/about/face_icon.png"
                          width={200}
                          height={110}
                        />
                      </div>
                      {/*item shadows*/}
                    </div>
                    <div className={`item tiktok`}>
                      {/*item main*/}
                      <Image
                        quality={100}
                        alt=""
                        src="/images/about/facebook_like.png"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="couch-title" id="couch-title_0">
                  <div className="couch-table">
                    <h1 className="couch-header-h1">
                      YOUTUBE MCN PARTNER 2021
                    </h1>
                    <p className="couch-header-p">
                      {this.props.lang["youtubeDescription"]}
                    </p>
                  </div>
                </div>
                <div className="couch-title" id="couch-title_1">
                  <div className="couch-table">
                    <h1 className="couch-header-h1">
                      #1 MCN TIKTOK OF THE YEAR 2020
                    </h1>
                    <p className="couch-header-p">
                      {this.props.lang["tiktokDescription"]}
                    </p>
                  </div>
                </div>
                <div className="couch-title" id="couch-title_2">
                  <div className="couch-table">
                    <h1 className="couch-header-h1">
                      FACEBOOK MEDIA PARTNER - VIETNAM
                    </h1>
                    <p className="couch-header-p">
                      {this.props.lang["facebookDescription"]}
                    </p>
                  </div>
                </div>
                <div id="table_0">
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["youtubeAchievements1"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["youtubeAchievements2"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["youtubeAchievements3"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["youtubeAchievements4"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["youtubeAchievements5"]}} />
                  </div>
                </div>
                <div id="table_1">
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["tiktokAchievements1"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["tiktokAchievements2"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["tiktokAchievements3"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["tiktokAchievements4"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["tiktokAchievements5"]}} />
                  </div>
                </div>
                <div id="table_2">
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["facebookAchievements1"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["facebookAchievements2"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["facebookAchievements3"]}} />
                  </div>
                  <div className="couch-rows">
                    <p dangerouslySetInnerHTML={{__html: this.props.lang["facebookAchievements4"]}} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="partner">
            <div className="container">
              <div className="partner-main">
                <h1>{this.props.lang["partnerTitle"]}</h1>
                <div className="partner-header">
                  <div
                    className={`partner-type partner-facebook ${
                      this.state.type === "facebook"
                        ? "partner-facebook-active"
                        : ""
                    }`}
                    onClick={() => this.handlePartner("facebook")}
                  >
                    <Image
                      quality={100}
                      alt=""
                      src="/images/about/face_icon.png"
                      width={78}
                      height={78}
                    />
                    <p>
                      {this.props.lang["partnerFacebook"]} <br />
                      {this.props.lang["partnerFrom"]}
                    </p>
                  </div>
                  <div
                    className={`partner-type partner-youtube ${
                      this.state.type === "youtube"
                        ? "partner-youtube-active"
                        : ""
                    }`}
                    onClick={() => this.handlePartner("youtube")}
                  >
                    <Image
                      quality={100}
                      alt=""
                      src="/images/about/youtube_icon.png"
                      width={78}
                      height={78}
                    />
                    <p>
                      {this.props.lang["partnerYoutube"]} <br />
                      {this.props.lang["partnerFrom"]}
                    </p>
                  </div>
                  <div
                    className={`partner-type partner-tiktok ${
                      this.state.type === "tiktok"
                        ? "partner-tiktok-active"
                        : ""
                    }`}
                    onClick={() => this.handlePartner("tiktok")}
                  >
                    <Image
                      quality={100}
                      alt=""
                      src="/images/about/tiktok_icon.png"
                      width={78}
                      height={78}
                    />
                    <p>
                      {this.props.lang["partnerTiktok"]} <br />
                      {this.props.lang["partnerFrom"]}
                    </p>
                  </div>
                </div>
                {this.state.type === "youtube" ? (
                  <>
                    <PartnerYoutube
                      {...this.props}
                      type="youtube"
                      first="Nina Daily"
                      partnerType="/images/about/you_tube_mini.png"
                    />
                  </>
                ) : (
                  ""
                )}

                {this.state.type === "facebook" ? (
                  <>
                    <PartnerYoutube
                      {...this.props}
                      type="facebook"
                      first="Xin Chào TV"
                      partnerType="/images/about/facebook_mini.png"
                    />
                  </>
                ) : (
                  ""
                )}

                {this.state.type === "tiktok" ? (
                  <>
                    <PartnerYoutube
                      {...this.props}
                      type="tiktok"
                      first="Michael Hoà TV"
                      partnerType="/images/about/tiktok_mini.png"
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="partner-map">
              <div className="partner-contact">
                <h1>{this.props.lang["contact"]}</h1>
                <button
                  className="primary btn-home"
                  onClick={() => Router.push("/contact")}
                >
                  <span>{this.props.lang["partnerButton"]}</span>
                </button>
              </div>
            </div>
          </section>
        </FadeIn>

        <style jsx global>
          {about}
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

export default connect(null,mapDispatchToProps)(About);
