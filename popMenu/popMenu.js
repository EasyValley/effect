$('#btn').on('touchstart', function () {
    $('.mask-container').removeClass('fn-hide');
    setTimeout(function () {
        $('.mask-container').find('div').addClass('active');
    }, 1);
});
var $mask = $('.mask-container').eq(0);

$mask.on('touchstart', function (e) {
    e.preventDefault();
    if ($mask.get(0) == e.target) {
        $(this).find('div').removeClass('active');
        setTimeout(function () {
            $('.mask-container').addClass('fn-hide');
        }, 200);
    }

});
