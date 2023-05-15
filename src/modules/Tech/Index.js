"use strict";

/* Package System */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import { setContent } from "@features/Language";

/* Package style */
import tech from "@public/scss/pages/tech.scss";
import { FadeIn } from "@views/Components/Animation";
const { fetchApi } = require("@utils/Helper");

class Tech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTechs: [
        {
          name: this.props.lang["interactive"],
          width: 80,
          height: 81,
        },
        {
          name: this.props.lang["reward"],
          width: 81,
          height: 81,
        },
        {
          name: this.props.lang["premium"],
          width: 74,
          height: 81,
        },
      ],
      listMainTechs: [
        {
          name: this.props.lang["streaming"],
        },
        {
          name: this.props.lang["live"],
        },
        {
          name: this.props.lang["artificial"],
        },
      ],
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
    this.handleBanner
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

  render() {
    return (
      <>
        <FadeIn>
          <section className="mv">
            <Image
              quality={100}
              alt="MCV Networks"
              src="/images/about/banner_about.png"
              width={1920}
              height={720}
            />
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="section1">
            <div className="container">
              <div className="box-left">
                <h2 className="main-tit text_left">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: this.props.lang["title"],
                    }}
                  />
                </h2>
                <p className="text">{this.props.lang["content"]}</p>
                <h3 className="subtit">{this.props.lang["deliver"]}</h3>
                <ul className="listTech">
                  {this.state.listTechs.map((tech, i) => (
                    <li key={tech.name}>
                      <figure>
                        <Image
                          src={`/images/tech/icon-00${i + 1}.png`}
                          alt={tech.name}
                          quality={100}
                          width={tech.width}
                          height={tech.height}
                        />
                      </figure>
                      <figcaption>{tech.name}</figcaption>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="box-right">
                <figure>
                  <Image
                    quality={100}
                    src={"/images/tech/img-001.png"}
                    width={906}
                    height={791}
                    alt="Cung cấp giải pháp chuyển đổi số"
                  />
                </figure>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="section2">
            <div className="container">
              <h2 className="main-tit">
                <span>{this.props.lang["ourteams"]}</span>
              </h2>
              <ul className="listMainTechs">
                {this.state.listMainTechs.map((tech, i) => (
                  <li key={tech.name}>
                    <figure>
                      <Image
                        quality={100}
                        src={`/images/tech/icon-00${i + 4}.png`}
                        alt={tech.name}
                        width={194}
                        height={194}
                      />
                    </figure>
                    <figcaption>{tech.name}</figcaption>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="section3">
            <div className="container">
              <div className="gridbox">
                <figure>
                  <Image
                    quality={100}
                    src={"/images/tech/sec2-img.png"}
                    width={575}
                    height={809}
                    alt="Chúng tôi phát huy giá trị nội dung, thương hiệu và sản phẩm của bạn"
                  />
                </figure>
                <div className="text">
                  <h2 className="main-tit">
                    <span>{this.props.lang["brands"]}</span>
                  </h2>
                  <ul>
                    <li>
                      <h3>{this.props.lang["contentdelivering"]}</h3>
                      <p>{this.props.lang["contentdeliverydesc"]}</p>
                    </li>
                    <li>
                      <h3>{this.props.lang["monetization"]}</h3>
                      <p>{this.props.lang["monetizationdesc"]}</p>
                    </li>
                    <li>
                      <h3>{this.props.lang["viewerinsight"]}</h3>
                      <p>{this.props.lang["viewerinsightdesc"]}</p>
                    </li>
                    <li>
                      <h3>{this.props.lang["productdevelopment"]}</h3>
                      <p>{this.props.lang["productdevelopmentdesc"]}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={0.5}>
          <section className="section4">
            <div className="container">
              <h2 className="main-tit">
                <span>{this.props.lang["contact"]}</span>
              </h2>
              <div className="text_center">
                <Link href='./contact'>
                  <button className="primary">
                    <span>{this.props.lang["joinbtn"]}</span>
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>
        <style jsx global>
          {tech}
        </style>
      </>
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

export default connect(null,mapDispatchToProps)(Tech);
