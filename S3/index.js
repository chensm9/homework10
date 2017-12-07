window.onload = function () {
  $("#button").mouseleave(clear);
  $("#button").mouseenter(Init);
}

function handler () {
  $(this).children("span").removeClass("noshow");
  var that = this;
  $.get($(this).text(), function (data) {
    if ($(that).hasClass("disable")||$(that).children("span").hasClass("noshow"))
      return;
    $(that).children("span").text(data);
    $(that).removeClass('enable').addClass('disable');
    var ifall = true;
    for (var i = 0; i < $(that).siblings().length; i++) {
      if ($($(that).siblings()[i]).children("span").text() == "...") {
        $($(that).siblings()[i]).removeClass('disable').addClass('enable');
        ifall = false;
      }
    }
    if (ifall) 
      bubbleHandler();
  });
  $(this).unbind("click");
}

function bubbleHandler () {
  var sum = 0;
  $.each($("span"), function(index, item){ 
    sum+= parseInt($.trim($(item).text()));
  });
  $("#info-bar").removeClass('disable').addClass('enable');
  setTimeout("$('#info-bar').text("+sum+").addClass('disable').removeClass('enable');", 500);
}

function clear () {
  $('#info-bar').text("?");
  $("#sequence").addClass("noshow");
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("").addClass("disable").removeClass("enable");
}

function Init () {
  $("li").click(handler);
  $("li").click();
}