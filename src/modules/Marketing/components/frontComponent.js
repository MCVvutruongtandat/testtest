
import React from "react";
import Image from "next/future/image";

class FrontComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this._isMounted = false;
      this.state = {
        flipped: false,
      };
      this.flip = this.flip.bind(this);
    }
  
    componentDidMount() {
      this._isMounted = true;
      this.flip();
    }
  
    componentWillUnmount() {
      this._isMounted = false;
      this.flip();
    }
  
    flip = () => {
      this.setState({ flipped: !this.state.flipped });
    };
  
    render() {
        
      return (
        <>
          <div onClick={this.flip}>
            <div
              className={
                "benefit-content" +
                (this.state.flipped
                  ? " benefit-flipped"
                  : " benefit-flipped-reserve")
              }
            >
              <div className="benefit-card">
                <div className="benefit-corner">
                  <Image quality={100}
                    alt=""
                    width={280}
                    height={450}
                    src="/images/benefit/benefit-corner.png"
                  />
                </div>
                <div className="benefit-image">
                  <Image quality={100} alt="" width={156} height={174} src={this.props.Image} />
                </div>
                {this.state.flipped === true ? (
                  <p className="benefit-p">{this.props.frontDescription}</p>
                ) : (
                  <>
                    <p className="benefit-p-b">{this.props.backDescription}</p>
  
                    <p className="benefit-p-m">
                      <span>{this.props.backDescription1}</span>
  
                      <span>{this.props.backDescription2}</span>
  
                      <span>{this.props.backDescription3}</span>
                    </p>
                  </>
                )}
                <p className="benefit-p"></p>
                <div className="benefit-icon">
                  <Image quality={100}
                    alt=""
                    width={32}
                    height={32}
                    src="/images/benefit/benefit-icon.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  export default FrontComponent