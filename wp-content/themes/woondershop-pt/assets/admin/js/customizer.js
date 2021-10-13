( function ( $ ) {

	/**
	 * Hook into the ws_skin control/setting change event and change all customizer controls to their default values.
	 */
	wp.customize( 'ws_skin', function( setting ) {
		setting.bind( function( selectedSkin ) {
			if ( _.isEmpty( selectedSkin ) ) {
				return false;
			}

			var result = confirm( WoonderShopCustomizerVars.texts.skin_color_change + '\n\n' + WoonderShopCustomizerVars.texts.skin_color_change_note );

			if ( ! result ) {
				return false;
			}

			$.each( WoonderShopCustomizerVars.registered_settings, function( setting, data ) {
				var value = null;

				if ( 'undefined' !== typeof data.default && 'undefined' !== typeof data.default[ selectedSkin ] ) {
					value = data.default[ selectedSkin ];
				} else if ( 'undefined' !== typeof data.default ) {
					value = data.default;
				}

				if ( _.isEmpty( value ) ) {
					return true; // Continue.
				}

				// Set the default color value of the color picker control.
				if ( 'undefined' !== typeof wp.customize.control( setting ) && 'undefined' !== typeof wp.customize.control( setting ).container ) {
					wp.customize.control( setting ).container.find( '.color-picker-hex' ).wpColorPicker( { defaultColor: value } );
				}

				// Set the value of the customizer setting.
				wp.customize( setting ).set( value );
			} );
		} );
	} );

} )( jQuery );
