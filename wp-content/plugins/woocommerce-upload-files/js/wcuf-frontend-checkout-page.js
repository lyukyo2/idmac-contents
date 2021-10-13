"use strict";
var wcuf_current_payment_method = 'none';
var wcuf_current_shipping_method = 'none';
jQuery(document).ready(function()
{
	if(wcuf_options.exists_at_least_one_upload_field_bounded_to_gateway == 'true')
	{
		jQuery('li.wc_payment_method input.input-radio').on('click', wcuf_on_user_selection);
		jQuery("li.wc_payment_method input.input-radio").each(function(index, elem)
		{
			if(jQuery(elem).prop('checked'))
				jQuery(elem).trigger('click');
		});  
		//to workaround the non "live" jquery method that seems to not working
		jQuery( document.body ).on( 'updated_checkout', function()
		{
			wcuf_show_upload_field_area();
			jQuery('li.wc_payment_method input.input-radio').on('click', wcuf_on_user_selection);
		} );
	}
	if(wcuf_options.exists_at_least_one_upload_field_bounded_to_shipping_method == 'true')
	{
		jQuery('ul#shipping_method li input.shipping_method').on('click', wcuf_on_user_selection);
		jQuery("ul#shipping_method li input.shipping_method").each(function(index, elem)
		{
			if(jQuery(elem).prop('checked'))
				jQuery(elem).trigger('click');
		});  
		//to workaround the non "live" jquery method that seems to not working
		jQuery( document.body ).on( 'updated_checkout', function()
		{
			wcuf_show_upload_field_area();
			jQuery('ul#shipping_method li input.shipping_method').on('click', wcuf_on_user_selection);
		} );
	}
	
	//this is used for upload fields showed inside the div containing the product table. That div is dynamically updated and it could happen that the upload area 
	//is reloaded remaining with 0 opacity
	jQuery( document.body ).on( 'updated_checkout', function()
	{
		wcuf_show_upload_field_area();
	} );
	
	jQuery('.woocommerce-shipping-fields__field-wrapper').css('display', 'block');
	jQuery('.woocommerce-shipping-fields__field-wrapper').animate({opacity: 1}, 0);
});
function wcuf_on_user_selection(event)
{
	var random = Math.floor((Math.random() * 1000000) + 999);
	wcuf_current_payment_method = "none";
	wcuf_current_shipping_method = "none";
	jQuery("ul#shipping_method li input.shipping_method").each(function(index, elem)
		{
			wcuf_current_shipping_method = jQuery(elem).prop('checked') ? jQuery(elem).val() : wcuf_current_shipping_method;
		});
	jQuery("li.wc_payment_method input.input-radio").each(function(index, elem)
		{
			wcuf_current_payment_method = jQuery(elem).prop('checked') ? jQuery(elem).val() : wcuf_current_payment_method;
		});  	
	var formData = new FormData();
	
	formData.append('action', 'reload_upload_fields_on_checkout');
	formData.append('payment_method', wcuf_current_payment_method);
	formData.append('shipping_method', wcuf_current_shipping_method);
	formData.append('wcuf_wpml_language', wcuf_wpml_language);
	
	//UI
	jQuery('#wcuf_'+wcuf_current_page+'_ajax_container').animate({ opacity: 0 }, 500, function()
	{
		//UI
		jQuery('#wcuf_'+wcuf_current_page+'_ajax_container_loading_container').html("<h4>"+wcuf_ajax_reloading_fields_text+"</h4>");
		
		jQuery.ajax({
			url: wcuf_ajaxurl+"?nocache="+random,
			type: 'POST',
			data: formData,
			async: false,
			dataType : "html",
			contentType: "application/json; charset=utf-8",
			success: function (data) 
			{
				//UI
				jQuery('#wcuf_'+wcuf_current_page+'_ajax_container_loading_container').html("");  
				jQuery('#wcuf_'+wcuf_current_page+'_ajax_container').html(data);
				jQuery('#wcuf_'+wcuf_current_page+'_ajax_container').animate({ opacity: 1 }, 500);	
									
			},
			error: function (data) 
			{
			},
			cache: false,
			contentType: false,
			processData: false
		});
	});
			
}
