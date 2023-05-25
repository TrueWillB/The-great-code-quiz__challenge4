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

var question0Array = [
  ["In JavaScript, what is a string?"],
  [
    "An affordable and enriching toy for your cat",
    "A sequence of one or more characters",
    "An array of characters",
    "A fundamental component of subatomic particles",
  ],
  [false, false, true, false],
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
    secondsLeft.text(sec);
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}
function startUp() {
  questionNum = -1;
  var answerButton = $("<button>");
  answerButton.addClass("answer-button d-flex w-auto btn btn-primary my-2");
  answerButton.text("Start");
  // descriptionText.hide();
  // welcomeText.hide();
  console.log("started fresh");
  // quizCard.children().eq(0).text("Did it work?");
  answerButtonHolder.append(answerButton);
}

answerButtonHolder.on("click", ".answer-button", function (event) {
  console.log($(event.target).attr("data-button-num"));
  if (questionNum == -1) {
    questionNum++;
    timerStart();
    newQuestion(questionNum);
    return;
  } else {
    if (
      questionsArray[questionNum][2][$(event.target).attr("data-button-num")] ==
      false
    ) {
      sec -= 10; //I need to fix this so that it goes to 0 rather than going negative if there are less than 10 seconds left
      secondsLeft.text(sec);
    }
  }
});

function newQuestion(questionNum) {
  questionText.text(questionsArray[questionNum][0][0]);
  answerButtonHolder.empty();
  for (let i = 0; i < 4; i++) {
    var answerButton = $("<button>");
    answerButton.addClass("answer-button d-block w-auto btn btn-primary my-2");
    answerButton.attr("data-button-num", i);
    answerButton.text(questionsArray[questionNum][1][i]);
    answerButtonHolder.append(answerButton);
  }
  // secondsLeft.text("30");
}
startUp();
// newQuestion();
