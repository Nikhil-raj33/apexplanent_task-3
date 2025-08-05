// === QUIZ FUNCTIONALITY ===
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: 1
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1997"],
    answer: 1
  },
  {
    question: "Which of these is not a JavaScript framework?",
    options: ["React", "Angular", "Laravel", "Vue"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressText = document.getElementById('progress');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score');
const totalQuestionsText = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
  const question = quizQuestions[currentQuestion];
  questionText.textContent = question.question;
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    if (userAnswers[currentQuestion] === index) {
      button.classList.add('selected');
    }
    button.textContent = option;
    button.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  progressText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === quizQuestions.length - 1;
  submitBtn.style.display = currentQuestion === quizQuestions.length - 1 ? 'block' : 'none';
}

function selectOption(index) {
  userAnswers[currentQuestion] = index;
  const options = document.querySelectorAll('.option-btn');
  options.forEach((option, i) => {
    if (i === index) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });
}

function showResult() {
  score = 0;
  quizQuestions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  document.getElementById('quiz-container').style.display = 'none';
  resultContainer.style.display = 'block';
  scoreText.textContent = score;
  totalQuestionsText.textContent = quizQuestions.length;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = new Array(quizQuestions.length).fill(null);
  document.getElementById('quiz-container').style.display = 'block';
  resultContainer.style.display = 'none';
  loadQuestion();
}

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
});

submitBtn.addEventListener('click', showResult);
restartBtn.addEventListener('click', restartQuiz);

// Initialize quiz
loadQuestion();

// === API FUNCTIONALITY ===
const apiDataContainer = document.getElementById('api-data-container');
const fetchJokeBtn = document.getElementById('fetch-joke-btn');
const fetchCatFactBtn = document.getElementById('fetch-catfact-btn');

async function fetchJoke() {
  try {
    apiDataContainer.innerHTML = '<p>Loading joke...</p>';
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    apiDataContainer.innerHTML = `
      <h3>${data.setup}</h3>
      <p>${data.punchline}</p>
    `;
  } catch (error) {
    apiDataContainer.innerHTML = '<p>Failed to fetch joke. Please try again.</p>';
  }
}

async function fetchCatFact() {
  try {
    apiDataContainer.innerHTML = '<p>Loading cat fact...</p>';
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    apiDataContainer.innerHTML = `
      <h3>Random Cat Fact</h3>
      <p>${data.fact}</p>
    `;
  } catch (error) {
    apiDataContainer.innerHTML = '<p>Failed to fetch cat fact. Please try again.</p>';
  }
}

fetchJokeBtn.addEventListener('click', fetchJoke);
fetchCatFactBtn.addEventListener('click', fetchCatFact);