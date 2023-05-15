"use strict";

/* Package System */
import React from "react";
/* Package style */
import marketing from "@public/scss/pages/marketing.scss";
import Image from "next/future/image";
import { FadeIn } from "@views/Components/Animation";
import PartnerComponent from "./components/PartnerComponent";
import FlipCard from "./components/slider";
const { fetchLang, fetchApi } = require("@utils/Helper");
import { connect } from "react-redux";
import { setContent } from "@features/Language";

class Marketing extends React.Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this._isMounted = false;
    this.state = {
      view: 1,
      view2: <br />,
      banner: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
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
  async handleBanner() {
    let asPath = this.props.router.state.asPath;
    let path = asPath.replace('/', '');
    
    let _url = process.env.API_URL + `/v1/banners?fq=slug:${path? path : ""}`;
    let _data = await fetchApi(_url);
    if (_data?.status == "success") {
      let data = _data.data[0]?.image;//
      // console.log(firstPartner);/
      this.setState({ banner: data });
    }
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  studyId = (id) => {
    this.setState({ view: id });
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1460,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1332,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1060,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 616,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <React.Fragment>
        <FadeIn>
          <div className="mv">
          <Image src={process.env.CDN_URL+this.state.banner} alt="show" width={1920} height={720} />
          </div>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section id="benefit" className="benefit">
            <div className="container">
              <h1>{this.props.lang["benefit"]}</h1>
              <Image
                quality={100}
                alt=""
                className="benefit-img"
                src="/images/study/marketing-ring.png"
                width={81}
                height={92}
              />
              <div>
                <FlipCard {...this.props} />
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section id="study" className="study">
            <div className="container">
              <h1 className="study-title">CASE STUDY</h1>
              <div className="study-main">
                {this.state.view === 1 ? (
                  <PartnerComponent
                    partnerName="Hoyer Family"
                    partnerPosition="Lifestyle / Family"
                    partnerSeries={this.state.view2}
                    countYoutube="1.260.000"
                    countFacebook="4.100.000"
                    countTiktok="2.210"
                  />
                ) : (
                  ""
                )}
                {this.state.view === 2 ? (
                  <PartnerComponent
                    partnerName="MC Việt Thảo"
                    partnerPosition="Documentaries, Travel and Food review"
                    partnerSeries="Series: Life and Cuisine with MC VIỆT THẢO"
                    countYoutube="860.000"
                    countFacebook="930.000"
                    countTiktok="89.800"
                  />
                ) : (
                  ""
                )}
                <div className="study-right">
                  {this.state.view === 1 ? (
                    <Image
                      quality={100}
                      alt=""
                      width={500}
                      height={500}
                      src="/images/study/study_2.png"
                    />
                  ) : (
                    ""
                  )}
                  {this.state.view === 2 ? (
                    <Image
                      quality={100}
                      alt=""
                      width={500}
                      height={500}
                      src="/images/study/study_3.png"
                    />
                  ) : (
                    ""
                  )}
                  <div className="study-mini">
                    <Image
                      quality={100}
                      data-studyid="1"
                      onClick={() => this.studyId(1)}
                      alt=""
                      width={64}
                      height={64}
                      src={this.state.view === 1 ? '/images/study/ic_mini_2_active.png' : '/images/study/ic_mini_2.png'}
                    />
                    <Image
                      quality={100}
                      data-studyid="2"
                      onClick={() => this.studyId(2)}
                      alt=""
                      width={64}
                      height={64}
                      src={this.state.view === 2 ? '/images/study/ic_mini_3_active.png' : '/images/study/ic_mini_3.png'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <style jsx global>
          {marketing}
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

export default connect(null,mapDispatchToProps)(Marketing);
