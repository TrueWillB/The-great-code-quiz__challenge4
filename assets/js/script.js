var quizCard = $("#quiz-card");
var cardQuestion = $("card-heading");
var answerList = $("answer-list");

function startUp() {
  quizCard.hide();
  console.log("started fresh");
  quizCard.children().eq(0).text("Did it work?");
  quizCard.show();
}
startUp();
