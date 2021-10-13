'use strict';

import $ from 'jquery';
import _ from 'underscore';

/**
 * Scroll to the top of articles on successful
 * @return void
 */
const scrollToWpfSearchContainer = () => {
	setTimeout( () => {
		const $wpfSearchContainer = $( '.wpf-search-container' );

		if ( $wpfSearchContainer.length ) {
			const scrollAnchor = $wpfSearchContainer.offset().top - 50;

			if ( scrollAnchor < $( window ).scrollTop() ) {
				$( 'body, html' ).animate( {
					scrollTop: scrollAnchor,
				}, 700 );
			}
		}
	}, 25 );
};

/**
 * Initialize the shop filter changes.
 */
const initShopFilterChanges = () => {
	changePriceFilterInputType();
	trackPriceFilterInputChanges();
};

/**
 * Change type of the input for products price filter.
 */
function changePriceFilterInputType() {
	$( '.wpf_price_from, .wpf_price_to' )
		.attr( 'type', 'number' )
		.attr( 'pattern', '[0-9]*' );
}

/**
 * Catch products price filter input changes and change the slider accordingly.
 */
function trackPriceFilterInputChanges() {
	$( document ).on( 'input', '.wpf_price_from, .wpf_price_to', _.debounce( handlePriceFilterInputChange, 300 ) );

	// Delete the text, so a new number can be added.
	$( document ).on( 'click', '.wpf_price_from, .wpf_price_to', function() {
		$( this ).val( '' );
	} );
}

/**
 * The event handler function for price filter input change.
 */
function handlePriceFilterInputChange() {
	const $input = $( this ),
		$slider = $input.siblings( '.wpf_slider' );

	var from, to;

	if ( $input.attr( 'class' ).includes( 'from' ) ) {
		from = $input.val();
		to   = $input.siblings( '.wpf_price_to' ).val();
	}
	else {
		from = $input.siblings( '.wpf_price_from' ).val();
		to   = $input.val();
	}

	// Skip any changes, if one value is empty.
	if ( '' === from || '' === to ) {
		return;
	}

	// Filter the input for numbers only.
	from = parseInt( from, 10 );
	to   = parseInt( to, 10 );

	// Change the slider values and the tooltip texts.
	$slider.slider( 'values', [from, to] );
	$slider.find( '.wpf_tooltip_amount' ).first().text( from );
	$slider.find( '.wpf_tooltip_amount' ).last().text( to );
}

export { scrollToWpfSearchContainer, initShopFilterChanges };
