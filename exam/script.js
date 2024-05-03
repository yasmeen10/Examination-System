let question = document.querySelector(".question");
let answersArea = document.querySelector(".answers");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let flagBtn = document.getElementById("flagBtn");
let submitBtn = document.getElementsByClassName("submitBtn")[0];
let countNum = document.querySelector(".countNum");
let flaggedList = document.getElementById("flaggedList");
let progressBar = document.getElementById("progressBar");

let startIndex = 0;
let currentIndex = startIndex;
let count = 1;
let result = 0;
let flaggedQuestions = new Set();
let clickedAnswerArr = [];
var correctAnswerArr = [];
let timeRemaining = 1100;
let progressInterval;

prevBtn.disabled = true;
submitBtn.disabled = true;
localStorage.setItem("result", result);

////class for Answers///
class Answer {
  constructor(value, id) {
    this.value = value;
    this.id = id;
  }
}

///class for Questions///
class Question {
  constructor(questionText, answers, correctAnswerIndex) {
    this.questionText = questionText;
    this.answers = answers.map((answer, index) => new Answer(answer, index));
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

const questionsData = [
  {
    questionText: "What does HTML stand for?",
    answers: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
    correctAnswerIndex: 1,
  },
  {
    questionText: "What does CSS stand for?",
    answers: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Cascading Style Sheet",
    ],
    correctAnswerIndex: 3,
  },
  {
    questionText: "What does PHP stand for?",
    answers: [
      "Hyper Text Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
    correctAnswerIndex: 0,
  },
  {
    questionText: "What does XML stand for?",
    answers: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
    correctAnswerIndex: 0,
  },
  {
    questionText: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<javascript>", "<js>", "<scripting>"],
    correctAnswerIndex: 0,
  },
  {
    questionText:
      "Which of the following is a valid CSS property for text alignment?",
    answers: ["text-align", "align-text", "text-alignment", "align"],
    correctAnswerIndex: 0,
  },
  {
    questionText: "How do you write 'Hello World' in an alert box?",
    answers: [
      "msgBox('Hello World');",
      "alertBox('Hello World');",
      "msg('Hello World');",
      "alert('Hello World');",
    ],
    correctAnswerIndex: 3,
  },
  {
    questionText: "Which HTML tag is used to create an ordered list?",
    answers: ["<ol>", "<ul>", "<li>", "<dl>"],
    correctAnswerIndex: 0,
  },
  {
    questionText:
      "Which CSS property is used to create a shadow effect for text?",
    answers: ["text-shadow", "box-shadow", "shadow", "text-effect"],
    correctAnswerIndex: 0,
  },
  {
    questionText: "How can you comment in JavaScript?",
    answers: [
      "// This is a comment",
      "/* This is a comment */",
      "# This is a comment",
      "<!-- This is a comment -->",
    ],
    correctAnswerIndex: 0,
  },
];

//to make questions display random//
function shuffle(array) {
  var copy = [],
    n = array.length,
    i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}
//create class for each question
let questions = questionsData.map(
  (el) => new Question(el.questionText, el.answers, el.correctAnswerIndex)
);
questions = shuffle(questions);

//display questuins
function showQuestionsData(obj, count) {
  fadeOutQuestion();
  setTimeout(function () {
    question.innerHTML = "";
    answersArea.innerHTML = "";

    let p = document.createElement("p");
    p.textContent = obj.questionText;
    question.append(p);

    for (let i = 0; i < obj.answers.length; i++) {
      console.log(obj.answers[i].value)
      var button = document.createElement("button");
      button.value = obj.answers[i].value;
      button.id = i;
      button.className = "answer-btn";
      button.textContent = obj.answers[i].value;

      if (
        clickedAnswerArr[currentIndex] &&
        i.toString() === clickedAnswerArr[currentIndex]
      ) {
        button.style.backgroundColor = "#6a5acd";
      }

      button.addEventListener("click", function () {
        checkAnswer(event);
        resetButtonStyles();
        this.style.backgroundColor = "#6a5acd";
      });

      answersArea.append(button);
    }
    question.append(answersArea);

    // Update the questions counter
    countNum.textContent = `${count} / 10`;

    updateFlagButton();
    updateFlaggedList();

    fadeInQuestion();
  }, 300);
}

//check answers and calculate the result
function checkAnswer(event) {
  let selectedAnswerIndex = event.target.id;
  //console.log(selectedAnswerIndex);
  clickedAnswerArr[currentIndex] = selectedAnswerIndex;
  //console.log(clickedAnswerArr);
  if (selectedAnswerIndex == questions[currentIndex].correctAnswerIndex) {
    correctAnswerArr[currentIndex] = true;
    console.log(correctAnswerArr);
  } else {
    correctAnswerArr[currentIndex] = false;
    console.log(correctAnswerArr);
  }
  const filteredCorrectAnswerArr = correctAnswerArr.filter(
    (index) => index !== false
  );
  result = filteredCorrectAnswerArr.length;
  console.log(result);
  localStorage.setItem("result", result);
  checkSubmitButton();
}


///////////////Next and Prev controls///////////////////////
nextBtn.addEventListener("click", function () {
  prevBtn.disabled = false;
  count++;
  if (currentIndex === questions.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  showQuestionsData(questions[currentIndex], count);
  updateProgressBar();
  if (count === 10) {
    this.disabled = true;
  }
  if (clickedAnswerArr[currentIndex]) {
    // document.getElementById(clickedAnswerArr[currentIndex]).clicked = true;
    console.log(document.getElementById(clickedAnswerArr[currentIndex]));
    document.getElementById(
      clickedAnswerArr[currentIndex]
    ).style.backgroundColor = "#6a5acd";
  }
});

prevBtn.addEventListener("click", function () {
  nextBtn.disabled = false;
  count--;
  if (currentIndex === 0) {
    currentIndex = questions.length - 1;
  } else {
    currentIndex--;
  }
  showQuestionsData(questions[currentIndex], count);
  updateProgressBar();
  if (count === 1) {
    this.disabled = true;
  }
  if (clickedAnswerArr[currentIndex]) {
    //console.log(clickedAnswerArr[currentIndex]);
    //console.log( document.getElementById(clickedAnswerArr[currentIndex]));
    // document.getElementById(clickedAnswerArr[currentIndex]).clicked= true;
    document.getElementById(
      clickedAnswerArr[currentIndex]
    ).style.backgroundColor = "#6a5acd";
  }
});
//////////////////////////////////////////////////////////////////////////////////////////

///////////////Flaged questions controls/////////////////////////////////////////
flagBtn.addEventListener("click", function () {
  toggleFlag();
});

function toggleFlag() {
  if (flaggedQuestions.has(currentIndex)) {
    flaggedQuestions.delete(currentIndex);
  } else {
    flaggedQuestions.add(currentIndex);
  }
  updateFlagButton();
  updateFlaggedList();
}

function updateFlagButton() {
  const isFlagged = flaggedQuestions.has(currentIndex);
  flagBtn.textContent = isFlagged ? "Unflag" : "Flag";
}

function updateFlaggedList() {
  flaggedList.innerHTML = "";
  flaggedQuestions.forEach((index) => {
    let listItem = document.createElement("li");
    listItem.textContent = `Question${index + 1}`;
    listItem.style.cursor = "pointer";
    listItem.addEventListener("click", () => navigateToFlaggedQuestion(index));
    flaggedList.appendChild(listItem);
  });
}

function navigateToFlaggedQuestion(index) {
  currentIndex = index;
  count = index + 1;
  showQuestionsData(questions[currentIndex], count);
  updateProgressBar();
}

let unflagBtn = document.getElementById("unflagBtn");

unflagBtn.addEventListener("click", function () {
  flaggedQuestions.clear();
  updateFlaggedList();
  updateFlagButton();
});
/////////////////////////////////////////////////////////////////
function resetButtonStyles() {
  // Reset background color for all answer buttons
  const buttons = answersArea.getElementsByClassName("answer-btn");
  for (let button of buttons) {
    button.style.backgroundColor = "";
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById("timer").textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function updateProgressBar() {
  updateTimerDisplay();
  let percentage = ((currentIndex + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = percentage + "%";
}

function startProgress() {
  progressInterval = setInterval(function () {
    timeRemaining--;
    updateProgressBar();
    if (timeRemaining === 0) {
      clearInterval(progressInterval);
      location.replace("../timeout/index.html");
    }
  }, 1000);
}

function fadeInQuestion() {
  question.style.opacity = 1;
}

function fadeOutQuestion() {
  question.style.opacity = 0;
}

showQuestionsData(questions[startIndex], count);
startProgress();

function checkSubmitButton() {
  if (clickedAnswerArr.length === questions.length) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

submitBtn.addEventListener("click", function () {
  location.replace("../result/index.html");
});