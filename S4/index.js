window.onload = function () {
  var req = [];
  var buttonString = ["#A", "#B", "#C", "#D", "#E"];
  Init(req, buttonString);

  $("#button").mouseleave(function () {
    $("#sequence").addClass("noshow");
    clear(req);
    Init(req, buttonString);
  });

  $("#button").mouseenter(function () {
    buttonString.sort(function(){ return 0.5 - Math.random(); });
    var sequence = "";
    for (var i = 0; i < 5; i++) {
      sequence += buttonString[i].substr(1)+(i == 4 ? "":"，");
    }
    $("#sequence").text(sequence).removeClass("noshow");
    $(buttonString[0]).click();
  });
}

function Init(req, buttonString) {
  $("li").click(function() {
    if($(this).hasClass("disable")) 
      return;
    $(this).children("span").removeClass("noshow");
    $(this).siblings().removeClass('enable').addClass('disable');
    var that = this;
    var span = $(this).children("span");
    console.log("click"+$(this).text());
    var r = $.ajax({
        url: $(this).text(), 
        success: function(data) {
          if ($(that).hasClass("disable")) 
            return;
          $(span).text(data);
          $(that).removeClass('enable').addClass('disable');
          for (var i = 0; i < 5; i++) {
            if ($(buttonString[i]).children("span").hasClass("noshow")) {
              $(buttonString[i]).removeClass('disable').addClass('enable').click();
              break;
            }
          }
          if (i == 5) {
            $("#info-bar").removeClass('disable').addClass('enable');
            setTimeout("$('#info-bar').click()", 500);
          }
        },
        error: function(data, error){
          console.log(error);
        },
        complete: function(){ 
          r = null;
        }
    });
    req.push(r);
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
    $(this).unbind("click");
  });
}

function clear(req) {
  console.log("length "+ req.length);
  while (req.length != 0) {
    var temp = req.shift();
    if (temp) temp.abort();
  }
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}