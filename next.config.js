"use strict";

/* Package System */
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const path = require('path');
const environment = {
	BASE_URL:process.env.BASE_URL,
	CDN_URL:process.env.CDN_URL,
	API_URL:process.env.API_URL
};

/* Package Application */
require('dotenv').config({path:path.join(__dirname,'.env'+((process.env.NODE_ENV==='production'||process.env.NODE_ENV==='staging')?'.'+process.env.NODE_ENV:'.development'))});
module.exports = {
	images: {
		domains: ['cdn.mcvnetworks.us'],
	},
	distDir:'_next',
	poweredByHeader:false,
	env:{...environment},
	eslint:{ignoreDuringBuilds:true},
	sassOptions:{includePaths:[path.join(__dirname,'node_modules'),path.join(__dirname,'public/scss')]},
	webpack:(config,{ defaultLoaders })=>{

		config.resolve.alias['@public'] = path.join(__dirname,'public');
		config.resolve.alias['@assets'] = path.join(__dirname,'src/assets');
		config.resolve.alias['@config'] = path.join(__dirname,'src/config');
		config.resolve.alias['@features'] = path.join(__dirname,'src/features');
		config.resolve.alias['@libs'] = path.join(__dirname,'src/libs');
		config.resolve.alias['@modules'] = path.join(__dirname,'src/modules');
		config.resolve.alias['@views'] = path.join(__dirname,'src/views');
		config.resolve.alias['@utils'] = path.join(__dirname,'src/utils');
		config.resolve.alias['@language'] = path.join(__dirname,'src/language');

		config.module.rules.push({
			test: /\.(s[ac]ss|css)$/,
			use: [
				defaultLoaders.babel,
				{
					loader: require('styled-jsx/webpack').loader,
					options: {
						type: 'global',
					},
				},
			],
		});

		return config;
	},
	async rewrites(){
		return [
			{
				source:'/',
				destination:'/homepage'
			},
			{
				source: '/vi/gioi-thieu',
				destination: '/vi/about',
				locale: false,
			},
			{
				source: '/vi/gioi-thieu',
				destination: '/vi/about',
				locale: false
			},
			{
				source: '/vi/dich-vu',
				destination: '/vi/marketing',
				locale: false
			},
			{
				source: '/vi/cong-nghe',
				destination: '/vi/tech',
				locale: false
			},
			{
				source: '/vi/chuong-trinh',
				destination: '/vi/show',
				locale: false
			},
		]
	},

	i18n:{
		locales: ['vi', 'jp', 'en'],
		defaultLocale: 'en',
		localeDetection: false,
	},
}