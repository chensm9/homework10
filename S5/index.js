window.onload = function () {
  $("#button").mouseleave(clear);
  $("#button").mouseenter(Init);
}

function aHandler (sum) {
  $('#message').text("这是个天大的秘密");
  return handler("#A", sum);
}

function bHandler (sum) {
  $('#message').text("我不知道");
  return handler("#B", sum);
}

function cHandler (sum) {
  $('#message').text("你不知道");
  return handler("#C", sum);
}

function dHandler (sum) {
  $('#message').text("他不知道");
  return handler("#D", sum);
}

function eHandler (sum) {
  $('#message').text("才怪");
  return handler("#E", sum);
}

function handler (id, sum) {
  $(id).children("span").removeClass("noshow");
  $(id).siblings().removeClass('enable').addClass('disable');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: id.substr(1), 
      success: data => {
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
      },
      error: error => {
        console.log(error);
      }
    });
  });
}

function bubbleHandler (sum) {
  $("#info-bar").removeClass('disable').addClass('enable');
  var message = "楼主异步调用战斗力感人，目测不超过" + sum;
  setTimeout("$('#info-bar').text('"+message+"')", 500);
  $("#message").addClass("noshow");
}

function clear () {
  $("#message").addClass("noshow");
  $("#sequence").addClass("noshow");
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("").addClass("disable").removeClass("enable");
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
    $("#message").removeClass("noshow");
    var sum = 0;
    handers[ID[0]](sum)
    .then(sum => { return handers[ID[1]](sum);})
    .then(sum => { return handers[ID[2]](sum);})
    .then(sum => { return handers[ID[3]](sum);})
    .then(sum => { return handers[ID[4]](sum);})
    .then(sum => { bubbleHandler(sum);});
  })
}