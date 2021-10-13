'use strict';

import $ from 'jquery';

/**
 * Reposition the product filter result page header/title area elements.
 */
export default function changeProductFilterResultPageHeaderElementsPosition () {
	const $wpfSearchContainer = $( '.wpf-search-container' );

	$wpfSearchContainer.find( 'h1.page-title' )
		.addClass( 'woocommerce-products-header__title' )
		.wrap( '<div class="woocommerce-page-title-area"><div class="woocommerce-page-title-and-count"><header class="woocommerce-products-header"></header></div></div>' );

	$wpfSearchContainer.find( '.woocommerce-products-header' )
		.after( $wpfSearchContainer.find( '.woocommerce-result-count' ) );

	$wpfSearchContainer.find( '.woocommerce-page-title-and-count' )
		.after( $wpfSearchContainer.find( '.woocommerce-ordering' ) );
};
