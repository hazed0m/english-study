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
    $("a.anchor").on("click", function (event) {
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
    let advantages = null;
    $(window).resize(function(){
        if(advantages != null && $(window).innerWidth() <= 768)
        {
            advantages = $('#advantages .toogle-wrapper').addClass('owl-carousel').owlCarousel({
                items:1,
                nav: true,
                margin:20,
                navSpeed:500,
                navText: [`<i class="fas fa-chevron-left"></i>`,`<i class="fas fa-chevron-right"></i>`]
            });
        }
        else
        {
            console.log('null');
            $(advantages).trigger('destroy.owl.carousel');
        }
    });
    $(window).on('load',function() {
        if($(window).innerWidth() <= 768)
        {
            advantages = $('#advantages .toogle-wrapper').addClass('owl-carousel').owlCarousel({
                items:1,
                nav: true,
                margin:20,
                navSpeed:500,
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
    //На нажатие закрыть вкладку
    
    // $(window).on('beforeunload',function(){
    //     $('.mask, .popap-wrapper').fadeIn();
    //     $('body').css({'overflow':'hidden','max-height':'100vh','height':'100vh'});
    //     return "Handler for .unload() called.";
    // }); 

    //На подъем мыши к закрытию
    let currentStatus = false;
    $(document).bind("mouseleave", function(e) {
        if (e.pageY - $(window).scrollTop() <= 1) {    
            let popapItem = `
                <div class="close-but"><i class="fas fa-times"></i></div>
                <div class="popap-title">Не уходите! Мы хотим подарить вам $50!</div>
                <div class="popap-pretitle">
                    Оставьте ваши контактные данные и мы расскажем, как забрать подарок.                         
                </div>
                <div class="popap-form-wrapper">
                    <div class="popap-form">
                        <div class="input-wrapper">
                            <input type="text" placeholder="Введите ваше имя">
                            <input type="email" placeholder="Введите ваш E-mail">
                            <div class="tel-wrapper">
                                <input type="tel" placeholder="+38 ___ - __ - __ - ___">
                            </div>
                        </div>
                        <div class="button" id="popapExit">
                            Получить $50
                        </div>                    
                    </div>
                    <div class="numbers-wrapper">
                        <div class="numbers-title">Или звоните по телефонам:</div>
                        <a href="tel:(097) 500 03 20"><div class="numbers-item">(097) 500 03 20</div></a>
                        <a href="tel:(099) 500 03 20"><div class="numbers-item">(099) 500 03 20</div></a>
                    </div>
                </div>`;
            if(!currentStatus && typeof $('#main')[0].classList[0] == 'undefined')
            {
                $('.popap-wrapper').empty().append(popapItem);
                popapRefresh();
                $('.mask, .popap-wrapper').fadeIn();
                $('body').css({'overflow':'hidden','max-height':'100vh','height':'100vh'});
                currentStatus = true;
            }
        }
    });
    /*Buttons*/
    $('#call').on('click',function(){
        let popapItem = `
                <div class="close-but"><i class="fas fa-times"></i></div>
                <div class="popap-title">Нужна консультация?</div>
                <div class="popap-pretitle">
                    Оставьте ваши контакты и менеджер вам перезвонит.                         
                </div>
                <div class="popap-form-wrapper">
                    <div class="popap-form">
                        <div class="input-wrapper">
                            <input type="text" placeholder="Введите ваше имя">
                            <input type="email" placeholder="Введите ваш E-mail">
                            <div class="tel-wrapper">
                                <input type="tel" placeholder="+38 ___ - __ - __ - ___">
                            </div>
                        </div>
                        <div class="button" id="popapSend">
                            Отправить
                        </div>                    
                    </div>
                    <div class="numbers-wrapper">
                        <div class="numbers-title">Или звоните по телефонам:</div>
                        <a href="tel:(097) 500 03 20"><div class="numbers-item">(097) 500 03 20</div></a>
                        <a href="tel:(099) 500 03 20"><div class="numbers-item">(099) 500 03 20</div></a>
                    </div>
                </div>`;
        $('.popap-wrapper').empty().append(popapItem);
        popapRefresh();
        $('.mask, .popap-wrapper').fadeIn();
        $('body').css({'overflow':'hidden','max-height':'100vh','height':'100vh'});
    });
    $('#sign').on('click',function(){
        let popapItem = `
                <div class="close-but"><i class="fas fa-times"></i></div>
                <div class="popap-title">Спасибо за подписку!</div>
                <div class="popap-pretitle">
                    Пожалуйста, зайдите в вашу почту и перейдите по ссылке в письме, чтобы подтвердить подписку на рассылку и получать от нас полезные материалы без перебоев.                         
                </div>`;
        $('.popap-wrapper').empty().append(popapItem);
        popapRefresh();
        $('.mask, .popap-wrapper').fadeIn();
        $('body').css({'overflow':'hidden','max-height':'100vh','height':'100vh'});
    });
    function popapRefresh()
    {
        $('.popap-wrapper .close-but, .mask').on('click',function(){
            $('.mask, .popap-wrapper').fadeOut();
            $('body').css({'overflow':'visible','max-height':'100%','height':'100%'});
        });
        $(`.popap-wrapper input[type='tel']`).mask("+38  999 - 99 - 99 - 999");
    }    
});