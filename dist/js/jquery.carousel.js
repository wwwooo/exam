(function($) {
    $.fn.jcarousel = function(options) {
        var settings = $.extend({
            img_width: 200,
            margin_right: 10,
            visible_img: 3
        }, options);
        var jcarouselArrowLeft = this.find('.jcarousel-arrow-left');
        var jcarouselArrowRight = this.find('.jcarousel-arrow-right');
        var elementList = this.addClass('jcarousel-list');
        var elementsCount = this.find('li').addClass('jcarousel-element')
            .css('margin-right', settings.margin_right).length;
        var pixelsOffset = settings.img_width + settings.margin_right;
        var minimunOffset = -(elementsCount - settings.visible_img) * pixelsOffset;
        var maximumOffset = 0;
        var currentLeftValue = 0;

        this.addClass('jcarousel-hider').css('width', pixelsOffset * settings.visible_img - settings.margin_right);
        this.find('img').css('max-width', settings.img_width);

        jcarouselArrowLeft.on('click', function() {
            if (currentLeftValue != maximumOffset) {
                currentLeftValue += pixelsOffset;
                elementList.animate({left: currentLeftValue + 'px'}, 500);
            }
        });
        jcarouselArrowRight.on('click', function() {
            if (currentLeftValue != minimunOffset) {
                currentLeftValue -= pixelsOffset;
                elementList.animate({left: currentLeftValue + 'px'}, 500);
            }
        });

        return this;
    };
})(jQuery);
