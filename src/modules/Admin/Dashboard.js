"use strict";

/* Package System */
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

/* Package Application */


/* Package style */


class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount(){
		this._isMounted = false;
	}

	render(){

		return(
			<React.Fragment>
				<h1>This is Page Login</h1>
			</React.Fragment>
		)
	}
}

export default Dashboard;