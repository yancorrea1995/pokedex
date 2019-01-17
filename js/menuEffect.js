$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});

$('.searchbox-input').on('keyup',function () {
    console.log(filter);
    var filter = $(this).val();
    $(".card").show();
    $('.mypokemonscards').find(".card-title:not(:contains(" + filter + "))").parent().parent().parent().css('display','none');
});