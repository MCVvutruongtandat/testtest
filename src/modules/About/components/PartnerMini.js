import React from "react";
import Image from "next/future/image";
import Slider from "react-slick";
import { FadeIn } from "@views/Components/Animation";
import partners from "@assets/about/partner.json";
class PartnerMini extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.timeLoop = null;
    this.state = {
      deg_bg: 0,
      active: 0,
      type: this.props.type,
      partners: this.props.first,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.handlePartner(this.props.type);
    this.handleContent(this.props.first);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlePartner = (type) => {
    this.setState({ type: type });
  };
  handleContent = (partner) => {
    this.setState({ partners: partner });
  };


  render() {
    const partner = partners.partner.find((data) => {
      return data.name === this.state.partners;
    });
    const settings = {
      infinite: true,
      slidesToShow: 4,
      slidesPerRow: 1,
      swipeToSlide: true,
      centerPadding: "100px",
      responsive: [
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 371,
          settings: {
            slidesToShow: 4,
          },
        },
      ],
    };
    return (
      <React.Fragment>
        <FadeIn delay={0.5}>
 
              <div className="partner-mobile">
                {/* <h1>{this.props.lang["partnerTitle"]}</h1> */}
                <div className="partner-mobile-header">
                  <div
                    className={`partner-mobile-type partner-facebook ${
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
                      width={32}
                      height={32}
                    />
                    <p>
                      {this.props.lang["partnerFacebook"]} <br />
                      {this.props.lang["partnerFrom"]}
                    </p>
                  </div>
                  <div
                    className={`partner-mobile-type partner-youtube ${
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
                      width={32}
                      height={32}
                    />
                    <p>
                      {this.props.lang["partnerYoutube"]} <br />
                      {this.props.lang["partnerFrom"]}
                    </p>
                  </div>
                  <div
                    className={`partner-mobile-type partner-tiktok ${
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
                      width={32}
                      height={32}
                    />
                    <p>
                      {this.props.lang["partnerTiktok"]} <br />
                      {this.props.lang["partnerFrom"]}
                    </p>
                  </div>
                </div>
                <div className="partner-mobile-list">
                  <Slider ref={(c) => (this.slider = c)} {...settings}>
                  {partners.partner
              .filter((p) => p.type === this.state.type)
              .map((partner, i) => (
                    <Image key={i} alt="" onClick={() => this.handleContent(partner.name)}
                      src={partner.avatar}
                      width={57}
                      height={57}
                    />
                    
              ))}
                   
                  </Slider>
                </div>
                <div className="partner-mobile-detail">
                  <h1>{partner.name}</h1>
                  <span> {partner.followers} {this.props.lang["partnerFollowers"]}</span>
                  <p>
                    {partner.description}
                  </p>

                  <a
                    href={partner.link}
                    className="primary btn-home partner-mobile-button"
                    target="_blank"
                  >
                    <span> {this.props.lang["viewMore"]}</span>
                  </a>
                </div>

                <div className="partner-image">
                  <div className="partner-circle">
                    <Image
                      quality={100}
                      alt=""
                      className="partner-border"
                      src="/images/about/border.png"
                      width={380}
                      height={380}
                    />
                    <div className="partner-artist">
                      <Image
                        quality={100}
                        alt=""
                        src={partner.avatar}
                        width={313}
                        height={313}
                      />
                    </div>
                    <div className="partner-mini">
                      {this.state.type === "youtube" ? (<Image
                        quality={100}
                        alt=""
                        src="/images/about/you_tube_mini.png"
                        width={162}
                        height={162}
                      />): ''}
                      {this.state.type === "facebook" ? (<Image
                        quality={100}
                        alt=""
                        src="/images/about/facebook_mini.png"
                        width={162}
                        height={162}
                      />): ''}
                      {this.state.type === "tiktok" ? (<Image
                        quality={100}
                        alt=""
                        src="/images/about/tiktok_mini.png"
                        width={162}
                        height={162}
                      />): ''}
                      
                    </div>
                  </div>
                </div>
              </div>
            
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default PartnerMini;
