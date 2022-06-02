// element that will be used through out the project
var startButtonEl = document.querySelector("#start-btn");
var colsEls = document.querySelectorAll(".cols");
var colsRMEls = document.querySelectorAll(".cols-rm");
var colEl1 = document.querySelector("#col-1");
var colEl2 = document.querySelector("#col-2");
var colEl3 = document.querySelector("#col-3");
var colEl4 = document.querySelector("#col-4");
var timerTextEl = document.querySelector("#timer-left-text");
var highScoreButtonEl = document.querySelector(".view-score-btn");
//global vars
var currentTime;
var totalAnswers;
var startTime = 75;
var tempQuestions;
var timerID;
var highScores = [];
// questions object
var questions = [
  {
    questionTitle: "JavaScript is the programming language of the _____.",
    answers: [
      { text: "Web", isAnswer: true },
      { text: "Desktop", isAnswer: false },
      { text: "Server", isAnswer: false },
      { text: "Mobile", isAnswer: false },
    ],
  },
  {
    questionTitle: "Which type of JavaScript language is _____?",
    answers: [
      { text: "Object-oriented", isAnswer: false },
      { text: "Object-based", isAnswer: true },
      { text: "functional programming", isAnswer: false },
      { text: "All of the above", isAnswer: false },
    ],
  },
  {
    questionTitle: "In which HTML element, we put the JavaScript code?",
    answers: [
      { text: "<javascript>...</javascript>", isAnswer: false },
      { text: "<js>...</js>", isAnswer: false },
      { text: "<script>...</script>", isAnswer: true },
      { text: "<css>...</css>", isAnswer: false },
    ],
  },
  {
    questionTitle:
      "Which property is used to define the HTML content to an HTML element with a specific id?",
    answers: [
      { text: "innerText", isAnswer: false },
      { text: "innerContent", isAnswer: false },
      { text: "elementText", isAnswer: false },
      { text: "innerHTML", isAnswer: true },
    ],
  },
  {
    questionTitle:
      "Which JavaScript method is used to write on browser's console?",
    answers: [
      { text: "console.write()", isAnswer: false },
      { text: "console.output()", isAnswer: false },
      { text: "console.log()", isAnswer: true },
      { text: "console.writhHTML()", isAnswer: false },
    ],
  },
  {
    questionTitle:
      "Which JavaScript method is used to write into an alert box?",
    answers: [
      { text: "window.alertHTML()", isAnswer: false },
      { text: "window.alert()", isAnswer: true },
      { text: "window.alertBox()", isAnswer: false },
      { text: "window.alertContent()", isAnswer: false },
    ],
  },
  {
    questionTitle: "In JavaScript, single line comment begins with ___.",
    answers: [
      { text: "#", isAnswer: false },
      { text: "/*", isAnswer: false },
      { text: "$", isAnswer: false },
      { text: "//", isAnswer: true },
    ],
  },
  {
    questionTitle: "Which JavaScript keyword is used to declare a variable?",
    answers: [
      { text: "var", isAnswer: true },
      { text: "VAR", isAnswer: false },
      { text: "int", isAnswer: false },
      { text: "LET", isAnswer: false },
    ],
  },
  {
    questionTitle: "What is the default value of an uninitialized variable?",
    answers: [
      { text: "0", isAnswer: false },
      { text: "undefined", isAnswer: true },
      { text: "null", isAnswer: false },
      { text: "NaN", isAnswer: false },
    ],
  },
  {
    questionTitle:
      "Which property is used to get the length of a string in JavaScript?",
    answers: [
      { text: "count", isAnswer: false },
      { text: "len", isAnswer: false },
      { text: "length", isAnswer: true },
      { text: "Count", isAnswer: false },
    ],
  },
];
// handler for the back button
var backHandler = function () {
  removeColsContent();
  // clears out the old styles
  colEl1.removeAttribute("style");
  colEl2.removeAttribute("style");
  colEl3.removeAttribute("style");
  var highScoreContainerEl = document.querySelector(".high-score-container");
  highScoreButtonEl = document.createElement("button");
  highScoreContainerEl.appendChild(highScoreButtonEl);
  highScoreButtonEl.textContent = "View high scores";
  highScoreButtonEl.className = "view-score-btn";
  highScoreButtonEl.addEventListener("click", createHighScore);

  var timerContainerEl = document.querySelector(".timer-container");
  var timeTextEl = document.createElement("h3");
  timerContainerEl.appendChild(timeTextEl);
  timeTextEl.textContent = "Time: ";
  timeTextEl.className = "time-text";
  timerTextEl = document.createElement("span");
  timeTextEl.appendChild(timerTextEl);
  timerTextEl.textContent = startTime;
  timerTextEl.id = "timer-left-text";

  var titleEl = document.createElement("h1");
  colEl1.appendChild(titleEl);
  titleEl.textContent = "Coding Quiz Challenge";

  var descriptionEl = document.createElement("p");
  colEl2.appendChild(descriptionEl);
  descriptionEl.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds";

  var startButtonEl = document.createElement("button");
  colEl3.appendChild(startButtonEl);
  startButtonEl.textContent = "Start Quiz";
  startButtonEl.className = "btn start-btn";
  startButtonEl.addEventListener("click", startGame);
};
// handler for the clear high scores button
var clearHighScoresHandler = function () {
  highScores = [];
  localStorage.clear();
  backHandler();
};
// creates the correct elements for highScore functionality
var createHighScore = function () {
  clearInterval(timerID);
  removeColsContent();
  colEl4.classList.remove("col-4-border");
  document.querySelector(".view-score-btn").remove();
  document.querySelector(".time-text").remove();
  var titleEl = document.createElement("h1");
  colEl1.appendChild(titleEl);
  titleEl.textContent = "High scores";

  var ulEl = document.createElement("ul");

  colEl2.appendChild(ulEl);
  ulEl.className = "high-score";

  // loads the most updated scores
  loadHighScores();
  //reorders the array to highest to lowest highScore
  // found the code for this part javascript by Tired Termite on Grepper website
  highScores.sort((a, b) => (a.score < b.score ? 1 : -1));
  // creating li and putting in the highScores data in it
  for (var i = 0; i < highScores.length; i++) {
    var liEl = document.createElement("li");
    ulEl.append(liEl);
    liEl.textContent =
      i + 1 + ". " + highScores[i].initials + " - " + highScores[i].score;
    liEl.className = "purple-bg";
  }

  var backButtonEl = document.createElement("button");
  var clearButtonEl = document.createElement("button");
  colEl3.appendChild(backButtonEl);
  colEl3.appendChild(clearButtonEl);
  backButtonEl.className = "btn";
  clearButtonEl.className = "btn";
  backButtonEl.textContent = "Go back";
  clearButtonEl.textContent = "Clear high scores";
  backButtonEl.addEventListener("click", backHandler);
  clearButtonEl.addEventListener("click", clearHighScoresHandler);
};
// handler for the submit button and validating the input
var submitScoreHandler = function () {
  var initialsInputEl = document.querySelector("input");
  if (initialsInputEl.validity.valid && initialsInputEl.value.length > 1) {
    currentPlayerInitials = initialsInputEl.value;
    var newHighScoreObject = {
      initials: initialsInputEl.value.toUpperCase(),
      score: currentTime,
    };
    highScores.push(newHighScoreObject);
    saveHighScores();
    removeColsContent();
    createHighScore();
  } else {
    alert("Need to type in two letters.");
  }
};

