import "./scroll-timeline.js";

$(".select_item").click(function () {
    $(this).addClass('active');
    if ($(this).siblings().hasClass("active")) {
      $(this).siblings().removeClass("active");
    }
    const index = $(this).closest(".product_select").index();
    const last = $(".product_select:last").index();
    if (index == last ) return 0;
    console.log(index)
    // console.log(last)
    
    const height = $(this).parents(".product_select").next('.product_select').offset();
    $("html, body").animate({ scrollTop: height.top }, 500);

});
