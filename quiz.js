
var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
    {
      q: "Вы хотите купить автомобиль?",
      o: [
        "Да",
        "Нет"
      ],
      a: 0 // arrays start with 0, so answer is 70 meters
    },
    {
      q: "Вам неудобно перемещаться на общественном или пешеходном транспорте?",
      o: [
        "Да",
        "Нет"
      ],
      a: 0
    },
    {
      q: "У вас хватает денег на покупку и обслуживание машины?",
      o: [
        "Да",
        "Нет"
      ],
      a: 0
    },
    {
      q: "У вас есть опыт вождения автомобиля?",
      o: [
        "Да",
        "Нет"
      ],
      a: 0
    },
    {
      q: "У вас уесть понимание устройства автомобиля?",
      o: [
        "Да",
        "Нет"
      ],
      a: 0
    },
    {
      q: "Ваш бюджет больше 2 млн тг?",
      o: [
        "Да",
        "Нет"
      ],
      a: 0
    }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score
  answers: [],
  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
      quiz.answers.push(0);
    } else {
      option.classList.add("wrong");
      quiz.answers.push(1);
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        if (quiz.answers[0] == 1) {
          quiz.hQn.innerHTML = `Вывод: вам не нужен автомобиль`;
          quiz.hAns.innerHTML = "";
        } else if (quiz.answers[1] == 1) {
          quiz.hQn.innerHTML = `Вывод: вам не нужен автомобиль`;
          quiz.hAns.innerHTML = "";
        } else if(quiz.answers[2] == 1) {
          quiz.hQn.innerHTML = `Вывод: вам не нужен автомобиль`;
          quiz.hAns.innerHTML = "";
        } else if(quiz.answers[3] == 1) {
          quiz.hQn.innerHTML = `Вывод: Вначале пройдите автошколу.`;
          quiz.hAns.innerHTML = "";
        } else if(quiz.answers[4] == 1) {
          quiz.hQn.innerHTML = `Вывод: Вначале пройдите автошколу.`;
          quiz.hAns.innerHTML = "";
        } else if(quiz.answers[5] == 1) {
          quiz.hQn.innerHTML = `Вывод: вам подойдет Б/У автомобиль.`;
          quiz.hAns.innerHTML = "";
        } else {
          quiz.hQn.innerHTML = `Вывод: вам подойдет новый автомобиль.`;
          quiz.hAns.innerHTML = "";
        }
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
