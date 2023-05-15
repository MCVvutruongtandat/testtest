import React from "react";
import Image from "next/image"
class PartnerComponent extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
      
      return (
        <div className="study-left">
          <h1>{this.props.partnerName}</h1>
          <span>{this.props.partnerPosition}</span>
          <p className="study-p">{this.props.partnerSeries}</p>
          <table>
            <tbody>
              <tr>
                <td>
                  <Image quality={100}
                    alt=""
                    width={32}
                    height={32}
                    src="/images/study/logos_youtube-icon.png"
                  />
                  <p>
                    {" "}
                    <b>{this.props.countYoutube}</b> Followers
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <Image quality={100}
                    alt=""
                    width={32}
                    height={32}
                    src="/images/study/logos_facebook-icon.png"
                  />
                  <p>
                    {" "}
                    <b>{this.props.countFacebook} </b> Followers
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <Image quality={100}
                    alt=""
                    width={32}
                    height={32}
                    src="/images/study/logos_tiktok-icon.png"
                  />
                  <p>
                    {" "}
                    <b>{this.props.countTiktok} </b> Followers
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="line"></div>
        </div>
      );
    }
  } 
export default PartnerComponent