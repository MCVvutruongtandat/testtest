"use strict";

/* Package System */
import React from "react";
import Link from "next/link";
import { withRouter } from 'next/router'

/* Package style */

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          name: this.props.lang.menu1,
          link: `${this.props.lang.menu1_link}`,
        },
        {
          name: this.props.lang.menu2,
          link: `${this.props.lang.menu2_link}`,
        },
        {
          name: this.props.lang.menu3,
          link: `${this.props.lang.menu3_link}`,
        },
        {
          name: this.props.lang.menu4,
          link: `${this.props.lang.menu4_link}`,
        },
        {
          name: this.props.lang.menu5,
          link: `${this.props.lang.menu5_link}`,
        },
        {
          name: this.props.lang.menu6,
          link: `${this.props.lang.menu6_link}`,
        }
      ],
    }
    this.handleChangeMenu = this.handleChangeMenu.bind(this);
  }
  handleChangeMenu = () => {
    this.props.parentCallback(false);
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.router.locale!=this.props.router.locale){
      this.setState({menus:[
        {
          name: this.props.lang.menu1,
          link: `${this.props.lang.menu1_link}`,
        },
        {
          name: this.props.lang.menu2,
          link: `${this.props.lang.menu2_link}`,
        },
        {
          name: this.props.lang.menu3,
          link: `${this.props.lang.menu3_link}`,
        },
        {
          name: this.props.lang.menu4,
          link: `${this.props.lang.menu4_link}`,
        },
        {
          name: this.props.lang.menu5,
          link: `${this.props.lang.menu5_link}`,
        },
        {
          name: this.props.lang.menu6,
          link: `${this.props.lang.menu6_link}`,
        }
      ]})
    }
  }
  render() {
    return (
      <>
        <nav className="nav">
          {
            this.state.menus.map((item) => (
              <Link href={item.link} key={item.name}>
                <a className={this.props.router.asPath === item.link ? "active" : ""} onClick={this.handleChangeMenu}>{item.name}</a>
              </Link>
            ))
          }
        </nav>
      </>
    );
  }
}

export default withRouter(Nav);
