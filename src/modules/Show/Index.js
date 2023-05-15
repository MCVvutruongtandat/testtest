"use strict";

/* Package System */
import React from "react";
import Popup from "reactjs-popup";
import Image from "next/image";
import { connect } from "react-redux";
import { setContent } from "@features/Language";

/* Package style */
import show from "@public/scss/pages/show.scss";
import ContactForm from "@views/Components/ContactForm";
const { fetchApi } = require("@utils/Helper");

import { FadeIn, FadeListLogos } from "@views/Components/Animation";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLogos: [
        {
          name: "gõ cửa thăm nhà",
          width: 304,
          height: 182,
        },
        {
          name: "chat với mẹ bỉm",
          width: 303,
          height: 197,
        },
        {
          name: "come out",
          width: 305,
          height: 104,
        },
        {
          name: "ở đâu có người việt?",
          width: 304,
          height: 184,
        },
        {
          name: "phiêu lưu ký Việt Thảo",
          width: 226,
          height: 244,
        },
        {
          name: "người kết nối",
          width: 304,
          height: 144,
        },
      ],
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
      let data = _data.data[0]?.image;
      this.setState({ banner: data });
    }
  }
  render() {
    return (
      <>
        <FadeIn>
          <section className="mv">
            <Image src={process.env.CDN_URL+this.state.banner} alt="show" width={1920} height={720} />
          </section>
        </FadeIn>
        <section className="section1">
          <div className="container">
            <div className="main-tit-bg">
              <FadeIn delay={1}>
                <h2 className="main-tit">
                  <span dangerouslySetInnerHTML={{__html: this.props.lang["sec1_title"]}} />
                </h2>
              </FadeIn>
            </div>
            <FadeListLogos listLogos={this.state.listLogos} />
          </div>
        </section>
        <FadeIn delay={1}>
          <section className="section2">
            <div className="container">
              <h2 className="main-tit">
                <span>{this.props.lang["sec2_title"]}</span>
              </h2>
              <div className="text_center">
                <Popup
                  modal
                  trigger={
                    <button className="primary btn-home btn-gradient">
                      <span>{this.props.lang["btn_join"]}</span>
                    </button>
                  }
                >
                  {(close) => <ContactForm tel={this.props.lang["tel"]} email={this.props.lang["email"]} website={this.props.lang["website"]} close={close} lang={this.props.lang} />}
                </Popup>
              </div>
            </div>
          </section>
        </FadeIn>
        <style jsx global>
          {show}
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

export default connect(null,mapDispatchToProps)(Show);
