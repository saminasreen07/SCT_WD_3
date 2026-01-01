const questions = [
    {
      type: "single",
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      type: "multi",
      question: "Which of the following are JavaScript frameworks?",
      options: ["React", "Django", "Vue", "Flask"],
      answer: ["React", "Vue"]
    },
    {
      type: "fill",
      question: "Fill in the blank: HTML stands for ______ Markup Language.",
      answer: "HyperText"
    }
  ];
  
  let currentIndex = 0;
  let score = 0;
  
  const questionBox = document.getElementById("question-box");
  const optionsBox = document.getElementById("options-box");
  const nextBtn = document.getElementById("next-btn");
  const resultBox = document.getElementById("result-box");
  
  loadQuestion();
  
  nextBtn.addEventListener("click", () => {
    checkAnswer();
    currentIndex++;
  
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  function loadQuestion() {
    const q = questions[currentIndex];
    questionBox.textContent = q.question;
    optionsBox.innerHTML = "";
  
    if (q.type === "single") {
      q.options.forEach(option => {
        optionsBox.innerHTML += `
          <label>
            <input type="radio" name="option" value="${option}">
            ${option}
          </label>
        `;
      });
    }
  
    if (q.type === "multi") {
      q.options.forEach(option => {
        optionsBox.innerHTML += `
          <label>
            <input type="checkbox" value="${option}">
            ${option}
          </label>
        `;
      });
    }
  
    if (q.type === "fill") {
      optionsBox.innerHTML = `
        <input type="text" id="fill-answer" placeholder="Type your answer">
      `;
    }
  }
  
  function checkAnswer() {
    const q = questions[currentIndex];
  
    if (q.type === "single") {
      const selected = document.querySelector('input[name="option"]:checked');
      if (selected && selected.value === q.answer) score++;
    }
  
    if (q.type === "multi") {
      const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(cb => cb.value);
  
      if (
        selected.length === q.answer.length &&
        selected.every(val => q.answer.includes(val))
      ) {
        score++;
      }
    }
  
    if (q.type === "fill") {
      const input = document.getElementById("fill-answer");
      if (input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    }
  }
  
  function showResult() {
    questionBox.classList.add("hidden");
    optionsBox.classList.add("hidden");
    nextBtn.classList.add("hidden");
  
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <h2>Your Score</h2>
      <p>${score} / ${questions.length}</p>
    `;
  }
  