window.onload = function () {
  $("#button").mouseleave(clear);
  $("#button").mouseenter(Init);
}

function aHandler (sum) {
  return handler("#A", sum, "这是个天大的秘密");
}

function bHandler (sum) {
  return handler("#B", sum, "我不知道");
}

function cHandler (sum) {
  return handler("#C", sum, "你不知道");
}

function dHandler (sum) {
  return handler("#D", sum, "他不知道");
}

function eHandler (sum) {
  return handler("#E", sum, "才怪");
}

function showMessage (message) {
  if ($("#message").hasClass("noshow"))
    $("#message").removeClass("noshow");
  $('#message').text(message);
}

function handler (id, sum, message) {
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

        //随机失败，概率五五开
        if (Math.random() >= 0.5) {
          showMessage(message);
          resolve(sum);
        } else {
          resolve({
            currentSum: sum, 
            message: message
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
    };

    //message的否定形式
    var nega_message = {
      "你不知道": "你知道",
      "我不知道": "我知道",
      "他不知道": "他知道",
      "才怪": "讲真",
      "这是个天大的秘密": "这个秘密我们都知道",
    }
    ID.sort(function(){ return 0.5 - Math.random(); });
    var sequence = "";
    for (var i = 0; i < 5; i++) {
      sequence += ID[i] + ( i == 4 ? "":"，" );
    }
    $("#sequence").text(sequence).removeClass("noshow");
    // $("#message").removeClass("noshow");
    var sum = 0;
    handers[ID[0]](sum)
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(nega_message[sum.message]);
        return handers[ID[1]](sum.currentSum);
      }
      return handers[ID[1]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(nega_message[sum.message]);
        return handers[ID[2]](sum.currentSum);
      }
      return handers[ID[2]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(nega_message[sum.message]);
        return handers[ID[3]](sum.currentSum);
      }
      return handers[ID[3]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(nega_message[sum.message]);
        return handers[ID[4]](sum.currentSum);
      }
      return handers[ID[4]](sum);
    })
    .then(sum => { 
      if (sum.message != undefined) {
        showMessage(nega_message[sum.message]);
        return bubbleHandler(sum.currentSum);
      }
      return bubbleHandler(sum);
    })
  })
}