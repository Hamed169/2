$(document).ready(function() {
    $(".Order__List--ShiDet .Order__Accordion").on("click", function() {
        $(this).parents(".Order__List__UL").find(".Ship__Detail--Wrapper").slideToggle();
        $(this).parents(".Order__List__UL").toggleClass("active");
        $("html,body").animate({
            scrollTop: $(this).parents(".Order__List__UL").offset().top - 50
        }, 1000);
    });
    $(".notifications-form .button").on("click", function() {
        $(".notifications-form").submit();
    });

    $("#promo_code").on("click", function(event) {
        event.stopPropagation();
        $('body').toggleClass('promo_code_box');
    });

    $(document).on('click', function(event) {
        if($("body").hasClass("promo_code_box") && $(event.target).attr("class") != "promo_popup" && $(event.target).parents().attr("class") != "promo_popup") {
            $('body').toggleClass('promo_code_box');
        }
    });
});