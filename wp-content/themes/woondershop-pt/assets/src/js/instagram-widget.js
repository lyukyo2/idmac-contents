/* global WoonderShopVars */
'use strict';

import $ from 'jquery';
import _ from 'underscore';


const template = {
	item: _.template(
		`<a class="pw-instagram__item" href="<%- link %>" target="_blank">
			<img class="pw-instagram__photo" src="<%- image %>" alt="<%- title %>" width="100" height="100" loading="lazy">
		</a>`
	),
	cta: _.template(
		`<a class="pw-instagram__item  pw-instagram__item--cta  js-pw-instagram-cta" href="<%- link %>" target="_blank">
			<div class="pw-instagram__inner-spacer">
				<h4 class="pw-instagram__title"><%= title %></h4>
				<p class="pw-instagram__text"><%= text %></p>
			</div>
			<i class="fab  <%- icon %>  fa-2x  pw-instagram__icon"></i>
		</a>`
	),
	error: _.template(
		`<p class="pw-instagram__error  text-danger">
			<%= errorCode %> - <%= errorMessage %>
		</p>`
	),
};

export default class {
	constructor( $widget ) {
		this.$widget = $widget;

		this.accessToken = this.$widget.data( 'access-token' );
		this.hasCta = this.$widget.data( 'has-cta' );
		this.numImages = this.$widget.data( 'num-images' ); // CTA counts as 1 image as well

		if ( this.hasCta ) {
			this.cta = this.$widget.data( 'cta' );
		}

		this.getDataFromInstagramAPI();
	}

	/**
	 * Make a GET request to the Instagram API for the latest images.
	 */
	getDataFromInstagramAPI() {
		$.ajax( {
			method: "GET",
			url: WoonderShopVars.ajax_url,
			data: {
				'action': 'pt_woondershop_get_instagram_data',
				'security': WoonderShopVars.ajax_nonce,
			},
			context: this,
			beforeSend: () => {
				this.$widget.append( '<p class="pw-instagram__loader  text-center  w-100"><i class="fas fa-circle-notch fa-spin fa-3x"></i><span class="screen-reader-text">Loading...</span></p>' );
			},
			complete: () => {
				this.$widget.find( '.pw-instagram__loader' ).remove();
			}
		} )
			.done( function( response ) {
				this.responseHandler( JSON.parse( response ) );
			} );

		return this;
	}

	/**
	 * Display images or an error.
	 */
	responseHandler( response ) {
		if ( response.data ) { // Check if the response from instagram API is ok, otherwise display an error.
			this.numImages = Math.min( this.numImages, response.data.length );

			if ( this.numImages < 1 ) { // Display error message if there are no images
				this.displayError( {
					errorCode: 'ERR0',
					errorMessage: 'No Instagram images to be displayed. Please ensure that you have at least one image on your Instagram account or get in touch with <a href="https://www.proteusthemes.com/help/">ProteusThemes support</a>.',
				} );

				return;
			}

			this
				.prepareArrayForRendering( response.data, this.hasCta )
				.forEach( item => this.appendHtmlToWidget( item ) );
		} else if ( response.error ) { // Display the error from API.
			this.displayError( {
				errorCode: response.error.code,
				errorMessage: response.error.message
			} );
		} else { // Display unknown error.
			this.displayError( {
				errorCode: 'ERR9',
				errorMessage: 'Unknown error. Get in touch with ProteusThemes support.'
			} );
		}
	}

	/**
	 * Function which takes an object which is fed to the underscores template and gets rendered to the DOM
	 * @param  {Object} item A single item to be rendered (key item.templateType is required)
	 * @return {void}      [description]
	 */
	appendHtmlToWidget( item = {} ) {
		if ( ! item.hasOwnProperty( 'templateType' ) ) {
			console.warn( 'item.templateType is a required property!' );
			return;
		}

		const templateData = Object.assign( {
			imgWidthInVw: (100 / this.numImages), // needed in multiple templates
		}, item );

		this.$widget.append( template[ item.templateType ]( templateData ) );
	}

	/**
	 * Render and display the error in the widget area on frontend
	 * @param  {Object} templateData data to pass to the template
	 * @return {void}
	 */
	displayError( templateData = {} ) {
		this.appendHtmlToWidget( Object.assign( {
			templateType: 'error',
		}, templateData ) );
	}

	/**
	 * Accepts data from Instagram and prepares the array of items to be
	 * passed into the underscore templates.
	 * @param  {Object}  instagramData All data from instagram
	 * @param  {Boolean} includeCta    Include or not CTA in the array for rendering
	 * @return {Array}
	 */
	prepareArrayForRendering( instagramData, includeCta = false ) {
		const arrayForRendering = this.parseInstagramData( instagramData );

		if ( includeCta ) {
			arrayForRendering.splice( this.getCtaPosition(), 0, this.getCtaTemplateObject() );
			arrayForRendering.pop(); // one element has been added, so remove the last one to keep the number of items the same
		}

		return arrayForRendering;
	}

	/**
	 * Parse data fetched from the Instagram
	 * @param  {Array}  instagramData
	 * @return {Array}
	 */
	parseInstagramData( instagramData = [] ) {
		return _.chain( instagramData )
			.first( this.numImages )
			.map( instaImageObj => {
				const src = instaImageObj.thumbnail_url ? instaImageObj.thumbnail_url : instaImageObj.media_url;

				return {
					templateType: 'item',
					link: instaImageObj.permalink,
					image: src,
					title: this.getCaption( instaImageObj.caption ),
				}
			}, this )
			.value();
	}

	/**
	 * Get the CTA object to be passed to the underscores template
	 * @return {Object}
	 */
	getCtaTemplateObject( imageObj, ctaObj = this.cta ) {
		return Object.assign( {}, ctaObj, {
			templateType: 'cta',
		} );
	}

	/**
	 * Get caption.
	 */
	getCaption( caption ) {
		return caption ? caption : 'Instagram image';
	}

	/**
	 * Get CTA position.
	 */
	getCtaPosition( num = this.numImages ) {
		return ( 1 === num ) ? 0 : Math.ceil( num / 2 );
	}
};
