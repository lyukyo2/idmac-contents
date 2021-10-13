/* global: WoonderShopVars */
'use strict';

import $ from 'jquery';

/**
 * Makes the Woo cart widget content scrollable if the height of the dropdown exceeds the window height.
 * Mouseover is used as items can be added to the cart via ajax and we'll need to recheck.
 */
const initWooCartHeightFix = () => {
	if ( $( document.body ).hasClass( 'woocommerce-cart' ) || $( document.body ).hasClass( 'woocommerce-checkout' ) || window.innerWidth < 768 || ! $( '.shopping-cart' ) ) {
		return;
	}

	$( window ).on( 'load', function() {
		const $cart = $( '.shopping-cart' );

		$( $cart ).on( 'mouseover', function() {
			let windowHeight  = window.outerHeight,
				cartBottomPos = this.querySelector( '.widget_shopping_cart_content' ).getBoundingClientRect().bottom + this.offsetHeight,
				cartList      = this.querySelector( '.cart_list' );

			if ( cartBottomPos > windowHeight ) {
				cartList.style.maxHeight = '15em';
				cartList.style.overflowY = 'auto';
			}
		} );
	} );
};

/**
 * WooCommerce cart widget init
 */
const initWooCart = () => {

	// Updates, when adding products to the cart.
	$( document.body ).on( 'added_to_cart', function () {
		// Desktop cart widget open.
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(min-width: 992px)' ) ) {
			$( '.shopping-cart' ).each( function () {
				const $cart = $( this );
				const numberOfItems = parseInt( $cart.find( '.woondershop-cart-quantity' ).text().trim() );

				if ( numberOfItems ) {
					$cart.removeClass('shopping-cart--empty');
				}

				// Open the cart and display the message of the new product being added for 2 seconds.
				$cart
					.addClass( 'is-hover' )
					.find( '.shopping-cart__content .widget_shopping_cart_content' ).prepend( `<p class="woocommerce-mini-cart__new-item-message">${WoonderShopVars.texts.new_to_cart}</p>` );

				setTimeout( function() {
					$cart
						.removeClass( 'is-hover' )
						.find( '.shopping-cart__content .widget_shopping_cart_content .woocommerce-mini-cart__new-item-message' ).remove();
				}, 2000 );

			} );
		}

		// Mobile header cart open.
		if ( 'object' === typeof Modernizr && Modernizr.mq( '(max-width: 991px)' ) ) {
			$( '.js-header-cart-toggler' )
				.trigger( 'click' )
				.siblings( '.header__mobile-cart' )
					.find( '.widget_shopping_cart_content' )
					.prepend( `<p class="woocommerce-mini-cart__new-item-message">${WoonderShopVars.texts.new_to_cart}</p>` );

			setTimeout( function() {
				$( '.header__mobile-cart .widget_shopping_cart_content .woocommerce-mini-cart__new-item-message' ).remove();
			}, 2000 );
		}

		// Update the cart quantity class, depending on the number of products in cart.
		updateCartQuantityClass();
	} );

	// Updates, when removing products from the cart.
	$( document.body ).on( 'removed_from_cart', function () {
		$( '.shopping-cart' ).each(function () {
			const numberOfItems = parseInt( $( this ).find( '.woondershop-cart-quantity' ).text().trim() );

			if ( ! numberOfItems ) {
				$( this ).addClass( 'shopping-cart--empty' );
			}
		} );

		// Update the cart quantity class, depending on the number of products in cart.
		updateCartQuantityClass();
	} );

};

/**
 * Update the cart quantity class, depending on the number of products in cart.
 */
function updateCartQuantityClass() {
	$( '.woondershop-cart-quantity' ).each( function () {
		const $cartQuantity = $( this );
		const numberOfItems = parseInt( $cartQuantity.text().trim() );

		assignCorrectQuantityClass( numberOfItems, $cartQuantity );
	} );
}

/**
 * Assign the correct quantity class helper function.
 *
 * @param int    numberOfItems The number of the items (quantity).
 * @param object $item         The jQuery object of the quantity element.
 */
function assignCorrectQuantityClass( numberOfItems, $item ) {
	if ( 9 >= numberOfItems  ) {
		$item.removeClass( 'woondershop-cart-quantity--two-numbers woondershop-cart-quantity--two-numbers-plus' );
		$item.addClass( 'woondershop-cart-quantity--one-number' );
	}
	else if ( 9 < numberOfItems && 99 >= numberOfItems ) {
		$item.removeClass( 'woondershop-cart-quantity--one-number woondershop-cart-quantity--two-numbers-plus' );
		$item.addClass( 'woondershop-cart-quantity--two-numbers' );
	}
	else {
		$item.removeClass( 'woondershop-cart-quantity--one-number woondershop-cart-quantity--two-numbers' );
		$item.addClass( 'woondershop-cart-quantity--two-numbers-plus' );
		$item.text( '99+' );
	}
}

export { initWooCart, initWooCartHeightFix };
