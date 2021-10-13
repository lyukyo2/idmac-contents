'use strict';

import $ from 'jquery';
import 'jquery.easing';
import _ from 'underscore';
import 'bootstrap/js/src/carousel';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/modal';
import 'slick-carousel';
import { initTouchDropdown } from './touch-dropdown';
import { initWooCart, initWooCartHeightFix } from './woo-cart-widget';
import { enablingActiveStateSupportOnIos } from './utils';
import ThemeSlider from './theme-slider/theme-slider';
import VimeoEvents from './theme-slider/vimeo-events';
import YoutubeEvents from './theme-slider/youtube-events';
import InstagramWidget from './instagram-widget';
import { countdownWidgetsInit } from './countdown-widget';
import { scrollToWpfSearchContainer, initShopFilterChanges } from './shop-product-filters';
import { initUrgencyCounters } from './urgency-countdown';
import { initTimeLeft } from './time-left';
import './woocommerce';
import './desktop-sticky-header';

$( () => {
	// Enable iOS touch events
	enablingActiveStateSupportOnIos();


	// Footer widgets fix
	$( '.col-lg-__col-num__' )
		.removeClass( 'col-lg-__col-num__' )
		.addClass( 'col-lg-3' );


	// Animate the scroll, when back to top is clicked
	$( '.js-back-to-top' ).click( ( ev ) => {
		ev.preventDefault();

		$( 'body, html' ).animate( {
			scrollTop: 0
		}, 700 );
	} );


	/**
	 * Slick Carousel - Theme Slider
	 */
	let $sliderEl = $( '.js-pt-slick-carousel-initialize-slides' );
	if ( $sliderEl.length ) {
		const themeSliderInstance = new ThemeSlider( $sliderEl );
		new VimeoEvents( themeSliderInstance );

		// Load the YT events only, if there are items on the page that need it.
		// (theme slider with YT video or person profile with YT video).
		if ( $( '.js-carousel-item-yt-video-link' ).length || $( '.js-carousel-item-yt-video' ).length ) {
			new YoutubeEvents( themeSliderInstance );
		}
	}

	/**
	 * Slick carousel for the Testimonials widget (from the PW composer package).
	 */
	$( '.js-testimonials-initialize-carousel' ).slick();

	/**
	 * Touch Dropdown init.
	 */
	initTouchDropdown();


	/**
	 * WooCommerce custom cart widget.
	 */
	initWooCart();
	initWooCartHeightFix();


	/**
	 * Scroll to the top of product on successful Product Filters ajax request
	 */
	$( window ).on( 'wpf_ajax_success', scrollToWpfSearchContainer );

	/**
	 * Display and hide the toggle-able objects:
	 * - navigation
	 * - search
	 * - cart
	 * - filter
	 * - sort
	 */
	const togglerObjects = [
		{
			open: '.js-header-navbar-toggler',
			close: '.js-main-navigation-close, .woondershop-overlay',
			class: 'navigation'
		},
		{
			open: '.js-header-search-toggler',
			close: '.js-mobile-search-close, .woondershop-overlay',
			class: 'search'
		},
		{
			open: '.js-header-cart-toggler',
			close: '.js-mobile-cart-close, .woondershop-overlay',
			class: 'cart'
		},
		{
			open: '.js-mobile-filter-toggler',
			close: '.js-mobile-filter-close, .woondershop-overlay',
			class: 'filter'
		},
		{
			open: '.js-mobile-sort-toggler',
			close: '.js-mobile-sort-close, .woondershop-overlay',
			class: 'sort'
		},
	];

	$.each( togglerObjects, ( index, object ) => {
		// Reveal.
		$( document ).on( 'click', object.open, function() {
			$( document.body ).addClass( 'active-overlaid-element active-overlaid-element--' + object.class );
		});

		// Hide.
		$( document ).on( 'click', object.close, function() {
			$( document.body ).removeClass( 'active-overlaid-element active-overlaid-element--' + object.class );
		});
	} );

	// Desktop header widgets search focus in.
	$( document ).on( 'focusin', '.header__widgets .search-field', function() {
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			$( document.body ).addClass( 'active-overlaid-element active-overlaid-element--header-search' );
			$( this ).closest( '.widget_search, .widget_product_search, .ysm_search_widget' ).css( 'z-index', '950' );
		}
	} );

	// Desktop header widgets search focus out.
	$( document ).on( 'focusout', '.header__widgets .search-field', function() {
		if (
			'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) &&
			0 == $( this ).closest( '.search-form' ).find( '.smart-search-results' ).height()
		) {
			$( document.body ).removeClass( 'active-overlaid-element' );
			setTimeout( function() {
				$( document.body ).removeClass( 'active-overlaid-element--header-search' );
			}, 100 );
			$( this ).closest( '.widget_search, .widget_product_search, .ysm_search_widget' ).css( 'z-index', '' );
		}
	} );

	// Desktop main menu (featured-dropdown menu item and mega menu (Jungle skin) item) in "focus".
	$( document ).on( 'mouseenter', '.navigation-bar .featured-dropdown, body.woondershop-jungle .navigation-bar .smm-active', function() {
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			$( document.body ).addClass( 'active-overlaid-element' );
			$( this ).closest( '.navigation-bar' ).css( 'z-index', '950' );
		}
	} );

	// Desktop main menu (featured-dropdown menu item and mega menu (Jungle skin) item) out of "focus".
	$( document ).on( 'mouseleave', '.navigation-bar .featured-dropdown, body.woondershop-jungle .navigation-bar .smm-active', function() {
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			$(document.body).removeClass( 'active-overlaid-element' );
			$( this ).closest( '.navigation-bar' ).css( 'z-index', '' );
		}
	} );

	// Desktop header cart widget in "focus".
	$( document ).on( 'mouseenter', '.header__widgets .shopping-cart--enabled', function() {
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			$( document.body ).addClass( 'active-overlaid-element' );
			$( this ).css( 'z-index', '950' );
		}
	} );

	// Desktop header cart widget out of "focus".
	$( document ).on( 'mouseleave', '.header__widgets .shopping-cart', function() {
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			$(document.body).removeClass( 'active-overlaid-element' );
			$( this ).css( 'z-index', '' );
		}
	} );

	/**
	 * Instagram widget - initialize.
	 */
	$( '.js-pw-instagram' ).each( function () {
		new InstagramWidget( $( this ) );
	} );

	// Click on mobile search button automatically focus on search input.
	$( '.js-header-search-toggler' ).click( function() {
		$( '#woondershop-mobile-search input' )
			.focus()
			.trigger( 'touchstart' ); // fixes the bug where search results on mobile were hidden because of the logic in plugins/smart-woocommerce-search/assets/js/general.js - search there for "$(window).on( 'touchstart' , function(event) {" to see the problem
	} );

	/**
	 * Product Filter plugin.
	 */
	initShopFilterChanges();

	/**
	 * Countdown widgets - initialize.
	 */
	countdownWidgetsInit();

	/**
	 * Slick carousel for the Woonder Products widget.
	 */
	$( '.js-woonder-products-slick-carousel' ).slick();

	// Hide mobile filters button, if there is not "mobile-filters" class in the shop sidebar area.
	if ( 0 !== $( '.woocommerce-page .content-area .sidebar .mobile-filter' ).length ) {
		$( '.js-mobile-filter-toggler' ).show();
	}

	// Connect mobile sort links, to trigger woocommerce ordering/sorting functionality.
	$( document ).on( 'click', '.js-mobile-sort-item', function( event ) {
		event.preventDefault();

		const $sortItem = $( this );
		const sortID = $sortItem.data( 'sort' );

		// Trigger the change of the WooCommerce ordering/sorting functionality.
		$( '.wpf-search-container .woocommerce-ordering .orderby' ).val( sortID ).change();

		// Close the sort panel.
		$sortItem.closest( '.mobile-sort-and-filter' ).find( '.js-mobile-sort-close' ).on("click");

		// Assign active class.
		$sortItem.siblings( '.js-mobile-sort-item' ).removeClass( 'mobile-sort__item--active' );
		$sortItem.addClass( 'mobile-sort__item--active' );
	} );

	/**
	 * Initialize the urgency countdown shortcode.
	 */
	initUrgencyCounters();

	/**
	 * Initialize the time left shortcode.
	 */
	initTimeLeft();

	/**
	 * Remove the class 'woondershop-loading-site', when page is ready.
	 */
	$( function() {
		$( document.body ).removeClass( 'woondershop-loading-site' );
	} );

	// Add path markup in woonder icons (custom icons).
	$( 'i.ws, span.ws' ).each( ( i, el ) => {
		for ( let pathNumber = 1, $el = $( el ); pathNumber < 14; pathNumber++ ) {
			$el.append( '<span class="path' + pathNumber + '"></span>' );
		}
	} );

	// Mobile footer widgets "accordion".
	$( document ).on( 'click', '.footer-top__heading', function() {
		// Ignore non-mobile clicks.
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			return false;
		}

		$(this).toggleClass( 'is-open' );
	} );
} );
