let audio1 = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
);
function chatOpen() {
  document.getElementById("chat-open").style.display = "none";
  document.getElementById("chat-close").style.display = "block";
  document.getElementById("chat-window1").style.display = "block";

  audio1.load();
  audio1.play();
}
function chatClose() {
  document.getElementById("chat-open").style.display = "block";
  document.getElementById("chat-close").style.display = "none";
  document.getElementById("chat-window1").style.display = "none";
  document.getElementById("chat-window2").style.display = "none";

  audio1.load();
  audio1.play();
}
function openConversation() {
  document.getElementById("chat-window2").style.display = "block";
  document.getElementById("chat-window1").style.display = "none";

  audio1.load();
  audio1.play();
}

function maximizeChat() {
  var chatWindow = document.getElementById("chat-window2");
  chatWindow.style.width = "50%";
  chatWindow.style.height = "80%";

  document.getElementById("messageBox").style.height = "70%";

  //hide minimize button
  document.getElementById("minimize-chat").style.display = "block";
  document.getElementById("maximize-chat").style.display = "none";
}

function minimizeChat() {
  var chatWindow = document.getElementById("chat-window2");
  chatWindow.style.width = "450px";
  chatWindow.style.height = "434px";
  document.getElementById("messageBox").style.height = "60%";
  document.getElementById("minimize-chat").style.display = "none";
  document.getElementById("maximize-chat").style.display = "block";
}

function userResponse() {
  console.log("response");
  let userText = document.getElementById("textInput").value;
  let sessionId = document.getElementById("sessionId").value;

  if (userText == "") {
    alert("Please type something!");
  } else {
    document.getElementById("messageBox").innerHTML += `<div class="first-chat">
        <p>${userText}</p>
      </div>`;
    let audio3 = new Audio(
      "https://prodigits.co.uk/content/ringtones/tone/2020/alert/preview/4331e9c25345461.mp3"
    );
    audio3.load();
    audio3.play();

    document.getElementById("textInput").value = "";
    var objDiv = document.getElementById("messageBox");
    objDiv.scrollTop = objDiv.scrollHeight;

    setTimeout(() => {
      adminResponse(userText, sessionId);
    }, 1000);
  }
}

function adminResponse(question, sessionId) {
  // Add typing animation
  document.getElementById("messageBox").innerHTML += `
        <div class="second-chat">
        <div class="circle" id="circle-mar"><i class="fa-solid fa-hippo"></i></div>
            <div class="container second">
                <div class="snippet" data-title="dot-flashing">
                    <div class="stage">
                    <div class="dot-flashing"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

  fetch("https://9ykobwf7h7.execute-api.us-east-1.amazonaws.com/prod/docs", {
    method: "POST",
    body: JSON.stringify({ question: question, requestSessionId: sessionId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((answer) => {
      let response = answer.response;
      response = response.replace(/\n/g, '<br/>');

      // set value of the element with id sessionId with sessionId from answer
      document.getElementById("sessionId").value = answer.sessionId;

      document.querySelector(".snippet:last-child").outerHTML = response;

      let audio3 = new Audio(
        "https://downloadwap.com/content2/mp3-ringtones/tone/2020/alert/preview/56de9c2d5169679.mp3"
      );
      audio3.load();
      audio3.play();

      var objDiv = document.getElementById("messageBox");
      objDiv.scrollTop = objDiv.scrollHeight;
    })
    .catch((error) => {
      console.log(error);
    });
}

addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent the default action (new line)
    const textarea = document.getElementById("textInput");
    if (textarea === document.activeElement) {
      userResponse();
    }
  }
});
