$(document).ready(function() {
    $("#main .main-form input[type='tel'] , #skype-consult .skype-form input[type='tel']").mask("999-99-99");
    $('img[src$=".svg"]').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
});
$('.tel-code-wrapper').on('click',function(){
    if($(this).find('.code-list').is(':visible'))
    {
        $(this).find('.code-list').fadeOut();
    }
    else
    {
        $(this).find('.code-list').fadeIn();
    }
});
$('.code-list .code-item').on('click',function(){
    $('.tel-code-wrapper .current-code #code').text($(this).text());
    $('.tel-code-wrapper').find('.code-list').fadeOut();    
});
$('#advantages .toogle-wrapper .toogle-item').on('click',function(){
    if($(this).find('.toogle-text').is(':visible'))
    {
        $(this).find('.toogle-text').slideUp();
        setTimeout(() => {
            $(this).removeClass('active');
        },300);
    }
    else
    {
        $(this).addClass('active').find('.toogle-text').slideDown();
    }
});