var req = [];
window.onload = function () {
  $("li").click(handler);
  $("#button").mouseleave(clear);
  $("#button").mouseenter(Init);
}

function handler () {
  $(this).children("span").removeClass("noshow");
  var that = this;
  req.push($.get($(this).text(), function (data) {
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
  }));
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
  while (req.length != 0) {
    var r = req.shift();
    if (r) r.abort();
  }
  $("#sequence").addClass("noshow");
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}

function Init () {
  $(".apb").bind("click", function () {
    $("li").click();
    $(this).unbind("click");
  });
}