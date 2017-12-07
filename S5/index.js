// window.onload = function () {
//   var req = [];
//   var buttonString = ["#A", "#B", "#C", "#D", "#E"];
//   Init(req, buttonString);

//   $("#button").mouseleave(function () {
//     $("#sequence").addClass("noshow");
//     clear(req);
//     Init(req, buttonString);
//   });

//   $("#button").mouseenter(function () {
//     buttonString.sort(function(){ return 0.5 - Math.random(); });
//     var sequence = "";
//     for (var i = 0; i < 5; i++) {
//       sequence += buttonString[i].substr(1)+(i == 4 ? "":"，");
//     }
//     $("#sequence").text(sequence).removeClass("noshow");
//     $(buttonString[0]).click();
//   });
// }

// function Init(req, buttonString) {
//   $("li").click(function() {
//     if($(this).hasClass("disable")) 
//       return;
//     $(this).children("span").removeClass("noshow");
//     $(this).siblings().removeClass('enable').addClass('disable');
//     var that = this;
//     var span = $(this).children("span");
//     req.push($.get($(this).text(),function(data){
//         $(span).text(data);
//         $(that).removeClass('enable').addClass('disable');
//         var ifall = true
//         for (var i = 0; i < $(that).siblings().length; i++) {
//           if ($($(that).siblings()[i]).children("span").hasClass("noshow")) {
//             $($(that).siblings()[i]).removeClass('disable').addClass('enable');
//             ifall = false;
//           }
//         }
//         if (ifall) {
//           $("#info-bar").removeClass('disable').addClass('enable');
//           setTimeout("$('#info-bar').click()", 500);
//         }
//       }).done(function () {
//         for (var i = 0; i < 5; i++) {
//           if ($(buttonString[i]).children("span").hasClass("noshow")) {
//             $(buttonString[i]).click();
//             break;
//           }
//         }
//       })
//     );
//     $(this).unbind("click");
//   });

//   $("#info-bar").click(function() {
//     if ($(this).hasClass("disable"))
//       return;
//     var sum = 0;
//     $.each($("span"), function(index, item){ 
// 		  sum+= parseInt($.trim($(item).text()));
//     });

//     $(this).text("楼主异步调用战斗力感人，目测不超过"+sum)
//            .removeClass('enable').addClass('disable');
//     $(this).click(function () {});
//   });
// }

// function clear(req) {
//   for (var i = 0; i < req.length; i++) {
//     req[i].abort();
//   }
//   req = [];
//   $("li").addClass("enable").removeClass("disable");
//   $("span").text("...").addClass("noshow");
//   $("#info-bar").text("").addClass("disable").removeClass("enable");
// }

window.onload = function () {
  
}

function aHandler(sum) {
  if($("#A").hasClass("disable")) 
      return;
  $("#A").children("span").removeClass("noshow");
  $("#A").siblings().removeClass('enable').addClass('disable');
  $.get($("#A").text(),function(data){
      sum += data;
      $("#A").children("span").text(data);
      $("#A").removeClass('enable').addClass('disable');
      var ifall = true;
      for (var i = 0; i < $("#A").siblings().length; i++) {
        if ($($("#A").siblings()[i]).children("span").hasClass("noshow")) {
          $($("#A").siblings()[i]).removeClass('disable').addClass('enable');
          ifall = false;
        }
      }
      if (ifall) {
        $("#info-bar").removeClass('disable').addClass('enable');
        setTimeout("$('#info-bar').click()", 500);
      }
    }).done(function () {
      for (var i = 0; i < 5; i++) {
        if ($(buttonString[i]).children("span").hasClass("noshow")) {
          $(buttonString[i]).click();
          break;
        }
      }
  });
}

function bHandler() {
  
}

function cHandler() {
  
}

function dHandler() {
  
}

function eHandler() {
  
}

function bubbleHandler() {

}