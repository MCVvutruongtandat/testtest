"use strict";

/* Package System */
import React from "react";
import Dynamic from 'next/dynamic';

/* Application */
const Helper = require('@utils/Helper');
const {fetchApi} = require('@utils/Helper');

export async function getServerSideProps(ctx) {
	let _params = {};
	// let _lang = {};
	let data = {};
	let _route = ctx.params?.pages[0]??'';
	let _slug = ctx.params?.pages[1]??'';
	let _id = ctx.params?.pages[2]??'';
	let _data = '';
	if(ctx.locale === 'en')
	{
		_data = await fetchApi(`${process.env.API_URL}/v1/contentstatics/lang/${_route}`).catch(e=>{return {default:{}}});		
	}else{
		_data = await fetchApi(`${process.env.API_URL}/v1/contenttranslations/lang/${ctx.locale}/${_route}`).catch(e=>{return {default:{}}});	
	}
	_data.data !== null ? data = JSON.parse(_data.data.content): data = JSON.parse("{}");
	// _lang = await import('@language/'+ctx.locale+'/'+_route+'.js').catch(e=>{return {default:{}}});

	_params = {
		route: _route,
		slug: _slug,
		id: _id,
		lang: data,
	}

	return { props: { ..._params } }
}

export default class extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { route, slug } = this.props;
		let _folder = Helper.capitalize(route.replace(/ies$/is,'y').replace(/s$/is,''));
		let _component = slug?'Detail':'Index';
		let PageComponent = Dynamic(()=>import(/*webpackChunkName:"[request]"*/'@modules/'+_folder+'/'+_component).catch(err=>{
			if(err.code=='MODULE_NOT_FOUND'){
				return Dynamic(()=>import(/*webpackChunkName:"page404"*/'@views/Components/Page404'));
			}
		}));

		return <PageComponent {...this.props} />;
	}
}