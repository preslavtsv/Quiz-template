var questions = [
    {
      "question": "Каква е основната функция на дихателната система?",
      "options": ["Транспортиране на кислород", "Поддържане на кръвното налягане", "Изграждане на мускули", "Регулиране на телесната температура"],
      "answer": 0
    },
    {
      "question": "Кой орган е отговорен за газообмена в дихателната система?",
      "options": ["Трахея", "Белите дробове", "Гърлото", "Носните кухини"],
      "answer": 1
    },
    {
      "question": "Какво представлява астмата?",
      "options": ["Алергична реакция", "Инфекциозно заболяване", "Хронично възпалително заболяване на дихателните пътища", "Тип на рак"],
      "answer": 2
    },
    {
      "question": "Коя е основната причина за бронхит?",
      "options": ["Бактериална инфекция", "Вирусна инфекция", "Генетични фактори", "Автоимунни заболявания"],
      "answer": 1
    },
    {
      "question": "Какво представлява апнеята при сън?",
      "options": ["Спиране на дишането по време на сън", "Сърцебиене по време на сън", "Хъркане", "Сънна разходка"],
      "answer": 0
    },
    {
      "question": "Кой витамин е важен за здравето на дихателната система?",
      "options": ["Витамин C", "Витамин D", "Витамин B12", "Витамин E"],
      "answer": 1
    },
    {
      "question": "Какво е функцията на ресничките в дихателната система?",
      "options": ["Производство на кислород", "Филтриране на въздуха", "Абсорбиране на влага", "Транспортиране на кръв"],
      "answer": 1
    },
    {
      "question": "Какво е дихателна гимнастика?",
      "options": ["Форма на йога", "Техники за подобряване на дишането", "Спортна дисциплина", "Вид медитация"],
      "answer": 1
    },
    {
      "question": "Какво представлява пневмонията?",
      "options": ["Заболяване на сърцето", "Възпаление на белодробната тъкан", "Тип на алергия", "Генетично заболяване"],
      "answer": 1
    },
    {
      "question": "Кои са основните симптоми на туберкулозата?",
      "options": ["Кашлица, загуба на тегло, нощно изпотяване", "Главоболие, замаяност, умора", "Треска, болки в мускулите, хрема", "Оток, зачервяване на кожата, изтръпване"],
      "answer": 0
    }  
  ];
  var currentQuestionIndex = 0;
  var selectedOption = null;
  var score = 0;
  var isAnswerChecked = false;
  var audienceSound = new Audio("sounds/audience.mp3");

// Function to initialize the quiz
function initQuiz() {
  displayQuestion(); // Display the first question immediately
}

// Call initQuiz when the page loads
window.onload = initQuiz;

  // Функция за показване на текущ въпрос и опции
  function displayQuestion() {
    var questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestionIndex].question;
  
    var optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
  
    var options = questions[currentQuestionIndex].options;
    for (var i = 0; i < options.length; i++) {
      var optionButton = document.createElement("button");
      optionButton.classList.add("option");
      optionButton.id = "option" + i;
      optionButton.textContent = options[i];
      optionButton.setAttribute("onclick", "selectOption(" + i + ")");
      optionsContainer.appendChild(optionButton);
    }
    
    audienceSound.play();
  }
  
  // Функция за избор на отговор
  function selectOption(optionIndex) {
    if (!isAnswerChecked) {
      selectedOption = optionIndex;
      resetOptionStyles();
      var selectedButton = document.getElementById("option" + selectedOption);
      selectedButton.classList.add("selected");
      
      // Play lifelines sound
      var lifelinesSound = new Audio("sounds/lifelines.mp3");
      lifelinesSound.play();
    }
  }
  
  // Функция за проверка на отговора
  function checkAnswer() {
    audienceSound.pause();
    if (selectedOption !== null) {
      var correctAnswer = questions[currentQuestionIndex].answer;
      var selectedButton = document.getElementById("option" + selectedOption);

      if (selectedOption === correctAnswer) {
        selectedButton.classList.add("correct");
        score += 1;
        
        // Play correct answer sound
        var correctAnswerSound = new Audio("sounds/correct_answer.mp3");
        correctAnswerSound.play();
      } else {
        selectedButton.classList.add("incorrect");
        document.getElementById("option" + correctAnswer).classList.add("correct");
        
        // Play wrong answer sound
        var wrongAnswerSound = new Audio("sounds/wrong_answer.mp3");
        wrongAnswerSound.play();
      }
  
      disableOptions();
      showNextQuestionButton();
      isAnswerChecked = true;
    }
  }
  
  // Функция за деактивиране на опциите след проверка
  function disableOptions() {
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
      options[i].setAttribute("disabled", true);
    }
  }
  
  // Функция за показване на бутона за следващ въпрос
  function showNextQuestionButton() {
    var nextQuestionButton = document.getElementById("next-question");
    nextQuestionButton.style.display = "block";
    
    // Play lifelines sound
    var lifelinesSound = new Audio("sounds/lifelines.mp3");
    lifelinesSound.play();
  }
  
  // Функция за преминаване към следващ въпрос
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      selectedOption = null;
      resetOptionStyles();
      isAnswerChecked = false;
      displayQuestion();
      hideNextQuestionButton();
    } else {
      showResults();
      
      // Play resign sound
      var resignSound = new Audio("sounds/resign.mp3");
      resignSound.play();
    }
  }
  
  // Функция за скриване на бутона за следващ въпрос
  function hideNextQuestionButton() {
    var nextQuestionButton = document.getElementById("next-question");
    nextQuestionButton.style.display = "none";
  }
  
  // Функция за показване на резултата
  function showScore() {
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = "Твоят резултат: " + score + " точки";
    scoreElement.style.display = "block";
    
    // Play applause sound
    var applauseSound = new Audio("sounds/applause.mp3");
    applauseSound.play();
  }
  
  // Функция за нулиране на стиловете на опциите
  function resetOptionStyles() {
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
      options[i].classList.remove("selected");
      options[i].classList.remove("correct");
      options[i].classList.remove("incorrect");
    }
  }
  var score = 0;
var startTime;
var endTime;

function showResults(finalScore, totalTimeTaken) {
  document.getElementById('score').innerText = score + ' от 10 въпроса са верни!';
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('next-question').style.display = 'none';
}