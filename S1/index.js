window.onload = function () {
  Init();

  $("#button").mouseleave(function () {
    clear();
    Init();
  });
}

function Init() {
  $("li").click(function() {
    if($(this).hasClass("disable")) 
      return;
    $(this).children("span").removeClass("noshow");
    $(this).siblings().removeClass('enable').addClass('disable');
    var that = this;
    var span = $(this).children("span");
    $.get($(this).text(),function(data){
      if ($(that).children("span").hasClass("noshow")) 
        return;
      $(span).text(data);
      $(that).removeClass('enable').addClass('disable');
      var ifall = true
      for (var i = 0; i < $(that).siblings().length; i++) {
        if ($($(that).siblings()[i]).children("span").hasClass("noshow")) {
          $($(that).siblings()[i]).removeClass('disable').addClass('enable');
          ifall = false;
        }
      }
      if (ifall) {
        $("#info-bar").removeClass('disable').addClass('enable');
      }
    });
    $(this).unbind("click");
  });

  $("#info-bar").click(function() {
    if ($(this).hasClass("disable"))
      return;
    var sum = 0;
    $.each($("span"), function(index, item){ 
		  sum+= parseInt($.trim($(item).text()));
    });

    $(this).text(sum).removeClass('enable').addClass('disable');
    $(this).click(function () {});
  });
}

function clear() {
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}