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
var stopTimer = false;

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
  ["Which is a situation in which a loop would be used in JS?"],
  [
    "To repeat a defined set of instructions until a defined condition is met",
    "To declare a variable",
    "To rapidly travel around the perimeter of a city center",
    "To call, or 'loop in,' a web api",
  ],
  [true, false, false, false],
];

var question2Array = [
  ["What is bootstrap in JS?"],
  [
    "A way of fastening boots to your feet",
    "A coding design philosophy for efficient generation of software",
    "A coding language",
    "A Third-party api used for design",
  ],
  [false, false, false, true],
];

var question3Array = [
  [
    "In JS, what should the actual instructions to be executed in a function be enclosed in?",
  ],
  ["[]", "{}", "''", "An envelope with the proper amount of postage"],
  [false, true, false, false],
];

var question4Array = [
  ["What does 'HTML' stand for?"],
  [
    "HyperTunneling Machine Language",
    "Horrors That Maim Lemurs",
    "HyperText Markup Language",
    "HyperText Modeling Language",
  ],
  [false, false, true, false],
];

var question5Array = [
  ["What does CSS stand for?"],
  [
    "Cascading Server Service",
    "Cascading Sheet Styling",
    "Cascading Style Sheet",
    "Can't See S***",
  ],
  [false, false, true, false],
];

//in the end, information on questions can be brought up the following way: questionsArray[question selector][question, answer, truth array][part of subarray]
//I wrote it this way to make it slightly less horrible to sort through questions while writing them
questionsArray = [
  question0Array,
  question1Array,
  question2Array,
  question3Array,
  question4Array,
  question5Array,
];

//Here's my timer, I have a number of conditions to make sure it exits at appropriate times and triggers the end of the quiz if 0 is reached
function timerStart() {
  sec = 60;
  secondsLeft.text(sec);
  var timer = setInterval(function () {
    if (stopTimer == true) {
      clearInterval(timer);
      return;
    }
    sec--;
    if (sec > 0) {
      secondsLeft.text(sec);
    }
    if (sec < 0) {
      clearInterval(timer);
    }
    if (sec == 0) {
      endQuiz();
    }
  }, 1000);
}
//This function is the only one explicitly called by itself in the js script. This initializes everything and adds the start button. It also detects which page is up and initializes the appropriate page
function startUp() {
  //The first if statement only runs the quiz scripting if it is on the main quiz page
  if ($("body").is(".main-quiz-page")) {
    questionNum = -1;
    var answerButton = $("<button>");
    answerButton.addClass("answer-button d-flex w-auto btn btn-primary my-2");
    answerButton.text("Start");
    answerButtonHolder.append(answerButton);
  } else {
    scorePageStartup();
  }
}
//This is the click listener. I used event delegation for the answer buttons in the quiz
answerButtonHolder.on("click", ".answer-button", function (event) {
  welcomeText.hide();
  descriptionText.hide();
  if (questionNum == -1) {
    questionNum++;
    timerStart();
    newQuestion(questionNum);
    return;
  } else {
    answerHandler(event);
  }
});

//This function takes in the answer that the user selected and takes the appropriate action, either subtracting 10 seconds or going to the next question. I made the decision to stay on a question until the user gets it right
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
      endQuiz();
      return;
    }
  } else {
    questionNum++;
    if (questionNum < questionsArray.length) {
      newQuestion(questionNum);
    } else {
      endQuiz();
      return;
    }
  }
}
//This is the function that activates a new question and populates the answer buttons
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
}

//This function wraps up the quiz by making sure the timer is stopped, clearing out elements, and adding the button for the user to go to the high score screen
function endQuiz() {
  stopTimer = true;
  $("#timer-container").empty();
  playerScore = sec;
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

//This initializes the high score page
function scorePageStartup() {
  initHighScoreTable();
}

//This erases and reinitializes the high score table when called
function initHighScoreTable() {
  $("#score-list-container").empty();
  $("#score-display-span").text(localStorage.getItem("playerScore"));
  var storedHighScoreList = JSON.parse(
    localStorage.getItem("storedHighScoreList")
  );
  if (storedHighScoreList != null) {
    var numOfEntries = storedHighScoreList.length;
    for (let i = 0; i < numOfEntries; i++) {
      var scoreEntry = $("<tr>");
      var scoreNum = $("<td>");
      var scoreName = $("<td>");
      var scoreVal = $("<td>");
      scoreNum.text(i + 1);
      scoreName.text(storedHighScoreList[i].name);
      scoreVal.text(storedHighScoreList[i].score);
      scoreEntry.append(scoreNum);
      scoreEntry.append(scoreName);
      scoreEntry.append(scoreVal);
      $("#score-list-container").append(scoreEntry);
    }
  }
}

//This is the click listener for the name submission button
$("#name-submit-button").on("click", function (event) {
  event.preventDefault();
  submitNameShowScore();
});

//This function takes the information the user entered and adds it to the saved score list. It then sorts the score list by score and stores it once more in local storage
function submitNameShowScore() {
  var storedHighScoreList = JSON.parse(
    localStorage.getItem("storedHighScoreList")
  );
  var playerScoreObj = {
    name: $("#name-input-box").val(),
    score: localStorage.getItem("playerScore"),
  };
  if (storedHighScoreList == null) {
    storedHighScoreList = [playerScoreObj];
  } else {
    storedHighScoreList.push(playerScoreObj);
  }

  //This is the sort method built into arrays. It works by taking each element of an array , and sorting them based on the comparison function. The function takes 2 elements of the array as inputs a and b, and if the function returns a positive number, 'a' is placed before 'b'. If it returns a negative number, 'b' is placed before 'a'. If it returns 0, the order of the 2 elements is unchanged. In this way, if the score of someone is higher, they are placed closer to the top
  storedHighScoreList = storedHighScoreList.sort(function (a, b) {
    return b.score - a.score;
  });
  localStorage.setItem(
    "storedHighScoreList",
    JSON.stringify(storedHighScoreList)
  );
  $("#name-entry-container").empty();
  initHighScoreTable();
}

startUp();
