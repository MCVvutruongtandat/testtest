"use strict";

/* Package System */
import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

class HeadMeta extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentDidUpdate(){
  }

  render() {
    let _content = this.props?.stateLanguage?.content;

    // let _route = this.props?.children?.props?.route ?? "";
    // let _title = this.props.meta[_route]
    //   ? this.props.meta[_route].title
    //   : this.props.meta["default"].title;
    // let _description = this.props.meta[_route]
    //   ? this.props.meta[_route].description
    //   : this.props.meta["default"].description;
    // let _keywords = this.props.meta[_route]
    //   ? this.props.meta[_route].keywords
    //   : this.props.meta["default"].keywords;
    // let _image = this.props.meta[_route]
    //   ? this.props.meta[_route].image
    //   : this.props.meta["default"].image;

    let _title = _content?.seo_title || this.props.meta["default"].title
    let _description = _content?.seo_description || this.props.meta["default"].description;
    let _keywords = _content?.seo_description || this.props.meta["default"].keywords;
    let _image = _content?.seo_description || this.props.meta["default"].image;

    return (
      <>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="facebook-domain-verification" content="bmsyeh9cqo3wyf438jx2rco47ha0gs" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>{_title}</title>
          <meta name="description" content={_description} />
          <meta name="keywords" content={_keywords} />
          <meta property="og:site_name" content="mcvnetworks.us" />
          <meta property="og:rich_attachment" content="true" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            itemProp="url"
            content="https://www.mcvnetworks.us"
          />
          <meta property="og:image" itemProp="thumbnailUrl" content={_image} />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="354" />
          <meta content={_title} itemProp="headline" property="og:title" />
          <meta
            content={_description}
            itemProp="description"
            property="og:description"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateLanguage: state.language,
  };
};

export default connect(mapStateToProps, null)(HeadMeta);
