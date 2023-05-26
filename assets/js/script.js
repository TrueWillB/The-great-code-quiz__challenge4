// var answerButton1 = $("#answer-button-1");
// var answerButton2 = $("#answer-button-2");
// var answerButton3 = $("#answer-button-3");
// var answerButton4 = $("#answer-button-4");
// var answerList = $("answer-list");
// var quizCard = $("#quiz-card");
//var allAnswerButtons = $(".answer-button"); //selector that affects all of the answer buttons
var answerButtonHolder = $("#answer-button-holder");
var welcomeText = $("#welcome-text");
var descriptionText = $("#description-text");
var secondsLeft = $("#seconds-left");
var questionText = $("#question-text");
var questionNum;
var sec = 30;
var correctAnswers = 0;
var playerScore;
var submitButton = $("#submit-button");

var question0Array = [
  ["In JavaScript, what is a string?"],
  [
    "An affordable and enriching toy for your cat",
    "A sequence of one or more characters",
    "An array of characters",
    "A fundamental component of subatomic particles",
  ],
  [false, true, false, false],
];

var question1Array = [
  ["This is a second question"],
  ["answer 1", "answer 2", "answer 3", "answer 4"],
  [true, false, false, false],
];

//in the end, information on questions can be brought up the following way: questionsArray[question selector][question, answer, truth array][part of subarray]
questionsArray = [question0Array, question1Array];

function timerStart() {
  sec = 30;
  secondsLeft.text(sec);
  var timer = setInterval(function () {
    sec--;
    if (sec >= 0) {
      secondsLeft.text(sec);
    }
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}
function startUp() {
  //The first if statement only runs the quiz scripting if it is on the main quiz page
  if ($("body").is(".main-quiz-page")) {
    questionNum = -1;
    var answerButton = $("<button>");
    answerButton.addClass("answer-button d-flex w-auto btn btn-primary my-2");
    answerButton.text("Start");
    // descriptionText.hide();
    // welcomeText.hide();
    console.log("started fresh");
    // quizCard.children().eq(0).text("Did it work?");
    answerButtonHolder.append(answerButton);
  } else {
    scorePageStartup();
  }
}

answerButtonHolder.on("click", ".answer-button", function (event) {
  welcomeText.hide();
  descriptionText.hide();
  console.log($(event.target).attr("data-button-num"));
  // if (questionNum > -1) {
  //   console.log(
  //     questionsArray[questionNum][2][$(event.target).attr("data-button-num")]
  //   );
  // }
  if (questionNum == -1) {
    questionNum++;
    timerStart();
    newQuestion(questionNum);
    return;
  } else {
    answerHandler(event);
  }
});

function answerHandler(event) {
  if (
    questionsArray[questionNum][2][$(event.target).attr("data-button-num")] ==
    false
  ) {
    sec -= 10;
    if (sec > 0) {
      secondsLeft.text(sec);
    } else {
      sec = 0;
      secondsLeft.text(sec);
      console.log("ran out of time");
      endQuiz();
      return;
    }
  } else {
    questionNum++;
    if (questionNum < questionsArray.length) {
      console.log("Chose correctly and entered else");
      newQuestion(questionNum);
    } else {
      console.log("Finished Quiz");
      playerScore = sec;
      endQuiz();
      return;
    }
  }
}

//CONSIDER USING A FOR IN AND MAKING QUESTIONS INTO OBJECTS
function newQuestion(questionNum) {
  questionText.text(questionsArray[questionNum][0][0]);
  answerButtonHolder.empty();
  for (let i = 0; i < 4; i++) {
    //populates the answer buttons
    var answerButton = $("<button>");
    answerButton.addClass("answer-button d-block w-auto btn btn-primary my-2");
    answerButton.attr("data-button-num", i);
    answerButton.text(questionsArray[questionNum][1][i]);
    answerButtonHolder.append(answerButton);
  }
  // secondsLeft.text("30");
}

function endQuiz() {
  console.log(playerScore);
  localStorage.setItem("playerScore", playerScore);
  questionText.text("Quiz Over! Please click below to continue to score page");
  answerButtonHolder.empty();
  var answerButton = $("<a>", { href: "./highscores.html" });
  answerButton.addClass(
    "endingbutton-button d-block w-auto btn btn-primary my-2"
  );
  answerButton.text("Click to see and enter scores!");
  answerButtonHolder.append(answerButton);
}

function scorePageStartup() {
  // console.log("We're on the high score page now");
  // console.log(localStorage.getItem("playerScore"));
  $("#score-display-span").text(localStorage.getItem("playerScore"));
}

$("#name-submit-button").on("click", function (event) {
  event.preventDefault();
  submitNameShowScore();
});

function submitNameShowScore() {
  var storedHighScoreListObj = JSON.parse(
    localStorage.getItem("storedHighScoreListObj")
  );
  var playerScoreObj = {
    name: $("#name-input-box").val(),
    score: localStorage.getItem("playerScore"),
  };
  console.log("submit clicked");
  console.log(localStorage.getItem(storedHighScoreListObj));

  if (storedHighScoreListObj == null) {
    console.log("if part");
    storedHighScoreListObj = [playerScoreObj];
    localStorage.setItem(
      "storedHighScoreListObj",
      JSON.stringify(storedHighScoreListObj)
    );
  } else {
    console.log("player score: " + playerScore);
    storedHighScoreListObj.push(playerScoreObj);
    console.log(storedHighScoreListObj);
    localStorage.setItem(
      "storedHighScoreListObj",
      JSON.stringify(storedHighScoreListObj)
    );
  }
  $("#name-entry-container").empty();
}

startUp();
// newQuestion();
