const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question:
      "Forma radioterapije  u kojoj se radioaktivni izvor ubrizgava u sam tumor ili njegovu neposrednu blizinu se naziva: ",
    choice1: "Palijativna terapija",
    choice2: "Adjurantna terapija",
    choice3: "Brahiterapija",
    choice4: "Hemoterapija",
    answer: 3,
  },
  {
    question: "1897. godine za otkrivanje radioaktivnosti zaslužan/na je",
    choice1: "Marija Kiri",
    choice2: "Liza Majtner",
    choice3: "Radeford",
    choice4: "Bekerel",
    answer: 4,
  },
  {
    question:
      "Proces u kome se jedno teže jezgro cepa na više lakših jezgara naziva se:",
    choice1: "Fisija",
    choice2: "Beta raspad",
    choice3: "Fuzija",
    choice4: "Alfa raspad",
    answer: 1,
  },
  {
    question:
      "Jezgro atoma koje se često koristi kao gorivo u nuklearnim reaktorima je:",
    choice1: "Uranijum 237",
    choice2: "Uranijum 239",
    choice3: "Torijum 232",
    choice4: "Uranijum 235",
    answer: 4,
  },
  {
    question: "Za oca nuklearne fizike smatra se:",
    choice1: "Ajnštajn",
    choice2: "Radeford",
    choice3: "Hajzenberg",
    choice4: "Bor",
    answer: 2,
  },
  {
    question:
      "Najdominantniji efekat pri interakciji zračenja sa ljudskim tkivima je:",
    choice1: "Par (efekat)",
    choice2: "Fotoefekat",
    choice3: "Komptonov efekat",
    choice4: "Doplerov efekat",
    answer: 3,
  },
  {
    question:
      "Elementarne čestice bez mase koje veoma retko interaguju sa materijom se nazivaju:",
    choice1: "Neutrini",
    choice2: "Mezoni",
    choice3: "Leptoni",
    choice4: "Kvarkovi",
    answer: 1,
  },
  {
    question: "😎 veliki detektor neutrina u Japanu naziva se:",
    choice1: "Kamiokande",
    choice2: "Kamikaze",
    choice3: "Čerenkovljev detektor",
    choice4: "Kintekuntakande",
    answer: 1,
  },
  {
    question:
      "Žika poseduje rendgenski pištolj koji ispaljuje x-zrake i odlučio je da će ga testirati na vama. Da biste se najefikasnije zaštitili upotrebićete:",
    choice1: "Aluminijski štit",
    choice2: "Bakarni štit",
    choice3: "Olovni štit",
    choice4: "Papirni štit",
    answer: 3,
  },
  {
    question: "Jezgro se sastoji od:",
    choice1: "Protona, elektrona, neutrona",
    choice2: "Protona i neutrona",
    choice3: "Pozitrona, protona, elektrona",
    choice4: "Protona, neutrina",
    answer: 2,
  },
  {
    question: "Koja je posledica nagnutosti Zemljine ose rotacije?",
    choice1: "Smena obdanice i noći",
    choice2: "Postojanje godišnjih doba",
    choice3: "Pojava vremenskih zona",
    choice4: "Smena mesečevih mena",
    answer: 2,
  },
  {
    question:
      "Tri astronomska ciklusa koja objašnjavaju promene u klimi tokom vremena uključujući i pojavu ledenih doba, nose ime po naučniku:",
    choice1: "Mihajlu Pupinu",
    choice2: "Milutinu Milankoviću",
    choice3: "Eratostenu",
    choice4: "Jovanu Cvijiću",
    answer: 2,
  },
  {
    question: "Za pojavu ledenih doba najvažnije je da:",
    choice1: "Zimske temperature bude što niže",
    choice2: "Jesenje temperature budu više od zimskih",
    choice3: "Proleće temperature budu više od jesenjih",
    choice4: "Letnje temperature budu što niže",
    answer: 4,
  },
  {
    question: "Izdizanje magme u Zemljinoj unutrašnjosti posledica je njene:",
    choice1: "Više temperature i manje gustine",
    choice2: "Niže temperature i manje gustine",
    choice3: "Više temperature i veće gustine",
    choice4: "Niže temperature i veće gustine",
    answer: 1,
  },
  {
    question: "Nakon erupcija supervulkana dolazi do:",
    choice1: "Globalnog povećanja temperature vazduha",
    choice2: "Stvaranja venačnih planina",
    choice3: "Stvaranja lava jezera",
    choice4: "Globalnog smanjenja temperature vazduha",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Pitanje ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
