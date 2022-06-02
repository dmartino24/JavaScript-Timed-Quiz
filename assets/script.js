var mainContent = document.querySelector("#page-content");
//var startQuizEl = document.querySelector("#questions-container");
var startButtonEl = document.querySelector("#start-btn");
var colsEls = document.querySelectorAll(".cols");
var colsRMEls = document.querySelectorAll(".cols-rm");
var colEl1 = document.querySelector("#col-1");
var colEl2 = document.querySelector("#col-2");
var colEl3 = document.querySelector("#col-3");
var colEl4 = document.querySelector("#col-4");
var timerTextEl = document.querySelector("#timer-left-text");
var currentTime;
var totalAnswers;
var startTime = 75;
var finishedGame = false;
var tempQuestions;
var timerID;
var currentPlayerInitials;
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
  },
  {
    questionTitle: "question 2",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle: "question 3",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
  {
    questionTitle:
      "question 4 fghg fgh fghfg fghfgh fghfh fgh fghf fgh fghf fghf fghfg fghf fghf fghf fgh fgh",
    answers: [
      { text: "blue", isAnswer: true },
      { text: "red", isAnswer: false },
      { text: "pink", isAnswer: false },
      { text: "green", isAnswer: false },
    ],
  },
];
var submitScoreHandler = function () {
  var initialsInputEl = document.querySelector("input");
  if (initialsInputEl.validity.valid && initialsInputEl.value.length > 1) {
    currentPlayerInitials = initialsInputEl.value;
  } else {
    alert("Need to type in two letters.");
  }
};
var submitGameScore = function () {
  timerTextEl.textContent = currentTime;
  clearInterval(timerID);

  var titleEl = document.createElement("h1");
  colEl1.appendChild(titleEl);
  titleEl.textContent = "Well Done!";

  var finalScoreEl = document.createElement("p");
  colEl2.appendChild(finalScoreEl);
  finalScoreEl.textContent = "Your final score is " + currentTime + ".";
  var initialsTextEl = document.createElement("p");
  var initialsInputEl = document.createElement("input");
  var initialSubmitButtonEl = document.createElement("button");
  colEl3.appendChild(initialsTextEl);
  colEl3.appendChild(initialsInputEl);
  colEl3.appendChild(initialSubmitButtonEl);
  initialsTextEl.textContent = "Enter initials: ";
  initialsInputEl.pattern = "[A-Za-z]{2}";
  initialsInputEl.maxLength = 2;
  initialSubmitButtonEl.textContent = "Submit";
  initialSubmitButtonEl.className = "btn";
  initialSubmitButtonEl.addEventListener("click", function () {
    submitScoreHandler();
  });
  colEl1.style["justify-content"] = "left";
  colEl3.style["justify-content"] = "left";
  colEl3.style["align-items"] = "center";
};
var checkGameProgress = function () {
  if (totalAnswers >= 5 || currentTime <= 0) {
    submitGameScore();
  } else {
    createQuizQuestion(getRandomQuestion());
  }
};
var answeredQuestionHandler = function (isAnswer) {
  removeColsContent();
  colEl4.classList.remove();
  colEl4.className = "col-4-border";
  var answerResponseEl = document.createElement("h4");
  colEl4.appendChild(answerResponseEl);
  if (isAnswer === "true") {
    answerResponseEl.textContent = "Correct!";
  } else {
    answerResponseEl.textContent = "Wrong!";
    currentTime -= 10;
  }
  answerResponseEl.className = "answer-response";
  totalAnswers += 1;
  checkGameProgress();
};
var createQuizQuestion = function (question) {
  var questionTitleEl = document.createElement("h1");
  colEl1.appendChild(questionTitleEl);
  questionTitleEl.textContent = question.questionTitle;
  questionTitleEl.className = "align-left";

  colEl2.style["justify-content"] = "left";

  var questionAnswersULEl = document.createElement("ul");
  colEl2.appendChild(questionAnswersULEl);

  for (var i = 0; i < question.answers.length; i++) {
    var questionAnswersLIEl = document.createElement("ol");
    questionAnswersULEl.appendChild(questionAnswersLIEl);

    var questionAnswersButtonEl = document.createElement("button");
    questionAnswersLIEl.appendChild(questionAnswersButtonEl);
    questionAnswersButtonEl.className = "btn answer-buttons";
    questionAnswersButtonEl.textContent =
      i + 1 + "." + " " + question.answers[i].text;
    questionAnswersButtonEl.value = question.answers[i].isAnswer;
    questionAnswersButtonEl.addEventListener("click", function () {
      answeredQuestionHandler(this.value);
    });
  }
  //col-2.appendChild
};
var getRandomQuestion = function () {
  var randomNum = Math.floor(Math.random() * tempQuestions.length);
  var nextQuestion = tempQuestions[randomNum];
  tempQuestions.splice(randomNum, 1);
  return nextQuestion;
};
var removeColsContent = function () {
  for (var i = 0; i < colsEls.length; i++) {
    var child = colsEls[i].lastElementChild;
    while (child) {
      colsEls[i].removeChild(child);
      child = colsEls[i].lastElementChild;
    }
  }
};
var removeColsRMContent = function () {
  for (var i = 0; i < colsRMEls.length; i++) {
    var child = colsRMEls[i].lastElementChild;
    while (child) {
      colsRMEls[i].removeChild(child);
      child = colsRMEls[i].lastElementChild;
    }
  }
};
var startTimer = function () {
  timerID = setInterval(function () {
    currentTime -= 1;
    timerTextEl.textContent = currentTime;
  }, 1000);
};
//starts the quiz
var startGame = function () {
  currentTime = startTime;
  totalAnswers = 0;
  finishedGame = false;
  tempQuestions = [];
  tempQuestions = tempQuestions.concat(questions);

  removeColsContent();
  createQuizQuestion(getRandomQuestion());
  startTimer();
};
// on mouse click triggers startGame function
startButtonEl.addEventListener("click", startGame);
