;(function($){
  function fullPageSlide(selector){
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currentY = 0;
    var i = 0;
    var $main = $(selector);
    var $body = $('body');
    var $sections = $main.find('section');
    var height = window.innerHeight;
    $(window).on('resize', function () {
        height = window.innerHeight;
    });
    $body.on('touchstart', function (e) {
        $main.removeClass('active');
        startY = e.touches[0].clientY;
        currentY = e.touches[0].clientY;
    });

    $body.on('touchmove', function (e) {
        e.preventDefault();
        var nowY = e.touches[0].clientY;
        moveY = nowY - currentY;
        currentY = nowY;
        $main.css('top', $main.position().top + moveY);
    });

    $body.on('touchend', function (e) {
        var len = $main.find('section').length;
        $main.addClass('active');
        distanceY = e.changedTouches[0].clientY - startY;

        if (distanceY < -80) {
            i++;

            if (i >= len) {
                i = len - 1;
            }
            $main.css('top', -i * height);
        } else if (distanceY > 80) {
            i--;
            if (i <= 0) {
                i = 0;
            }
            $main.css('top', -i * height);
        } else {
            $main.css('top', -i * height);
        }

    });
  }

  $.fn.fullPageSlide = fullPageSlide;
})($);
