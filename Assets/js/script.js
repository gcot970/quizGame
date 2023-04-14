var quizArea = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var scoreForm = document.getElementById("score");
var timerEl = document.getElementById("countdown");

var scoreEl = document.getElementById("scoreBoard");

var timerCount = 60;
var score;

var questions = [
  {
    question: "1st question",
    answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
    correctAnswer: "2nd"
  },
  {
    question: "2nd question",
    answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
    correctAnswer: "2nd"
  },
  {
    question: "3rd question",
    answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
    correctAnswer: "2nd"
  },
  {
    question: "4th question",
    answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
    correctAnswer: "2nd"
  },
  {
    question: "last question",
    answerChoices: ["1st answer choice", "2nd", "3rd", "4th", "5"],
    correctAnswer: "2nd"
  }
]

var currentQuestion = 0;

function startGame(event) {
  event.preventDefault();

  // this function will start your timer
  startTimer()

  // this function will kick off rendering the question and answers to the page
  generateQuestion();


}

function generateQuestion() {
  var question = questions[currentQuestion].question;
  // create an element (p, div)
  var questionEl = document.createElement("p");

  // write into that element using our question variable (textContent)
  questionEl.textContent = question;
  
  // append that question element into our quiz area (appendChild)
  quizArea.append(questionEl);

  // generateAnswerChoices
  generateAnswerChoices();
}

function generateAnswerChoices() {
  // for loop i < questions[currentQuestion].answerChoices.length
  // create an element (button)

  for (let i = 0; i < questions[currentQuestion].answerChoices.length; i++) {
    choiceButton = document.createElement("button");
    choiceButton.textContent = questions[currentQuestion].answerChoices[i];
    quizArea.append(choiceButton);
    choiceButton.addEventListener('click', validateAnswer);
  }

}

function validateAnswer(event) {
  event.preventDefault();
  console.log(event.target.textContent);

  // removes 10 from timerCount/score
  if (event.target.textContent != questions[currentQuestion].correctAnswer) {
    timerCount = timerCount - 10;
  }
  quizArea.innerHTML = "";

  // moves question to next
  currentQuestion++
  console.log(currentQuestion);

  // stops if question reaches end
  if(currentQuestion === questions.length) {
    endGame()
  }

  generateQuestion();
}

function startTimer() {
  timer = setInterval(function() {
    if (timerCount > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timerCount + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timerCount--;
    } else if (timerCount === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timerCount + ' second remaining';
      timerCount--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      endGame()
      // Call the `displayMessage()` function
      // displayMessage();
    }
  }, 1000)
}

function endGame() {
  // end game whether it reaches the end of the quiz or time runs out
  // display none quiz area and display end game div
  clearInterval(timer);


  // score
  score = timerCount;
  // display score
  timerEl.innerHTML = "";
  quizArea.innerHTML = "Total score:" + score;


  // display high score
  document.getElementById("endGame").style.display = "block";
}

// creates object and saves it into local storage
function saveScore(event) {
  event.preventDefault();

  var scoreObj = {
    intials: event.target.children[0].value,
    score: score
  }
  // sets the score into local storage
  localStorage.setItem("score", JSON.stringify(scoreObj));
}

function getScore() {
  // get high score out of localstorage
  var score = JSON.parse(localStorage.getItem("score"))
  // display to end game div
  
}


// buttons!
startBtn.addEventListener("click", startGame);

scoreForm.addEventListener("submit", saveScore);
