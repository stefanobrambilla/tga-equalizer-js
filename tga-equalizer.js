/**
 * Created by stefano.brambilla on 19/12/2016.
 * version: 1.1
 *
 * Reorganizer plugin
 */

;(function($) {

    var TGAEqualizer = {

        init: function () {

            this.setEvents();
            this.resolve();

        },

        setEvents: function () {

            $(window).on('resize', function(){

                if(!PAGE.isMobileDevice()) {

                    TGAEqualizer.resolve();

                }

            });

            window.addEventListener("orientationchange", function() {

                TGAEqualizer.resolve();

            });



        },

        resolve: function () {

            var
                d = $(document),
                th = $('[data-tgaequalizer]'),
                n = 0,
                i = 0,
                tallest = 0,
                row = [];

            d.find(th).each(function () {

                var
                    nodo    = $(this),
                    column  = TGAEqualizer.Ncolumns(this),
                    equName = $(this).attr('data-tgaequalizer'),
                    target = $('[data-tgaequalizer-watch="'+equName+'"]');

                $(this).find(target).each(function (index, element) {

                    n++;
                    i++;
                    row.push(element);
                    $(this).css('height', 'auto'); 

                    var h = $(this).outerHeight();

                    if (h > tallest) {

                       tallest = h;

                    }

                    if (n == column || i == nodo.find(target).size()) {

                        row.each(function (ul, index) {
                            $(ul).css('height', tallest);
                            $(ul).addClass('tga-equalized');

                            if (index == 0) {

                                $(ul).addClass('first');

                            }else if(index + 1 == row.size()){

                                $(ul).addClass('last');

                            }

                        });

                        n = 0;
                        row = [];
                        tallest = 0;

                    }

                });

                nodo.addClass('init-equalized');

            });
        },

        Ncolumns: function (t){

            var def     = $(t).attr('data-tgaequalizer-col'),
                large   = $(t).attr('data-tgaequalizer-large'),
                medium  = $(t).attr('data-tgaequalizer-medium'),
                small   = $(t).attr('data-tgaequalizer-small'),
                xsmall  = $(t).attr('data-tgaequalizer-xsmall');

            if(!large && !medium && !small && !xsmall){

                column = def;

            }

            if(PAGE.isInBreakpoint('xsmall')){

                if(xsmall) {
                    column = xsmall;
                }else{
                    column = def;
                }

            }

            if(PAGE.isInBreakpoint('small')){

                if(small) {
                    column = small;
                }else{
                    column = def;
                }

            }

            if(PAGE.isInBreakpoint('medium')){

                if(medium) {
                    column = medium;
                }else{
                    column = def;
                }

            }

            if(PAGE.isInBreakpoint('large')){

                if(large) {
                    column = large;
                }else{
                    column = def;
                }

            }

            return column;

        }

    };

    $.fn.tgaEqualizer = function () {
        return TGAEqualizer.init();
    };

})(jQuery);
