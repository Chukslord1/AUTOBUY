"use strict";

function custom_template_style(){
    var boxed = false; // true to boxed version, false = deafault
    var hide_palette = false; // true to hide Customizer, false show

    if(boxed) {
        $('.custom-palette-box input[name="type-site"][value="boxed"]').attr('checked','checked');
        $('body').addClass('boxed');
    }

    if(hide_palette) {
        $('.custom-palette').css('cssText', 'display: none !important;');
    }
    
}