import React from "react";
import Slider from "react-slick";
import Image from "next/image";
class SlideMini extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this._isMounted = false;
    this.state = {
      //   view: 1,
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
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />                 
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
            <Image src="/images/about/texas.png" width={57} height={57} />
        </Slider>
      </>
    );
  }
}
export default SlideMini;
