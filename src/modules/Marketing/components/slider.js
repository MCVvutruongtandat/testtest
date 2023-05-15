import React from "react";
import Slider from "react-slick";
import FrontComponent from "./frontComponent";
import Image from "next/image";
class Flip extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this._isMounted = false;
    this.state = {
      //   view: 1,
      content: "content",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.next();
    this.previous();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  studyId = (id) => {
    // this.setState({ view: id });
    // console.log(e.target.dataset.studyid);
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
            infinite: true,
          },
        },
        {
          breakpoint: 1332,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 1060,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
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
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 606,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          <FrontComponent {...this.props}
            frontDescription={this.props.lang["frontDescription"]}
            backDescription={this.props.lang["backDescription"]}
            Image="/images/benefit/benefit-camera.png"
          />
          <FrontComponent {...this.props}
            frontDescription={this.props.lang["frontDescriptionCard2"]}
            backDescription1={this.props.lang["backDescriptionCard2_1"]}
            backDescription2={this.props.lang["backDescriptionCard2_2"]}
            Image="/images/benefit/benefit-setting.png"
          />
          <FrontComponent {...this.props}
            frontDescription={this.props.lang["frontDescriptionCard3"]}
            backDescription1={this.props.lang["backDescriptionCard3_1"]}
            backDescription2={this.props.lang["backDescriptionCard3_2"]}
            backDescription3={this.props.lang["backDescriptionCard3_3"]}
            Image="/images/benefit/benefit-star.png"
          />
          <FrontComponent {...this.props}
            frontDescription={this.props.lang["frontDescriptionCard4"]}
            backDescription1={this.props.lang["backDescriptionCard4_1"]}
            backDescription2={this.props.lang["backDescriptionCard4_2"]}
            backDescription3={this.props.lang["backDescriptionCard4_3"]}
            Image="/images/benefit/benefit-shield.png"
          />
          <FrontComponent {...this.props}
            frontDescription={this.props.lang["frontDescriptionCard5"]}
            backDescription1={this.props.lang["backDescriptionCard5_1"]}
            backDescription2={this.props.lang["backDescriptionCard5_2"]}
            Image="/images/benefit/benefit-comment.png"
          />
          <FrontComponent {...this.props}
            frontDescription={this.props.lang["frontDescriptionCard6"]}
            backDescription={this.props.lang["backDescriptionCard6"]}
            Image="/images/benefit/benefit-mail.png"
          />
        </Slider>

        <div style={{ textAlign: "center", position: "relative" }}>
          <button className="button-prev" onClick={this.previous}>
            <Image
              quality={100}
              alt=""
              width={36}
              height={36}
              src="/images/benefit/prev.png"
            />
          </button>
          <button className="button-next" onClick={this.next}>
            <Image
              quality={100}
              alt=""
              width={36}
              height={36}
              src="/images/benefit/next.png"
            />
          </button>
        </div>
      </>
    );
  }
}
export default Flip;
