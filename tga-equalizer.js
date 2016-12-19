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

                if(navigator.userAgent.match(/Mobile/i)) {

                    TGAEqualizer.resolve();

                }

            });

            window.addEventListener("orientationchange", function() {

                TGAEqualizer.resolve();

            });



        },

        resolve: function () {

            var
                _d = $(document),
                _th = $('[data-tgaequalizer]'),
                _n = 0,
                _i = 0,
                _tallest = 0,
                _row = [];



            _d.find(_th).each(function () {

                var column  = TGAEqualizer.Ncolumns(this),
                    equName = _th.attr('data-tgaequalizer'),
                    _target  = $('[data-tgaequalizer-watch="' + equName + '"]');



                _th.find(_target).each(function (index, element) {

                    if (column == 0) {
                        column = _th.find(_target).length
                    }

                    _n++;
                    _i++;
                    _row.push(element);
                    $(this).css('height', 'auto');

                    var _h = $(this).outerHeight();

                    if (_h > _tallest) {

                        _tallest = _h;

                    }

                    if (_n == column || _i == _th.find(_target).size()) {

                        console.log(_row.size());
                        console.log(_row.length);

                        _row.each(function (ul, index) {
                            $(ul).css('height', _tallest);

                            if (index == 0) {

                                $(ul).addClass('first');

                            }else if(index + 1 == _row.size()){

                                $(ul).addClass('last');

                            }

                        });

                        _n = 0;
                        _row = [];
                        _tallest = 0;

                    }

                });

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
