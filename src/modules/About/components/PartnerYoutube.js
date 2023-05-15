import React from "react";
import Image from "next/future/image";
import { fetchApi } from "@utils/Helper.js";
import _ from 'lodash';

class PartnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.timeLoop = null;
    this.locale = this.props?.router?.state?.locale;
    this.state = {
      deg_bg: 0,
      active: 0,
      partners: null,
      partnersById: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getKols();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlePartner = (partnerId) => {
    if(this.state.partners){
      let partnersById = this.state.partners.find(item => item.id === partnerId);
      this.setState({partnersById: partnersById});
    }
  };

  async getKols() {
    var _url
    if(this.locale === "en"){
      _url = process.env.API_URL + `/v1/kols?fq=type:${this.props.type? this.props.type : "youtube"}`;
    }else{
      _url = process.env.API_URL + `/v1/kols?fq=type:${this.props.type? this.props.type : "youtube"},locale:${this.locale}&fqjoin=table:koltranslations`;
    }
    let _data = await fetchApi(_url);
    if (_data?.status == "success") {
      let firstPartner = _data.data.find((item,index) => index === 0 );
      this.setState({ partners: _data.data, partnersById: firstPartner });
    }
  }

  render() {
    const partnersByType = _.map(this.state.partners, (obj, key) => obj );
    return (
      <div className="partner-content">
        <div className="partner-detail">
          <h1>{this.state.partnersById?.name}</h1>
          <span>{this.state.partnersById?.followers} {this.props.lang["partnerFollowers"]}</span>
          <p>{(this.locale === "en")?this.state.partnersById?.description:this.state.partnersById?.content}</p>
          <a
            href={this.state.partnersById?.linkKol}
            className="primary btn-home partner-button"
            target="_blank"
          >
            <span>{this.props.lang["viewMore"]}</span>
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
                src={`https://cdn.mcvnetworks.us/${this.state.partnersById?.image}`}
                width={313}
                height={313}
              />
            </div>
            <div className="partner-mini">
              <Image
                quality={100}
                alt=""
                src={this.props.partnerType}
                width={162}
                height={162}
              />
            </div>
          </div>
        </div>
        <div className="partner-list">
          <ul id="partner-scroll">
            {partnersByType.map((partner, i) => (
                <li 
                  className={
                    this.state.partnersById?.name === partner.name ? "active" : ""
                  }
                  key={i}
                  onClick={() => this.handlePartner(partner.id)}
                >
                  <div className="partner-avatar">
                    <Image
                      style={{ borderRadius: "100%" }}
                      quality={100}
                      alt=""
                      src={`https://cdn.mcvnetworks.us/${partner.image}`}
                      width={57}
                      height={57}
                    />
                  </div>
                  <div className="partner-list-content">
                    <p className="cut-text">{partner.name}</p>
                    <p>
                      {partner.followers} {this.props.lang["partnerFollowers"]}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default PartnerComponent;
