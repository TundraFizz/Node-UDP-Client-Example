$(function(){
  $("#submit").click(function(){
    var name = $("#name").val();
    var msg  = $("#text").val();
    $("#text").val("");
    $.post("submit", {
      "name": name,
      "msg" : msg
    });
  });

  var socket = io();

  socket.on("testing", function(msg){
    var name = msg.name;
    var msg  = msg.msg;
    $("#messages").append(`<div>${name}: ${msg}</div>`);
  });
});
