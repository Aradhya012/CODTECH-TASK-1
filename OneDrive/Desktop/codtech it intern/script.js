
const questions = [
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "Java", correct: false }
    ]
  },

  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Google", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Netscape", correct: true },
      { text: "Apple", correct: false }
    ]
  },

  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Desktop Oriented Mode", correct: false },
      { text: "Digital Ordinance Model", correct: false }
    ]
  },

  {
    question: "Which keyword is used to declare variables in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "string", correct: false },
      { text: "define", correct: false }
    ]
  },

  {
    question: "Which HTML tag is used to include JavaScript?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<code>", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];

  progress.innerHTML =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerHTML = answer.text;
    button.classList.add("btn");

    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {

    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  questionElement.innerHTML =
    `🎉 You scored ${score} out of ${questions.length}!`;

  progress.innerHTML = "Quiz Completed";

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {

  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }

});

startQuiz();


