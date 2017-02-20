/**
 * Created by stefano.brambilla on 19/12/2016.
 * version: 1.1
 *
 * TGAEqualizer plugin
 */

;(function($) {

    var TGAEqualizer = {

        init: function (threshold, method) {


            //method
            this.methods = {

                isLight: false

            };

            this.getMethod();
            this.setEvents();
            this.resolve(threshold, method);

        },

        setEvents: function () {

            $(window).on('resize', function(){

                if(!PAGE.isMobileDevice()) {

                    TGAEqualizer.resolve($(document));

                }

            });

            window.addEventListener("orientationchange", function() {

                TGAEqualizer.resolve($(document));

            });



        },

        resolve: function (threshold, method) {
            //general var
            var
                radice  = [],
                th      = $('[data-tgaequalizer]'),
                n       = 0,
                i       = 0,
                tallest = 0,
                row     = [];


            threshold.selector == '' ? radice = threshold : radice = threshold.parent();

            TGAEqualizer.getMethod(method);

            radice.find(th).each(function () {

                var
                    nodo    = $(this),
                    column  = TGAEqualizer.Ncolumns(this),
                    equName = $(this).attr('data-tgaequalizer'),
                    target = $('[data-tgaequalizer-watch="'+equName+'"]');

                $(this).find(target).each(function (index, element) {

                        i++;

                    if( TGAEqualizer.methods.isLight && $(this).hasClass('tga-equalized')) {
                    }else{
                        n++;
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

                                } else if (index + 1 == row.size()) {

                                    $(ul).addClass('last');

                                }

                            });

                            n = 0;
                            row = [];
                            tallest = 0;

                        }

                    }

                });

                i = 0;

                nodo.addClass('init-equalized');

            });
        },

        Ncolumns: function (t){

            var def     = $(t).attr('data-tgaequalizer-col'),
                large   = $(t).attr('data-tgaequalizer-large'),
                medium  = $(t).attr('data-tgaequalizer-medium'),
                small   = $(t).attr('data-tgaequalizer-small'),
                xsmall  = $(t).attr('data-tgaequalizer-xsmall'),
                w       = $(window).width();

            if(!large && !medium && !small && !xsmall){

                column = def;

            }

            if(w < 480){

                if(xsmall) {
                    column = xsmall;
                }else{
                    column = def;
                }

            }

            if(w > 480 && w < 800){

                if(small) {
                    column = small;
                }else{
                    column = def;
                }

            }

            if(w > 800 && w < 1200){

                if(medium) {
                    column = medium;
                }else{
                    column = def;
                }

            }

            if(w > 1200){

                if(large) {
                    column = large;
                }else{
                    column = def;
                }

            }

            return column;

        },

        getMethod: function (method) {

            if(method == 'light'){

                TGAEqualizer.methods.isLight = true;

            }

        }

    };

    $.fn.tgaEqualizer = function (method) {
        return TGAEqualizer.init(this, method) ;
    };

})(jQuery);
