$(document).ready(function() {
    $(`#main .main-form input[type='tel'], 
        #skype-consult .skype-form input[type='tel'], 
        #free-consult .free-consult-form input[type='tel']`
     ).mask("+38  999 - 99 - 99 - 999");
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
    $(".menu-wrapper").on("click", 'a.anchor', function (event) {
        if(isClosed == false)
        {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            $('#main .menu-wrapper').removeClass('animated fadeInDown').addClass('animated fadeOutUp');
            isClosed = true;
            $('path, line').css('stroke','#fff');
            $('body').css({'overflow':'visible','max-height':'100%','height':'100%'});
        }
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 900);
    });
    $('#main .arrow').on('click',function(){
        $('body,html').animate({scrollTop: $('#about').offset().top}, 900);
    });
    $('.up-handler').on('click',function(){
        $('body,html').animate({scrollTop: 0}, 900);
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
            if($('#advantages .toogle-wrapper .toogle-item.active').length != 0)  
            {
                $('#advantages .toogle-wrapper .toogle-item.active .toogle-text').slideUp();
                setTimeout(() => {
                    $('#advantages .toogle-wrapper .toogle-item.active').removeClass('active');
                    $(this).addClass('active').find('.toogle-text').slideDown();
                },300);
            }
            else
            {
                $(this).addClass('active').find('.toogle-text').slideDown();
            }
        }
    });
    $('#stages .toogle-but').on('click',function(){
        let currentId = this.id;
        $('#stages .toogle-but.active').removeClass('active');
        $(this).addClass('active');
        $(`.info-wrapper.active`).removeClass('active').fadeOut();
        $(`.info-wrapper#${currentId}`).addClass('active').fadeIn();
        setTimeout(function(){
            $(`.info-wrapper#${currentId}`).css('display','flex');
        },400);
    });
    $(window).resize(function(){
        if(!$('#advantages .toogle-wrapper').hasClass('owl-carousel') && $(window).innerWidth() <= 768)
        {
            $('#advantages .toogle-wrapper').addClass('owl-carousel').owlCarousel({
                items:1,
                nav: true,
                margin:20,
                navText: [`<i class="fas fa-chevron-left"></i>`,`<i class="fas fa-chevron-right"></i>`]
            });
        }
    });
    $(window).on('load',function() {
        console.log($(window).innerWidth());
        if($(window).innerWidth() <= 768)
        {
            $('#advantages .toogle-wrapper').addClass('owl-carousel').owlCarousel({
                items:1,
                nav: true,
                margin:20,
                navText: [`<i class="fas fa-chevron-left"></i>`,`<i class="fas fa-chevron-right"></i>`]
            });
        }
        $("#teachers .owl-carousel").owlCarousel({
            center: true,
            items:5,
            loop:true,
            nav: true,
            navText: [`<i class="fas fa-chevron-left"></i>`,`<i class="fas fa-chevron-right"></i>`],
            navSpeed:800,
            responsive: {
                0:{
                    items:1,
                    margin:30
                },                
                960:{
                    items:2
                },                
                1165:{
                    items:3
                },  
                1600:{
                    items:4
                },              
                1900:{
                    items:5
                }
              }
        });
        $('#reviews .owl-carousel').owlCarousel({
            items:3,
            autoWidth:true,
            nav: true,
            loop:true,
            navText: [`<i class="fas fa-chevron-left"></i>`,`<i class="fas fa-chevron-right"></i>`],
            navSpeed:800,
            margin:50,
            animateIn:'ease-in-out',
            animateOut:'ease-in-out',
            responsive:{
                1500:{
                    items:4
                }
            }
        });
    });
    var trigger = $('#hamburger'),
        isClosed = true;

    trigger.on('click',function () {
      burgerTime();
    });
    function burgerTime() {
      if (isClosed == true) {
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        $('#main .menu-wrapper').removeClass('animated fadeOutUp').addClass('animated fadeInDown').css('display','flex');
        isClosed = false;
        // $('#top,#bottom').css('background','#B9FFF4');
        $('path, line').css('stroke','transparent');
        $('body').css({'overflow':'hidden','max-height':'100vh','height':'100vh'});
      } else {
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        $('#main .menu-wrapper').removeClass('animated fadeInDown').addClass('animated fadeOutUp');
        isClosed = true;
        // $('#top,#bottom').css('background','#fff');
        $('path, line').css('stroke','#fff');
        $('body').css({'overflow':'visible','max-height':'100%','height':'100%'});
      }
    }
});