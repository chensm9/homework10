window.onload = function () {
  $("#button").mouseleave(clear);
  $("#button").mouseenter(Init);
}

function aHandler (sum) {
  return handler("#A", sum, "A:这是个天大的秘密");
}

function bHandler (sum) {
  return handler("#B", sum, "B:我不知道");
}

function cHandler (sum) {
  return handler("#C", sum, "C:你不知道");
}

function dHandler (sum) {
  return handler("#D", sum, "D:他不知道");
}

function eHandler (sum) {
  return handler("#E", sum, "E:才怪");
}

function showMessage (message) {
  if ($("#message").hasClass("noshow"))
    $("#message").removeClass("noshow");
  $('#message').html($('#message').html()+message+"<br/>");
}

function handler (id, sum, message) {
  //message的否定形式
  var nega_message = {
    "A:这是个天大的秘密": "A:这个秘密我们都知道",
    "B:我不知道": "B:我知道",
    "C:你不知道": "C:你知道",
    "D:他不知道": "D:他知道",
    "E:才怪": "E:讲真"
  }
  $(id).children("span").text("...").removeClass("noshow");
  $(id).siblings().removeClass('enable').addClass('disable');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: id.substr(1), 
      success: data => {
        if ($(id).hasClass("disable")
            ||$(id).children("span").hasClass("noshow")
            ||$(id).children("span").text() != "...") 
          return;
        sum += parseInt(data);
        $(id).children("span").text(data);
        $(id).removeClass('enable').addClass('disable');
        for (var i = 0; i < $(id).siblings().length; i++) {
          if ($($(id).siblings()[i]).children("span").hasClass("noshow")) {
            $($(id).siblings()[i]).removeClass('disable').addClass('enable');
          }
        }

        //随机失败，概率五五开
        if (Math.random() >= 0.5) {
          //成功，输出信息，返回sum
          showMessage(message);
          resolve(sum);
        } else {
          //失败，不输出信息，返回message的否定和currentSum
          resolve({
            currentSum: sum, 
            message: nega_message[message]
          });
        }
        
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
}

function clear () {
  $("#message").addClass("noshow").html("");
  $("#sequence").addClass("noshow");
  $("li").addClass("enable").removeClass("disable");
  $("span").text("").addClass("noshow");
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
    };

    ID.sort(function(){ return 0.5 - Math.random(); });
    var sequence = "";
    for (var i = 0; i < 5; i++) {
      sequence += ID[i] + ( i == 4 ? "":"，" );
    }
    $("#sequence").text(sequence).removeClass("noshow");
    var sum = 0;
    handers[ID[0]](sum)
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(sum.message);
        return handers[ID[1]](sum.currentSum);
      }
      return handers[ID[1]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(sum.message);
        return handers[ID[2]](sum.currentSum);
      }
      return handers[ID[2]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(sum.message);
        return handers[ID[3]](sum.currentSum);
      }
      return handers[ID[3]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(sum.message);
        return handers[ID[4]](sum.currentSum);
      }
      return handers[ID[4]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(sum.message);
        return bubbleHandler(sum.currentSum);
      }
      return bubbleHandler(sum);
    })
  })
}