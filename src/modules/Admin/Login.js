"use strict";

/* Package System */
import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

/* Package Application */
import { login } from '@features/Account';
import { IconButton, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
// import Spinkit from '@views/Admin/Components/Spinkit';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import { login } from '@features/Account';
const {base64Encode} = require('@utils/Helper');
let renewTimeout = null;

/* Package style */
import loginStyles from '@public/scss/pages/Login.scss';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			values:{},
			status:{
				showPassword:{},
				showLoginForm: 'signIn',
				remember:false,
				waitingSubmit: true,
				disabledButton: false
			}
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount(){
		this._isMounted = false;
	}

	handleValues=(e)=>{
		let _value = e.target.type==='checkbox' ? e.target.checked : e.target.value;
		this.setState({values:{...this.state.values,[e.target.name]:_value}});
	}

	handleTogglePassword=(e)=>{
		this.setState({status:{...this.state.status,showPassword:{...this.state.status.showPassword,[e]:!this.state.status.showPassword[e]}}});
	}

	handleLogin=(e)=>{
		e.preventDefault();
		this.setState({status:{...this.state.status,waitingSubmit:true,disabledButton:true}});
		this.props.login(this.state.values);
		this.setState({status:{...this.state.status,waitingSubmit:false,disabledButton:false}});
		renewTimeout = setTimeout(()=>this.props.renewToken(base64Encode(this.props.stateAccount.email+','+this.props.stateAccount.refresh_token),true),25*60*1000);
	}

	render(){
		let _status = this.props.stateStatus.status;
		let _err = _status?.msg?.errors??[];
		let _keyUsername = _.findIndex(_err,{'key':'username'});
		let _keyPass = _.findIndex(_err,{'key':'password'});
		const particlesInit = async (main) => {
	    	//console.log(main);
	    	await loadFull(main);
		};

		const particlesLoaded = (container) => {
		    console.log(container);
		};

		return(
			<React.Fragment>
				< Particles
					id = "tsparticles"
					init = {particlesInit}
					loaded = {particlesLoaded}
					options = {{
						fpsLimit: 120,
						interactivity: {
							events: {
								onClick: {
									enable: true,
									mode: "push",
								},
								onHover: {
									enable: true,
									mode: "repulse",
								},
								resize: true,
							},
							modes: {
								push: {
									quantity: 4,
								},
								repulse: {
									distance: 200,
									duration: 0.4,
								},
							},
						},
						particles: {
							color: {
								value: "#d3dde9",
							},
							links: {
								color: "#d3dde9",
								distance: 150,
								enable: true,
								opacity: 0.5,
								width: 1,
							},
							collisions: {
								enable: true,
							},
							move: {
								direction: "none",
								enable: true,
								outModes: {
									default: "bounce",
								},
								random: false,
								speed: 2,
								straight: false,
							},
							number: {
								density: {
									enable: true,
									area: 800,
								},
								value: 50,
							},
							opacity: {
								value: 0.5,
							},
							shape: {
								type: "circle",
							},
							size: {
								value: {
									min: 1,
									max: 5
								},
							},
						},
						detectRetina: true,
					}}
				/>
				<div id="pageLogin" className="d-flex justify-content-center align-items-center flex-root">
						<div className="loginForm">
							<div id="loginFormSignIn" className={"animate__animated animate__faster " + ((this.state.status.showLoginForm == 'signIn')?' animate__zoomIn show':'')}>
								<div className="d-flex justify-content-center pageLoginLogo">
									<img src="images/logo1.png" alt="logo" />
								</div>

								<div className="box">
									<div className="LoginHead">
										<h3>Login</h3>
										<p>Login with your email and password</p>
									</div>

									<form noValidate autoComplete="off" onSubmit={this.handleLogin}>
										<div className="formGroup">
											<TextField className="filled-borderRadius errors" type="text" name="email" label="Email" variant="outlined" helperText={_err[_keyUsername]?.msg??''} onChange={this.handleValues} value={this.state.values.email||''} />
										</div>

										<div className="formGroup mb-0">
											<TextField className={"filled-borderRadius"+(_keyPass>=0?' errors':'')} type={this.state.status.showPassword['password']?'text':'password'} name="password" label="Password" variant="outlined" helperText={_err[_keyPass]?.msg??''} onChange={this.handleValues} value={this.state.values.password||''} />

											<IconButton aria-label="eye" component="span" onClick={()=>this.handleTogglePassword('password')}>
												{this.state.status.showPassword['password']?(
														<i className="fal fa-eye"></i>
													):(
														<i className="fal fa-eye-slash"></i>
													)
												
												}
											</IconButton>
										</div>

										<div className="d-flex align-items-center justify-content-between mt-10">
											<FormControlLabel
										        control={<Checkbox checked={this.state.values.remember||false} 
										        onChange={this.handleValues} 
										        name="remember" 
										        icon={<span className="cbx" />} 
										        checkedIcon={<span className="cbx cbx-gradiant" />} />}
										        label="Remember me"
										    />
										</div>

										{_status.isFailure==true&&
										<p className="textError show text-center">{_status.msg.text}</p>
										}

										<div className="d-flex flex-wrap flex-center mt-10">
											<Button color="inherit" className="btn btn-gradiant w-100" variant="contained" type="submit" disabled={this.state.status.disabledButton} >Continue {this.state.status.waitingSubmit&&<Spinkit name="sk-fading-circle" color="white" />}</Button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				<style jsx global>{loginStyles}</style>
			</React.Fragment>
		)
	}
}

const mapStateToProps=state=>{

	return {
		stateStatus:state.status,
		stateAccount:state.account
	}
}

const mapDispatchToProps=dispatch=>{

	return{
		login:params=>{dispatch(login(params))}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);