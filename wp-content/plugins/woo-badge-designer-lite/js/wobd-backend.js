jQuery(document).ready(function($) {

    /*
     * Badges Settings Tab
     */
    $('.wobd-settings-tigger').click(function() {
        $('.wobd-settings-tigger').removeClass('wobd-settings-active');
        $(this).addClass('wobd-settings-active');
        var active_setting_key = $('.wobd-settings-tigger.wobd-settings-active').data('menu');
        $('.wobd-badge-tab-setting-wrap').removeClass('wobd-active-badge-setting');
        $('.wobd-badge-tab-setting-wrap[data-menu-ref="' + active_setting_key + '"]').addClass('wobd-active-badge-setting');
    });

    /*
     * Show Hide Badge Type
     */

    $('.wobd-badge-type').click(function() {
        var badge_type = $(this).val();
        if (badge_type === 'text') {
            $('.wobd-badge-text-settings-wrap').show();
            $('.wobd-badge-icon-settings-wrap').hide();
            wobd_disable_second_text();
        } else if (badge_type === 'icon') {
            $('.wobd-badge-text-settings-wrap').hide();
            $('.wobd-badge-icon-settings-wrap').show();
            $('.wobd-badge-second-text-wrap').hide();
        } else {
            $('.wobd-badge-text-settings-wrap').show();
            $('.wobd-badge-icon-settings-wrap').show();
            $('.wobd-badge-second-text-wrap').hide();
        }

    });
    $('body').on("change", ".wobd-background-type", function() {
        var type = $('.wobd-badge-type:checked').val();
        var background_type = $(this).val();
        if (background_type === 'image-background') {
            $('.wobd-badge-image-settings-wrap').show();
            $('.wobd-text-background-wrap').hide();
            var bg_class = 'wobd-image-bg-wrap ';
            if ($('.wobd-badges').hasClass('wobd-text-bg-wrap')) {
                $('.wobd-badges').removeClass('wobd-text-bg-wrap');
                $('.wobd-badges').addClass(bg_class);
            }
            var template = $('.wobd-existing-image:checked').val();
            for (i = 1; i <= 5; i++) {
                if ($('.wobd-badges').hasClass('wobd-text-template-' + i + '')) {
                    $('.wobd-badges').removeClass('wobd-text-template-' + i + '');
                    $('.wobd-badges').addClass('wobd-image-' + template + '');
                }
            }
            var check_value = $('.wobd-existing-image:checked').val();
            var image_src = $('.wobd-existing-image:checked').next('.wobd-existing-images-demo').html();
            $('#wobd-badge').html('');
            var text = $('.wobd-badge-text').val();
            $('#wobd-badge').prepend('<div class="wobd-image-ribbon">' + image_src + '</div><div class="wobd-inner-text-container">' + text + '</div>');
            wobd_img_badge_type(type);
            wobd_disable_second_text();
        } else {
            $('.wobd-badge-image-settings-wrap').hide();
            $('.wobd-text-background-wrap').show();
            var bg_class = 'wobd-text-bg-wrap ';
            $('.wobd-image-ribbon').remove();
            $('.wobd-inner-text-container').remove();
            if ($('.wobd-badges').hasClass('wobd-image-bg-wrap')) {
                $('.wobd-badges').removeClass('wobd-image-bg-wrap');
                $('.wobd-badges').addClass(bg_class);
            }
            var template = $('.wobd-text-design:checked').val();
            for (i = 1; i <= 5; i++) {
                if ($('.wobd-badges').hasClass('wobd-image-' + i + '')) {
                    $('.wobd-badges').removeClass('wobd-image-' + i + '');
                    $('.wobd-badges').addClass('wobd-text-' + template + '');
                }
            }
            wobd_txt_bg_badge_type(type);
            wobd_disable_second_text();
        }
    });

    /*
     * Template Preview
     */
    $('.wobd-badge-template').on('change', function() {
        var template_value = $(this).val();
        var array_break = template_value.split('-');
        var current_id = array_break[1];
        $('.wobd-badge-common').hide();
        $('#wobd-badge-demo-' + current_id).show();
    });
    if ($(".wobd-badge-template option:selected").length > 0) {
        var grid_view = $(".wobd-badge-template option:selected").val();
        var array_break = grid_view.split('-');
        var current_id1 = array_break[1];
        $('.wobd-badge-common').hide();
        $('#wobd-badge-demo-' + current_id1).show();
    }

    $('.wobd-bg-color').wpColorPicker();
    $('.wobd-coner-color').wpColorPicker();
    $('.wobd-text-color').wpColorPicker();
    $('.wobd-display-custom').click(function() {
        var text_template = $('.wobd-text-design:checked').val();
        if ($(this).is(':checked'))
        {
            $(this).val('1');
            $('.wobd-custom-design-container').show();
        } else
        {
            $('.wobd-custom-design-container').hide();
            $(this).val('0');
        }
    });

    $('.wobd-display-badges-single').click(function() {
        if ($(this).is(':checked'))
        {
            $(this).val('1');
        } else
        {
            $(this).val('0');
        }
    });

    /*
     * Preview Panel
     */

    /*
     * Change the position of badge text in preview
     */

    $('.wobd-badge-position').on("change", function() {
        var position = $(this).val();
        var position_class = 'wobd-position-' + position;
        if ($('.wobd-badges').hasClass('wobd-position-left_center')) {
            $('.wobd-badges').removeClass('wobd-position-left_center');
            $('.wobd-badges').addClass(position_class);
        }
        if ($('.wobd-badges').hasClass('wobd-position-left_top')) {
            $('.wobd-badges').removeClass('wobd-position-left_top');
            $('.wobd-badges').addClass(position_class);
        }
        if ($('.wobd-badges').hasClass('wobd-position-left_bottom')) {
            $('.wobd-badges').removeClass('wobd-position-left_bottom');
            $('.wobd-badges').addClass(position_class);
        }
        if ($('.wobd-badges').hasClass('wobd-position-right_center')) {
            $('.wobd-badges').removeClass('wobd-position-right_center');
            $('.wobd-badges').addClass(position_class);
        }
        if ($('.wobd-badges').hasClass('wobd-position-right_top')) {
            $('.wobd-badges').removeClass('wobd-position-right_top');
            $('.wobd-badges').addClass(position_class);
        }
        if ($('.wobd-badges').hasClass('wobd-position-right_bottom')) {
            $('.wobd-badges').removeClass('wobd-position-right_bottom');
            $('.wobd-badges').addClass(position_class);
        }
    });
    $('body').on("change", ".wobd-text-design", function() {
        var template = $(this).val();
        var type = $('.wobd-badge-type:checked').val();
        for (i = 1; i <= 5; i++) {
            if ($('.wobd-badges').hasClass('wobd-text-template-' + i + '')) {
                $('.wobd-badges').removeClass('wobd-text-template-' + i + '');
                $('.wobd-badges').addClass('wobd-text-' + template + '');
            } else {
                $('.wobd-badges').addClass('wobd-text-' + template + '');
            }

            $('.wobd-badges').html('<div class="wobd-text " id="wobd-badge"><div class="wobd-second-text"></div></div>');
            wobd_txt_bg_badge_type(type);
            wobd_disable_second_text();
        }
        $('select option[value="left_center"]').attr("disabled", false);
        $('select option[value="right_center"]').attr("disabled", false);
    });
    $('body').on("change", ".wobd-existing-image", function() {
        var template = $(this).val();
        for (i = 1; i <= 5; i++) {
            if ($('.wobd-badges').hasClass('wobd-image-' + i + '')) {
                $('.wobd-badges').removeClass('wobd-image-' + i + '');
                $('.wobd-badges').addClass('wobd-image-' + template + '');
            }
        }
        wobd_disable_second_text();
    });
    /*
     * icon picker
     */
    $('.icon-picker-input').iconPicker();
    /*
     * Badge type preview mechanism
     */
    function wobd_txt_bg_badge_type(type) {
        var template = $('.wobd-text-design:checked').val();
        var wobd_class = 'div';
        if (type === 'text')
        {
            $('.wobd-text-bg-wrap').find(wobd_class).addClass('wobd-text');
            $('.wobd-text-bg-wrap').find(wobd_class).removeClass('wobd-icon');
            var text = $(".wobd-badge-text").val();
            var second_text = $('.wobd-second-badge-text').val();
            $(".wobd-text i").remove();
            var template = $('.wobd-text-design:checked').val();
            $('.wobd-text').html(text + '<div class="wobd-second-text">' + second_text + '</div>');
        } else if (type === 'icon') {
            $('.wobd-text-bg-wrap').find('.wobd-text').addClass('wobd-icon');
            var font = $('.icon-picker-input').val().split('|');
            var icon = font[ 0 ] + ' ' + font[ 1 ];
            $(".wobd-text").html('<i class="' + icon + '" aria-hidden="true"></i>');
        } else {
            $('.wobd-text-bg-wrap').find('.wobd-text').addClass('wobd-icon');
            var text = $(".wobd-badge-text").val();
            var font = $('.icon-picker-input').val().split('|');
            var icon = font[ 0 ] + ' ' + font[ 1 ];
            $(".wobd-text").html('<i class="' + icon + '" aria-hidden="true"></i>' + text);
        }
    }
    function wobd_img_badge_type(type) {
        if (type === 'text')
        {
            $('.wobd-icon').attr('class', 'wobd-text');
            var text = $(".wobd-badge-text").val();
            var second_text = $('.wobd-second-badge-text').val();
            $('.wobd-inner-text-container').remove();
            var image_template = $('.wobd-existing-image:checked').val();

            $('<div class="wobd-inner-text-container"><div class="wobd-first-text">' + text + '</div><div class="wobd-second-text">' + second_text + '</div></div>').insertAfter('.wobd-image-ribbon');
        } else if (type === 'icon') {
            $('.wobd-text').attr('class', 'wobd-text wobd-icon');
            var font = $('.icon-picker-input').val().split('|');
            var icon = font[ 0 ] + ' ' + font[ 1 ];
            $('.wobd-inner-text-container').remove();
            $('<div class="wobd-inner-text-container"><i class="' + icon + '" aria-hidden="true"></i></div>').insertAfter('.wobd-image-ribbon');
        } else {
            if ($('#wobd-badge').hasClass('wobd-text')) {
                $('#wobd-badge').addClass('wobd-icon');
            }
            if ($('#wobd-badge').hasClass('wobd-icon')) {
                $('#wobd-badge').addClass('wobd-text');
            }
            var text = $(".wobd-badge-text").val();
            var font = $('.icon-picker-input').val().split('|');
            $('.wobd-inner-text-container').remove();
            var icon = font[ 0 ] + ' ' + font[ 1 ];
            $('<div class="wobd-inner-text-container"><i class="' + icon + '" aria-hidden="true"></i>' + text + '</div>').insertAfter('.wobd-image-ribbon');
        }
    }
    $('body').on("click", ".wobd-badge-type", function() {
        var type = $(this).val();
        var bg_type = $('.wobd-background-type:checked').val();
        if (bg_type === 'text-background') {
            wobd_txt_bg_badge_type(type);
        } else {
            wobd_img_badge_type(type);
        }
    });
    $(document).on("click", ".icon-picker-list > li > a", function() {
        var bg_type = $('.wobd-background-type:checked').val();
        var type = $('.wobd-badge-type:checked').val();
        if (bg_type === 'text-background') {
            wobd_txt_bg_badge_type(type);
        } else {
            wobd_img_badge_type(type);
        }
    });
    /*
     * Show text in preview pane
     */
    $(".wobd-badge-text").keyup(function() {
        var bg_type = $('.wobd-background-type:checked').val();
        var type = $('.wobd-badge-type:checked').val();
        if (bg_type === 'text-background') {
            wobd_txt_bg_badge_type(type);
        } else {
            wobd_img_badge_type(type);
        }
    });
    $(".wobd-second-badge-text").keyup(function() {
        var bg_type = $('.wobd-background-type:checked').val();
        var type = $('.wobd-badge-type:checked').val();
        if (bg_type === 'text-background') {
            wobd_txt_bg_badge_type(type);
        } else {
            wobd_img_badge_type(type);
        }

    });
    /*
     * Change pre existing image badges in preview
     */
    $('body').on("click", ".wobd-existing-image", function() {
        var image_src = $(this).closest('.wobd-hide-radio').find('.wobd-existing-images-demo img').attr("src");
        var type = $('.wobd-badge-type:checked').val();
        $('.wobd-image-ribbon').find('img').attr("src", image_src);
        wobd_img_badge_type(type);
    });
    function wobd_disable_second_text() {
        var bg_type = $('.wobd-background-type:checked').val();
        if (bg_type === 'text-background') {
            var template = $('.wobd-text-design:checked').val();
            $('.wobd-badge-second-text-wrap').show();
        } else {
            var template = $('.wobd-existing-image:checked').val();

            $('.wobd-badge-second-text-wrap').show();
        }
    }
}
);