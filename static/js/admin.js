function UpdateAccounts(){
  $.post("update-accounts", function(data){
    alert(data["message"]);
  });
}
