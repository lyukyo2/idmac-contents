'use strict';

import $ from 'jquery';
import _ from 'underscore';

export default class ClickableAttrSelector {
	constructor( $form ) {
		this.$form = $form;
		this.variationData = this.$form.data( 'product_variations' );

		if ( ! _( this.variationData ).isArray() ) {
			return;
		}

		this.selectedAttribute = _( this.variationData ).first().img_variation_attribute;

		if ( ! this.isSelectedAttributeOK() ) {
			return;
		}

		this.$selectElm = this.$form.find( `#${this.selectedAttribute}` );

		// event listeners
		this.$form.on( 'click', '.variations .js-variation-attr-img', _.bind( this.onChange, this ) );
		this.$form.on( 'woocommerce_update_variation_values', _.bind( this.render, this ) );

		// initial render
		this.render();
	}

	isSelectedAttributeOK() {
		return (
			this.selectedAttribute && // is not empty
			_( this.variationData ).first().attributes.hasOwnProperty( `attribute_${this.selectedAttribute}` ) // matches the key name in attributes
		);
	}

	onChange( ev ) {
		ev.preventDefault();

		this.$selectElm
			.val( $( ev.currentTarget ).data( 'option' ) )
			.trigger( 'change' ); // updates the other values
	}

	render() {
		const containerClass = 'variation-img-container',
			selectedVariation = this.$selectElm.val();

		// clean and hide <select>
		this.$form.find( `.${containerClass}` ).remove();
		this.$selectElm.addClass( 'sr-only' );

		// prepare data and construct html
		let html = _.chain( this.variationData )
			.filter( ( item, i, list ) => { // remove duplicates
				return _( _.first( list, i ) ).find( ( item2 ) => {
					return item.attributes[ `attribute_${this.selectedAttribute}` ] === item2.attributes[ `attribute_${this.selectedAttribute}` ];
				} ) === undefined;
			} )
			.reduce( ( memo, item ) => { // generate html
				return memo + this.getHtmlForVariation( item, selectedVariation === item.attributes[ `attribute_${this.selectedAttribute}` ] );
			}, `<div class="${containerClass}">` )
			.value();

		html += '</div>';

		// feed html to dom
		this.$selectElm.parent().append( html );
	}

	getHtmlForVariation( itemData, isSelected ) {
		return `<a href="#" class="js-variation-attr-img variation-img ${ isSelected ? 'variation-img--selected' : '' }" data-option="${itemData.attributes[ 'attribute_' + this.selectedAttribute ]}"><img src="${itemData.image.thumb_src}" width="${itemData.image.thumb_src_w}" height="${itemData.image.thumb_src_h}" alt="${itemData.image.alt}" sizes="45px"></a>`;
	}
}
