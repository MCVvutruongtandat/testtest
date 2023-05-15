"use strict";

/* Package System */
import React from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import Image from "next/image";
import Router from "next/router";
import Slider from "react-slick";
import Link from "next/link";
const { fetchLang, fetchApi } = require("@utils/Helper");
import { connect } from "react-redux";
import { setContent } from "@features/Language";

/* Package style */
import homepage from "@public/scss/pages/homepage.scss";

import {
  FadeIn,
  FadeListCountry,
  FadeListKols,
  FadeListFields,
} from "@views/Components/Animation";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      counterOn: false,
      listkols: [
        {
          name: "Việt Thảo",
        },
        {
          name: "Cô Ba Ngọc Nguyên",
        },
        {
          name: "Vy Brows",
        },
        {
          name: "Thuý Nga",
        },
        {
          name: "Hồng Vân",
        },
        {
          name: "Quốc Thuận",
        },
        {
          name: "Ngọc Lan",
        },
        {
          name: "Quyền Linh",
        },
        {
          name: "Trường Giang",
        },
      ],
      listAnalysis: [
        {
          id: 1,
          name: "Subscribers",
          count: this.props.lang['youtube'],
          suffix: "M",
          decimal: false,
          width: 85,
          height: 59,
        },
        {
          id: 2,
          name: "Followers",
          count: this.props.lang['facebook'],
          suffix: "M",
          decimal: false,
          width: 74,
          height: 74,
        },
        {
          id: 3,
          name: "Followers",
          count: this.props.lang['tiktok'],
          suffix: "M",
          decimal: false,
          width: 59,
          height: 67,
        },
        {
          id: 4,
          name: "Avg View/month",
          suffix: "B",
          count: this.props.lang['viewOfmonth'],
          decimal: true,
          width: 83,
          height: 42,
        },
      ],
      listCountries: [
        {
          name: this.props.lang["country4_name"],
          desc: this.props.lang["country4_add"],
          flag: '/images/home/country4.png'
        },
        {
          name: this.props.lang["country1a_name"],
          desc: this.props.lang["country1a_add"],
          flag: '/images/home/country1.png'
        },
        {
          name: this.props.lang["country1b_name"],
          desc: this.props.lang["country1b_add"],
          flag: '/images/home/country1.png'
        },
        {
          name: this.props.lang["country1c_name"],
          desc: this.props.lang["country1c_add"],
          flag: '/images/home/country1.png'
        },
        {
          name: this.props.lang["country2_name"],
          desc: this.props.lang["country2_add"],
          flag: '/images/home/country2.png'
        },
        {
          name: this.props.lang["country3_name"],
          desc: this.props.lang["country3_add"],
          flag: '/images/home/country3.png'
        },
      ],
      listFields: [
        {
          name: { __html: this.props.lang["sec2_field1"] },
          alt: this.props.lang["sec2_field1"],
        },
        {
          name: { __html: this.props.lang["sec2_field2"] },
          alt: this.props.lang["sec2_field2"],
        },
        {
          name: {
            __html: this.props.lang["sec2_field3"],
          },
          alt: this.props.lang["sec2_field3"],
        },
        {
          name: { __html: this.props.lang["sec2_field4"] },
          alt: this.props.lang["sec2_field4"],
        },
      ],
      isReadMore: true,
      banner: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.next();
    this.previous();
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
    this.handleBanner();
  }
  toggleReadMore = () => {
    this.setState({isReadMore: !this.state.isReadMore})
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  
  async handleBanner() {
    let asPath = this.props.router.state.asPath;
    let path = asPath.replace('/', '');
    
    let _url = process.env.API_URL + `/v1/banners?fq=slug:home`;
    let _data = await fetchApi(_url);
    if (_data?.status == "success") {
      let data = _data.data[0]?.image;//
      // console.log(firstPartner);/
      this.setState({ banner: data });
    }
  }
  render() {
    const text = this.props.lang["sec1_text"];
    const settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 639,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        }
      ]
    };
    return (
      <React.Fragment>
        <FadeIn>
          <section className="mv" style={{backgroundImage: `url("${process.env.CDN_URL+this.state.banner}")`}}>
            <div className="container">
              <div className="mv-ins">
                <h1 className="font-mont">{this.props.lang["mv_h1"]}</h1>
                <p>{this.props.lang["mv_p"]}</p>
                <Link href="./contact">
                  <button className="secondaryBtn">
                    <span>{this.props.lang["mv_btn"]}</span>
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="section1">
            <div className="container">
              <div className="sec1-box">
                <div className="sec1-box-ins">
                  <h2 className="main-tit text_left">
                    <span dangerouslySetInnerHTML={{__html: this.props.lang["sec1_tit"]}} />
                  </h2>
                  {this.state.isReadMore ? <p className="common-text" dangerouslySetInnerHTML={{__html: this.props.lang["sec1_text"]}} /> : <p className="common-text" dangerouslySetInnerHTML={{__html: text}} />}
                  {/* <p  onClick={this.toggleReadMore} className="read-or-hide">
                    {this.state.isReadMore ? <a className="show">{this.props.lang["showmore}</a> : <a className="show">{this.props.lang["showless}</a>}
                  </p> */}
                  <button
                    className="primary btn-home"
                    onClick={() => Router.push("/about")}
                  >
                    <span>{this.props.lang["btn_more"]}</span>
                  </button>
                </div>
                <div className="sec1-box-ins">
                  <figure>
                    <Image
                      src={"/images/home/sec1-logo.svg"}
                      width={248}
                      height={119}
                      alt="Tập đoàn Truyền thông và Công nghệ MCV"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="section2">
            <div className="container">
              <div className="sec2-box">
                <div className="item">
                  <h2 className="sub-tit">{this.props.lang["sec2_tit"]}</h2>
                  <p className="common-text">{this.props.lang["sec2_p"]}</p>
                </div>
                <div className="item">
                  <FadeListFields listfields={this.state.listFields} />
                </div>
              </div>
              <div className="programs-main">
                <div className="programs-image">
                  <Image
                    className="programs-circle"
                    src={"/images/home/circle.png"}
                    width={587}
                    height={549}
                    alt="Chương trình đặc sắc"
                  />
                  <Image style={{position: 'absolute'}}
                    className="programs-branch"
                    quality={100}
                    src={"/images/home/branch.png"}
                    alt="Chương trình đặc sắc"
                    width={634}
                    height={500}
                  />
                </div>
                <div className="programs-content">
                  <FadeIn>
                    <h2 className="main-tit text_left">
                      <span>{this.props.lang["sec2_title"]}</span>
                    </h2>
                    <p className="common-text">
                      {this.props.lang["sec2_text"]}
                    </p>
                    <button
                      className="primary btn-home"
                      onClick={() => Router.push("/show")}
                    >
                      <span>{this.props.lang["btn_more"]}</span>
                    </button>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="section3">
            <div className="container">
              <div className="kol-block">
                <div className="kol-block-ins">
                  <h2 className="main-tit text_left">
                    <span>{this.props.lang["sec3_tit"]}</span>
                  </h2>
                  <p className="common-text">{this.props.lang["sec3_p"]}</p>
                  <button
                    className="primary btn-home"
                    onClick={() => Router.push("/about")}
                  >
                    <span>{this.props.lang["btn_viewmore"]}</span>
                  </button>
                </div>
                <div className="kol-block-ins">
                  <FadeListKols listkols={this.state.listkols} />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="section4">
            <ScrollTrigger
              onEnter={() => this.setState({ counterOn: true })}
              onExit={() => this.setState({ counterOn: false })}
            >
              <div className="container">
                <h2 className="main-tit">
                  <span>{this.props.lang["sec4_tit"]}</span>
                </h2>
                <div className="sec4-tit">
                  <span className="text-show">NUMBERS MOVE</span>
                  <Image
                    src={"/images/home/text.png"}
                    alt="numbersmove"
                    className="text-hidden"
                    width={794}
                    height={98}
                  />
                </div>
                <ul className="listAnalysis">
                  {this.state.listAnalysis.map((item, index) => (
                    <li key={item.id}>
                      <figure>
                        <Image
                          src={`/images/home/icon_00${index + 1}.png`}
                          alt="WE MAKE"
                          width={item.width}
                          height={item.height}
                          quality={100}
                        />
                      </figure>
                      <div className="text">
                        <span>
                          {this.state.counterOn && (
                            <CountUp
                              start={0}
                              end={item.count}
                              duration={2}
                              suffix={item.suffix}
                              decimals={item.decimal ? 1 : 0}
                              decimal=","
                            ></CountUp>
                          )}
                        </span>
                        {item.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollTrigger>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="section5">
            <div className="container">
              <h2 className="main-tit text-center">
                <span>{this.props.lang["sec5_tit"]}</span>
              </h2>
              <figure>
                <Image
                  src={"/images/home/sec5-img.jpg"}
                  alt={this.props.lang["sec5_tit"]}
                  width={1215}
                  height={743}
                />
              </figure>
              {/* <FadeListCountry listCountries={this.state.listCountries} /> */}
              <FadeIn delay={0.3}>
                <div className="countrys-list">
                  <Slider ref={(c) => (this.slider = c)} {...settings}>
                    {this.state.listCountries.map((country, i) => (
                      <div className="item" key={country.name}>
                        <div className="country-wrapper">
                          <figure>
                            <div className="country-name">{country.name}</div>
                            <div className="desc">{country.desc}</div>
                          </figure>
                          <div className="img-wrapper">
                            <Image
                              src={country.flag}
                              alt={country.name}
                              quality={100}
                              width={80}
                              height={80}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </FadeIn>
            </div>
          </section>
        </FadeIn>
        <style jsx global>
          {homepage}
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

export default connect(null,mapDispatchToProps)(Homepage);
