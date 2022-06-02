var mainContent = document.querySelector("#page-content")
//var startQuizEl = document.querySelector("#questions-container");
var timerLeftEl = document.querySelector("#timer-left-container");
var startButtonEl = document.querySelector("#start-btn");
var colsEls = document.querySelectorAll(".cols");
var colsRMEls = document.querySelectorAll(".cols-rm");
var colEl1 = document.querySelector("#col-1");
var colEl2 = document.querySelector("#col-2");
var colEl3 = document.querySelector("#col-3");
var colEl4 = document.querySelector("#col-4");

var currentTime;
var startTime = 75;
var finishedGame = false;
// available questions to answer
var questions = [
  {
    questionTitle: "Question 1",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
    questionTitle: "question 2",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
    questionTitle: "question 4 fghg fgh fghfg fghfgh fghfh fgh fghf fgh fghf fghf fghfg fghf fghf fghf fgh fgh",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
];
var getQuestions = function () {
  var pickedQuestions = [];
  var uniqueNums = [];
  var randomNum = Math.floor(Math.random() * questions.length)
  return pickedQuestions;
};
var answeredQuestionHandler = function(isAnswer) {
  colEl3.classList.remove();
  colEl3.className = "col-3-border";
  var answerResponseEl = document.createElement("h4");
  colEl3.appendChild(answerResponseEl);
  if(isAnswer === "true"){
    answerResponseEl.textContent = "Correct!";
  }
  else {
    answerResponseEl.textContent = "Wrong!";
  }
  answerResponseEl.className = "answer-response";
}
var createQuizQuestion = function (question) {
  var questionTitleEl = document.createElement("h1");
  colEl1.appendChild(questionTitleEl);
  questionTitleEl.textContent = question.questionTitle;
  questionTitleEl.className = "question-text";

  colEl2.style["justify-content"] = "left";

  var questionAnswersULEl = document.createElement("ul");
  colEl2.appendChild(questionAnswersULEl);

  for(var i = 0; i < question.answers.length; i++){
    var questionAnswersLIEl = document.createElement("ol");
    questionAnswersULEl.appendChild(questionAnswersLIEl);

    var questionAnswersButtonEl = document.createElement("button");
    questionAnswersLIEl.appendChild(questionAnswersButtonEl);
    questionAnswersButtonEl.className = "btn answer-buttons";
    questionAnswersButtonEl.textContent = i + 1 + "." + " " + question.answers[i].text;
    questionAnswersButtonEl.value = question.answers[i].isAnswer;
    questionAnswersButtonEl.addEventListener("click", function(){
      answeredQuestionHandler(this.value);
    });
  }
  //col-2.appendChild
};
var removeColsContent = function(){
  for(var i = 0; i < colsEls.length; i++){
    var child = colsEls[i].lastElementChild;
    while(child){
      colsEls[i].removeChild(child);
      child = colsEls[i].lastElementChild;
    }
  }
}
//starts the quiz
var startGame = function () {
  var questionsInGame = getQuestions();
  // loop will go here
  removeColsContent();
  createQuizQuestion(questions[0]);
  
};
// on mouse click triggers startGame function
startButtonEl.addEventListener("click", startGame);
