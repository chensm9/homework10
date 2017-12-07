window.onload = function () {
  var buttonString = ["#A", "#B", "#C", "#D", "#E"];
  Init( buttonString);

  $("#button").mouseleave(function () {
    $("#sequence").addClass("noshow");
    clear();
    Init(buttonString);
  });

  $("#button").mouseenter(function () {
    buttonString.sort(function(){ return 0.5 - Math.random(); });
    var sequence = "";
    for (var i = 0; i < 5; i++) {
      sequence += buttonString[i].substr(1) + (i == 4 ? "":"，");
    }
    $("#sequence").text(sequence).removeClass("noshow");
    $(buttonString[0]).click();
  });
}

function Init(buttonString) {
  $("li").click(function() {
    if($(this).hasClass("disable")) 
      return;
    $(this).children("span").removeClass("noshow");
    $(this).siblings().removeClass('enable').addClass('disable');
    var that = this;
    var span = $(this).children("span");
    $.ajax({
        url: $(this).text(), 
        success: function(data) {
          if ($(that).hasClass("disable")||$(that).children("span").hasClass("noshow")) 
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

function clear() {
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}