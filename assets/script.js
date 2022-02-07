function log(n) {
  console.log(n);
}
const leaderBoard = document.querySelector("#leaderboard");
const btn = document.querySelector(".btn");
const main = document.querySelector("main").classList;
const qSection = document.querySelector(".q-section").classList;
const iSection = document.querySelector(".i-section").classList;
const hSection = document.querySelector(".h-section").classList;
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const correct = document.querySelector(".correct").classList;
const incorrect = document.querySelector(".incorrect").classList;
const userScore = document.querySelector(".userscore");
const goBack = document.querySelector(".goback");
const clearScore = document.querySelector(".clear");
const finalResult = document.querySelector(".final-result");
const submit = document.querySelector("form");
let i = 0;
let countdown = 50;
let score = 0;

function startQuiz() {
  options.innerHTML = "";
  question.textContent = questions[i].questionText;
  for (let j = 0; j < 4; j++)
    options.innerHTML += `<li>${questions[i].options[j]}</li>`;
}

function endQuiz() {
  if (countdown < 0 || score === 50 || i === 5) {
    qSection.add("toggle");
    iSection.remove("toggle");
    clearInterval(timer);
  }
}

function highScore() {
  main.toggle("toggle");
  hSection.toggle("toggle");
  i = 0;
  countdown = 50;
  score = 0;
  showResult();
  leaderBoard.addEventListener("click", highScore);
}

function showResult() {
  finalResult.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    finalResult.innerHTML += `<li>${key} - ${localStorage.getItem(key)}</li>`;
  }
}
leaderBoard.addEventListener("click", highScore);
goBack.addEventListener("click", highScore);

btn.addEventListener("click", () => {
  leaderBoard.removeEventListener("click", highScore);
  //countdown
  timer = setInterval(() => {
    document.querySelector(".countdown").textContent = countdown--;
    endQuiz();
  }, 1000);
  //showing quiz section
  main.toggle("toggle");
  qSection.toggle("toggle");
  startQuiz();
});

options.addEventListener("click", (e) => {
  if (e.target.tagName === "LI")
    if (e.target.textContent === questions[i].answer) {
      correct.toggle("toggle");
      setTimeout(() => {
        i++;
        score += 10;
        userScore.textContent = score;
        endQuiz();
        startQuiz();
        correct.toggle("toggle");
      }, 700);
    } else {
      incorrect.toggle("toggle");
      countdown -= 10;
      setTimeout(() => {
        i++;
        endQuiz();
        startQuiz();
        incorrect.toggle("toggle");
      }, 700);
    }
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = submit.name.value;
  localStorage.setItem(userName, score);
  showResult();
  iSection.toggle("toggle");
  hSection.toggle("toggle");
});

clearScore.addEventListener("click", () => {
  localStorage.clear();
  finalResult.innerHTML = "";
});
