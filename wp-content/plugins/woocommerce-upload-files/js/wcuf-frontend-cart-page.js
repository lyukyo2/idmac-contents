"use strict";
jQuery(document).ready(function()
{
	
	jQuery(document.body).on('wc_fragment_refresh updated_wc_div', wcuf_manage_upload_area_visibility);
});
function wcuf_manage_upload_area_visibility()
{
	wcuf_show_upload_field_area();
}