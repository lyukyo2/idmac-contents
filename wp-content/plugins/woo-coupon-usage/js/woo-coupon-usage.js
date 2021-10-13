jQuery(document).ready(function() {
	jQuery('.coupon-box').hide();
	jQuery('#search-coupon').click(function(){
		jQuery('.coupon-box').hide();
		var txt = jQuery('#search-criteria').val();
		jQuery('.coupon-box table:contains("'+txt+'")').show().parent().show();
	});
    jQuery('#search-criteria').keyup(function(event) {
		jQuery('.coupon-box').hide();
		var txt = jQuery('#search-criteria').val();
		jQuery('.coupon-box table:contains("'+txt+'")').show().parent().show();
    });
	jQuery('#search-coupon-all').click(function(){
		jQuery('.coupon-box').toggle();
	});

	/*
	jQuery('.wcusage-show-last-all').show();
	jQuery('.wcusage-show-last-7').delay(1).fadeOut('fast');
	jQuery('.wcusage-show-last-30').delay(1).fadeOut('fast');
	jQuery('.wcusage-show-last-all-30').show();
	*/

	jQuery('#wcusage-last-days7').click(function(){
		jQuery('.wcusage-show-last-7').show();
		jQuery('#wcusage-last-days7').css("color", "#333");
		jQuery('.wcusage-show-last-30').hide();
		jQuery('#wcusage-last-days30').css("color", "#a6a6a6");
		jQuery('.wcusage-show-last-all').hide();
		jQuery('#wcusage-last-days-all').css("color", "#a6a6a6");
		jQuery('.wcusage-show-last-all-30').hide();
	});

	jQuery('#wcusage-last-days30').click(function(){
		jQuery('.wcusage-show-last-7').hide();
		jQuery('#wcusage-last-days7').css("color", "#a6a6a6");
		jQuery('.wcusage-show-last-30').show();
		jQuery('#wcusage-last-days30').css("color", "#333");
		jQuery('.wcusage-show-last-all').hide();
		jQuery('#wcusage-last-days-all').css("color", "#a6a6a6");
		jQuery('.wcusage-show-last-all-30').show();
	});

	jQuery('#wcusage-last-days-all').click(function(){
		jQuery('.wcusage-show-last-7').hide();
		jQuery('#wcusage-last-days7').css("color", "#a6a6a6");
		jQuery('.wcusage-show-last-30').hide();
		jQuery('#wcusage-last-days30').css("color", "#a6a6a6");
		jQuery('.wcusage-show-last-all').show();
		jQuery('#wcusage-last-days-all').css("color", "#333");
		jQuery('.wcusage-show-last-all-30').show();
	});

	if( jQuery( '.entry-content' ).width() < 850 ) {
		jQuery(".wcusage-info-box").css("padding", "25px 35px 25px 25px");
		jQuery('head').append('<style>.wcusage-info-box::before{display: none !important;}</style>');
	}

});
