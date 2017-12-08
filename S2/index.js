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
      error: error=> {
        console.log(error);
      }
  });
  });
}

function bubbleHandler (sum) {
  $("#info-bar").removeClass('disable').addClass('enable');
  setTimeout("$('#info-bar').text("+sum+").addClass('disable').removeClass('enable');", 500);
}

function clear () {
  $("li").addClass("enable").removeClass("disable");
  $("span").text("...").addClass("noshow");
  $("#info-bar").text("?").addClass("disable").removeClass("enable");
}

function Init () {
  $(".apb").bind("click", function () {
    var sum = 0;
    aHandler(sum)
    .then(sum => { return bHandler(sum)})
    .then(sum => { return cHandler(sum)})
    .then(sum => { return dHandler(sum)})
    .then(sum => { return eHandler(sum)})
    .then(sum => { bubbleHandler(sum)});
    $(this).unbind("click");
  });
}