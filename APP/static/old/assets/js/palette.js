"use strict";
/* Start Palette */
/*
 * Colorpicker http://mjolnic.com/bootstrap-colorpicker/
 * 
 * 
 */

function palette_init() {
    /* ini  colorpicker */
    
    var _head = $('head');
    var _body= $('body');
    var _colorPrimary = $('#color-primary');
    var _colorSecondary = $('#color-secondary');
    var _colorBackground = $('#color-background');
    var _colorBackground = $('#color-background');
    var _colorPrimary_class = $('.color-primary');
    var _bColorPrimary_class = $('.border-color-primary');
    
    _colorPrimary.colorpicker();
    if (_colorPrimary_class.css('background-color')) {
        _colorPrimary.colorpicker('setValue', _colorPrimary_class.css('background-color'));
    } else {
        _colorPrimary.colorpicker('setValue', 'rgb(0,137,195)');
    }

    _colorSecondary.colorpicker();
    if ($('.color-secondary').css('background-color')) {
        _colorSecondary.colorpicker('setValue', $('.color-secondary').css('background-color'));
    } else {
        _colorSecondary.colorpicker('setValue', 'rgb(0,137,195)');
    }

    _colorBackground.colorpicker();
    _colorBackground.colorpicker('setValue', '#F8F8F8');
    /* end ini  colorpicker */

    // close and open palette panel
    $('.custom-palette-btn').on('click', function () {
        $('.custom-palette').toggleClass('palette-closed');
    })

    // change primary color
    _colorPrimary.colorpicker().on('changeColor.colorpicker', function (event) {
        var color = event.color.toString();

        _colorPrimary_class.css('cssText', 'background-color: ' + color + ' !important');
        _bColorPrimary_class.css('cssText', 'border-color: ' + color + ' !important');
        $('.text-color-primary').css('cssText', 'color: ' + color + ' !important');

        var style = '';
        style = ' .mainmenu .dropdown li a:before{background-color:' + color + ';opacity:.5;}';
        style += '.treefield-categories-list .treefield-box-item:hover,.google_marker:before,.widget-top-title-2.par:after, .owl-theme .owl-controls .owl-page.active span,.owl-theme .owl-controls .owl-page:hover span,.owl-theme .owl-controls.clickable .owl-buttons div:hover,.treefield-categories .treefield-box-item:hover, .pagination li a:hover,.pagination li a.active,.thumbnail-property .property-title a:hover, .primary-hover:hover, .bootstrap-select.btn-group .dropdown-menu li a:hover,.vert-line-primary:before, .thumbnail-property.features .caption:before, .dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover {\n\
                    background-color: ' + color + ';\n\
                 }';

        style += '.thumbnail-property .property-title a, .primary-hover,.agent-list-result .contact span.mail a, .pagination>li>a,.pagination>li>span,.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover,\n\
                .anchor.active i,.anchor i:hover,a,.thumbnail-property .property-field, .thumbnail-property-list .media-right .property-title a,.thumbnail-property-list .media-right .property-title, \n\
                .widget-custom-filet-2 .field-box input[type="radio"]:checked ~ .label-title, .grid-type a:hover, .grid-type a.active {\n\
                    color: ' + color + ';\n\
                 }';
        style += '[class*="icon-star-ratings"]:after{\n\
                    color: ' + color + ' !important;\n\
                 }';

        style += '.scale-range .noUi-target .noUi-handle {\n\
                    background-color: ' + color + ';\n\
                }';
        style += '#main-map-color .cluster div, .google_marker {\n\
                    border-color: ' + color + ';\n\
                }';
        /* hove listing */
        style += '.thumbnail-property .property-image .property-image-hover {\n\
                    background: ' + color + ';\n\
                }\n\
                .thumbnail-property .property-image:hover .property-image-hover {\n\
                    opacity: .65;\n\
                }';

        if ($('#palette-styles-pr').length) {
            _head.find('#palette-styles-pr').html(style);
        } else {
            _head.append('<style id="palette-styles-pr">' + style + '</style>');
        }
    });

    // change secondary color
    _colorSecondary.colorpicker().on('changeColor.colorpicker', function (event) {
        var color = event.color.toString();
        $('.color-secondary').css('cssText', 'background-color: ' + color + ' !important');
        $('.border-color-secondary').css('cssText', 'border-color: ' + color + ' !important');
        $('.text-color-secondary').css('cssText', 'color: ' + color + ' !important');
    });

    // chose prepared color
    $('#palette-colors-prepared a').on('click', function (e) {
        e.preventDefault();
        var primary = '';
        primary = $(this).closest('li').attr('data-primary-color');
        if (primary)
            _colorPrimary.colorpicker('setValue', primary);

        var secondary = '';
        secondary = $(this).closest('li').attr('data-secondary-color');
        if (secondary)
            _colorSecondary.colorpicker('setValue', secondary);

    })

    // change background color
    _colorBackground.colorpicker().on('changeColor.colorpicker', function (event) {
        _body.removeClass('bg-image');
        var color = event.color.toString();
        _body.css('background', color);
    });

    // choose preperad bg-color boxed
    $('#palette-backgroundimage-prepared a').on('click', function (e) {
        e.preventDefault();
        var bg;
        var style;
        bg = $(this).closest('li').attr('data-backgroundimage') || '';
        style = $(this).closest('li').attr('data-backgroundimage-style') || '';

        $('#palette-backgroundimage-prepared a').removeClass('active');
        $(this).addClass('active');
        _body.addClass('bg-image');

        if (bg && style) {
            if (style == 'fixed') {
                _body.css('background', 'url(' + bg + ') no-repeat fixed');
                _body.css('background-size', 'cover');
            } else if (style == 'repeat') {
                _body.css('background', 'url(' + bg + ') repeat');
                _body.css('background-size', 'inherit');
            } else {
                _body.css('background', 'url(' + bg + ') no-repeat fixed');
            }
        } else if (bg) {
            _body.css('background', 'url(' + bg + ') no-repeat fixed');
        }
    })

    //type-site (full-width, wide)
    $('.custom-palette-box input[name="type-site"]').on('change',function (e) {
        e.preventDefault();
        _body.removeClass('full-width')
                .removeClass('boxed');
        _body.addClass($('.custom-palette-box input[name="type-site"]:checked').val());

        var _m = $('.widget-topmap');
        if ($(window).width() > 768 ){
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

    //reset 
    $('#pallete-reset').on('click', function (e) {
        e.preventDefault();

        _colorPrimary.colorpicker('setValue', 'rgb(0,137,195)');
        _colorSecondary.colorpicker('setValue', 'rgb(54, 144, 219)');
        _colorBackground.colorpicker('setValue', '#F8F8F8');

        _body.attr('class', '');
        var type = $('input[name="type-site"]').last().val();
        _body.attr('class', type);
        
        _body.attr('style', '');

        _head.append('<style id="palette-styles-pr">' + style + '</style>');

        _colorPrimary_class.css('background-color', '#0f7ad5');
        _bColorPrimary_class.css('border-color', '#0f7ad5');
        $('.text-color-primary').css('color', '#0f7ad5');

        $('.color-secondary').css('background-color', 'rgb(54, 144, 219)');
        $('.border-color-secondary').css('border-color', 'rgb(54, 144, 219)');
        _bColorPrimary_class.css('border-color', 'rgb(23, 133, 227)');

        $('#palette-backgroundimage-prepared a').removeClass('active');

        $('.custom-palette-box input[name="type-site"]').removeAttr('checked')
        $('.custom-palette-box input[name="type-site"][value=""]').attr('checked', 'checked');

        _body.css('background', 'url(assets/img/patterns/full-bg-road.jpg) no-repeat fixed')
                .css('background-size', 'cover');

    })


    /* End Palette */

    /* Guid */
    _body.append(
            '<div id="load_popup_modal_show_id" class="modal fade" tabindex="-1">\n\
                <div id="load_popup_modal_contant" class="" role="dialog">\n\
                    <div class="modal-dialog modal-md">\n\
                            <div class="modal-content">\n\
                                    <div class="modal-header">\n\
                                            <button type="button" class="close" data-dismiss="modal">×</button>\n\
                                            <h4 class="modal-title">Guide Customizer</h4>\n\
                                    </div>\n\
                                    <div id="validation-error"></div>\n\
                                    <div class="cl"></div>\n\
                                    <div class="modal-body">\n\
                                            <span class="alert alert-info"> 1. Save new styles into "assets/css/custom.css" ( old styles from custom.css should be removed) </span>\n\
                                            <pre class="styles">\n\
                                            </pre>\n\
                                            <br/>\n\
                                            <span class="alert alert-info">2. Apply boxed or default version, in "assets/js/custom.js" add changed </span>\n\
                                            <img src="assets/img/guide_custom_template/boxed.jpg" alt="" />\n\
                                            <br/>\n\
                                            <span class="alert alert-info">3. Hide Customizer, in file "assets/js/custom.js"</span>\n\
                                            changed\n\
                                            <span class="alert alert-warning">var hide_palette = false;</span>\n\
                                            to \n\
                                            <span class="alert alert-warning">var hide_palette = true;</span>\n\
                                            <br>\n\
                                    </div>\n\
                                    <div class="modal-footer">\n\
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\
                                    </div>\n\
                            </div>\n\
                    </div>\n\
                </div>\n\
            </div>');

    $('#pallete-save').on('click',
            function (e) {
                e.preventDefault();
                var $modal = $('#load_popup_modal_show_id');

                /* primary_color */
                var primary_color = $('#color-primary input').val();
                var styles = '';

                styles += '.color-primary {\n\
                    background-color: ' + primary_color + ' !important;\n\
                 }\n\
                \n\
                ';

                styles += '.border-color-primary {\n\
                    border-color: ' + primary_color + ' !important;\n\
                 }\n\
                \n\
                ';

                styles += '.text-color-primary {\n\
                    color: ' + primary_color + ' !important;\n\
                 }\n\
                \n\
                 ';

                styles += '.mainmenu .dropdown li a:before{background-color:' + primary_color + ';opacity:.5;}';
                styles += '.text-color-primary, .agent-list-result .contact span.mail a, .pagination>li>a,.pagination>li>span,.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover,\n\
                .anchor.active i,.anchor i:hover,a,.thumbnail-property .property-field, .thumbnail-property-list .media-right .property-title a,.thumbnail-property-list .media-right .property-title, \n\
                .widget-custom-filet-2 .field-box input[type="radio"]:checked ~ .label-title, .grid-type a:hover, .grid-type a.active {\n\
                    color: ' + primary_color + ';\n\
                }\n\
                \n\
                ';
                styles += '#main-map-color .cluster div, .google_marker {\n\
                    border-color: ' + primary_color + ';\n\
                }';
                styles += '[class*="icon-star-ratings"]:after{\n\
                    color: ' + primary_color + ' !important;\n\
                 }\n\
                \n\
                ';
                styles += '.treefield-categories-list .treefield-box-item:hover, .google_marker:before, .widget-top-title-2.par:after, .vert-line-primary:before, .thumbnail-property.features .caption:before, .dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover \n\
                  .scale-range .noUi-target .noUi-handle {\n\
                    background-color: ' + primary_color + ';\n\
                }\n\
                \n\
                ';
                /* hove listing */
                styles += '.thumbnail-property .property-image .property-image-hover {\n\
                    background: ' + primary_color + ';\n\
                }\n\
                \n\
                .thumbnail-property .property-image:hover .property-image-hover {\n\
                    opacity: .65;\n\
                }\n\
                \n\
                .border-color-primary {\n\
                    border-color:' + primary_color + ';\n\
                }\n\
                \n\
                ';
                /* end primary_color */

                /* secondary_color */
                var secondary_color = $('#color-secondary input').val();

                styles += '.color-secondary {\n\
                    background: ' + secondary_color + ' !important;\n\
                }\n\
                .border-color-secondary {\n\
                    border-color: ' + secondary_color + ' !important;\n\
                }\n\
                .text-color-secondary {color:' + secondary_color + ' !important;}\n\
                ';
                /* end secondary_color */

                /* bg_color */
                var bg_color = $('#color-background input').val();
                styles += 'body {\n\
                    background: ' + $("body").css("background") + ';\n\
                    background-size: ' + $("body").css("background-size") + ';\n\
                }\n\
                ';
                /* end bg_color */

                if (_body.hasClass('bg-image')) {

                    styles += 'body .bg-parallax-e {\n\
                        position: relative;\n\
                        background: transparent;\n\
                }\n\
                \n\
                body .bg-parallax-e>* {\n\
                        position: relative;\n\
                        z-index: 1;\n\
                }\n\
                \n\
                body.bg-image .widget.bg-parallax-e .vert-line-r-l:before{\n\
                        display: none;\n\
                }\n\
                \n\
                body .bg-parallax-e:after {\n\
                        content: ""; \n\
                        position: absolute;\n\
                        width: 100%;\n\
                        height: 100%;\n\
                        left: 0;\n\
                        top: 0;\n\
                        background: url(../img/patterns/slash-it.png) repeat;\n\
                        opacity: .5;\n\
                        z-index: 0;\n\
                }\n\
                \n\
                body.bg-image .bg-parallax-e,\n\
                body.bg-image .bg-parallax-e .custom-box .custom-box-content {\n\
                        color: white;\n\
                }';
                }

                $('#load_popup_modal_show_id .styles').html(styles);

                $modal.modal('show');
            });
}
/* End Guid */