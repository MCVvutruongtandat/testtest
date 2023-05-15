"use strict";

/* Package System */
import App from 'next/app';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
const {fetchApi} = require('@utils/Helper');

/* Package Application */
import store from '@libs/Store';
import Meta from '@config/Meta';
import Layout from '@views/Layout';

class CoreApp extends App{

	constructor(props){
		super(props);
	}

	static async getInitialProps(ctx){
		let _lang = {};
		let data = {};
		let _data = '';
		//console.log(ctx.res)
		if(ctx.router.locale === 'en')
		{
			console.log(`${process.env.API_URL}/v1/contentstatics/lang/general`)
			_data = await fetchApi(`${process.env.API_URL}/v1/contentstatics/lang/general`).catch(e=>{return {default:{}}});		
		}else{
			_data = await fetchApi(`${process.env.API_URL}/v1/contenttranslations/lang/${ctx.router.locale}/general`).catch(e=>{return {default:{}}});	
		}
		_data.data !== null ? data = JSON.parse(_data.data.content): data = JSON.parse("{}");

		return {
			lang: data
		}
	}

	render(){
		const {Component,pageProps,router,lang} = this.props;

		return(
			<Provider store={store}>
				<Layout meta={Meta} router={router} lang={lang}>
					<Component store={store} router={router} lang={lang} {...pageProps} />
				</Layout>
			</Provider>
		)
	}
}

export default withRouter(CoreApp);