var submitGameScore = function () {
  removeColsRMContent();
  // checks if negative then will set it to 0
  if (currentTime <= 0) {
    currentTime = 0;
  }
  clearInterval(timerID);
  timerTextEl.textContent = currentTime;

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
  // adds a pattern that is has to abide by to validate
  initialsInputEl.pattern = "[A-Za-z]{2}";
  initialsInputEl.maxLength = 2;
  initialSubmitButtonEl.textContent = "Submit";
  initialSubmitButtonEl.className = "btn";
  initialSubmitButtonEl.addEventListener("click", function () {
    submitScoreHandler();
  });
  // styles to align the element correctly on screen
  colEl1.style["justify-content"] = "left";
  colEl3.style["justify-content"] = "left";
  colEl3.style["align-items"] = "center";
};
// checks if game is over or need another question
var checkGameProgress = function () {
  if (totalAnswers >= 5 || currentTime <= 0) {
    submitGameScore();
  } else {
    createQuizQuestion(getRandomQuestion());
  }
};
// handler for the an answer button finds out if user answered correctly
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
// creates the question and button choices
var createQuizQuestion = function (question) {
  var questionTitleEl = document.createElement("h1");
  colEl1.appendChild(questionTitleEl);
  questionTitleEl.textContent = question.questionTitle;
  questionTitleEl.className = "align-left";

  colEl2.style["justify-content"] = "left";

  var questionAnswersULEl = document.createElement("ul");
  colEl2.appendChild(questionAnswersULEl);

  // loop to get all answer buttons in the document
  // and setting up the correct attributes
  for (var i = 0; i < question.answers.length; i++) {
    var questionAnswersLIEl = document.createElement("li");
    questionAnswersULEl.appendChild(questionAnswersLIEl);

    var questionAnswersButtonEl = document.createElement("button");
    questionAnswersLIEl.appendChild(questionAnswersButtonEl);
    questionAnswersButtonEl.className = "btn answer-buttons";
    questionAnswersButtonEl.textContent =
      i + 1 + ". " + question.answers[i].text;
    questionAnswersButtonEl.value = question.answers[i].isAnswer;
    questionAnswersButtonEl.addEventListener("click", function () {
      answeredQuestionHandler(this.value);
    });
  }
};
// gets random question from the tempQuestions array
var getRandomQuestion = function () {
  var randomNum = Math.floor(Math.random() * tempQuestions.length);
  var nextQuestion = tempQuestions[randomNum];
  tempQuestions.splice(randomNum, 1);
  return nextQuestion;
};
// removes all cols children
var removeColsContent = function () {
  for (var i = 0; i < colsEls.length; i++) {
    var child = colsEls[i].lastElementChild;
    while (child) {
      colsEls[i].removeChild(child);
      child = colsEls[i].lastElementChild;
    }
  }
};
// removes all cols-rm children
var removeColsRMContent = function () {
  for (var i = 0; i < colsRMEls.length; i++) {
    var child = colsRMEls[i].lastElementChild;
    while (child) {
      colsRMEls[i].removeChild(child);
      child = colsRMEls[i].lastElementChild;
    }
  }
};
// timer that will count down by 1 until timer is 0 or less then calls function to submit the score
var startTimer = function () {
  timerID = setInterval(function () {
    currentTime -= 1;
    timerTextEl.textContent = currentTime;
    if (currentTime <= 0) {
      submitGameScore();
    }
  }, 1000);
};
//starts the quiz
var startGame = function () {
  // inits vars
  currentTime = startTime;
  totalAnswers = 0;
  tempQuestions = [];
  tempQuestions = tempQuestions.concat(questions);

  removeColsContent();
  createQuizQuestion(getRandomQuestion());
  startTimer();
};
// saves the highScore object to local storage
var saveHighScores = function () {
  localStorage.setItem("highScores", JSON.stringify(highScores));
};
// loads the score into highScores array
var loadHighScores = function () {
  highScores = [];
  var savedHighScores = localStorage.getItem("highScores");
  if (!savedHighScores) {
    return false;
  }
  savedHighScores = JSON.parse(savedHighScores);
  for (var i = 0; i < savedHighScores.length; i++) {
    highScores.push(savedHighScores[i]);
  }
};
startButtonEl.addEventListener("click", startGame);
highScoreButtonEl.addEventListener("click", createHighScore);
loadHighScores();
