jQuery(document).ready(function($) {

    var badge_width = $(".wobd-badges-wrapper").width();
    if (badge_width <= '350' && badge_width > '250') {
        $(".wobd-badges-wrapper").addClass('wobd-small-wrap');
    }
    if (badge_width <= '250') {
        $(".wobd-badges-wrapper").addClass('wobd-smaller-wrap');
    }

});
