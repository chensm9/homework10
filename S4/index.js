window.onload = function () {
  $("#button").mouseleave(clear);
  $("#button").mouseenter(Init);
}

function aHandler (sum) {
  return handler("#A", sum);
}

function bHandler (sum) {
  return handler("#B", sum);
}

function cHandler (sum) {
  return handler("#C", sum);
}

function dHandler (sum) {
  return handler("#D", sum);
}

function eHandler (sum) {
  return handler("#E", sum);
}

function handler (id, sum) {
  $(id).children("span").removeClass("noshow");
  $(id).siblings().removeClass('enable').addClass('disable');
  return new Promise((resolve, reject) => {
    $.get(id.substr(1), function (data) {
      if ($(id).hasClass("disable")||$(id).children("span").hasClass("noshow")) 
        return;
      sum += parseInt(data);
      $(id).children("span").text(data);
      $(id).removeClass('enable').addClass('disable');
      for (var i = 0; i < $(id).siblings().length; i++) {
        if ($($(id).siblings()[i]).children("span").hasClass("noshow")) {
          $($(id).siblings()[i]).removeClass('disable').addClass('enable');
        }
      }
      resolve(sum);
    });
  });
}

function bubbleHandler (sum) {
  $("#info-bar").removeClass('disable').addClass('enable');
  setTimeout("$('#info-bar').text("+sum+").addClass('disable').removeClass('enable');", 500);
}

function clear () {
  $("#sequence").addClass("noshow");
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}

function Init () {
  $(".apb").bind("click", function () {
    $(this).unbind("click");
    var ID = ["A", "B", "C", "D", "E"];
    var handers = {
      "A": aHandler,
      "B": bHandler,
      "C": cHandler,
      "D": dHandler,
      "E": eHandler
    }
    ID.sort(function(){ return 0.5 - Math.random(); });
    var sequence = "";
    for (var i = 0; i < 5; i++) {
      sequence += ID[i] + ( i == 4 ? "":"，" );
    }
    $("#sequence").text(sequence).removeClass("noshow");
    var sum = 0;
    handers[ID[0]](sum).then(
      sum => { handers[ID[1]](sum).then (
        sum => { handers[ID[2]](sum).then (
          sum => { handers[ID[3]](sum).then ( 
            sum => { handers[ID[4]](sum).then ( 
              sum => { bubbleHandler(sum);
              })
            });
          });
        });
      });
  })
}