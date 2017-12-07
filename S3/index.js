window.onload = function () {
  var req = [];
  Init(req);

  $("#button").mouseleave(function () {
    clear(req);
    Init(req);
  });

  $("#button").mouseenter(function () {
    $("li").click();
  });
}

function Init(req) {
  $("li").click(function() {
    if($(this).hasClass("disable")) 
      return;
    $(this).children("span").removeClass("noshow");
    var that = this;
    req.push($.get($(this).text(), function(data){
        $(that).children("span").text(data);
        $(that).removeClass('enable').addClass('disable');
        var ifall = true
        for (var i = 0; i < $(that).siblings().length; i++) {
          if ($($(that).siblings()[i]).children("span").text() == "...") {
            $($(that).siblings()[i]).removeClass('disable').addClass('enable');
            ifall = false;
          }
        }
        if (ifall) {
          $("#info-bar").removeClass('disable').addClass('enable');
          setTimeout("$('#info-bar').click()", 500);
        }
      })
    );
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

function clear(req) {
  while (req.length != 0) {
    var temp = req.shift();
    if (temp) temp.abort();
  }
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}