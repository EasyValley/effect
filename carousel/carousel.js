;
(function ($) {
    function carousel(carouselUl, carouselOl, speed) {
        var $ul = $(carouselUl);
        var ul = $ul[0];
        var $lis = $ul.find('li');
        var liWidth = $lis.width();
        var liAmount = $lis.length;
        var flag = true;
        var $ol = $(carouselOl);
        var $olLis = $ol.find('li');
        var timer = null;

        function animate(dom, target) {
            dom.timer = setInterval(function () {
                var left = $(dom).position().left;
                var distance = target - left;
                var step = Math.ceil(Math.abs(distance / 5));
                if (Math.abs(distance) < 5) {
                    clearInterval(dom.timer);
                    dom.style.left = target + 'px';
                    flag = true;
                } else {
                    step = distance > 0 ? step : -step;
                    dom.style.left = left + step + 'px';
                }

            }, 20);
        }

        var index = 0;

        function loop(speed) {
            timer = setInterval(function () {
                if (flag) {
                    flag = false;
                    index++;
                    if (index >= liAmount - 1) {
                        ul.style.left = 0;
                        index = 1;
                    }
                    var target = -index * liWidth;
                    $olLis.removeClass();
                    $olLis.eq(index - 1).addClass('active');
                    animate(ul, target);
                }
            }, speed);
        }

        loop(speed);

        var startX = 0;
        var touchStartX = 0;
        var moveX = 0;
        var distanceX = 0;

        $ul.on('touchstart', function (e) {
            clearInterval(ul.timer);
            clearInterval(timer);
            startX = e.touches[0].clientX;
            touchStartX = e.touches[0].clientX;
        });

        $ul.on('touchmove', function (e) {
            e.preventDefault();
            clearInterval(ul.timer);
            clearInterval(timer);
            moveX = e.touches[0].clientX - startX;
            startX = e.touches[0].clientX;
            ul.style.left = $ul.position().left + moveX + 'px';
        });

        $ul.on('touchend', function (e) {
            clearInterval(ul.timer);
            clearInterval(timer);
            distanceX = e.changedTouches[0].clientX - touchStartX;
            if (distanceX > 60) {
                index--;
                if (index <= 0) {
                    index = liAmount - 2;
                    ul.style.left = -(liAmount - 2) * liWidth + 'px';
                } else {
                    var target = -index * liWidth;
                    animate(ul, target);
                }

            } else if (distanceX < -60) {
                index++;
                if (index >= liAmount - 1) {
                    index = 1;
                    ul.style.left = -index * liWidth + 'px';
                } else {
                    target = -index * liWidth;
                    animate(ul, target);
                }

            } else {
                target = -index * liWidth;
                animate(ul, target);
            }

            $olLis.removeClass();
            $olLis.eq(index - 1).addClass('active');
            loop(speed);
        });
    }

    $.fn.carousel = carousel;
})($);