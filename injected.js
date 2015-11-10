warning = function(warning) {
  // document.addEventListener("DOMNodeInserted", null);
  var messages = document.getElementsByClassName('messages show');
  var element = messages[0];
  if(element && !(element.innerHTML.indexOf(warning) > -1)) {
    element.innerHTML += "<li><div class='message yours'>" + warning + "</div></li>";
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
  // do it in the messages screen too
  // for now just alert
  messages = document.getElementById("message_heading");
  if(messages && !(messages.innerHTML.indexOf(warning) > -1)) {
    messages.innerHTML += "<p>" + warning + "</p>";
  }
  // document.addEventListener("DOMNodeInserted", dom_inserted);
  // alert(warning);

  basic_info = document.getElementById("basic_info");
  if(basic_info && !(basic_info.innerHTML.indexOf(warning) > -1)) {
    basic_info.innerHTML += "<p>" + warning + "</p>";
  }
}

// dom_inserted = function(e) {
//   if(e.target.tagName)
//     var target = e.target.tagName.toLowerCase();
//   else
//     return false; // fail
//   // console.log(e.target.className);
//   // console.log("target: " + target);
//   if((target == "li" && e.target.className == "to_me") || (e.target.className == "enter_to_send_checkbox"))
//     check_for_bullshit();
// }

function check_msg(msg) {
  // console.log(msg);
  msg = msg.toLowerCase();
  if(msg.indexOf("skype") > -1) {
    warning("Warning: The remote party mentioned Skype. In the past Skype has been used to hijack video stream for scam purposes. Only Skype with people you know and trust.");
  } else if (msg.indexOf("text") > -1) {
    warning("Warning: If the remote party is asking you to text them right now, doing so would reveal your phone number, which can help build a profile on your identity.");
  } else if (msg.indexOf("name") > -1) {
    warning("Warning: The remote party may have asked your name. It is probably unwise to reveal this information.");
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function check_for_bullshit() {
  // console.log("ran");
  var theirs = document.getElementsByClassName("theirs");
  var message_body = document.getElementsByClassName("message_body");
  // console.log(theirs);
  // scan IM box
  check_name();
  check_picture_amounts()

  for(i = 0; i < theirs.length; i++) {
    msg = theirs[i].innerHTML;
    check_msg(msg);

  }
  // scan messages screen if IM wasn't scanned...
  if(theirs.length == 0) {
    for(i = 0; i < message_body.length; i++) {
      msg = message_body[i].innerHTML;
      check_msg(msg);
    }
  }
}

function check_picture_amounts() {
  user_name = jQuery('#basic_info_sn').html();
  amount = jQuery("img[alt*='" + user_name + "']").length

  if(amount == 1) {
    warning("User has only added one photo. Probable scam profile.")
  }
}

function check_name() {
  enemy = document.querySelector(".global_messaging > .header > .linkwrap > h2");
  if(enemy) {
    opponent_name = enemy.innerHTML;
    last_five = opponent_name.slice(-5);
    if(isNumeric(last_five)) {
      warning("This user's name appears bot-like. May be a scam profile.")
    }
  }
}


window.onload = function() {
  // console.log("I loaded!!!!");
  check_for_bullshit();

  setInterval(check_for_bullshit, 5000);

  // document.addEventListener("DOMNodeInserted", dom_inserted);

}