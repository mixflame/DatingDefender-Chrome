console.log("Loading DatingDefender...");

warning = function(warning, im) {
  // console.log(warning);
  //  put it in the IM
  var messages = document.getElementsByClassName('messages show');
  var element = messages[0];
  if(element && !(element.innerHTML.indexOf(warning) > -1) && (im == true)) {
    warning = warning + " This message was only shown to you.";
    var li = document.createElement("li");
    var div = document.createElement("div");
    div.style.cssText = 'color: red; font-weight: bold; background: black;';
    div.className = "message yours"
    div.innerHTML = warning;
    li.appendChild(div);
    element.appendChild(li);
    // element.innerHTML += "<li><div class='message yours' style='color: red; font-weight: bold; background: black;'>" + warning + "</div></li>";
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
  // this will warn on any screen
  messages = document.getElementById("main_content");
  if(messages && !(messages.innerHTML.indexOf(warning) > -1) && (im == false)) {
    var p = document.createElement("p");
    p.style.cssText = 'color: red; font-weight: bold;';
    p.innerHTML = warning;
    messages.insertBefore(p, messages.firstChild);
    // messages.innerHTML = "<p style='color: red; font-weight: bold;'>" + warning + "</p>" + messages.innerHTML;
    messages.scrollTop = 0;
  }
  // not needed since we now warn on any screen
  // leaving it in in case it comes in handy later
  // basic_info = document.querySelector("div[class*='userinfo']");
  // if(basic_info && !(basic_info.innerHTML.indexOf(warning) > -1) && (im == false)) {
  //   var p = document.createElement("p");
  //   p.style.cssText = 'color: red; font-weight: bold;';
  //   p.innerHTML = warning;
  //   basic_info.appendChild(p);
  //   // basic_info.innerHTML += "<p style='color: red; font-weight: bold;'>" + warning + "</p>";
  // }
}

function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return email.match(re);
}

function check_msg(msg, im) {
  // console.log(msg);
  msg = msg.toLowerCase();
  if(scan_for_word("skype", msg)) {
    warning("Warning: The remote party mentioned Skype. In the past Skype has been used to hijack video stream for scam purposes. Only Skype with people you know and trust.", im);
  } else if (scan_for_word("text", msg)) {
    warning("Warning: If the remote party is asking you to text them right now, doing so would reveal your phone number, which can help build a profile on your identity.", im);
  } else if (scan_for_word("name", msg)) {
    warning("Warning: The remote party may have asked for your full name. Do not reveal personal identity information unless absolutely necessary.", im);
  } else if (validateEmail(msg) != null) {
    warning("Warning: This message seems to contain an email. Don't email unless absolutely necessary. Your email can be used to look up your profile on a lot of sites.", im)
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function scan_for_word(word, msg) {
  current_word = "";
  current_word_position = 0;
  for(var i = 0; i < msg.length; i++){
    if(word[current_word_position] == msg[i] && msg[i] != " "){
      current_word = current_word + word[current_word_position];
      current_word_position = current_word_position + 1;
      if(current_word == word) break;
    } else if((msg[i] != " ") && (word[current_word_position] != msg[i])) {
      current_word = "";
      current_word_position = 0;
    }
  }
  return (current_word == word);
}

function check_for_bullshit() {
  var theirs = document.getElementsByClassName("theirs");
  var message_body = document.querySelectorAll(".to_me > .message > .message_body");

  // scan IM box
  check_name();
  check_picture_amounts();

  for(var i = 0; i < theirs.length; i++) {
    msg = theirs[i].innerHTML;
    check_msg(msg, true);

  }
  // scan messages screen if IM wasn't scanned...
  if(theirs.length == 0) {
    for(var i = 0; i < message_body.length; i++) {
      msg = message_body[i].innerHTML;
      check_msg(msg, false);
    }
  }
}

function check_picture_amounts() {
  if(document.querySelector("div[class*='userinfo']"))
  {
    // we stopped using this method. OKCupid changed their site.
    // user_name = document.querySelector("div[class*='basics-username']");
    // user_name = (user_name.innerText || user_name.textContent).trim()
    amount = document.querySelectorAll("img[src*='225x225']").length; // there will always be two profile pictures.
    if(amount == 1) {
      warning("User has only added one photo. Possible scam profile.", false)
    }
  }
}

function check_name() {
  enemy = document.querySelector(".global_messaging > .header > .linkwrap > h2");
  if(enemy) {
    opponent_name = enemy.innerHTML;
    last_five = opponent_name.slice(-5);
    if(isNumeric(last_five)) {
      warning("This user's name appears bot-like. Possible scam profile.", false)
    }
  }
}

console.log("DatingDefender 2.2 initialized");

check_for_bullshit();

setInterval(check_for_bullshit, 1000);
