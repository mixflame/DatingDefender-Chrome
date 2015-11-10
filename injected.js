warning = function(warning) {
  // document.addEventListener("DOMNodeInserted", null);
  var messages = document.getElementsByClassName('messages show');
  var element = messages[0];
  if(element) {
    element.innerHTML += "<li><div class='message yours'>" + warning + "</div></li>";
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
  // do it in the messages screen too
  // for now just alert
  messages = document.getElementById("message_heading");
  if(messages) {
    messages.innerHTML += "<p>" + warning + "</p>";
  }
  // document.addEventListener("DOMNodeInserted", dom_inserted);
  // alert(warning);
}

dom_inserted = function(e) {
  if(e.target)
    var target = e.target.tagName.toLowerCase();
  else
    return false; // fail
  // console.log("target: " + target);
  if(target == "li" && target.className == "to_me")
    check_for_bullshit();
}


check_for_bullshit = function() {
  var theirs = document.getElementsByClassName("theirs");
  var message_body = document.getElementsByClassName("message_body");
  console.log(theirs);
  // scan IM box
  for(i = 0; i < theirs.length; i++) {
    msg = theirs[i].innerHTML;
    console.log(msg);
    if((msg.indexOf("skype") > -1) || (msg.indexOf("Skype") > -1)) {
      warning("Warning: The remote party mentioned Skype. In the past Skype has been used to hijack video stream for scam purposes. Only Skype with people you know and trust.");
    } else if ((msg.indexOf("text") > -1) || (msg.indexOf("Text") > -1)) {
      warning("Warning: If the remote party is asking you to text them right now, doing so would reveal your phone number, which can help build a profile on your identity.");
    }
  }
  // scan messages screen
  for(i = 0; i < message_body.length; i++) {
    msg = message_body[i].innerHTML;
    console.log(msg);
    if((msg.indexOf("skype") > -1) || (msg.indexOf("Skype") > -1)) {
      warning("Warning: The remote party mentioned Skype. In the past Skype has been used to hijack video stream for scam purposes. Only Skype with people you know and trust.");
    } else if ((msg.indexOf("text") > -1) || (msg.indexOf("Text") > -1)) {
      warning("Warning: If the remote party is asking you to text them right now, doing so would reveal your phone number, which can help build a profile on your identity.");
    }
  }
}


window.onload = function() {
  console.log("I loaded!!!!");
  check_for_bullshit();

  document.addEventListener("DOMNodeInserted", dom_inserted);

  // document.getElementsByClassName('maximize')[0].addEventListener('click', dom_inserted);
}