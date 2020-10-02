"use strict";
$(document).on('ready', function () {
    /* placeholder for IE */
    $.support.placeholder = ('placeholder' in document.createElement('input'));
    
    //fix for IE
    if (!$.support.placeholder) {
        $("[placeholder]").on('focus', function () {
            if ($(this).val() === $(this).attr("placeholder"))
                $(this).val("");
        }).on('blur', function () {
            if ($(this).val() === "")
                $(this).val($(this).attr("placeholder"));
        }).on('blur');

        $("[placeholder]").parents("form").on('submit', function () {
            $(this).find('[placeholder]').each(function () {
                if ($(this).val() === $(this).attr("placeholder")) {
                    $(this).val("");
                }
            });
        });
    }
    /* end placeholder for IE */

    /* WorldMapGenerator */
    var _worldmapgenerator = $('.worldmapgenerator');
    if (_worldmapgenerator && _worldmapgenerator.length) {
        _worldmapgenerator.WorldMapGenerator({
            width: 150,
            height: 70,
            hoverColor: '#B4B4B4',
            selectedColor: '#B4B4B4',
            mapColor: '#080808',
            defaultCss: true,
            selectBox: true,
            quickLink: [{
                    "Amsterdam": "Europe/Amsterdam",
                    "Budapest": "Europe/Budapest",
                    "London": "Europe/London",
                    "Madrid": "Europe/Madrid",
                    "Malta": "Europe/Malta",
                    "Dublin": "Europe/Dublin",
                    "Oslo": "Europe/Oslo",
                    "Paris": "Europe/Paris",
                    "Prague": "Europe/Prague",
                    "Riga": "Europe/Riga",
                    "Sofia": "Europe/Sofia",
                    "Vilnius": "Europe/Vilnius",
                    "Warsaw": "Europe/Warsaw",
                    "Zagreb": "Europe/Zagreb"
                }],
            showHoverText: true
        });

        if (getParameterByName('geolocation')) {
            var locationWorldMapGenerator = '';
            locationWorldMapGenerator = getParameterByName('geolocation').toLowerCase();

            switch (locationWorldMapGenerator) {
                case 'amsterdam':
                    locationWorldMapGenerator = "Europe/Amsterdam";
                    break;
                case 'andorra':
                    locationWorldMapGenerator = "Europe/Andorra";
                    break;
                case 'athens':
                    locationWorldMapGenerator = "Europe/Athens";
                    break;
                case 'belgrade':
                    locationWorldMapGenerator = "Europe/Belgrade";
                    break;
                case 'bucharest':
                    locationWorldMapGenerator = "Europe/Bucharest";
                    break;
                case 'berlin':
                    locationWorldMapGenerator = "Europe/Berlin";
                    break;
                case 'budapest':
                    locationWorldMapGenerator = "Europe/Budapest";
                    break;
                case 'chisinau':
                    locationWorldMapGenerator = "Europe/Chisinau";
                    break;
                case 'bratislava':
                    locationWorldMapGenerator = "Europe/Bratislava";
                    break;
                case 'brussels':
                    locationWorldMapGenerator = "Europe/Brussels";
                    break;
                case 'copenhagen':
                    locationWorldMapGenerator = "Europe/Copenhagen";
                    break;
                case 'dublin':
                    locationWorldMapGenerator = "Europe/Dublin";
                    break;
                case 'gibraltar':
                    locationWorldMapGenerator = "Europe/Gibraltar";
                    break;
                case 'guernsey':
                    locationWorldMapGenerator = "Europe/Guernsey";
                    break;
                case 'helsinki':
                    locationWorldMapGenerator = "Europe/Helsinki";
                    break;
                case 'isle_of_man':
                    locationWorldMapGenerator = "Europe/Isle_of_Man";
                    break;
                case 'istanbul':
                    locationWorldMapGenerator = "Europe/Istanbul";
                    break;
                case 'jersey':
                    locationWorldMapGenerator = "Europe/Jersey";
                    break;
                case 'kaliningrad':
                    locationWorldMapGenerator = "Europe/Kaliningrad";
                    break;
                case 'kiev':
                    locationWorldMapGenerator = "Europe/Kiev";
                    break;
                case 'lisbon':
                    locationWorldMapGenerator = "Europe/Lisbon";
                    break;
                case 'ljubljana':
                    locationWorldMapGenerator = "Europe/Ljubljana";
                    break;
                case 'london':
                    locationWorldMapGenerator = "Europe/London";
                    break;
                case 'luxembourg':
                    locationWorldMapGenerator = "Europe/Luxembourg";
                    break;
                case 'madrid':
                    locationWorldMapGenerator = "Europe/Madrid";
                    break;
                case 'malta':
                    locationWorldMapGenerator = "Europe/Malta";
                    break;
                case 'mariehamn':
                    locationWorldMapGenerator = "Europe/Mariehamn";
                    break;
                case 'minsk':
                    locationWorldMapGenerator = "Europe/Minsk";
                    break;
                case 'monaco':
                    locationWorldMapGenerator = "Europe/Monaco";
                    break;
                case 'moscow':
                    locationWorldMapGenerator = "Europe/Moscow";
                    break;
                case 'oslo':
                    locationWorldMapGenerator = "Europe/Oslo";
                    break;
                case 'paris':
                    locationWorldMapGenerator = "Europe/Paris";
                    break;
                case 'podgorica':
                    locationWorldMapGenerator = "Europe/Podgorica";
                    break;
                case 'prague':
                    locationWorldMapGenerator = "Europe/Prague";
                    break;
                case 'riga':
                    locationWorldMapGenerator = "Europe/Riga";
                    break;
                case 'rome':
                    locationWorldMapGenerator = "Europe/Rome";
                    break;
                case 'samara':
                    locationWorldMapGenerator = "Europe/Samara";
                    break;
                case 'san_marino':
                    locationWorldMapGenerator = "Europe/San_Marino";
                    break;
                case 'sarajevo':
                    locationWorldMapGenerator = "Europe/Sarajevo";
                    break;
                case 'simferopol':
                    locationWorldMapGenerator = "Europe/Simferopol";
                    break;
                case 'skopje':
                    locationWorldMapGenerator = "Europe/Skopje";
                    break;
                case 'sofia':
                    locationWorldMapGenerator = "Europe/Sofia";
                    break;
                case 'stockholm':
                    locationWorldMapGenerator = "Europe/Stockholm";
                    break;
                case 'tallinn':
                    locationWorldMapGenerator = "Europe/Tallinn";
                    break;
                case 'vaduz':
                    locationWorldMapGenerator = "Europe/Vaduz";
                    break;
                case 'tirane':
                    locationWorldMapGenerator = "Europe/Tirane";
                    break;
                case 'vatican':
                    locationWorldMapGenerator = "Europe/Vatican";
                    break;
                case 'uzhgorod':
                    locationWorldMapGenerator = "Europe/Uzhgorod";
                    break;
                case 'vienna':
                    locationWorldMapGenerator = "Europe/Vienna";
                    break;
                case 'vilnius':
                    locationWorldMapGenerator = "Europe/Vilnius";
                    break;
                case 'volgograd':
                    locationWorldMapGenerator = "Europe/Volgograd";
                    break;
                case 'warsaw':
                    locationWorldMapGenerator = "Europe/Warsaw";
                    break;
                case 'zagreb':
                    locationWorldMapGenerator = "Europe/Zagreb";
                    break;
                case 'zaporozhye':
                    locationWorldMapGenerator = "Europe/Zaporozhye";
                    break;
                case 'zurich':
                    locationWorldMapGenerator = "Europe/Zurich";
                    break;
            }
            _worldmapgenerator.data('WorldMapGenerator').setValue(locationWorldMapGenerator)
        }
    }
    
    $('.worldmapgenerator polygon, .quickLink span').on('click', function () {
        var hash = $(this).attr('data-timezone') || $(this).attr('data-select');
        hash = hash.split('/');
        if (hash[1]) {
            var hash = hash[1];
            var hash = hash.toLowerCase();
            history.pushState(null, null, location.pathname + '?geolocation=' + hash);
        }
    })

    /* end WorldMapGenerator */

    /* Start no drag and selected */
    // Prevent anchor links and buttons and .nodrag items from being dragged
    $('.carousel-inner .carousel-item img, .no-drag, .carousel-inner *')
            .css('-moz-user-select', 'none')
            .css('-webkit-user-select', 'none')
            .on('selectstart', function (e) {
                e.preventDefault();
                return false;
            })
            .on('draggesture', function (e) {
                e.preventDefault();
                return false;
            })
            .on('draggable', function (e) {
                e.preventDefault();
                return false;
            })
            .on('dragstart', function (e) {
                e.preventDefault();
                return false;
            });
    /* End no drag and selected */


    /* Start slider touch */
    $('.widget-slider-top [data-ride="carousel"]').swiperight(function () {
        $(this).carousel('prev');
    }).swipeleft(function () {
        $(this).carousel('next');
    });
    /* End slider touch */

    //dropdown select
    $('.selectpicker').selectpicker({
        style: 'selectpicker-primary',
    });

    /* Start menu dropdown */
    $('ul.nav li.dropdown').on({
            'mouseover': function () {
                if ($(window).outerWidth() > 768)
                    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(120);
            },
            'mouseout' : function () {
                if ($(window).outerWidth() > 768)
                    $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(50);
            },
            'click': function() {
                $(this).parent().find('ul').attr('style','');
            }
        }
    );
    /* End menu dropdown */

    /* scale form */
     
    if ($('#nonlinear-year').length)
        scale_range('#nonlinear-year', 1950, 2016, '', '', false, '','');

    if ($('#nonlinear-price').length)
        scale_range('#nonlinear-price',0, 100, '$', 'k', true, '','');

    $('.search-form-mini-open, .search-form-mini .close').on('click', function (e) {
        e.preventDefault();
        $('.search-form-mini').toggleClass('closed')
    })
    $('.search-form-mini-phone .close, .sub-top-bar-mobile .search-btn-box .search-btn').on('click', function (e) {
        e.preventDefault();
        $('.search-form-mini-phone').slideToggle()
    })
    
    $('#toggle-mainmenu').on('click', function (e) {
        e.preventDefault();
        $('.top-bar-center').slideToggle('fast', function(){
            if($(this).css('display') === 'none'){
                $(this).removeClass('open')
                       .attr('style','');
            }
            if($(this).css('display') === 'block'){
                $(this).addClass('open')
                       .attr('style','');
            }
        })
    })

    /* start image cover ( use class object-fit-container  as div.object-fit-container > img) */
    if (!Modernizr.prefixed('objectFit')) {
        $('.image-cover').each(function () {
            var $container = $(this);
            $(this).addClass('object-fit-container');
            var imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container
                        .css('background-image', 'url("' + imgUrl + '")')
                        .addClass('compat-object-fit');
            }
        });
    }
    if (true) {
        $('.thumbnail-property .property-image, .owl-slider .item, .image-cover-div, .article-list-result .image-preview > a').each(function () {
            var $container = $(this);
            $(this).addClass('object-fit-container');
            var imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container.addClass('compat-object-fit')
                        .prepend('<div class="object-fit-imagediv"></div>').find('.object-fit-imagediv')
                        .css('background-image', 'url("' + imgUrl + '")');
            }
        });
    }
    /* end image cover */

    /* Start btn-scroll-up */
    var _btnscroll = $('#btn-scroll-up');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 800) {
            _btnscroll.css('display', 'block');
        } else {
            _btnscroll.css('display', 'none');
        }
    });

    _btnscroll.on('click', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');
        return false;
    });
    /* End btn-scroll-up */

    /* Start Image gallery 
     *    use css/blueimp-gallery.min.css
     *    use js/blueimp-gallery.min.js
     *    use config assets/js/realsite.js
     *    Site https://github.com/blueimp/Gallery/blob/master/README.md#setup
     *   
     *
     */
    $('body').append('<div id="blueimp-gallery" class="blueimp-gallery">\n\
                        <div class="slides"></div>\n\
                        <h3 class="title"></h3>\n\
                        <a class="prev">&lsaquo;</a>\n\
                        <a class="next">&rsaquo;</a>\n\
                        <a class="close">&times;</a>\n\
                        <a class="play-pause"></a>\n\
                        <ol class="indicator"></ol>\n\
                        </div>')
    $(document).on('touchstart click', '.images-gallery a.preview', function (e) {
        e.preventDefault();
        var myLinks = new Array();
        var current = $(this).attr('href');
        var curIndex = 0;

        $('.images-gallery a.preview').each(function (i) {
            var img_href = $(this).attr('href');
            myLinks[i] = img_href;
            if (current === img_href)
                curIndex = i;
        });

        var options = {index: curIndex}

        blueimp.Gallery(myLinks, options);

        return false;
    });
    /* End Image gallery */

    /* Start carusel */
    var owl = $("#owl-slider");
    if (owl && owl.length) {
        owl.owlCarousel({
            navigation: true,
            singleItem: true,
            transitionStyle: "fade"
        });
    }

    var owl2 = $("#owl-carousel-items");
    if (owl2 && owl2.length) {
        owl2.owlCarousel({
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 3],
                [1000, 3],
                [1200, 4],
                [1400, 4],
                [1600, 4]
            ],
            navigation: true
        });
    }
    /* End carusel */

    // Find all data-toggle="sticky-onscroll" elements
    $('.affix-menu').each(function () {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
    })
    .affix({
        offset: {
            top: 250
                } 
        })
    .on('affix.bs.affix', function(){
            $('.sticky-wrapper').height($('.affix-menu').outerHeight(true));
    })
    .on('affixed-top.bs.affix', function(){ 
        $('.sticky-wrapper').height('auto');
    });
    
    
    $("#route_from_button").on('click', function () {
        window.open("https://maps.google.com/maps?saddr=" + $("#route_from").val() + "&daddr=Ilica 345, HR-10000 Zagreb@45.812231, 15.920618", '_blank');
        return false;
    });
    
    var _m = $('.widget-topmap');
    if(_m && _m.length) {
        if ($(window).outerWidth() > 748 ){
            var _w;
            if($('body').hasClass('boxed')){
                _w = $('main.container .row-fluid .right-b.box').outerWidth();
            } else {
                _w = $('main.container .row-fluid .right-b.box').outerWidth()+(($(window).width() - $('main.container').outerWidth())/2)+15;
            }
            
            if(_w)
                _m.find('.flex .flex-right').attr('style','width: '+_w+'px;min-width:'+_w+'px');
        } else {
            _m.find('.flex .flex-right').attr('style','');
        }
        
        $(window).on('resize', function(){
            if ($(window).width() > 748 ){
                var _w;
                if($('body').hasClass('boxed')){
                    _w = $('main.container .row-fluid .right-b.box').outerWidth();
                } else {
                    _w = $('main.container .row-fluid .right-b.box').outerWidth()+(($(window).width() - $('main.container').outerWidth())/2)+15;
                }

                if(_w)
                    _m.find('.flex .flex-right').attr('style','width: '+_w+'px;min-width:'+_w+'px');
            } else {
                _m.find('.flex .flex-right').attr('style','');
            }
        })
    }

    /* load extern scripts */
    if($('#main-map').length){
        LoadMap_main();
    }
    
    if($('#main-map-color').length){
        LoadMap_main_color();
    }
    
    if($('#property-map').length){
        map_property();
    }
    
    if($('#contact-map').length){
        contactMap();
    }
    
    if(typeof custom_template_style === 'function'){
        custom_template_style();
    }
    
    if(typeof footable_init === 'function'){
        footable_init();
    }
    
    if(typeof palette_init === 'function'){
        palette_init();
    }
    
    if(typeof codemirror_init === 'function'){
        codemirror_init();
    }

})

