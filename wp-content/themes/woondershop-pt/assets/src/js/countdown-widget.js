'use strict';

import $ from 'jquery';

const countdownWidgetsInit = () => {
	$( '.js-pt-countdown-widget' ).each( function() {
		const endDate     = $( this ).data( 'timestamp' ) * 1000;
		const	currentDate = Date.now();
		let diff          = ( endDate - currentDate ) / 1000;

		// If the date has already expired.
		if ( 0 > diff ) {
			diff = 0;
		}

		// Instantiate the countdown timer.
		const clock = $( this ).FlipClock( diff, {
			clockFace: 'DailyCounter',
			autoStart: true,
			countdown: true
		} );

		// Hide labels for this countdown widget.
		if ( $( this ).data( 'hide-labels' ) ) {
			$( this ).find( '.flip-clock-label' ).hide();
		}
	} );
};

export { countdownWidgetsInit };