/*
 * Scale range
 * @param {type} object selector for scale-range box
 * @param {type} min min value
 * @param {type} max max value
 * @param {type} prefix
 * @param {type} sufix
 * @param {type} infinity, is infinity
 * @param {type} predifinedMin value
 * @param {type} predifinedMax value
 * @returns {Boolean}
 * 
 * 
 * Example html :
    <div class="scale-range" id="nonlinear-price">
        <label>Price</label>
        <div class="nonlinear"></div>
        <div class="scale-range-value">
            <span class="nonlinear-min"></span>
            <span class="nonlinear-max"></span>
        </div>
        <input id="from" type="text" class="value-min hidden" placeholder="" value="" />
        <input id="to" type="text" class="value-max hidden" placeholder="" value="" />
    </div>
* Example js :                                                                                                                                                                                                                           
     scale_range('#nonlinear-price',0, 500000, '$', 'k', true, '','');
*/

function scale_range(object, min, max, prefix, sufix, infinity, predifinedMin, predifinedMax) {
    if (typeof object == 'undefined')
        return false;
    if (typeof min == 'undefined')
        return false;
    if (typeof max == 'undefined')
        return false;
    if (typeof prefix == 'undefined')
        var prefix = '';
    if (typeof sufix == 'undefined')
        var sufix = '';
    if (typeof sufix == 'infinity')
        var infinity = true;
    
    if (typeof predifinedMin == 'undefined' || predifinedMin ==''){
        var predifinedMin = min || 0;
        predifinedMin-=10;
    }
    if (typeof predifinedMax == 'undefined' || predifinedMax==''){
        var predifinedMax = max || 100000;
        predifinedMax+=10;
    }
    
    /* errors */
    
    if(!$(object + ' .value-min').length || !$(object + ' .value-max').length) {
        console.log('Scale range: missing input min or max');
        return false;
    }
    
    var r = 0;
    if(infinity) {
        r = 10;
    }
    
    if ($(object + ' .nonlinear').length) {
        var nonLinearSlider = document.querySelector(object + ' .nonlinear');
        noUiSlider.create(nonLinearSlider, {
            connect: true,
            behaviour: 'tap',
            start: [predifinedMin, predifinedMax],
            range: {
                'min': [parseInt(min)-r],
                'max': [parseInt(max)+r]
            }
        });

        var nodes = [
            document.querySelector(object + ' .nonlinear-min'), // 0
            document.querySelector(object + ' .nonlinear-max')  // 1
        ];
        
        var inputs = [
            document.querySelector(object + ' .value-min'), // 0
            document.querySelector(object + ' .value-max')  // 1
        ];

        // Display the slider value and how far the handle moved
        nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {

            if(parseInt(values[handle]) > max && infinity){
                nodes[handle].innerHTML = prefix + parseInt(max).toFixed() + sufix+'+';
            }
            else if(parseInt(values[handle]) < min && infinity){
                nodes[handle].innerHTML = prefix + parseInt(min).toFixed() + sufix+'-';
            }
            else
                nodes[handle].innerHTML = prefix + parseInt(values[handle]).toFixed() + sufix;
            
            if(parseInt(values[handle]) > max && infinity){
                inputs[handle].value = '';
            }
            else if(parseInt(values[handle]) < min && infinity){
                inputs[handle].value = '';
            }
            else
                inputs[handle].value = parseInt(values[handle]).toFixed();
        });
    }
}

function getParameterByName(name, url) {
    if (typeof url === 'undefined')
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}